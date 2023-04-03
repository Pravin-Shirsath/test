const eventBus = {
  
  
    on(event, callback) {
      // console.log("callback from add event",(e)=>callback(e.detail))
      document.addEventListener(event, (e) => callback(e.detail));
    },
    dispatch(event, data) {
      document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event,callback) {
      // console.log("Event",event,"callBACk",callback)
      
      // console.log("from removeEvent")

      // callback=()=>(console.log("Removed event!"))  
      // console.log("newCALLBACK",callback)  
     
      document.removeEventListener(event, callback);
  
    },

  };
  
  export default eventBus;  