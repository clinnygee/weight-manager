import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



 function FoodTable(props) {
  const classes = useStyles();

  const handleOpenDialog = (food) => {
    // props.openDialog()
    props.openDialog(food);
    // console.log(food);
  }

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="food-table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Calories / 100g</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.results.map((result) => (
            <TableRow key={result.food.foodId} onClick={() => {handleOpenDialog(result)}} id={result.food.foodId}>
              <TableCell component="th" scope="row">
                {result.food.label}
              </TableCell>
              <TableCell align="right">{(result.food.nutrients.ENERC_KCAL) ? (result.food.nutrients.ENERC_KCAL).toFixed(1) : null}</TableCell>
              <TableCell align="right">{(result.food.nutrients.FAT) ? (result.food.nutrients.FAT).toFixed(1) : null}</TableCell>
              <TableCell align="right">{(result.food.nutrients.CHOCDF) ? (result.food.nutrients.CHOCDF).toFixed(1):null}</TableCell>
              <TableCell align="right">{(result.food.nutrients.PROCNT) ? (result.food.nutrients.PROCNT).toFixed(1) : null}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};



FoodTable.propTypes = {
    
};

export default FoodTable;