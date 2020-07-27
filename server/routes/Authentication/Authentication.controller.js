const {User, Weight, BodyMeasurement, Settings, Goals} = require('../../database').models;
const bcrypt = require('bcrypt');
const secret = (process.env.SECRET || 'weight-manager');
const saltRounds = (process.env.SALTROUNDS || 10);
const jwt = require('jsonwebtoken');
const energyExpenditure = require('../../Helpers/TDEE');

const AuthenticationController = {
    // registers the user, and creates friendships between the new user and the 5 original seeder profiles.
    register(req,res){
        console.log(req.body)
        const {username, password, email, gender, birthdate, weight, height, activityLevel} = req.body;
        console.log('in register')

        console.log(username, password);

        console.log(User);
        User.findOne({where: {username: username}}).then(user => {
            if(user){
                console.log('User Found');
                res.status(400).json({error: 'User Already Exists'});
            } else {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    User.create({
                        username: username,
                        password: hash,
                        email: email,
                        male: gender === 'male' ? true : false,
                        birthdate: birthdate,
                    }).then((user) => {
                        Weight.create({weight: weight}).then(weightDbEntry => {
                            BodyMeasurement.create({height: height}).then(bodyMeasurementDbEntry => {
                                // create the users TDEE and BMR
                                let BMR = energyExpenditure.calculateBmr(gender === 'male' ? true : false, weight, height, birthdate);
                                let TDEE = energyExpenditure.calculateTdee(BMR, activityLevel);
                                let macros = energyExpenditure.calculateMacronutrientBreakdown(TDEE, .33, .33, .33);                                
                                Settings.create({
                                    activityLevel: activityLevel,
                                    bmr: BMR,
                                    tdee: TDEE,
                                    protein: macros.protein,
                                    fat: macros.fat,
                                    carbs: macros.carbs, 
                                    proteinPercent: 0.33,
                                    fatPercent: 0.33,
                                    carbPercent: 0.33,                               
                                }).then(settings => {
                                    Goals.create({
                                        targetWeight: weight,
                                        weightChange: 'Maintain',
                                        change: 0.00,
                                        
                                    }).then(goals => {
                                        weightDbEntry.setUser(user);
                                        bodyMeasurementDbEntry.setUser(user);
                                        settings.setUser(user);
                                        goals.setUser(user);
                                    })
                                    
                                })
                                
                                // create user TDEE
                            })
                        })
                        const payload = {username};
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '24h'
                        });
                        console.log(token);
                        res.cookie('jwt', token).send();
                        })
                        
                    })
        }});
            
    
    },
    logIn(req,res){
        const {username, password} = req.body;

    console.log(password);

    User.findOne({where: {username: username}}).then(user => {
        if(!user){
            res.status(400).json({error: 'User does not exist'})
        } else {
            console.log(user);
            bcrypt.compare(password, user.password, (err, result) => {
                if(!result){
                    res.status(401).json({error: 'Incorrect Password'})
                } else {
                    const payload = {username};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '24h',
                    });
                    console.log(token);
                    res.cookie('jwt', token).send();
                    // res.json({token: token});
                }
                
            })
        }
    });
    },
    logOut(req,res){
        
        res.clearCookie('jwt').send();
        
    },
    checkToken(req,res){
        console.log('in check token')
        console.log(req.headers);
        if(req.username){
            res.status(200).send('User is authorized');
        } else {
            res.status(400).send('User is unauthorized')
        };
    }
};

module.exports = AuthenticationController;