import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {UserContext} from '../../context';

import {Grid, Paper, TextField, FormControl, InputLabel, Input,
     Select, MenuItem, Button, makeStyles, CircularProgress, Slider, Typography,
    FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import { updateSettings } from './api';

const useStyles = makeStyles((theme) =>({
    root:{
        flexGrow: 1,
        flexDirection: 'column',
        padding: theme.spacing(1)
    },
    inputContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        // margin: theme.spacing(1),
    },
    verticalContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        margin: theme.spacing(1),
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
    const [macroRatios, setMacroRatios] = useState({carbRatio: context.userData.setting.carbPercent, proteinRatio: context.userData.setting.proteinPercent, fatRatio: context.userData.setting.fatPercent})
    const [measurements, setMeasurements] = useState({})
    const [gender, setGender] = useState(context.userData.male ? 'male' : 'female');
    const [activityLevel, setActivityLevel] = useState(context.userData.setting.activityLevel);
    const [awaiting, setAwaiting] = useState(false);

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

    const handleSettingsSubmit = async e => {
        setAwaiting(true);
        const settings = {weight: weight, goalWeight: goalWeight, rateOfChange: rateOfChange, macroRatios, measurements, gender, activityLevel};

        const settingsResponse = await updateSettings(settings);

        settingsResponse.status === 200 && setAwaiting(false);

        console.log(await settingsResponse);
        context.setUserData(settingsResponse.data);

    };

    const handleGenderSelect = (e) => {
        setGender(e.target.value)
    }
    const handleMacroRatioChange = (ratios) => {
        console.log(ratios);
        setMacroRatios(ratios);
    };

    const handleMeasurementsChange = (measurements) => {
        console.log(measurements)
        setMeasurements(measurements)
    };

    const handleActivityLevelChange = (e) => {
        setActivityLevel(e.target.value)
    };

    const handleLogOut = () =>{
        context.handleLogOut();
    }
    return (
        <Grid className={classes.root} container>
            
                <Paper className={classes.paper}>
                    <Grid className={classes.root} container className={classes.root} >
                        <Grid item  className={classes.inputContainer}>
                            <form autoComplete='off' noValidate className={classes.form}>
                                <FormControl className={classes.input}>
                                    <InputLabel htmlFor='weight'>Current Weight</InputLabel>
                                    <Input id='weight' type='number' value={weight} onChange={handleWeightChange}/>
                                </FormControl>
                                <FormControl className={classes.input}>
                                    <InputLabel htmlFor='goal-weight'>Goal Weight</InputLabel>
                                    <Input id='goal-weight' type='number' value={goalWeight} onChange={handleGoalWeightChange}/>
                                </FormControl>
                            </form>
                        </Grid>
                        <Grid item container className={classes.verticalContainer} >
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
                        <MacroGoalSlider onMacroRatioChange={handleMacroRatioChange}/>
                        </Grid>
                        <Grid item container className={classes.inputContainer}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={handleGenderSelect}>
                                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item container className={classes.inputContainer}>
                            <FormControl>
                                <InputLabel id='activity-level'>Activity Level</InputLabel>
                                <Select
                                    labelId='activity-level'
                                    value={activityLevel}
                                    onChange={handleActivityLevelChange}
                                >
                                    <MenuItem value={'Sedentary'}>little to no exercise + work a desk job</MenuItem>
                                    <MenuItem value={'Lightly Active'}>light exercise 1-3 days / week</MenuItem>
                                    <MenuItem value={'Moderately Active'}>moderate exercise 3-5 days / week</MenuItem>
                                    <MenuItem value={'Very Active'}>heavy exercise 6-7 days / week</MenuItem>
                                    <MenuItem value={'Extremely Active'}>very heavy exercise, hard labor job, training 2x / day</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <BodyMeasureMents onMeasurementsChange={handleMeasurementsChange}/>
                        <Grid item container  direction='column' spacing={3}>
                            <Button variant='contained' color='primary' onClick={handleSettingsSubmit}>
                                {awaiting ? <CircularProgress variant='determinant' color='#fff'/> : 'Save'}
                            </Button>
                            <Button variant='contained' color='secondary' onClick={handleLogOut}>
                                Logout
                            </Button>
                        </Grid>
                        

                    </Grid>
                </Paper>
            
        </Grid>
    );
};

const BodyMeasureMents= ({onMeasurementsChange}) => {
    const classes = useStyles();
    const context = useContext(UserContext);
    const [height, setHeight] = useState(context.userData.bodymeasurements[0]?.height || '');
    const [neck, setNeck] = useState(context.userData.bodymeasurements[0]?.neck || '');
    const [navel, setNavel] = useState(context.userData.bodymeasurements[0]?.naval || '');

    useEffect(() => {
        onMeasurementsChange({height, neck, navel})
    }, [height, neck, navel])

    
    return (
        <Grid item container className={classes.verticalContainer}>
            <FormControl className={classes.input}>
                <InputLabel htmlFor='height'>Height (cm)</InputLabel>
                <Input id='height' type='number' value={height} onChange={(e) => {setHeight(e.target.value)}}/>
            </FormControl>
            <FormControl className={classes.input}>
                <InputLabel htmlFor='neck'>Neck Circumference (cm)</InputLabel>
                <Input id='neck' type='number' value={neck} onChange={(e) => {setNeck(e.target.value)}}/>
            </FormControl>
            <FormControl className={classes.input}>
                <InputLabel htmlFor='navel'>Navel Circumference (cm)</InputLabel>
                <Input id='navel' type='number' value={navel} onChange={(e) => {setNavel(e.target.value)}}/>
            </FormControl>
        </Grid>
    )
};

const MacroGoalSlider = ({onMacroRatioChange}) => {
    const context = useContext(UserContext);
    const [carbRatio, setCarbRatio] = useState(parseFloat(context.userData.setting.carbPercent));
    const [proteinRatio, setProteinRatio]= useState(parseFloat(context.userData.setting.proteinPercent));
    const [fatRatio, setFatRatio]= useState(parseFloat(context.userData.setting.fatPercent));

    const max = 1;

    const ratioText = (value) => {
        return `${value * 100}%`
    };

    const handleCarbChange = (e, value) => {
        setCarbRatio(value);
    };
    const handleProteinChange = (e, value) => {
        setProteinRatio(value)
    };
    const handleFatChange = (e, value) => {
        setFatRatio(value)
    };

    useEffect(() =>{
        onMacroRatioChange({carbRatio, proteinRatio, fatRatio})
    }, [carbRatio, fatRatio, proteinRatio])
    

    console.log(carbRatio);
    console.log((1 -(proteinRatio + fatRatio)).toFixed(2))
    return (
        <FormControl>
            <Typography id='carb-percent' gutterBottom align='center'>Carb Ratio {`${(carbRatio * 100).toFixed(0)} %`}</Typography>
            <Slider
                step={0.01}
                defaultValue={carbRatio}
                max={(1 - (proteinRatio + fatRatio)).toFixed(2)}
                min={0}
                valueLabelDisplay="auto" 
                marks
                getAriaValueText={ratioText}
                onChange={handleCarbChange}
            />
            <Typography id='protein-percent' gutterBottom align='center'>Protein Ratio {`${(proteinRatio * 100).toFixed(0)} %`}</Typography>
            <Slider 
                step={0.01}
                defaultValue={proteinRatio}
                max={(1 - (carbRatio + fatRatio)).toFixed(2)}
                min={0}
                valueLabelDisplay="auto" 
                marks
                getAriaValueText={ratioText}
                onChange={handleProteinChange}
            />
            <Typography id='fat-percent' gutterBottom align='center'>Fat Ratio {`${(fatRatio * 100).toFixed(0)} %`}</Typography>
            <Slider 
                step={0.01}
                defaultValue={fatRatio}
                max={(1 - (proteinRatio + carbRatio)).toFixed(2)}
                min={0}
                valueLabelDisplay="auto" 
                marks
                getAriaValueText={ratioText}
                onChange={handleFatChange}
            />
        </FormControl>
        
    )
    
}

Settings.propTypes = {
    
};

export default Settings;