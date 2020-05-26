import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {UserContext} from '../../context';

import {Grid, Paper, TextField, FormControl, InputLabel, Input, Select, MenuItem, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) =>({
    root:{
        flexGrow: 1,
        flexDirection: 'column',
        padding: theme.spacing(1)
    },
    inputContainer:{
        flexDirection: 'row',
        justifyContent:'center',
    },
    form:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    paper:{
        width: '100%',
        height: '100%',
        padding: theme.spacing(2),
    },
    input:{
        margin: '5px',
    }
}));

const Settings = props => {
    const context = useContext(UserContext);
    const classes = useStyles();

    const [weight, setWeight] = useState(context.userData.weights[0].weight);
    const [goalWeight, setGoalWeight] = useState(context.userData.goals[0].targetWeight);
    const [rateOfChange, setRateOfChange] = useState(context.userData.goals[0].change);

    console.log(context);

    // useEffect(() => {
    //     // setWeight(context.userData.weights[0].weight)
    // },[context.userData]);
    const handleWeightChange = e => {
        setWeight(e.target.value);
    };

    const handleGoalWeightChange = e => {
        setGoalWeight(e.target.value);
    };

    const handleRateOfChange = e => {
        setRateOfChange(e.target.value);
    };

    const handleSettingsSubmit = e => {

    };
    return (
        <Grid className={classes.root} container>
            
                <Paper className={classes.paper}>
                    <Grid className={classes.root} container className={classes.root}>
                        <Grid item  className={classes.inputContainer}>
                            <form autoComplete='off' noValidate className={classes.form}>
                                <FormControl className={classes.input}>
                                    <InputLabel htmlFor='weight'>Current Weight</InputLabel>
                                    <Input id='weight' value={weight} onChange={handleWeightChange}/>
                                </FormControl>
                                <FormControl className={classes.input}>
                                    <InputLabel htmlFor='goal-weight'>Goal Weight</InputLabel>
                                    <Input id='goal-weight' value={goalWeight} onChange={handleGoalWeightChange}/>
                                </FormControl>
                            </form>
                        </Grid>
                        <Grid item container className={classes.inputContainer}>
                        <FormControl style={{width: '100%', maxWidth: '300px', justifySelf:'center'}} disabled={goalWeight === weight}>
                            <InputLabel id='weight-change'>Rate of Change</InputLabel>
                            <Select
                                labelId='weight-change'
                                value={rateOfChange}
                                onChange={handleRateOfChange}
                            >
                                <MenuItem value={'0.25'}>0.25kg / Week</MenuItem>
                                <MenuItem value={'0.5'}>0.5kg / Week</MenuItem>
                                <MenuItem value={'0.75'}>0.75kg / Week</MenuItem>
                                <MenuItem value={'1'}>1kg / Week</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item >

                        </Grid>

                    </Grid>
                </Paper>
            
        </Grid>
    );
};

Settings.propTypes = {
    
};

export default Settings;