import React from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import LogIn from './LogIn';
import Register from './Register';

import Box from '@material-ui/core/Box';

const Authentication = props => {
    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100vh'>        
        <Switch>
            
            <Route path='/register'>
                <Register />
            </Route>
            <Route path='/'>
                <LogIn />
            </Route>
        </Switch>
        </Box>
    );
};

Authentication.propTypes = {
    
};

export default Authentication;