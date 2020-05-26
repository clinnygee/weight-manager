import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {UserProvider} from '../context';
import {UserConsumer} from '../context';
import CssBaseLine from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button';

import Container from '../Container'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';



const theme = createMuiTheme({
  palette:{
    type: 'dark'
  }
});

function App() {
  return (
    <Router>
      <UserProvider>
        {/* <ThemeProvider theme={theme}> */}
        <UserConsumer>{value => (
          <React.Fragment>
            <CssBaseLine />
            {/* <Button variant='contained' color='secondary'>Test</Button >
            <div>yoooo</div> */}
            <Container />
          </React.Fragment>          
        )}
        </UserConsumer>
        {/* </ThemeProvider> */}
      </UserProvider>
    </Router>  
    
    
   
  );
}

export default App;
