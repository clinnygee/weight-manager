import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import {UserContext} from '../../context'

import moment from 'moment'


const useStyles = makeStyles((theme) => ({
    paper:{
        width: '100%',
        // height: '500px',
        marginTop: '20px',
        padding: '12px',
    }
}))
const Weight = () => {
    const classes = useStyles();
    const weightData = useWeightData()
    return (
        <Paper className={classes.paper}>
            <ResponsiveContainer height={400}>
                <LineChart  data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis type='number' domain={['dataMin - 20', 'dataMax + 20']}/>
                    <Tooltip />
                    <Legend verticalAlign='top'/>
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
            <Typography variant='subtitle1' align='center'>Weight Change</Typography>
        </Paper>
    );
};

function useWeightData(){
    const context = useContext(UserContext);
    const [weightArray, setWeightArray] = useState([]);

    useEffect(() => {
        let weights = context.userData.weights?.map(weight => {
            
            return {Date: moment(weight.createdAt).format('DD/MM/YYYY'), weight: weight.weight};
        })
        
        const sortedWeightArray = weights.sort((a,b) => {
            
            return(moment(a.Date, 'DD/MM/YYYY').diff(moment(b.Date, 'DD/MM/YYYY')))
        })
        
        setWeightArray(sortedWeightArray);
    }, [context.userData.weights]);
    return weightArray;
}

export default Weight;