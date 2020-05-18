const conn = require('./connection');

// import all of the models here.
const User = require('./models/User');
const Goals = require('./models/Goals');
const BodyMeasurement = require('./models/BodyMeasurement');
const Weight = require('./models/Weight');
const DaysFood = require('./models/DaysFood');
const Meal = require('./models/Meal');
const Food = require('./models/Food');

// User relations
User.hasMany(Goals);
Goals.belongsTo(User);
User.hasMany(BodyMeasurement);
BodyMeasurement.belongsTo(User);
User.hasMany(Weight);
Weight.belongsTo(User);
User.hasMany(DaysFood);
DaysFood.belongsTo(User);

// food relations
DaysFood.hasMany(Meal);
Meal.belongsTo(DaysFood);
Meal.hasMany(Food);
Food.belongsTo(Meal);
// set models relations


module.exports = {
    conn,
    models: {
        User,
        Goals,
        BodyMeasurement,
        Weight,
        DaysFood,
        Meal,
        Food,
    }
}