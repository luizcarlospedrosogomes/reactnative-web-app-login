import { Component } from 'react';
import {AsyncStorage,} from 'react-native';
import { isWeb } from '../../helpers';

class Logout extends Component {
    componentWillMount() {
        if(isWeb){
            localStorage.removeItem('token');
        }else{
            AsyncStorage.removeItem('token');
        }
        this.props.history.push('/login');
    }
    render(){
        return null;
    }
} 

export default Logout;