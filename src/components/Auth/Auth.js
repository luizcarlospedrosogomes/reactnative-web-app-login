import { AsyncStorage } from 'react-native';
import { isWeb} from '../../helpers';


export const isSignedIn = async () => {
  let token = false;
  if(!isWeb){  
   token = await AsyncStorage.getItem(token);

   }else{
    token = localStorage.getItem('token');
   }
  return (token !== null) ? true : false;
};