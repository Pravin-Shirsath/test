(this.webpackJsonpreactify=this.webpackJsonpreactify||[]).push([[60],{2225:function(e,a,t){"use strict";var s=t(30),r=t(51);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var c=r(t(1)),o=(0,s(t(326)).default)(c.createElement("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"}),"Check");a.default=o},2226:function(e,a,t){"use strict";var s=t(30),r=t(51);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var c=r(t(1)),o=(0,s(t(326)).default)(c.createElement("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"}),"Save");a.default=o},2551:function(e,a,t){"use strict";t.r(a);var s=t(15),r=t(7),c=t(1),o=t.n(c),i=t(11),n=t.n(i),l=t(22),d=t(474),b=t(157),u=t(156),j=t(151),m=t(705),h=t(2225),x=t.n(h),O=t(2226),f=t.n(O),v=t(537),p=t(0);var g=Object(l.a)({root:{flexGrow:1}})((function(e){var a=Object(c.useState)(0),t=Object(r.a)(a,2),s=t[0],o=t[1],i=Object(c.useState)(10),n=Object(r.a)(i,2),l=n[0],d=n[1],b=Object(c.useRef)((function(){}));Object(c.useEffect)((function(){b.current=function(){if(s>100)o(0),d(10);else{var e=10*Math.random(),a=10*Math.random();o(s+e),d(s+e+a)}}})),Object(c.useEffect)((function(){var e=setInterval((function(){b.current()}),500);return function(){clearInterval(e)}}),[]);var u=e.classes;return Object(p.jsxs)("div",{className:u.root,children:[Object(p.jsx)(v.a,{variant:"buffer",value:s,valueBuffer:l}),Object(p.jsx)("br",{}),Object(p.jsx)(v.a,{color:"secondary",variant:"buffer",value:s,valueBuffer:l})]})}));var w=Object(l.a)({root:{flexGrow:1}})((function(e){var a=e.classes;return Object(p.jsxs)("div",{className:a.root,children:[Object(p.jsx)(v.a,{variant:"query"}),Object(p.jsx)("br",{}),Object(p.jsx)(v.a,{color:"secondary",variant:"query"})]})}));var y=Object(l.a)({root:{flexGrow:1}})((function(e){var a=Object(c.useState)(0),t=Object(r.a)(a,2),s=t[0],o=t[1];Object(c.useEffect)((function(){var e=setInterval((function(){o((function(e){if(100===e)return 0;var a=10*Math.random();return Math.min(e+a,100)}))}),500);return function(){clearInterval(e)}}),[]);var i=e.classes;return Object(p.jsxs)("div",{className:i.root,children:[Object(p.jsx)(v.a,{variant:"determinate",value:s}),Object(p.jsx)("br",{}),Object(p.jsx)(v.a,{color:"secondary",variant:"determinate",value:s})]})}));var N=Object(l.a)({root:{flexGrow:1}})((function(e){var a=e.classes;return Object(p.jsxs)("div",{className:a.root,children:[Object(p.jsx)(v.a,{}),Object(p.jsx)("br",{}),Object(p.jsx)(v.a,{color:"secondary"})]})})),C=t(62),k=t(10),z=t(45);a.default=Object(l.a)((function(e){return{root:{display:"flex",alignItems:"center"},wrapper:{margin:e.spacing(),position:"relative"},buttonSuccess:{backgroundColor:b.a[500],"&:hover":{backgroundColor:b.a[700]}},fabProgress:{color:b.a[500],position:"absolute",top:-6,left:-6,zIndex:1},buttonProgress:{color:b.a[500],position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}}))((function(e){var a=Object(c.useState)(!1),t=Object(r.a)(a,2),i=t[0],l=t[1],b=Object(c.useState)(!1),h=Object(r.a)(b,2),O=h[0],v=h[1],S=o.a.useRef();Object(c.useEffect)((function(){return function(){clearTimeout(S.current)}}),[]);var M=function(){i||(v(!1),l(!0),S.current=window.setTimeout((function(){v(!0),l(!1)}),2e3))},I=e.classes,R=n()(Object(s.a)({},I.buttonSuccess,O));return Object(p.jsxs)("div",{className:"progress-wrapper",children:[Object(p.jsx)(C.a,{title:Object(p.jsx)(k.a,{id:"sidebar.progress"}),match:e.match}),Object(p.jsxs)("div",{className:"row",children:[Object(p.jsxs)(z.a,{colClasses:"col-sm-12 col-md-12 col-xl-4 d-sm-full",heading:Object(p.jsx)(k.a,{id:"widgets.circularProgressBottomStart"}),children:[Object(p.jsx)(d.a,{className:"w-10 mr-30 mb-10 progress-primary",thickness:2}),Object(p.jsx)(d.a,{className:"mr-30 mb-10 progress-success",size:70}),Object(p.jsx)(d.a,{className:"w-10 mr-30 mb-10 text-pink",thickness:5}),Object(p.jsx)(d.a,{className:"w-10 mr-30 mb-10",style:{color:u.a[600]},thickness:7})]}),Object(p.jsx)(z.a,{colClasses:"col-sm-12 col-md-12 col-xl-4 d-sm-full",heading:Object(p.jsx)(k.a,{id:"widgets.interactiveIntegration"}),children:Object(p.jsxs)("div",{className:I.root,children:[Object(p.jsxs)("div",{className:I.wrapper,children:[Object(p.jsx)(m.a,{variant:"round",color:"secondary",className:R,onClick:M,children:O?Object(p.jsx)(x.a,{}):Object(p.jsx)(f.a,{})}),i&&Object(p.jsx)(d.a,{size:68,className:I.fabProgress})]}),Object(p.jsxs)("div",{className:I.wrapper,children:[Object(p.jsx)(j.a,{variant:"contained",color:"secondary",className:R,disabled:i,onClick:M,children:"Accept terms"})," ",i&&Object(p.jsx)(d.a,{size:24,className:I.buttonProgress})]})]})}),Object(p.jsxs)(z.a,{colClasses:"col-sm-12 col-md-12 col-xl-4 d-sm-full",heading:Object(p.jsx)(k.a,{id:"widgets.determinate"}),children:[Object(p.jsx)(d.a,{className:"progress-primary mr-30 mb-10",size:60,mode:"determinate",value:75}),Object(p.jsx)(d.a,{className:"progress-danger mr-30 mb-10",size:70,mode:"determinate",value:35,min:0,max:50}),Object(p.jsx)(d.a,{className:"progress-success mr-30 mb-10",size:60,mode:"determinate",value:75}),Object(p.jsx)(d.a,{className:"progress-warning mr-30 mb-10",size:70,mode:"determinate",value:40,min:0,max:50})]})]}),Object(p.jsx)("div",{className:"sub-title",children:Object(p.jsxs)("h4",{children:[Object(p.jsx)(k.a,{id:"widgets.linearProgressLineBar"})," "]})}),Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)(z.a,{colClasses:"col-xs-12 col-sm-12 col-md-6",heading:Object(p.jsx)(k.a,{id:"widgets.indeterminate"}),children:Object(p.jsx)(N,{})}),Object(p.jsx)(z.a,{colClasses:"col-xs-12 col-sm-12 col-md-6",heading:Object(p.jsx)(k.a,{id:"widgets.determinate"}),children:Object(p.jsx)(y,{})}),Object(p.jsx)(z.a,{colClasses:"col-xs-12 col-sm-12 col-md-6",heading:Object(p.jsx)(k.a,{id:"widgets.buffer"}),children:Object(p.jsx)(g,{})}),Object(p.jsx)(z.a,{colClasses:"col-xs-12 col-sm-12 col-md-6",heading:Object(p.jsx)(k.a,{id:"widgets.query"}),children:Object(p.jsx)(w,{})})]})]})}))},705:function(e,a,t){"use strict";var s=t(13),r=t(5),c=t(1),o=t(18),i=t(22),n=t(190),l=t(25),d=c.forwardRef((function(e,a){var t=e.children,i=e.classes,d=e.className,b=e.color,u=void 0===b?"default":b,j=e.component,m=void 0===j?"button":j,h=e.disabled,x=void 0!==h&&h,O=e.disableFocusRipple,f=void 0!==O&&O,v=e.focusVisibleClassName,p=e.size,g=void 0===p?"large":p,w=e.variant,y=void 0===w?"circular":w,N=Object(s.a)(e,["children","classes","className","color","component","disabled","disableFocusRipple","focusVisibleClassName","size","variant"]);return c.createElement(n.a,Object(r.a)({className:Object(o.default)(i.root,d,"large"!==g&&i["size".concat(Object(l.a)(g))],x&&i.disabled,"extended"===y&&i.extended,{primary:i.primary,secondary:i.secondary,inherit:i.colorInherit}[u]),component:m,disabled:x,focusRipple:!f,focusVisibleClassName:Object(o.default)(i.focusVisible,v),ref:a},N),c.createElement("span",{className:i.label},t))}));a.a=Object(i.a)((function(e){return{root:Object(r.a)({},e.typography.button,{boxSizing:"border-box",minHeight:36,transition:e.transitions.create(["background-color","box-shadow","border"],{duration:e.transitions.duration.short}),borderRadius:"50%",padding:0,minWidth:0,width:56,height:56,boxShadow:e.shadows[6],"&:active":{boxShadow:e.shadows[12]},color:e.palette.getContrastText(e.palette.grey[300]),backgroundColor:e.palette.grey[300],"&:hover":{backgroundColor:e.palette.grey.A100,"@media (hover: none)":{backgroundColor:e.palette.grey[300]},"&$disabled":{backgroundColor:e.palette.action.disabledBackground},textDecoration:"none"},"&$focusVisible":{boxShadow:e.shadows[6]},"&$disabled":{color:e.palette.action.disabled,boxShadow:e.shadows[0],backgroundColor:e.palette.action.disabledBackground}}),label:{width:"100%",display:"inherit",alignItems:"inherit",justifyContent:"inherit"},primary:{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main,"&:hover":{backgroundColor:e.palette.primary.dark,"@media (hover: none)":{backgroundColor:e.palette.primary.main}}},secondary:{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main,"&:hover":{backgroundColor:e.palette.secondary.dark,"@media (hover: none)":{backgroundColor:e.palette.secondary.main}}},extended:{borderRadius:24,padding:"0 16px",width:"auto",minHeight:"auto",minWidth:48,height:48,"&$sizeSmall":{width:"auto",padding:"0 8px",borderRadius:17,minWidth:34,height:34},"&$sizeMedium":{width:"auto",padding:"0 16px",borderRadius:20,minWidth:40,height:40}},focusVisible:{},disabled:{},colorInherit:{color:"inherit"},sizeSmall:{width:40,height:40},sizeMedium:{width:48,height:48}}}),{name:"MuiFab"})(d)}}]);
//# sourceMappingURL=60.0cdcba54.chunk.js.map