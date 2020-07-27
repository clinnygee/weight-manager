import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {UserProvider} from '../context';
import {UserConsumer} from '../context';
import CssBaseLine from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button';

import Container from '../Container'
import Landing from '../Routes/Landing/Landing'
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
            <Switch>
              <Route path='/app'>
                <Container />
              </Route>
              <Route exact path='/'>
                <Landing />
              </Route>
            </Switch>
            
          </React.Fragment>          
        )}
        </UserConsumer>
        {/* </ThemeProvider> */}
      </UserProvider>
    </Router>  
    
    
   
  );
}

export default App;
