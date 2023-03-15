import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import {  useHistory } from 'react-router-dom';
import { scnerioPlanningPostData, getAdminList  } from 'Api';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import {
   Label,
} from 'reactstrap';
import "../../../../Assets/css/main.css"
import Chart from "react-apexcharts";
import scnerioData from "./scenario-planning.json";
import { NotificationManager } from 'react-notifications';




export default function SaasDashbaord(props) {
   const history = useHistory();
   const { match } = props;


   //=== Data without Unnamed Object =====//
   const [jsonData] = useState();


   const [yAxisTestData] = useState()

   const [seriesData, setSeriesData] = useState([]);
   const [periodsdata, setPeriodsData] = useState([]);
   const [salesData, setSalesData] = useState([]);

   // below state is getting used in react range slider
   const [volume, setVolume] = useState(0);
   const [tvsVolume, setTvsVOlume] = useState(0);
   const [oohVolume, setOohVolume] = useState(0);
   const [printVolume, setprintVolume] = useState(0);
   const [searchVolume, setsearchVolume] = useState(0);
   const [facebookVolume, setfacebookVolume] = useState(0);
   const [initialState,setInitialState] = useState(true)

   //===== Chartdata for Apexcharts =======//
   const chartData = {
      series: [...seriesData],
      options: {
         title: {
            text: "Sales Forecast",
            align: 'center',
            margin: 30,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
               fontSize: '17px',
               fontWeight: 'bold',
               fontFamily: undefined,
               color: '#263238',
            },
         },
         chart: {
            type: 'line',
            height: "auto",
            width: '100%',
            stacked: true,
            stackType: 'normal', 
            tools: {
               download: true,
               selection: true,
               zoom: false,
               zoomin: true,
               zoomout: true,
               pan: true,
               reset: true | '<img src="/static/icons/reset.png" width="20">',
               customIcons: []
            },
          
            zoom: {
               enabled: true,
               type: 'x',
               autoScaleYaxis: false,
               zoomedArea: {
                  fill: {
                     color: '#90CAF9',
                     opacity: 0.4
                  },
                  stroke: {
                     color: '#0D47A1',
                     opacity: 0.4,
                     width: 1
                  }
               },
               resetIcon: {
                  offsetX: -10,
                  offsetY: 0,
                  fillColor: '#fff',
                  strokeColor: '#37474F'
               },
              
            }
         },
         responsive: [{
            breakpoint: 480,
            options: {
               legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
               }
            }
         }],
         plotOptions: {
            bar: {
               horizontal: false,
               dataLabels: {
                  enabled: false,
                
               },
            },
         },
         xaxis: {
            type: 'line',
            tickPlacement: 'on',
            show: true,
            labels: {
               rotate: -90,
               offsetY: 2,
               formatter: function (value) {
                  if (value !== undefined)
                     return value % 2 == 1 ? value : "";
               }
            },
            categories: [...periodsdata],
            title: {
               text: "Period",
               align: 'center',
               offsetX: 0,
               offsetY: 110,
               style: {
                  color: "#000",
                  fontSize: '12px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  cssClass: 'apexcharts-xaxis-title',
               },
            },
         },
         yaxis: {
            type: 'line',
            categories: [...periodsdata],
            labels: {
               formatter: function (value) {
                  if (value !== undefined)
                     return Number(value).toFixed(2);
               }
            },
            title: {
               text: "Sales",
               align: 'center',
               margin: 20,
               offsetX: 0,
               offsetY: 0,
               style: {
                  color: "#000",
                  fontSize: '12px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  cssClass: 'apexcharts-xaxis-title',
               },
            },
         },
         legend: {
            position: 'bottom',
            height: 30,
         },
         dataLabels: {
            enabled: false,
         },
         colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', "#9627b0"],
         fill: {
            colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', "#9627b0"],
            opacity: 1
         },

         markers: {
            colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', "#9627b0"],
         },
   
      }
   };

   const plotJson = [
      [2754371.667, "11/23/2015"],
      [2584276.667, "11/30/2015"],
      [2547386.667, "12/7/2015"],
      [2875220, "12/14/2015"],
      [2215953.333, "12/21/2015"],
      [2569921.667, "12/28/2015"],
      [2171506.667, "1/4/2016"],
      [2464131.667, "1/11/2016"],
      [2012520, "1/18/2016"],
      [1738911.667, "1/25/2016"],
      [1772306.667, "2/1/2016"],
      [1809058.333, "2/8/2016"],
      [1952740, "2/15/2016"],
      [1507805, "2/22/2016"],
      [1510391.667, "2/29/2016"],
      [1588840, "3/7/2016"],
      [1605990, "3/14/2016"],
      [1356010, "3/21/2016"],
      [2103936.667, "3/28/2016"],
      [1120835, "4/4/2016"]
    ];

   const chartRealData = {
      series: [{
         name: 'Revenue',
         data: plotJson
       }],
      options: {
         title: {
            text: "Sales Forecast",
            align: 'center',
            margin: 30,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
               fontSize: '17px',
               fontWeight: 'bold',
               fontFamily: undefined,
               color: '#263238',
            },
         },
         chart: {
            type: 'line',
            height: "auto",
            width: '100%',
            stacked: true,
            stackType: 'normal', 
            tools: {
               download: true,
               selection: true,
               zoom: false,
               zoomin: true,
               zoomout: true,
               pan: true,
               reset: true | '<img src="/static/icons/reset.png" width="20">',
               customIcons: []
            },
          
            zoom: {
               enabled: true,
               type: 'x',
               autoScaleYaxis: false,
               zoomedArea: {
                  fill: {
                     color: '#90CAF9',
                     opacity: 0.4
                  },
                  stroke: {
                     color: '#0D47A1',
                     opacity: 0.4,
                     width: 1
                  }
               },
               resetIcon: {
                  offsetX: -10,
                  offsetY: 0,
                  fillColor: '#fff',
                  strokeColor: '#37474F'
               },
              
            }
         },
         responsive: [{
            breakpoint: 480,
            options: {
               legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
               }
            }
         }],
         plotOptions: {
            bar: {
               horizontal: false,
               dataLabels: {
                  enabled: false,
                
               },
            },
         },
         xaxis: {
            type: 'line',
            tickPlacement: 'on',
            show: true,
            labels: {
               rotate: -90,
               offsetY: 2,
               formatter: function (value) {
                  if (value !== undefined)
                     return value % 2 == 1 ? value : "";
               }
            },
            categories: [...periodsdata],
            title: {
               text: "Period",
               align: 'center',
               offsetX: 0,
               offsetY: 110,
               style: {
                  color: "#000",
                  fontSize: '12px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  cssClass: 'apexcharts-xaxis-title',
               },
            },
         },
         yaxis: {
            type: 'line',
            // categories: plotJson.map(dataPoint => dataPoint.y),
            labels: {
               formatter: function (value) {
                  if (value !== undefined)
                     return Number(value).toFixed(2);
               }
            },
            title: {
               text: "Revenue",
               align: 'center',
               margin: 20,
               offsetX: 0,
               offsetY: 0,
               style: {
                  color: "#000",
                  fontSize: '12px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  cssClass: 'apexcharts-xaxis-title',
               },
            },
         },
         legend: {
            position: 'bottom',
            height: 30,
         },
         dataLabels: {
            enabled: false,
         },
         colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', "#9627b0"],
         fill: {
            colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', "#9627b0"],
            opacity: 1
         },

         markers: {
            colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', "#9627b0"],
         },
   
      }
   };

   useEffect(() => {

      const accessToken = JSON.parse(localStorage.getItem('token'))
     
      //conditional rendering

      // if (accessToken !== null) {
      //    getAdminList(accessToken, "1")
      //       .then((res) => {
      //          if (res?.status === 200) {
      //          }
      //       })
      //       .catch((err) => {
      //          if (err?.response?.status == 401) {
      //             localStorage.clear();
      //             history.push("/signin")
      //          } else {
      //          }
      //       })
      // } else {
      //    localStorage.clear();
      //    history.push("/signin")
      // }
    
   }, [])


   const sendGraphData = () => {
      const accessToken = JSON.parse(localStorage.getItem('token'))

      //   conditional rendring

      // console.log(accessToken)
      // if (accessToken !== null) {
      //    scnerioPlanningPostData(accessToken, scnerioData)
      //       .then((res) => {
      //          if (res?.status === 200) {
      //             NotificationManager.success("Run Successfully !!")
      //             console.log("response from scenrio--planiing",res)
                  
      //             setSeriesData(res?.data);
      //             setInitialState(false);
      //          }
      //       })
      //       .catch((err) => {
      //          if (err?.response?.status == 401) {
                 
      //          } else {
      //          }
      //       })
      // } else {
      //    localStorage.clear();
      //    history.push("/signin")
      // }
   }


   // Functions getting used in react range slider
   const handleOnChange = (value) => {
      setVolume(value)
   }

   const handleTvsOnChange = (value) => {
      setTvsVOlume(value)
   }

   const handleOohOnChange = (value) => {
      setOohVolume(value)
   }

   const handlePrintOnChange = (value) => {
      setprintVolume(value)
   }

   const handleSearchOnChange = (value) => {
      setsearchVolume(value)
   }

   const handleFacebookOnChange = (value) => {
      setfacebookVolume(value)
   }

   return (
      <div className="saas-dashboard">
         <Helmet>
            <title>Automaton Dashboard</title>
            <meta name="description" content="Automaton Sass Dashboard" />
         </Helmet>

         <RctCollapsibleCard>
            <div className='w-100 px-3 py-2' style={{ position: "relative" }}>

               <div className='p-3 w-100' style={{ height: "100%" }}>

                  {
                     initialState ? <Chart
                     options={chartData.options}
                     series={chartData.series}
                     type="line"
                     height={600}
                     colors={chartData.colors}
                  /> : <Chart
                  options={chartRealData.options}
                  series={chartRealData.series}
                  type="line"
                  height={600}
                  colors={chartRealData.colors}
               />
                  }
                  

               

                  <div className='mt-4'>
                     <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}} className="mb-4" >


                        <div style={{display:'flex',alignItems:'center',gap:'35px'}}>
                           <Label className='mb-0' style={{ color: "#0b3d45", width:'100px' }}>TVS</Label>
                              <Slider
                                 min={-10}
                                 max={10}
                                 step={1}
                                 value={tvsVolume}
                                 orientation={"horizontal"}
                                 // reverse={Boolean}
                                 // tooltip={Boolean}
                                 // labels={Object}
                                 // handleLabel={String}
                                 // format={Function}
                                 // onChangeStart={Function}
                                 onChange={handleTvsOnChange}
                              />
                        </div>

                        <div style={{display:'flex',alignItems:'center',gap:'35px'}}>
                           <Label className='mb-0' style={{ color: "#0b3d45",width:'100px' }}>OOh_S</Label>
                              <Slider
                                 min={-10}
                                 max={10}
                                 step={1}
                                 value={oohVolume}
                                 orientation={"horizontal"}
                                 // reverse={Boolean}
                                 // tooltip={Boolean}
                                 // labels={Object}
                                 // handleLabel={String}
                                 // format={Function}
                                 // onChangeStart={Function}
                                 onChange={handleOohOnChange}
                              // onChangeComplete={Function}
                              />
                        </div>
                     </div>

                     <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}} className="mb-4">


                        <div style={{display:'flex',alignItems:'center',gap:'35px'}}>
                           <Label className='mb-0' style={{ color: "#0b3d45",width:'100px' }}>Print_S</Label>
                              <Slider
                                 min={-10}
                                 max={10}
                                 step={1}
                                 value={printVolume}
                                 orientation={"horizontal"}
                                 // reverse={Boolean}
                                 // tooltip={Boolean}
                                 // labels={Object}
                                 // handleLabel={String}
                                 // format={Function}
                                 // onChangeStart={Function}
                                 onChange={handlePrintOnChange}
                              // onChangeComplete={Function}
                              />

                        </div>
                        <div style={{display:'flex',alignItems:'center',gap:'35px'}}>
                           <Label className='mb-0' style={{ color: "#0b3d45",width:'100px' }}>Search_S</Label>
                              <Slider
                                 min={-10}
                                 max={10}
                                 step={1}
                                 value={searchVolume}
                                 orientation={"horizontal"}
                                 // reverse={Boolean}
                                 // tooltip={Boolean}
                                 // labels={Object}
                                 // handleLabel={String}
                                 // format={Function}
                                 // onChangeStart={Function}
                                 onChange={handleSearchOnChange}
                              // onChangeComplete={Function}
                              />

                        </div>
                     </div>

                     <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}} className="mb-4">


                        <div style={{display:'flex',alignItems:'center',gap:'35px'}}>
                           <Label className='mb-0' style={{ color: "#0b3d45",width:'100px' }}>Facebook_S</Label>
                              <Slider
                                 min={-10}
                                 max={10}
                                 step={1}
                                 value={facebookVolume}
                                 orientation={"horizontal"}
                                 // reverse={Boolean}
                                 // tooltip={Boolean}
                                 // labels={Object}
                                 // handleLabel={String}
                                 // format={Function}
                                 // onChangeStart={Function}
                                 onChange={handleFacebookOnChange}
                              // onChangeComplete={Function}
                              />

                              
                        </div>
                        <div style={{display:'flex',alignItems:'center',gap:'27px'}}>
                         <Label className='mb-0' style={{ color: "#0b3d45",width:'100px' }}>Duration </Label>
                         <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                         <input type="number" className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
                           <p className='mb-0'>Period</p>

                           </div>
                        

                        </div>
                     </div>

                     <div style={{textAlign:'center'}}>
                     <button style={{ backgroundColor: "#0b3d45", color: "#fff", borderRadius: "6px", cursor: "pointer", width: "170px" }} className='py-2 mt-3 px-4' onClick={sendGraphData} >Run</button>
                     </div>
                  </div>
               </div>
            </div>
         </RctCollapsibleCard>
      </div>
   )
}

