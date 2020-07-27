import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import {FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// date picker & utils
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

import 'moment';

import {register} from './api';

const useStyles = makeStyles((theme) => ({
    root: {
        
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        
        

    },
    children:{'& > *':{
        margin: theme.spacing(1),
        
    }}
}));

const Register = props => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [submittable, setSubmittable] = useState(false);
    const [gender, setGender] = useState('female');
    const [birthdate, setBirthdate] = useState(new Date('1993-02-04T00:00:00'));
    const [birthdateError, setBirthdateError] = useState(false);
    const [height, setHeight] = useState('');
    const [heightError, setHeightError] = useState(false);
    const [weight, setWeight] = useState('');
    const [weightError, setWeightError] = useState(false);
    const [activityLevel, setActivityLevel] = useState('');
    const classes = useStyles();

    useEffect(() => {
        checkSubmittable();
    }, [username, password, email, gender, birthdate, height, weight])
    
    const handleEmailChange = e => {
        setEmail(e.target.value);
        checkSubmittable();
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if(username.length < 5){
            setUsernameError(true);
            
        } else{
            setUsernameError(false);
            checkSubmittable();
        }
        console.log(username);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        checkSubmittable();
    };

    const handleGenderSelect = e => {
        console.log(e.target.value);
        setGender(e.target.value);
        checkSubmittable();
    };

    const handleBirthdateChange = date => {
        console.log(date.format());
        setBirthdate(date);
        checkSubmittable();
    };

    const handleHeightChange = e => {
        setHeight(e.target.value);
        if(e.target.value < 100 || e.target.value >250){
            setHeightError(true);
        } else {
            setHeightError(false);
            checkSubmittable();
        }
    }

    const handleWeightChange =e =>{
        setWeight(e.target.value);
        if(e.target.value < 40 || e.target.value > 150){
            setWeightError(true);
        } else {
            setWeightError(false);
            checkSubmittable();
        }
    };

    const handleActivityLevelChange = e => {
        setActivityLevel(e.target.value);
    }

    const checkSubmittable = () => {
        if((weight > 40 && weight < 150) && (height > 100 && height <250) && (username.length > 5)){
            setSubmittable(true);
        } else {
            console.log(weight);
            console.log((weight > 40 && weight < 150));
            console.log(height > 100 && height <250);
            console.log(username.length >5);
            setSubmittable(false);
        }
    }

    const handleRegister = async e => {
        e.preventDefault();

        const credentials = {username: username, password: password, email: email};
        const measurements = {height: height, weight: weight, birthdate: birthdate, gender: gender, activityLevel: activityLevel}

        const registerResponse = await register(credentials, measurements);
    }
    return (
        <form className={classes.root + ' ' + classes.children}>
            <FormControl >
                <InputLabel htmlFor='email'>Email</InputLabel>
                <Input id='email' value={email} onChange={handleEmailChange}></Input>
                
            </FormControl>
            <FormControl error={usernameError}>
                <InputLabel htmlFor='username'>Username</InputLabel>
                <Input id='username' value={username} onChange={handleUsernameChange}></Input>
                {usernameError ? <FormHelperText >{'Must be atleast 6 characters long'}</FormHelperText > : null}
            </FormControl>
            <FormControl>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input id='password' value={password} onChange={handlePasswordChange} type='password'></Input>
                
            </FormControl>
            <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={handleGenderSelect}>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
            </FormControl>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="DD/MM/yyyy"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'select birthday',
                    }}
                />
            </MuiPickersUtilsProvider>
            <FormControl error={heightError}>
                <InputLabel htmlFor='height'>Height (cm)</InputLabel>
                <Input id='height' value={height} onChange={handleHeightChange} type='number'></Input>
                {heightError ? <FormHelperText >{'must be 100, < 250'}</FormHelperText > : null}
            </FormControl>
            <FormControl error={weightError} helperText={'Must be >40 & <150'}>
                <InputLabel htmlFor='weight'>Weight (KG)</InputLabel>
                <Input id='weight' value={weight} onChange={handleWeightChange} type='number'></Input>
                {weightError ? <FormHelperText >{'must be >40, <150 '}</FormHelperText > : null}
            </FormControl>
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
            <Button variant='contained' color='primary' m='auto' disabled={!submittable} onClick={handleRegister}>Register</Button>
            <p>Already a member? <Link to='/app'>Log In</Link></p>
        </form>
    );

};

Register.propTypes = {
    
};

export default Register;