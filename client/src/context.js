import React, {createContext} from 'react';
import axios from './config/axios';



export const UserContext = createContext({
    
    authenticated: false,
    authenticating: false,
    userData: {},
    getUserData: () => {},
    selectedDate: Date,  
    changeAuthenticated: () => {},
    changeAuthenticating: () => {},
    handleAuthentication: () => {},
    changeSelectedDate: ()=>{},
    
    
    
    logOut: () => {},
});

export class UserProvider extends React.Component {


    handleAuthentication = async (res, username) => {    

       

        if( res.status === 200){
            console.log('match');
            // this.setState({username: username});
            this.setState({authenticated: true});
            this.setState({authenticating: false});
            // probably get base user data here          
            
            
            
        }else {
            
        }
    };

    getUserData = () => {
        return axios.get('/api/user',{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => {
            console.log(res)
            this.setState({userData: res.data});
        });
    };

    changeSelectedDate = (date) => {
        console.log('changing selected date')
        this.setState({selectedDate: date}, () => {console.log(this.state.selectedDate)});
    };

    

    changeAuthenticated = () => {
        this.setState({authenticated: !this.state.authenticated});
    };

    changeAuthenticating = () => {
        this.setState({authenticating: !this.state.authenticating})
    };

    

    

    logOut = () => {
        // sessionStorage.removeItem('instant-messenger-jwt');
        this.setState({authenticated: false, authenticating: false, jwt: null, client: null});
        fetch('/api/auth/logout', {
            method: 'post'
        });
    }

    

    checkCookieJwt = async () => {

        fetch('/api/authentication/checkToken', {
            method: 'get',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
            }
        }).then(async authenticated => {
            console.log(authenticated);
            if(authenticated.status === 200){  
                console.log('check cookie jwt is legit')              
                // await this.initializeUserData();
                // await this.getConversationData();
                // await this.initializeWsClient();
                this.changeAuthenticated();
                this.changeAuthenticating();
            } else {                
                this.setState({authenticating: false});
                // sessionStorage.removeItem('instant-messenger-jwt');
            }
        })
    }

    componentDidMount = () => {

        this.setState({authenticating: true});
        this.checkCookieJwt();
    }

    state = {
        authenticated: false,
        authenticating: false,
        userData:{},
        changeAuthenticated: this.changeAuthenticated,
        changeAuthenticating: this.changeAuthenticating,
        handleAuthentication: this.handleAuthentication,
        getUserData: this.getUserData,
        logOut: this.logOut,
        changeSelectedDate: this.changeSelectedDate,
    }

    render(){
        return(
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
};

export const UserConsumer = UserContext.Consumer;