(this.webpackJsonpreactify=this.webpackJsonpreactify||[]).push([[184],{2533:function(o,r,a){"use strict";a.r(r);var e=a(19),n=a(17),t=a(35),l=a(36),i=a(1),c=a(192),s=a(106),d=a(0),b={labels:["Red","Green","Yellow"],datasets:[{data:[300,50,100],backgroundColor:[s.a.color.primary,s.a.color.warning,s.a.color.info],hoverBackgroundColor:[s.a.color.primary,s.a.color.warning,s.a.color.info]}]},u={legend:{labels:{fontColor:s.a.legendFontColor}},responsive:!0,maintainAspectRatio:!1},p=function(o){Object(t.a)(a,o);var r=Object(l.a)(a);function a(){return Object(e.a)(this,a),r.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){return Object(d.jsx)(c.c,{data:b,options:u,height:228})}}]),a}(i.Component),C={labels:["January","February","March","April","May","June","July"],datasets:[{label:"Series A",fill:!1,lineTension:.1,backgroundColor:s.a.color.primary,borderColor:s.a.color.primary,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:s.a.color.info,pointBackgroundColor:s.a.color.info,pointBorderWidth:5,pointHoverRadius:10,pointHoverBackgroundColor:s.a.color.info,pointHoverBorderColor:s.a.color.info,pointHoverBorderWidth:3,pointRadius:10,pointHitRadius:10,data:[65,59,80,81,56,55,40]}]},j={legend:{labels:{fontColor:s.a.legendFontColor}},scales:{xAxes:[{gridLines:{color:s.a.chartGridColor},ticks:{fontColor:s.a.axesColor}}],yAxes:[{gridLines:{color:s.a.chartGridColor},ticks:{fontColor:s.a.axesColor}}]}},g=function(o){Object(t.a)(a,o);var r=Object(l.a)(a);function a(){return Object(e.a)(this,a),r.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){return Object(d.jsx)(c.d,{data:C,options:j})}}]),a}(i.Component),h={labels:["January"],datasets:[{label:"Series A",data:[{x:1,y:2,r:5}],backgroundColor:s.a.color.primary,hoverBackgroundColor:s.a.color.primary},{label:"Series B",data:[{x:1,y:8,r:7}],backgroundColor:s.a.color.info,hoverBackgroundColor:s.a.color.info},{label:"Series C",data:[{x:3,y:6,r:12}],backgroundColor:s.a.color.danger,hoverBackgroundColor:s.a.color.danger},{label:"Series D",data:[{x:5,y:8,r:18}],backgroundColor:s.a.color.primary,hoverBackgroundColor:s.a.color.primary},{label:"Series F",data:[{x:7,y:4,r:12}],backgroundColor:s.a.color.primary,hoverBackgroundColor:s.a.color.primary},{label:"Series G",data:[{x:9,y:2,r:7}],backgroundColor:s.a.color.primary,hoverBackgroundColor:s.a.color.primary},{label:"Series H",data:[{x:9,y:9,r:5}],backgroundColor:s.a.color.primary,hoverBackgroundColor:s.a.color.primary}]},f={plugins:{legend:{display:!1}},scales:{x:{grid:{color:s.a.chartGridColor},ticks:{fontColor:s.a.axesColor}},y:{grid:{color:s.a.chartGridColor},ticks:{fontColor:s.a.axesColor}}}},y=function(o){Object(t.a)(a,o);var r=Object(l.a)(a);function a(){return Object(e.a)(this,a),r.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){return Object(d.jsx)(c.b,{data:h,options:f})}}]),a}(i.Component),O={labels:["January","February","March","April","May","June","July"],datasets:[{label:"Series A",backgroundColor:s.a.color.primary,borderColor:s.a.color.primary,borderWidth:1,hoverBackgroundColor:s.a.color.primary,hoverBorderColor:s.a.color.primary,data:[65,59,80,81,56,55,40]}]},x={plugins:{legend:{labels:{fontColor:s.a.legendFontColor}}},scales:{x:{grid:{color:s.a.chartGridColor,display:!1},ticks:{fontColor:s.a.axesColor}},y:{grid:{color:s.a.chartGridColor},ticks:{fontColor:s.a.axesColor}}}},k=function(o){Object(t.a)(a,o);var r=Object(l.a)(a);function a(){return Object(e.a)(this,a),r.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){return Object(d.jsx)(c.a,{data:O,options:x})}}]),a}(i.Component),m={datasets:[{data:[11,16,7,3],backgroundColor:[s.a.color.primary,s.a.color.warning,s.a.color.default,s.a.color.info],label:"My dataset"}],labels:["Series A","Series B","Series C","Series D"]},v={legend:{labels:{fontColor:s.a.legendFontColor}},responsive:!0,maintainAspectRatio:!1},B=function(o){Object(t.a)(a,o);var r=Object(l.a)(a);function a(){return Object(e.a)(this,a),r.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){return Object(d.jsx)(c.f,{data:m,options:v,height:228})}}]),a}(i.Component),S={labels:["primary","Green","Yellow"],datasets:[{data:[300,50,100],backgroundColor:[s.a.color.primary,s.a.color.info,s.a.color.warning],hoverBackgroundColor:[s.a.color.primary,s.a.color.info,s.a.color.warning]}]},w={legend:{labels:{fontColor:s.a.legendFontColor}},responsive:!0,maintainAspectRatio:!1},A=function(o){Object(t.a)(a,o);var r=Object(l.a)(a);function a(){return Object(e.a)(this,a),r.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){return Object(d.jsx)(c.e,{data:S,options:w,height:228})}}]),a}(i.Component),J=function(o){var r;if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(o))return 3===(r=o.substring(1).split("")).length&&(r=[r[0],r[0],r[1],r[1],r[2],r[2]]),"rgba("+[(r="0x"+r.join(""))>>16&255,r>>8&255,255&r].join(",")+",0.8)";throw new Error("Bad Hex")},F={labels:["Eating","Drinking","Sleeping","Designing","Coding","Cycling","Running"],datasets:[{label:"Series A",backgroundColor:J(s.a.color.primary),borderColor:J(s.a.color.primary),pointBackgroundColor:J(s.a.color.primary),pointBorderColor:"#fff",pointHoverBackgroundColor:"#fff",pointHoverBorderColor:J(s.a.color.primary),data:[65,59,90,81,56,55,40]},{label:"Series B",backgroundColor:J(s.a.color.warning),borderColor:J(s.a.color.warning),pointBackgroundColor:J(s.a.color.warning),pointBorderColor:"#fff",pointHoverBackgroundColor:"#fff",pointHoverBorderColor:J(s.a.color.warning),data:[28,48,40,19,96,27,100]}]},H={legend:{labels:{fontColor:s.a.legendFontColor}},responsive:!0,maintainAspectRatio:!1},G=function(o){Object(t.a)(a,o);var r=Object(l.a)(a);function a(){return Object(e.a)(this,a),r.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){return Object(d.jsx)(c.g,{data:F,options:H,height:228})}}]),a}(i.Component),R={labels:["January","February","March","April","May","June","July"],datasets:[{label:"Series A",backgroundColor:s.a.color.info,borderColor:s.a.color.info,borderWidth:1,hoverBackgroundColor:s.a.color.info,hoverBorderColor:s.a.color.info,data:[65,59,80,81,56,55,40]}]},D={indexAxis:"y",plugins:{legend:{labels:{fontColor:s.a.legendFontColor}}},scales:{x:{grid:{color:s.a.chartGridColor},ticks:{fontColor:s.a.axesColor}},y:{grid:{color:s.a.chartGridColor,display:!1},ticks:{fontColor:s.a.axesColor}}}},M=function(o){Object(t.a)(a,o);var r=Object(l.a)(a);function a(){return Object(e.a)(this,a),r.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){return Object(d.jsx)(c.a,{data:R,options:D})}}]),a}(i.Component),N=a(62),W=a(10),L=a(45),E=function(o){Object(t.a)(a,o);var r=Object(l.a)(a);function a(){return Object(e.a)(this,a),r.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){return Object(d.jsxs)("div",{className:"chartjs-wrapper",children:[Object(d.jsx)(N.a,{title:Object(d.jsx)(W.a,{id:"sidebar.reactChartjs2"}),match:this.props.match}),Object(d.jsxs)("div",{className:"row",children:[Object(d.jsxs)("div",{className:"col-sm-12 col-md-6 col-xl-6",children:[Object(d.jsx)(L.a,{heading:"Doughnut",children:Object(d.jsx)(p,{})}),Object(d.jsx)(L.a,{heading:"Line Chart",children:Object(d.jsx)(g,{})}),Object(d.jsx)(L.a,{heading:"Bubble Chart",children:Object(d.jsx)(y,{})}),Object(d.jsx)(L.a,{heading:"Bar Chart",children:Object(d.jsx)(k,{})})]}),Object(d.jsxs)("div",{className:"col-sm-12 col-md-6 col-xl-6",children:[Object(d.jsx)(L.a,{heading:"Polar Chart",children:Object(d.jsx)(B,{})}),Object(d.jsx)(L.a,{heading:"Pie Chart",children:Object(d.jsx)(A,{})}),Object(d.jsx)(L.a,{heading:"Radar Chart",children:Object(d.jsx)(G,{})}),Object(d.jsx)(L.a,{heading:"Horizontal Bar",children:Object(d.jsx)(M,{})})]})]})]})}}]),a}(i.Component);r.default=E}}]);
//# sourceMappingURL=184.1ae28b02.chunk.js.map