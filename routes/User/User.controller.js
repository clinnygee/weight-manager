const {User, Weight, BodyMeasurement, Settings, Goals, DaysFood, Meal, Food} = require('../../database').models;
const Sequelize = require('../../database').conn;

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

        ],
        order:[
            [{model: Weight}, 'createdAt', 'DESC']
        ]
    }).then(user => {
        res.json(user)
    })
    }, 
    async settings(req, res){
        const user = await User.findOne({where: {username: req.username}});
        let change = 'Maintain'
        if(req.body.data.goalWeight < req.body.data.weight){
            change = 'Lose'
        } else if(req.body.data.goalWeight > req.body.data.weight){
            change = 'Gain'
        };

        try {
            const result = await Sequelize.transaction(async (t) => {
                const updatedGoalsSettings = await Goals.update(
                    {targetWeight: req.body.data.goalWeight, weightChange: change, change: req.body.data.rateOfChange},
                    {where: {userId: user.id}});
                    // need to get the weight entry here, check if weight has changed, if it hasn't, do nothing, if it has, 
                    // create a new weight entry
                    const userWeight = await Weight.findOne(
                        {where: {userId: user.id}}
                    );
                    let newWeight = null;
                    if(userWeight.dataValues.weight !== req.body.data.weight){
                        updatedWeight = await Weight.create({weight: req.body.data.weight, userId: user.id});
                    }
                    return updatedGoalsSettings;
            });
            const allUserData = await User.findOne({where: {username: req.username},
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
                }]
            });
            res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }
};

module.exports = UserController;