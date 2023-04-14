import React, { useEffect,useState } from 'react';
import { useHistory } from 'react-router';


const CustomBreadcrumbs = ({ currentPage, data =[] ,props}) => {

const [navData,setNavData]=useState(data)


useEffect(()=>{

},[])

  const history = useHistory();
      console.log(data,"daaata..")
  
  const HandleNavigate = async (item,index)=>{
    // const Data = [...navData]
    let myarray=[]
    // console.log(index,"Data=",Data)


     for (let i = 0; i < index; i++) {
       
      myarray.push(data[i])
     }
console.log(myarray,"myarray")
    
    history.push(item.url,{breadcrumbData:myarray})
  }

  return (
    <div className="page-title d-flex  align-items-center">
      {data != undefined  && data.length > 0 &&data.map((item, index) => (
        <div key={index} className="page-title-wrap  d-flex  align-items-center mr-1">
          
        <i className="ti-angle-left text-dark m-0 custombredcrum-icon"></i> <span onClick={()=>HandleNavigate(item,index)} className="globalFontFamily custombredcrum-heding">{item.name}</span>
         
        </div>
      ))}
      <div className="page-title-wrap   d-flex  align-items-center text-white m-0"><i className="ti-angle-left m-0 text-white custombredcrum-icon"></i><span className="globalFontFamily custombredcrum-heding">{currentPage}</span></div>
    </div>
  );
};

export default CustomBreadcrumbs;
