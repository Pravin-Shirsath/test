// Get Formatted Time
export const getFormatTime=(date)=>{
    let Sort= date.toString().replace(/T/, ' ').replace(/\..+/, '').split(" ")   
   var time =Sort[1].toString()
  
      function tConvert (time) {
       // Check correct time format and split into components
          time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
       if (time.length > 1) { 
         time = time.slice (1);
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; 
         time[0] = +time[0] % 12 || 12; 
           time.splice(3, 1," "); 
       }
         return time.join (''); 
      }
       return tConvert(time)
  } 

  // Get Formatted Date
  export const getFormatDate=(date)=>{
      if(date){
        let Sort= date.toString().replace(/T/, ' ').replace(/\..+/, '').split(" ")   
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const d = new Date(Sort[0]);
         let month = months[d.getMonth()];
         let year= d.getFullYear();
         let date2=d.getDate()
        return date2+" "+month+" "+year
      }else{
          return ""
      }
  
 } 
 
 export const getFormatDate2=(date)=>{
    if(date){
      let Sort= date.toString().replace(/T/, ' ').replace(/\..+/, '').split(" ")   
      return Sort[0]
    
    }else{
        return ""
    }

} 
