import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Authentication from '../Routes/Authentication/Authentication';
import RoutesContainer from '../RoutesContainer';
import {UserContext} from '../context';
import { Route } from 'react-router-dom';

const Container = props => {
    const context = useContext(UserContext);

    const renderView = () => {
        
        if(context.authenticated){
            return (
                <RoutesContainer />
            )
        } else if (context.authenticating){
            return (
                <div>Authenticating!</div>
            )
        } else {
            return (
            <Authentication />
            )
        }
    }
    
    return (
        <React.Fragment>
            {renderView()}
        </React.Fragment>
    );
};

Container.propTypes = {
    
};

export default Container;