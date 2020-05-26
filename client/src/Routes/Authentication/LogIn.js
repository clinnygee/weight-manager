import React, { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import {UserContext} from '../../context';
import {logIn} from './api';

const useStyles = makeStyles((theme) => ({
    root: {
        
        display: 'flex',
        flexDirection: 'column'
        
        

    },
    children:{'& > *':{
        margin: theme.spacing(1),
        
    }}
}));

const LogIn = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submittable, setSubmittable] = useState(false);
    const [awaiting, setAwaiting] = useState(false);
    const classes = useStyles();

    const context = useContext(UserContext);

    useEffect(() => {
        checkSubmittable();
    }, [username, password]);

    const checkSubmittable = () => {
        if(username.length > 5 && password.length > 0){
            setSubmittable(true);
        } else {
            setSubmittable(false);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        console.log(username);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const credentials = {username: username, password: password,};
        const logInResponse = await logIn(credentials);
        setAwaiting(true);

        if(logInResponse.status === 200){
            console.log('legit')
            setAwaiting(false);
            context.handleAuthentication(logInResponse);
        } else {
            setAwaiting(false);
        }
        console.log(await logInResponse);
    }
    return (
        <form className={classes.root + ' ' + classes.children}>
            <FormControl>
                <InputLabel htmlFor='username'>Username</InputLabel>
                <Input id='username' value={username} onChange={handleUsernameChange}></Input>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input id='password' value={password} onChange={handlePasswordChange}></Input>
                
            </FormControl>
    <Button variant='contained' color='primary' m='auto' disabled={!submittable} onClick={handleLogin}>{awaiting ? <CircularProgress color='ternary'/>: 'Sign in'}</Button>
            <p>Not a member yet? <Link to='/register'>Register</Link></p>
        </form>
    );
};

LogIn.propTypes = {
    
};

export default LogIn;