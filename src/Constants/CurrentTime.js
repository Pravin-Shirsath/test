


import React,{ useEffect , useState}  from 'react'


const CurrentTime = () => {
 const [state,setState]=useState("feching date and time...")








let Time;

    useEffect(()=>{
    Time = setInterval(() => {
         const dateobj = new Date()
         let str= dateobj.toString().split(" ")
         let  ModifiedDate = `${str[0]} ${str[1]} ${str[2]} ${str[3]} ${str[4]}`
          
          //  👇️️ Sat Sep 24 2022 07:30:14

           setState(ModifiedDate)
             
          
    }, 1000);

return ()=>clearInterval(Time)
    },[])
  return (
    <div >
         {state}
    </div>
  )
}

export default CurrentTime
