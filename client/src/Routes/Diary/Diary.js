import React, {useState, forwardRef} from 'react';
import PropTypes from 'prop-types';
import  {Grid, makeStyles, Paper, Button, Dialog, Slide } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SpeedIcon from '@material-ui/icons/Speed';
import NoteIcon from '@material-ui/icons/Note';
import {ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip} from 'recharts'

import AddFood from './AddFood';

const useStyles = makeStyles((theme)=> ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    child: {
        width: '100%',
    },
    paper:{
        height: '400px',
        width: '100%'
    },
    button:{
        margin: theme.spacing(1),
    }
}));

const DialogTransition = forwardRef(function Transition(props, ref){
    return (<Slide direction='up' ref={ref} {...props}/>)
})

const Diary = props => {

    const classes = useStyles();
    const [openAddFood, setOpenAddFood] = useState(false);

    const handleOpenAddFood = e => {
        setOpenAddFood(true);
    };

    const handleCloseAddFood = e => {
        setOpenAddFood(false);
    }
    return (
        <Grid className={classes.root} container spacing={3}>
            <Grid item xs={4}>
                <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item container xs={8} direction='column' className={classes.root} spacing={3}>
                <Grid item container xs={12} direction='row'>
                    <Paper className={classes.paper}>
                        <Grid container direction='column' spacing={1}>
                            <Grid container item direction='row' justify='center'>
                                <Button 
                                    className={classes.button}
                                    variant='outlined'
                                    color='secondary'
                                    startIcon={<FastfoodIcon />}
                                    size='small'
                                    onClick={handleOpenAddFood}
                                >
                                    {/* This will make a modal that allows you to enter food */}
                                    Add Food
                                </Button>
                                <Dialog 
                                    fullScreen open={openAddFood} onClose={handleCloseAddFood}
                                    TransitionComponent={DialogTransition}
                                >
                                    <AddFood handleClose={handleCloseAddFood}/>
                                </Dialog>
                                <Button
                                    className={classes.button}
                                    variant='outlined'
                                    color='secondary'
                                    startIcon={<SpeedIcon />}
                                    size='small'
                                >
                                    Add Biometric
                                </Button>
                                <Button
                                    className={classes.button}
                                    variant='outlined'
                                    color='secondary'
                                    startIcon={<NoteIcon />}
                                    size='small'
                                >
                                    Add Note
                                </Button>
                            </Grid>

                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>

        </Grid>
    );
};

Diary.propTypes = {
    
};

export default Diary;