import React, {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, useHistory} from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Container, AppBar, Toolbar} from '@material-ui/core'
import {makeStyles, createMuiTheme} from '@material-ui/core/styles';
// import {FastFoodOutlinedIcon, CalendarTodayOutlinedIcon, InsertChartOutlinedIcon, SettingsApplicationsOutlinedIcon} from '@material-ui/icons';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import SpeedOutlinedIcon from '@material-ui/icons/SpeedOutlined';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';

import {UserContext} from '../context';
import Diary from '../Routes/Diary'
import Settings from '../Routes/Settings';
import Stats from '../Routes/Stats';
import Trends from '../Routes/Trends'
import moment from 'moment';

import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

import 'moment';
import createPalette from '@material-ui/core/styles/createPalette';

const RoutesContainer = props => {
    const context = useContext(UserContext);
    const [awaiting, setAwaiting] = useState(true);

    useEffect(() => {
        context.getUserData().then(result => {
            setAwaiting(false);
        });
    },[]);

    
    return (
        <React.Fragment>
            <TopBarDatePicker />
            <Navigation />
            <Container maxWidth='md' style={{marginBottom: '60px'}}>
                {awaiting ? <p>awaiting</p>: 
                    <Switch>
                
                    <Route path='/trends'>
                        <Trends />
                    </Route>
                    <Route path='/stats'>
                        <Stats />
                    </Route>
                    <Route path='/settings'>
                        <Settings />
                    </Route>
                    <Route exact path='/'>
                        <Diary />
                    </Route>
                    </Switch>
                }
            
            </Container>
        </React.Fragment>
        
    );
};

RoutesContainer.propTypes = {
    
};

const useStyles = makeStyles({
    top: {
        position: 'fixed',
        bottom: '0',
        background: 'inherit',
        width: '100%',
        zIndex: 100,
    },
    zIndex:{
        zIndex: 100,
    }
})
const Navigation = props => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const history = useHistory();
    

    function handleNavigation(newValue){
        if(newValue === 0){
            history.push('/');
        } else if(newValue === 1){
            history.push('/trends')
        } else if(newValue === 2){
            history.push('/stats')
        } else if(newValue === 3){
            history.push('/settings')
        }
    }
    return (
        <BottomNavigation
        value = {value}
        onChange={(event, newValue) => {
            console.log(newValue)
            setValue(newValue);
            handleNavigation(newValue)
        }}
        showLabels
        className={classes.top}
        color='primary'
        // className={classes.zIndex}
        >
            <BottomNavigationAction label='Diary' icon={<CalendarTodayOutlinedIcon/>} />
            <BottomNavigationAction label='Trends' icon={<InsertChartOutlinedIcon />} />
            <BottomNavigationAction label='Stats' icon={<SpeedOutlinedIcon />} />
            <BottomNavigationAction label='Settings' icon={<SettingsApplicationsOutlinedIcon />} />
        </BottomNavigation>
    )
};

const barStyles = makeStyles({
    flexCenter:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'center',
    },
    input: {
        color: '#fff',
    }
});

const muiTheme = createMuiTheme({
    palette: createPalette({

    })
})

const TopBarDatePicker = props => {
    const classes = barStyles();
    const [date, setDate] = useState(new Date());
    const [dateError, setDateError] = useState(false);
    const context = useContext(UserContext);

    // useEffect(() => {
    //     console.log('in routes contianer use effect')
    //     context.changeSelectedDate(moment().format('DD/MM/yyyy'));
    // },[])

    const handleDateChange = date => {
        console.log(date.format());
        setDate(date);
        context.changeSelectedDate(date.format('DD/MM/yyyy'));
        
    };
    return (
        <AppBar position='static'>
            <Toolbar className={classes.flexCenter} variant='dense'>
                <MuiPickersUtilsProvider utils={MomentUtils} className={classes.input}>
                    <KeyboardDatePicker
                        color='primary'
                        margin="normal"
                        id="date-picker-dialog"
                        
                        format="DD/MM/yyyy"
                        value={date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'select date',
                        }}
                        className={classes.input}
                    />
                </MuiPickersUtilsProvider>
            </Toolbar>
        </AppBar>
    )
}

export default RoutesContainer;