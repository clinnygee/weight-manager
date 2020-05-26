import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {AppBar, Toolbar, IconButton,
        Typography, Container, makeStyles,
        Grid, Input, InputAdornment, TextField,
        OutlinedInput, Radio, FormControl, FormLabel,
        RadioGroup, FormControlLabel, InputLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button}
         from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search';

import {searchFoodById, getFoodMeasurements} from './api';
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
        searchFoodById(category, search, brand).then(res => {
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
                <Grid container direction='column' alignContent='center'>
                    <CategorySelect value={category} handleChange={handleCategorySelect}/>
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
                    {results ? <FoodTable results={results} openDialog={handleOpenDialog}/> : null}
                    {openDialog ? <FoodSubmit closeDialog={handleCloseDialog} food={selectedFood}/> : null}
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

function FoodSubmit({closeDialog, food}){
    // const [awaiting, setAwaiting] = useState(true);
    console.log(food)
    useEffect(() =>{
        getFoodMeasurements(food.food.foodId).then(res => {
            console.log(res);
        })
    }, []);
    return(
        <Dialog open onClose={closeDialog} aria-labelledby=''>
            <DialogTitle id='Food Submit'></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Select A measurement, and how many servings then submit!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Close</Button>
                <Button onClick={closeDialog}>Add Food</Button>
            </DialogActions>
        </Dialog>
    )
}



AddFood.propTypes = {
    
};

{/*  */}
export default AddFood;