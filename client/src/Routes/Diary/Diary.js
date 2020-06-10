import React, {useState, forwardRef, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import  {Grid, makeStyles, Paper, Button, Dialog, Slide, List, ListItemText, ListItem, ListItemSecondaryAction, IconButton, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SpeedIcon from '@material-ui/icons/Speed';
import DeleteIcon from '@material-ui/icons/Delete'
import NoteIcon from '@material-ui/icons/Note';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip} from 'recharts'

import AddFood from './AddFood';
import { UserContext } from '../../context';
import DailySummaryChart from './DailySummaryChart';
import DailyMacroSummaryChart from './DailyMacroSummaryChart';
import { deleteFood } from './AddFood/api';

const useStyles = makeStyles((theme)=> ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    child: {
        width: '100%',
    },
    paper:{
        marginTop: '20px',
        width: '100%',
    },
    button:{
        margin: theme.spacing(1),
    },
    headerListItem:{
        backgroundColor: '#e0e0e0',
    },
    nestedListItem:{
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
        
    },
    nestedListItemText:{
        fontSize: '0.85rem !important',
        maxWidth: '90%',
    }
}));

const DialogTransition = forwardRef(function Transition(props, ref){
    return (<Slide direction='up' ref={ref} {...props}/>)
})

const Diary = props => {

    const classes = useStyles();
    const [openAddFood, setOpenAddFood] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState('');
    
    const context = useContext(UserContext);


    const handleOpenAddFood = e => {
        setOpenAddFood(true);
    };

    const handleCloseAddFood = e => {
        setOpenAddFood(false);
        setSelectedMeal('');
    };

    const handleMealAddFoodClick = (meal) => {
        // console.log(meal);
        setSelectedMeal(meal);
        setOpenAddFood(true);
    };

    console.log('rendering diary')
    return (
                    <Paper className={classes.paper}>
                        <Grid container direction='column' spacing={0} justify='center'>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>
                                            Kilojoule Summary
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid item style={{height: '200px', width: '100%'}}>
                                            <DailySummaryChart />
                                        </Grid>
                                        
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            <Grid item> 
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>
                                            Macro-nutrients details
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid item style={{height: '200px', width: '100%'}}>
                                            <DailyMacroSummaryChart />
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid container item direction='row' >
                                <Dialog 
                                    fullScreen open={openAddFood} onClose={handleCloseAddFood}
                                    TransitionComponent={DialogTransition}
                                >
                                    <AddFood handleClose={handleCloseAddFood} meal={selectedMeal}/>
                                </Dialog>
                            </Grid>
                            <Grid item container direction='column'>
                                <MealsList handleMealAddFoodClick={handleMealAddFoodClick}/>
                            </Grid>
                        </Grid>
                    </Paper>
            

        
    );
};

function MealsList({handleMealAddFoodClick}){
    const context = useContext(UserContext);
    const classes = useStyles();
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [snacks, setSnacks] = useState([]);

    useEffect(()=>{
        // console.log(context.datesFood.meals.filter(meal => {return meal.name === breakfast}));
        console.log('context dates food has changed')
        console.log(context.datesFood)
        if(context.datesFood){
        setBreakfast(context.datesFood?.meals?.filter(meal => {return meal.name === 'breakfast'})[0] || []);
        setLunch(context.datesFood?.meals?.filter(meal => {return meal.name === 'lunch'})[0] || []);
        setDinner(context.datesFood?.meals?.filter(meal => {return meal.name === 'dinner'})[0] || []);
        setSnacks(context.datesFood?.meals?.filter(meal => {return meal.name === 'snack'})[0] || []);
        }
    }, [context.datesFood]);
    // console.log(breakfast);
    // console.log(lunch);

    const handleDeleteFood = async (food) => {
        const response = await deleteFood(food.id, context.selectedDate);
        console.log(response);
        console.log(food.id);
        console.log(context.selectedDate);
        if(response.status===200){
            context.insertDaysFood(response.data);
        };
    }

    const mealListRender = (meal) => {
        // console.log(meal);
        if(meal.length === 0){
            return null
        };
        return meal.map(food => {
            return (
                <List component='div' disablePadding>
                    <ListItem className={classes.nestedListItem} divider>
                        <ListItemText primary={food.label} secondary={` KJS: ${(food.ENERC_KCAL * 4.2).toFixed(0)}`} disableTypography className={classes.nestedListItemText}/>
                    </ListItem>
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={()=>{handleDeleteFood(food)}}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>                    
                </List>
            )
        })
    };

    const sumMealKjs = (meal) => {
        
        let sum = 0;
        meal.forEach((food) => {
            console.log(food)
            sum += food.ENERC_KCAL * 4.2
        });
        
        return sum.toFixed(0);
    }
    // console.log(context.datesFood);
    // console.log(breakfast);
    // console.log(lunch)
    console.log('rendering meal list')
    return (
        <List>
                <ListItem className={classes.headerListItem} divider>
                    <ListItemText
                        primary='Breakfast'
                        secondary={sumMealKjs(breakfast.food || []) + ' Kjs'}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge='end' aria-label='add-breakfast' onClick={() => handleMealAddFoodClick('breakfast')}>
                            <AddIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {/* {breakfast ?   */}
                    {mealListRender(breakfast.food || [])}
                {/* : null} */}
                {/* <List component='div' disablePadding>
                    <ListItem className={classes.nestedListItem}>
                        <ListItemText primary='muesli'/>
                    </ListItem>
                    
                </List> */}
                <ListItem divider>
                    <ListItemText
                        primary='Lunch'
                        secondary={sumMealKjs(lunch.food || []) + ' Kjs'}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge='end' aria-label='add-lunch' onClick={() => handleMealAddFoodClick('lunch')}>
                            <AddIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {/* {lunch  ?   */}
                    {mealListRender(lunch.food || [])}
                {/* : null} */}
                <ListItem divider>
                    <ListItemText
                        primary='Dinner'
                        secondary={sumMealKjs(dinner.food || []) + ' Kjs'}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge='end' aria-label='add-dinner' onClick={() => handleMealAddFoodClick('dinner')}>
                            <AddIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {/* {dinner  ?   */}
                    {mealListRender(dinner.food || [])}
                {/* : null} */}
                <ListItem>
                    <ListItemText
                        primary='Snack'
                        secondary={sumMealKjs(snacks.food || []) + ' Kjs'}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge='end' aria-label='add-snack' onClick={() => handleMealAddFoodClick('snack')}>
                            <AddIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {/* {snacks  ?   */}
                    {mealListRender(snacks.food || [])}
                {/* : null} */}
        </List>
    )
}

Diary.propTypes = {
    
};

export default Diary;