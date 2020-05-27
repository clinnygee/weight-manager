const {User, Weight, BodyMeasurement, Settings, Goals, Meal, DaysFood, Food} = require('../../database').models;

const FoodController = {
    async add (req, res){
        console.log(req.body.data);
        User.findOne({where: {username: req.username}}).then(user=> {
            DaysFood.findOrCreate({where: {date: req.body.data.date, userId: user.id},include:[{model: Meal}]}).then((daysfoodarray) => {
                // console.log(DaysFood.prototype)
                console.log(daysfoodarray[0].dataValues);
                daysfood = daysfoodarray[0];
                // console.log(created);
                // daysFood.setUser(user);
                
                Meal.findOrCreate({where:{name: req.body.data.meal, daysfoodId: daysfood.dataValues.id}}).then(meal => {
                    // meal.setDaysFood(daysfood);
                    console.log(meal);
                    console.log('-------------------------------------------')
                    console.log(req.body.data.food.totalNutrients.ENERC_KCAL);
                    Food.create({
                        quantity: req.body.data.quantity,
                        food_id: req.body.data.food.ingredients[0].parsed[0].foodId,
                        measurement: req.body.data.food.measurement,
                        ENERC_KCAL: req.body.data.food.totalNutrients.ENERC_KCAL.quantity,
                        PROCNT: req.body.data.food.totalNutrients.PROCNT.quantity,
                        CHOCDF: req.body.data.food.totalNutrients.CHOCDF.quantity,
                        FAT: req.body.data.food.totalNutrients.FAT.quantity,
                    }).then(food => {
                        food.setMeal(meal[0]);
                    })
                })
            })
        })
    }
};

module.exports = FoodController;