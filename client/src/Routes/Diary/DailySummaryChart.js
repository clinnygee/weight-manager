import React, { PureComponent, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend
  } from 'recharts';

import {UserContext} from '../../context';

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042'];

function DailySummaryChart(props) {
    const context = useContext(UserContext);
    const [remainingCalories, setRemainingCalories] = useState(0);
    const [caloriesConsumed, setCaloriesConsumed] = useState(0);
    const [carbsConsumed, setCarbsConsumed] = useState(0);
    const [proteinConsumed, SetProteinConsumed] = useState(0);
    const [fatConsumed, setFatConsumed] = useState(0);
    const [caloriesData, setCaloriesData] = useState([]);

    useEffect(() => {
        console.log(context.datesFood)
        sumCaloriesConsumed();
    }, [context.datesFood]);

    useEffect(() => {
        setCaloriesData([{
            name: 'Consumed', value: Math.floor(caloriesConsumed),
        },{
            name: 'Remaining', value: Math.floor(remainingCalories),
        }])
    },[remainingCalories]);

    const sumCaloriesConsumed = () =>{
        let CaloriesSum = 0;
        let CarbSum = 0;
        let ProteinSum = 0;
        let FatSum = 0;

        context.datesFood.meals.forEach((meal)=> {
            meal.food.forEach(food => {
                CaloriesSum += food.ENERC_KCAL * food.quantity * 4.2;
                CarbSum += food.CHOCDF * food.quantity * 4.2;
                ProteinSum += food.PROCNT * food.quantity * 4.2;
                FatSum += food.FAT * food.quantity * 4.2;
            })
        });
        console.log(CaloriesSum + 'carbs:' + CarbSum + 'Protein: ' + ProteinSum + 'FatSum: ' + FatSum);
        setCaloriesConsumed(CaloriesSum);
        setCarbsConsumed(CarbSum);
        SetProteinConsumed(ProteinSum);
        setFatConsumed(FatSum);
        setRemainingCalories(context.userData.setting.tdee - CaloriesSum);
    };
    console.log(caloriesData)
        return (
            <ResponsiveContainer width={'100%'} height={'100%'}>
                <PieChart>
                    <Pie
                        data={caloriesData}
                        cx={'50%'}
                        cy={'50%'}
                        innerRadius={30}
                        outerRadius={50}
                        fill='#8884d8'
                        paddingAngle={5}
                        dataKey='value'
                        label

                    >
                        {caloriesData.map((entry, index) => {
                            return <Cell key={`calories-${entry.name}`} fill={COLORS[Math.sign(entry.value) >= 0 ? index : 3]}/>
                        })}
                        
                    </Pie>
                    <Legend verticalAlign='top' height={36}/>
                </PieChart>

            </ResponsiveContainer>
        );
    
}

DailySummaryChart.propTypes = {

};

export default DailySummaryChart;