

// This uses the Harris-Benedict equation to calculate BMR
// the resultant answer is in Kcal
// Women BMR = 655 + (9.6 X weight in kg) + (1.8 x height in cm) – (4.7 x age in yrs)
// Men BMR = 66 + (13.7 X weight in kg) + (5 x height in cm) – (6.8 x age in yrs)
// kjs = Kcals * 4.184

function calculateBmr(gender, weight, height, birthdate){
    // gender === true means the user is a male
    let age = calculateAge(birthdate);
    let BMR = 0;
    if(gender){
        BMR = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
    } else {
        BMR = (655) + (9.6 * weight) + (1.8 * height) - (4.7 * age)
    };

    return Math.floor(BMR * 4.184);
};

function calculateTdee (bmr, activityLevel){
    let tdee = 0;

    switch(activityLevel){
        case 'Sedentary':
            tdee = bmr * 1.2;
            break;
        case 'Lightly Active':
            tdee = bmr * 1.375;
            break;
        case 'Moderately Active':
            tdee = bmr * 1.55;
            break;
        case 'Very Active':
            tdee = bmr * 1.725;
            break;
        case 'Extremely Active':
            tdee = bmr * 1.9;
            break;       
    }
    return Math.floor(tdee)
};

function calculateAge(birthdate){
    console.log(birthdate);
    let birthDate = new Date(birthdate);
    let now = new Date();

    let age =  now.getFullYear()- birthDate.getFullYear() ;

    console.log(age);
    return age;
};

function calculateBfPercent(height, neck, navel, hip){
    // follows the navy method for calculating BF, this only works for dudes atm

    const bf = (495 / (1.0324 - 0.19077 * Math.log10(navel-neck) + 0.15456 * Math.log10(height))) - 450;

    return bf;
};

function calculateGoalTdei(tdee, change, changeType){
    if(changeType === 'Maintain'){
        return tdee;
    }
    const oneKg = 37000;
        
    let requiredKilojouleDeviation = change !== 0 ? (oneKg * change) / 7 : 0;
        
        requiredKilojouleDeviation *= changeType === 'Lose' ? -1 : 1;
        
        return tdee + requiredKilojouleDeviation;
}

// assumes 2.2g per kg of weight for protein
// assumes per kg of weight for fat
// the rest is carbs
function calculateMacronutrientBreakdown(energyIntake, carbPercent, fatPercent, proteinPercent){
    const kjsPerGramOfFat = 37;
    const kjsPerGramOfProteinAndCarbs = 17;

    let proteinIntakeInKjs = energyIntake * proteinPercent;
    let fatIntakeInKjs = energyIntake* fatPercent;
    let carbIntakeInKjs = energyIntake * carbPercent;

    return {protein: Math.floor(proteinIntakeInKjs / kjsPerGramOfProteinAndCarbs),
         fat: Math.floor(fatIntakeInKjs / kjsPerGramOfFat),
          carbs: Math.floor(carbIntakeInKjs / kjsPerGramOfProteinAndCarbs)}


}
// let BMR = calculateBmr(true, 84.09, 182.88, 30);
// console.log(calculateTdee(BMR, 'Moderately Active'));
// console.log(calculateMacronutrientBreakdown(calculateTdee(BMR, 'Moderately Active'), .33, .33, .33))
module.exports = {calculateBmr, calculateTdee, calculateMacronutrientBreakdown, calculateGoalTdei};