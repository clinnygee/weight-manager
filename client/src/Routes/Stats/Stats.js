import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Paper, List, ListItem, ListItemText, ExpansionPanel, ExpansionPanelSummary, Typography } from '@material-ui/core';
import { UserContext } from '../../context';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
        flexDirection: 'column',
        padding: theme.spacing(1)
    },
    paper:{
        width: '100%',
        height: '100%',
        padding: theme.spacing(0),
    },
    panelHeader:{
        width: '100%',
        padding: theme.spacing(0),
    },
    heading:{
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,  
    },
    secondaryHeading:{
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    }
}))

const Stats = props => {
    const context = useContext(UserContext);
    const classes = useStyles();
    const age = useAge();
    const gender = context.userData.male ? 'Male': 'Female';
    const weight = context.userData.weights[0].weight;
    const height = context.userData.bodymeasurements[0].height;
    const bmr = context.userData.setting.bmr;
    const activityLevel = context.userData.setting.activityLevel;
    const TDEE = context.userData.setting.tdee;
    const tdei = context.tdei;
    const bmiText = useBmi();
    const bfText = useBf();
    return (
        <Grid container className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container direction='column'>
                    <ExpansionPanel className={classes.panelHeader}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='summary-of-settings'
                            id='summary-of-settings-expansion-header'
                        >
                            <Typography className={classes.heading}>Profile</Typography>
                            <Typography className={classes.secondaryHeading}>Summary of Stats</Typography>
                        </ExpansionPanelSummary>
                        <List >
                        <ListItem divider>
                            <ListItemText primary='Age' secondary={age} />
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary='Gender' secondary={gender} />
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary='Weight' secondary={weight} />
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary='Height' secondary={height} />
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary='BMR' secondary={bmr} />
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary='Activity Level' secondary={activityLevel} />
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary='TDEE' secondary={TDEE} />
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary='Daily Kj Goal' secondary={tdei} />
                        </ListItem>
                        
                    </List>
                    </ExpansionPanel>
                    <ExpansionPanel className={classes.panelHeader}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='derived-stats'
                            id='derived-stats-header'
                        >
                            <Typography className={classes.heading}>Derived Stats</Typography>
                            <Typography className={classes.secondaryHeading}>Derived from Stats</Typography>
                        </ExpansionPanelSummary>
                            <List >
                                <ListItem>
                                    <ListItemText primary='BMI' secondary={bmiText} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary='Body Fat (estimate)' secondary={`${bfText}%`} />
                                </ListItem>                               
                                
                            </List>
                    </ExpansionPanel>
                    <List>

                    </List>
                </Grid>
            </Paper>
        </Grid>
    );
};


function useAge(){
    const context = useContext(UserContext);
    const [age, setAge] = useState(0);
    const now = new Date();
    const birthdate = new Date(context.userData.birthdate);
    useEffect(() => {
        let yearsDiff = now.getFullYear() - birthdate.getFullYear()
        console.log(yearsDiff);
        setAge(yearsDiff);
    }, [context.userData.birthdate])

    return age;
};

Stats.propTypes = {
    
};

function useBf(){
    const context = useContext(UserContext);
    const [bf, setBf] = useState(0);
    const height = context.userData.bodymeasurements[0].height;
    const navel = context.userData.bodymeasurements[0].naval;
    const neck = context.userData.bodymeasurements[0].neck;
    console.log(`${height} + ${neck} + ${navel}`)
    useEffect(() => {
        setBf((495 / (1.0324 - 0.19077 * Math.log10(navel-neck) + 0.15456 * Math.log10(height))) - 450);
    }, [context.userData.male, context.userData.bodymeasurements]);

    return bf.toFixed(2);
};

function useBmi(){
    const context = useContext(UserContext);
    const [bmi, setBmi] = useState(0);
    const heightInMetres = context.userData.bodymeasurements[0].height / 100;
    const weight = context.userData.weights[0].weight;

    useEffect(() => {
        setBmi(weight / ((heightInMetres * heightInMetres)))
    }, [heightInMetres, weight]);
    return bmi.toFixed(2);
}

export default Stats;