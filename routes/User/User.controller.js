const {User, Weight, BodyMeasurement, Settings, Goals} = require('../../database').models;

const UserController ={
    all(req, res){
        User.findOne({where: {username: req.username}, 
            include: [{
                model: Weight,
            },{
                model: Settings,
            },{
                model: BodyMeasurement,
            },{
                model: Goals,
            }

    ]}).then(user => {
        res.json(user)
    })
    }
};

module.exports = UserController;