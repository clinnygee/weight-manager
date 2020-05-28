const {User, Weight, BodyMeasurement, Settings, Goals, DaysFood, Meal, Food} = require('../../database').models;

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
            },
            {
                model: DaysFood,
                include:[{
                    model: Meal,
                    include:[{
                        model: Food,
                    }]
                }]
            }

    ]}).then(user => {
        res.json(user)
    })
    }
};

module.exports = UserController;