import React, {  useContext, useState, useEffect } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

import {UserContext} from '../../context';
/* eslint-disable */


export default  function DailyMacroSummaryChart(props){
    const context = useContext(UserContext);
    const [carbsConsumed, setCarbsConsumed] = useState(0);
    const [proteinConsumed, SetProteinConsumed] = useState(0);
    const [fatConsumed, setFatConsumed] = useState(0);
    const [macroData, setMacroData] = useState([]);
    const [triggerRerender, setTriggerRerender] = useState(false);

    useEffect(() => {
        // console.log(context.datesFood)
        console.log('I am being called by a change in context.datesFood')
        sumMacrosConsumed();
    }, [context.datesFood]);

    useEffect(() => {
        console.log('I am being called because remainingCalories has changed')
        setMacroData([{
            name: 'Carbs', consumed: Math.floor(carbsConsumed), remaining: context.userData.setting.carbs - Math.floor(carbsConsumed),
        },{
            name: 'Protein', consumed: Math.floor(proteinConsumed), remaining: context.userData.setting.protein - Math.floor(proteinConsumed),
        },{
            name: 'Fat', consumed: Math.floor(fatConsumed), remaining: context.userData.setting.fat - Math.floor(fatConsumed),
        }])
    },[triggerRerender]);

    const sumMacrosConsumed = () =>{
        
        let CarbSum = 0;
        let ProteinSum = 0;
        let FatSum = 0;

        context.datesFood?.meals?.forEach((meal)=> {
            meal.food.forEach(food => {
                console.log(food);
                console.log(food.CHOCDF)
                CarbSum += food.CHOCDF * food.quantity ;
                ProteinSum += food.PROCNT * food.quantity;
                FatSum += food.FAT * food.quantity ;
            })
        });
        setCarbsConsumed(CarbSum);
        SetProteinConsumed(ProteinSum);
        setFatConsumed(FatSum);
        setTriggerRerender(!triggerRerender);
    }
    console.log(macroData);
    return (
        <ResponsiveContainer>
            <BarChart
              width={'100%'}
              height={'100%'}
              layout={'vertical'}
              data={macroData}
              margin={{
                top: 5, right: 0, left: 0, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type='number'/>
              <YAxis dataKey="name" type='category'/>
              <Tooltip />
              <Legend />
              <Bar dataKey="consumed" fill="#8884d8" />
              <Bar dataKey="remaining" fill="#82ca9d" />
            </BarChart>
      </ResponsiveContainer>
    );
  
}
