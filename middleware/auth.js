const jwt = require('jsonwebtoken');

const secret = (process.env.SECRET || 'weight-manager');
const {User} = require('../database').models;

// Everything that comes through this middlewares req.username will be = to the username. duh

const withAuth = (req, res, next) => {
    
    console.log(req.cookies.jwt);
   
    console.log(req.headers);
    if(!req.cookies.jwt) {
        // res.redirect('/');
        console.log('valid cookie not recieved');
        
        res.status(403).json({error: 'Unauthorized: No Logged in user'})
        // res.status(401).send('Unauthorized: No Logged in user');
    } else {
        console.log('req.cookies.jwt recieved');
        jwt.decode(req.cookies.jwt, secret, decoded => {
            console.log(decoded);
        });
        let now = new Date
        let nowString = now.toString()
        console.log(nowString)
        jwt.verify(req.cookies.jwt, secret, function(err, decoded){
            if(err){
                console.log(err);
                console.log('some error occured in jwt verify')
                console.log(req.cookies.jwt);
                // res.clearCookie('jwt');
                res.status(401).send('Unauthorized: No Logged in user');
            } else {
                console.log('below is decoded ---------------------------------------------------------------------')
                console.log(decoded.exp);
                
                let current = new Date().getTime() / 1000;
                console.log(current)
                console.log('expiry ----------------------')
                // console.log(expiry.toUTCString());
                if(current < decoded.exp){
                User.findOne({where: {username: decoded.username}}).then(user=> {
                    if(user){
                        req.username = decoded.username;
                        res.cookie('jwt', req.cookies.jwt);
                        next();
                    }else{
                        res.status(401).json({error: 'Unauthorized: Invalid token'});
                    }
                })} else {
                    res.status(401).json({error: 'Expired JWT'});
                }
                
            }
        })
    }

};

module.exports = withAuth;