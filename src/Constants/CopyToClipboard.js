    


import { NotificationManager } from 'react-notifications'


export const copyToClipboard =(text)=>{
    
    navigator.clipboard.writeText(text).then(function() {
   
  
      NotificationManager.success('Copying to clipboard was successful!')
    }, function(err) {
  
      NotificationManager.error("Could not copy text")
    });
 }