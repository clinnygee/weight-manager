const {User, Weight, BodyMeasurement, Settings, Goals, DaysFood, Meal, Food} = require('../../database').models;
const Sequelize = require('../../database').conn;
const helpers = require('../../Helpers/TDEE');

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
        console.log(req.body.data);
        let change = 'Maintain'
        let macros = req.body.data.macroRatios;
        let measurements = req.body.data.measurements;
        let gender = req.body.data.gender === 'male' ? true : false;
        let activityLevel = req.body.data.activityLevel;
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
                    const userSettings = await Settings.findOne({where: {userId: user.id}});
                    const userBodyMeasurements = await BodyMeasurement.update({height: measurements.height,
                        neck: measurements.neck, naval: measurements.navel},{where: {userId: user.id}});
                        console.log(userBodyMeasurements);
                    const userBmr = helpers.calculateBmr(gender, req.body.data.weight, measurements.height, user.dataValues.birthdate);
                    const userTdee = helpers.calculateTdee(userBmr, activityLevel);
                    const tdei = helpers.calculateGoalTdei(userTdee, req.body.data.rateOfChange, change);
                    const totalMacros = helpers.calculateMacronutrientBreakdown(tdei, macros.carbRatio, macros.fatRatio, macros.proteinRatio);
                    userSettings.carbPercent = macros.carbRatio;
                    userSettings.carbs = totalMacros.carbs;
                    userSettings.proteinPercent = macros.proteinRatio;
                    userSettings.protein = totalMacros.protein;
                    userSettings.fatPercent = macros.fatRatio;
                    userSettings.fat = totalMacros.fat;
                    userSettings.bmr = userBmr;
                    userSettings.tdee = userTdee;
                    userSettings.activityLevel = activityLevel;
                    userSettings.save();
                    // set the gender of user to the new value
                    user.male = gender;
                    user.save();
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
                }],
                order:[
                    [{model: Weight}, 'createdAt', 'DESC']
                ],
            });
            res.status(200).json(allUserData);
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }
};

module.exports = UserController;