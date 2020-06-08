import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../context';
import { Paper, makeStyles, Grid } from '@material-ui/core';

import CaloriesConsumed from './CaloriesConsumed';
import Weight from './Weight';

const useStyles = makeStyles((theme) => ({
    paper:{
        width: '100%',
    },
    grid:{
        paddingTop: '20px',
        paddingBottom:'40px',
    }
}))

const Trends = props => {
    const context = useContext(UserContext);
    const classes = useStyles();
    return (
        <Grid container direction='column' spacing={3} className={classes.grid}>
            <CaloriesConsumed />
            <Weight />
        </Grid>
       
        
    );
};

Trends.propTypes = {
    
};

export default Trends;