import React, {createContext} from 'react';
import axios from './config/axios';
import moment from 'moment';



export const UserContext = createContext({
    
    authenticated: false,
    authenticating: false,
    userData: {},
    datesFood: {},
    tdei: 0,
    setTdei: () => {},
    insertDaysFood:() => {},
    setDatesFood: () => {},
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
            this.setState({userData: res.data},() => {
                this.setTdei();
                this.changeSelectedDate(moment().format('DD/MM/yyyy'));
            });
            
        });
    };
    // tdei = total daily energy intake
    setTdei = () => {
        // oneKg of weight change = 37000kj
        const oneKg = 37000;
        console.log(this.state.userData.goals[0].change);
        let requiredKilojouleDeviation = this.state.userData.goals[0].change !== 0 ? (oneKg * this.state.userData.goals[0].change) / 7 : 0;
        console.log(requiredKilojouleDeviation)
        requiredKilojouleDeviation *= this.state.userData.goals[0].weightChange === 'Lose' ? -1 : 1;
        console.log(this.state.userData.goals[0].weightChange )

        // let intake = this.state.userData.setting.tdee

        console.log(requiredKilojouleDeviation);
        this.setState({tdei: Math.floor(this.state.userData.setting.tdee + requiredKilojouleDeviation)});


    }

    insertDaysFood = (daysfood) => {
        console.log(this.state.userData);
        let dataToUpdate = this.state.userData;
        /* eslint-disable */
        dataToUpdate.daysfoods?.forEach(daysfoods => {
            console.log(daysfoods.id === daysfood.id);
            if(daysfoods.id === daysfood.id){
                daysfoods.meals = daysfood.meals;
            };
             
        });
        // When this updates, it needs to change what is displayed, currently it only changes the food that is stored.
        console.log(dataToUpdate);
        
        /* eslint-enable */
        this.setState({userData: {...dataToUpdate}},() => {this.setDatesFood();});
    }

    changeSelectedDate = (date) => {
        console.log('changing selected date')
        this.setState({selectedDate: date}, () => {this.setDatesFood()});
    };

    setDatesFood = () => {
        
        console.log(this.state.userData)
        let foundDatesFood = this.state.userData.daysfoods.filter((daysfood => {
            return daysfood.date === this.state.selectedDate;
        }));
        console.log(foundDatesFood)
        this.setState({datesFood: {...foundDatesFood[0]}})
        
        // console.log(foundDatesFood)
    }

    

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
        datesFood: {},
        tdei: 0,
        setTdei: this.setTdei,
        insertDaysFood: this.insertDaysFood,
        setDatesFood: this.setDatesFood,
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