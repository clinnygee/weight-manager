import React, {useState, forwardRef, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import  {Grid, makeStyles, Paper, Button, Dialog, Slide, List, ListItemText, ListItem, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SpeedIcon from '@material-ui/icons/Speed';
import NoteIcon from '@material-ui/icons/Note';
import AddIcon from '@material-ui/icons/Add';
import {ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip} from 'recharts'

import AddFood from './AddFood';
import { UserContext } from '../../context';
import DailySummaryChart from './DailySummaryChart';

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
    },
    headerListItem:{
        backgroundColor: '#e0e0e0',
    },
    nestedListItem:{
        paddingLeft: theme.spacing(4),
    },
}));

const DialogTransition = forwardRef(function Transition(props, ref){
    return (<Slide direction='up' ref={ref} {...props}/>)
})

const Diary = props => {

    const classes = useStyles();
    const [openAddFood, setOpenAddFood] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState('');
    
    const context = useContext(UserContext);

    // useEffect(() => {
    //     console.log(context.datesFood)
    //     sumCaloriesConsumed();
    // }, [context.datesFood]);

    // const sumCaloriesConsumed = () =>{
    //     let CaloriesSum = 0;
    //     let CarbSum = 0;
    //     let ProteinSum = 0;
    //     let FatSum = 0;

    //     context.datesFood.meals.forEach((meal)=> {
    //         meal.food.forEach(food => {
    //             CaloriesSum += food.ENERC_KCAL * food.quantity;
    //             CarbSum += food.CHOCDF * food.quantity;
    //             ProteinSum += food.PROCNT * food.quantity;
    //             FatSum += food.FAT * food.quantity;
    //         })
    //     });
    //     console.log(CaloriesSum + 'carbs:' + CarbSum + 'Protein: ' + ProteinSum + 'FatSum: ' + FatSum);
    //     setCaloriesConsumed(CaloriesSum);
    //     setCarbsConsumed(CarbSum);
    //     SetProteinConsumed(ProteinSum);
    //     setFatConsumed(FatSum);
    // }

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
    }
    return (
        <Grid className={classes.root} container spacing={3}>
            {/* <Grid item xs={4}>
                <Paper ></Paper>
            </Grid> */}
            <Grid item container xs={12} direction='column' className={classes.root} spacing={3}>
                <Grid item container xs={12} direction='row' justify='center'>
                    <Paper >
                        <Grid container direction='column' spacing={1} justify='center'>
                            <Typography variant='h6' style={{textAlign: 'center'}}>
                                Kilojoule Summary
                            </Typography>
                            <Grid item style={{height: '150px'}}>
                                <DailySummaryChart />
                            </Grid>
                            <Grid container item direction='row' >
                                {/* <Button 
                                    className={classes.button}
                                    variant='outlined'
                                    color='secondary'
                                    startIcon={<FastfoodIcon />}
                                    size='small'
                                    onClick={handleOpenAddFood}
                                >
                                    {/* This will make a modal that allows you to enter food */}
                                    {/* Add Food
                                </Button> */} 
                                <Dialog 
                                    fullScreen open={openAddFood} onClose={handleCloseAddFood}
                                    TransitionComponent={DialogTransition}
                                >
                                    <AddFood handleClose={handleCloseAddFood} meal={selectedMeal}/>
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
                            <Grid item container direction='column'>
                                <MealsList handleMealAddFoodClick={handleMealAddFoodClick}/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>

        </Grid>
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
        if(context.datesFood){
        setBreakfast(context.datesFood.meals.filter(meal => {return meal.name === 'breakfast'})[0] || []);
        setLunch(context.datesFood.meals.filter(meal => {return meal.name === 'lunch'})[0] || []);
        setDinner(context.datesFood.meals.filter(meal => {return meal.name === 'dinner'})[0] || []);
        setSnacks(context.datesFood.meals.filter(meal => {return meal.name === 'snack'})[0] || []);
        }
    }, [context.datesFood]);
    // console.log(breakfast);
    // console.log(lunch);

    const mealListRender = (meal) => {
        // console.log(meal);
        return meal.map(food => {
            return (
                <List component='div' disablePadding>
                    <ListItem className={classes.nestedListItem}>
                        <ListItemText primary={food.label}/>
                    </ListItem>                    
                </List>
            )
        })
    };
    // console.log(context.datesFood);
    // console.log(breakfast);
    // console.log(lunch)
    return (
        <List>
                <ListItem className={classes.headerListItem}>
                    <ListItemText
                        primary='Breakfast'
                        secondary='calorie summary'
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
                <ListItem>
                    <ListItemText
                        primary='Lunch'
                        secondary='calorie summary'
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
                <ListItem>
                    <ListItemText
                        primary='Dinner'
                        secondary='calorie summary'
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
                        secondary='calorie summary'
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