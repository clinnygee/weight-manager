import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

import BarChartIcon from '@material-ui/icons/BarChart';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <EventNoteIcon style={{width: 'auto', height: '3em'}} />
              <Typography variant="h6" className={classes.title}>
                Log what you eat
              </Typography>
              <Typography variant="h5">
                {"Search for common foods, we leverage the EdamamApi to give you access to 10000's of meals and ingredients"}
                {', Get caloric targets by entering your biometrics and what your current weight change goal is.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <BarChartIcon style={{width: 'auto', height: '3em'}}/>
              <Typography variant="h6" className={classes.title}>
                Track your progress
              </Typography>
              <Typography variant="h5">
                {"You will get graphs that show how your tracking with your goals."}
                {'See how your energy intake changes over time.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <FastfoodIcon style={{width:'auto', height:'3em'}} />
              <Typography variant="h6" className={classes.title}>
                Exclusive rates
              </Typography>
              <Typography variant="h5">
                {'Enable yourself to make smarter food choices and eat guilt free!'}
                {'As long as you stick within your caloric goal, you can enjoy any food that you desire.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
