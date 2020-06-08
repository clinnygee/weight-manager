import React, { useState, useContext, useEffect } from 'react';
import { Paper, makeStyles, Typography } from '@material-ui/core';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import {UserContext} from '../../context';

import moment from 'moment';


const useStyles = makeStyles((theme) => ({
    paper:{
        width: '100%',
        // height: '500px',
        marginTop: '20px',
        padding: '12px',
    }
}))

const CaloriesConsumed = () => {
    const context = useContext(UserContext);
    const classes = useStyles();
    const caloriesData = useCaloriesData();
    return (
        <Paper className={classes.paper}>
            <ResponsiveContainer height={400}>
                <LineChart  data={caloriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign='top'/>
                    <Line type="monotone" dataKey="Kilojoules" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
            <Typography variant='subtitle1' align='center'>Calories Consumed</Typography>
        </Paper>
    );
};

function useCaloriesData(){
    const context = useContext(UserContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        let caloriesarray = context.userData.daysfoods?.map(daysfood => {
            let sum = 0;
            daysfood.meals.forEach(meal => {
                meal.food.forEach(food => {sum += food.ENERC_KCAL * food.quantity * 4.2})
            })
            let date = moment(daysfood.date, 'DD/MM/YYYY');
            // sum = sum.toFixed(0);
            return {Date: daysfood.date, Kilojoules: sum};
        })
        
        const sortedCaloriesArray = caloriesarray.sort((a,b) => {
            
            return(moment(a.Date, 'DD/MM/YYYY').diff(moment(b.Date, 'DD/MM/YYYY')))
        })
        
        setData(sortedCaloriesArray);
    }, [context.userData.daysfoods])

    return data;
}

export default CaloriesConsumed;