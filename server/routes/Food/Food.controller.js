const {User, Weight, BodyMeasurement, Settings, Goals, Meal, DaysFood, Food} = require('../../database').models;
const Sequelize = require('../../database').conn;
// console.log(conn);
// const {Sequelize} = conn;
// console.log('Sequelize------------------------------------------')
// console.log(Sequelize)
const FoodController = {
    async add (req, res){
        const user = await User.findOne({where: {username: req.username}});
        try {
            const result = await Sequelize.transaction(async(t) => {
                

                let daysfood = await DaysFood.findOrCreate({where: {date: req.body.data.date, userId: user.id}});
                console.log(await daysfood[0]);

                daysfood = daysfood[0]

                let meal = await Meal.findOrCreate({where:{name: req.body.data.meal, daysfoodId: daysfood.dataValues.id}});
                console.log(await meal)
                meal = meal[0];

                const food = await Food.create({
                    label: req.body.data.label,
                    quantity: req.body.data.quantity,
                    food_id: req.body.data.food.ingredients[0].parsed[0].foodId,
                    measurement: req.body.data.food.measurement,
                    ENERC_KCAL: req.body.data.food.totalNutrients.ENERC_KCAL.quantity,
                    PROCNT: req.body.data.food.totalNutrients.PROCNT.quantity,
                    CHOCDF: req.body.data.food.totalNutrients.CHOCDF.quantity,
                    FAT: req.body.data.food.totalNutrients.FAT.quantity,
                    mealId: meal.id,
                });

                return daysfood;
            });
            try {
                const returnDaysFood = await DaysFood.findOne({where: {date: req.body.data.date, userId: user.id},include:[{
                    model: Meal,
                    include:[{
                        model: Food,
                    }]
                }]});
                res.status(200).json(returnDaysFood);
                // console.log('this is what will be sent back')
                // console.log(returnDaysFood);
            } catch (error) {
                console.log(error);
            }
            
        } catch (error) {
            console.log(error);
        }
    },
    async delete(req, res){
        console.log(req.body);
        const user = await User.findOne({where: {username: req.username}});
        try {
            const result = await Sequelize.transaction(async t => {
                const foodItem = await Food.findOne({where: {id: req.body.foodId}});
                await foodItem.destroy();
                
                return t;
            });
            const newDatesFood = await DaysFood.findOne({where: {date: req.body.date, userId: user.id}, include:[
                {
                    model: Meal,
                    include: [
                        {
                            model: Food,
                        }
                    ]
                }
            ]});
            res.status(200).json(newDatesFood);
        } catch (error) {
            console.log(error);
            res.status(400).send({error: error});
        }
    },
};

module.exports = FoodController;