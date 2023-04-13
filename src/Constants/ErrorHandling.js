


import { NotificationManager } from 'react-notifications'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT_USER } from 'Store/Actions/types';
import { TokenExpiry } from './TokenExpiry';


export const ErrorHandling = (err,history) => {
     if(err?.response?.status){
       
    
    if (err?.response?.status === 403 || err?.response?.status === 400) {
        if (err?.response?.data) {
            let data = err?.response?.data

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    NotificationManager.error(data[key]);
                    console.log(key + " -> " + data[key]);
                }
            }

        }
    }

    if (err?.response?.status === 406) {
        if (err?.response?.data) {
            let data = err?.response?.data?.message
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    NotificationManager.error(`${key}:${data[key][0]}`);
                    // console.log(key + " -> " + data[key]);
                }
            }
        }
    }

    // Internal server error
    if (err?.response?.status === 500) {
        NotificationManager.error(`Internal Server Error`);

        // if (err?.response?.data) {
        //     let data = err?.response?.data

        //     for (var key in data) {
        //         if (data.hasOwnProperty(key)) {
        //             NotificationManager.error(data[key]);
        //             console.log(key + " -> " + data[key]);
        //         }
        //     }

        // }
    }

    // Invalid Token OR token Expired
    if (history) {

        if (err?.response?.status === 401) {
            if (err?.response?.data) {
                let data = err?.response?.data

                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        NotificationManager.error(data[key]);
                        TokenExpiry(history)
                        console.log(key + " -> " + data[key]);
                    }
                }

            }
        }
    }else{
         
        // only showing message
         
        if (err?.response?.status === 401) {
            if (err?.response?.data) {
                let data = err?.response?.data

                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        NotificationManager.error(data[key]);
                       
                        console.log(key + " -> " + data[key]);
                    }
                }

            }
        }
    }

}else{
    if(err?.message){

        NotificationManager.error(err?.message);
    }
}
}