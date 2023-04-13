
import { NotificationManager } from 'react-notifications'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT_USER } from 'Store/Actions/types';
export const TokenExpiry = (history,dispatch) => {
    // const dispatch = useDispatch();
    
    // const history = useHistory();
   try {
    
    const checkCredentials = JSON.parse(localStorage.getItem('rememberMe'));

    // dispatch({ type: LOGOUT_USER });
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('isLoggedIn');
    localStorage.clear();

    localStorage.setItem('rememberMe', JSON.stringify(checkCredentials))
  
    NotificationManager.success('Session expired, Please login again!');
     history.push("/login")
   } catch (error) {
       console.log("error=",error)
   }
  
     
}

