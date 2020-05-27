import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';

import {AppBar, Toolbar, IconButton,
        Typography, Container, makeStyles,
        Grid, Input, InputAdornment, TextField,
        OutlinedInput, Radio, FormControl, FormLabel,
        RadioGroup, FormControlLabel, InputLabel, Dialog, DialogTitle, 
        DialogContent, DialogContentText, DialogActions, Button,
        Select, MenuItem
        }
         from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search';

import {UserContext} from '../../../context';
import {searchFoodById, getFoodMeasurements, addFood} from './api';
import FoodTable from './FoodTable'

const useStyles = makeStyles((theme) =>({
    appBar:{
        position: 'relative',
    },
    container:{
        padding: theme.spacing(2),
        // paddingTop: theme.spacing(2),
    },
    radioGroup: {
        flexDirection: 'row',
    },
    input: {
        margin: theme.spacing(1),
    }
}))

const AddFood = props => {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('packaged-foods');
    const [brand, setBrand] = useState('');
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const context = useContext(UserContext);

    console.log(props);

    console.log(context.selectedDate)

    const handleSearchChange = e => {
        
        setSearch(e.target.value)
        console.log(search);
    };

    const handleCategorySelect = e => {
        console.log(e.target.value);
        setCategory(e.target.value);
    };
    
    const handleBrandChange = e => {
        setBrand(e.target.value)
        console.log(brand);
    };

    const handleSearchSubmit = e => {
        searchFoodById(category, search).then(res => {
            console.log(res)
            setResults(cleanEdemamApiSearch(res.data.hints));
        })
        console.log(search)
        // add logic here to get the search results from api
        
    };

    const handleOpenDialog = (food) => {
        // set the data to be passed to dialog
        console.log('in open dialog')
        setSelectedFood(food);
        setOpenDialog(true);
    };
    const handleCloseDialog = e => {
        // remove the data that is to be passed to dialog
        setOpenDialog(false);
    }
    return (
        <React.Fragment>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6">
                  Add Food
                </Typography>


              </Toolbar>
            </AppBar>
            <Container maxWidth='md' py={2} className={classes.container}>
                {/* This is the category select */}
                <Grid container direction='column' alignContent='center'>
                    <CategorySelect value={category} handleChange={handleCategorySelect}/>
                    {/* This is the search bar */}
                <OutlinedInput
                    className={classes.input}
                    variant='outlined'
                    id="food-search"
                    type='text'
                    value={search}
                    onChange={handleSearchChange}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="search-submit"
                            onClick={handleSearchSubmit}
                            
                            >
                                <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                    }
                />
               
                
                <Grid container direction='column' alignContent='center'>
                    {/* This displayes the results of the search,each search item can be clicked and it will
                        open a dialog, which allows you to choose serving and quantity
                    */}
                    {results ? <FoodTable results={results} openDialog={handleOpenDialog}/> : null}
                    {openDialog ? <FoodSubmit closeDialog={handleCloseDialog} food={selectedFood} meal={props.meal}/> : null}
                </Grid>
                </Grid>
            </Container>
            
        </React.Fragment>
        
        
    );
};

const CategorySelect = props => {
    const classes = useStyles();

    return(
        <FormControl component="fieldset">
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup aria-label="category" name="category-select" value={props.value} onChange={props.handleChange} className={classes.radioGroup}>
            <FormControlLabel value="generic-foods" control={<Radio />} label="Generic Food" />
            <FormControlLabel value="generic-meals" control={<Radio />} label="Generic Meal" />
            <FormControlLabel value="packaged-foods" control={<Radio />} label="Packaged Food" />
            <FormControlLabel value="fast-foods" control={<Radio />} label="Fast Food" />
          </RadioGroup>
        </FormControl>
    )
};

function cleanEdemamApiSearch(results){


    const cleanResults = results.filter(result => {
        return (result.food.nutrients.CHOCDF && result.food.nutrients.ENERC_KCAL && result.food.nutrients.FAT && result.food.nutrients.PROCNT)
    })

    return cleanResults;

};

function FoodSubmit({closeDialog, food, meal}){
    const [awaiting, setAwaiting] = useState(true);
    const [measurements, setMeasurements] = useState([]);
    const [selectedMeasurement, setSelectedMeasurement] = useState('');
    const [quantity, setQuantity ] = useState(1);
    const context = useContext(UserContext);
    console.log(food)
    
    useEffect(() =>{
        getFoodMeasurements(food.food.foodId, food.measures[0]).then(res => {
            let tempMeasurements = cleanFoodMeasurement(res.data);
            setMeasurements(tempMeasurements);
            setSelectedMeasurement(tempMeasurements[0].measurement);
            setAwaiting(false);
            console.log(res);
        })
    }, []);

    function handleMeasurementChange(e){
        setSelectedMeasurement(e.target.value)
    };

    const handleFoodSubmit = (e) => {
        e.preventDefault();
        const food = measurements.filter(measurement => {
            return measurement.measurement === selectedMeasurement;
        });

        const submittableFood = {date: context.selectedDate, meal: meal,quantity: quantity, food: food[0]};
        console.log(submittableFood)

        addFood(submittableFood).then(res => {
            console.log(res);
        })
    }
    return(
        <Dialog open onClose={closeDialog} aria-labelledby=''>
            <DialogTitle id='Food Submit'>{food.food.label}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Select a measurement, and a quantity
                </DialogContentText>
                {awaiting ? null :
                <React.Fragment>
                <FormControl style={{width: '100%', maxWidth: '300px', justifySelf:'center'}} >
                        <InputLabel id='measurement-change'>Measurement</InputLabel>
                        <Select
                            labelId='measurement-change'
                            value={selectedMeasurement}
                            onChange={handleMeasurementChange}
                        >   
                        {measurements.map(measurement => {
                            return <MenuItem value={measurement.measurement}>{measurement.measurement}</MenuItem>
                        })}
                            
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id='quantity'>Quantity</InputLabel>
                        <Input value={quantity} type='number' onChange={(e) => {setQuantity(e.target.value)}}/>
                    </FormControl>
                    </React.Fragment>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Close</Button>
                <Button onClick={handleFoodSubmit}>Add Food</Button>
            </DialogActions>
        </Dialog>
    )
};

function cleanFoodMeasurement(array){
    array.forEach(measurement => {
        measurement.measurement = measurement.ingredients[0].parsed[0].measure;
        measurement.weight = measurement.ingredients[0].parsed[0].retainedWeight;
    })

    return array;
}



AddFood.propTypes = {
    
};

{/*  */}
export default AddFood;