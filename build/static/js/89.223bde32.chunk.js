(this.webpackJsonpreactify=this.webpackJsonpreactify||[]).push([[89],{2490:function(e,a,t){"use strict";t.r(a);var i=t(7),o=t(1),s=t(63),r=t(151),c=t(524),n=t(525),d=t(40),l=t(10),m=t(126),b=t(705),h=t(0);a.default=function(){var e=Object(o.useState)(null),a=Object(i.a)(e,2),t=a[0],u=a[1];Object(o.useEffect)((function(){p()}),[]);var p=function(){d.d.get("comments.js").then((function(e){u(e.data)})).catch((function(e){}))};return Object(h.jsxs)(o.Fragment,{children:[Object(h.jsx)(s.Scrollbars,{className:"rct-scroll",autoHeight:!0,autoHeightMin:100,autoHeightMax:424,autoHide:!0,children:Object(h.jsx)(c.a,{className:"list-group aqua-ripple p-0",children:t&&t.map((function(e){return Object(h.jsxs)(n.a,{className:"d-flex px-20 py-3 align-items-start",button:!0,children:[Object(h.jsx)("div",{className:"avatar-wrap mr-15",children:Object(h.jsx)("img",{src:e.userAvatar,alt:"project logo",className:"rounded-circle",width:"40",height:"40"})}),Object(h.jsxs)("div",{className:"comment-wrap",children:[Object(h.jsx)("h5",{className:"mb-0",children:e.userName}),Object(h.jsxs)("span",{className:"font-xs",children:["commented on",Object(h.jsxs)("span",{className:"text-primary",children:[" ",e.commentTitle]})]}),Object(h.jsx)("p",{className:"mb-0 font-xs",children:e.comment})]}),Object(h.jsxs)("div",{className:"comment-action w-20 text-right",children:[Object(h.jsx)("span",{className:"font-xs text-muted font-weight-light d-block comment-date",children:e.date}),Object(h.jsxs)("div",{className:"hover-action d-flex align-items-center",children:[Object(h.jsx)(b.a,{variant:"round",size:"small",color:"primary",className:"btn-sm mx-1 bg-primary",children:Object(h.jsx)("i",{className:"zmdi zmdi-check"})}),Object(h.jsx)(b.a,{variant:"round",size:"small",className:"bg-danger text-white btn-sm mx-1",children:Object(h.jsx)("i",{className:"zmdi zmdi-delete"})})]})]})]},e.id)}))})}),Object(h.jsx)(m.c,{customClasses:"d-flex justify-content-between align-items-center rounded-bottom",children:Object(h.jsx)(r.a,{variant:"contained",color:"primary",className:"px-3 btn-xs bg-primary",children:Object(h.jsx)(l.a,{id:"button.viewAll"})})})]})}},705:function(e,a,t){"use strict";var i=t(13),o=t(5),s=t(1),r=t(18),c=t(22),n=t(190),d=t(25),l=s.forwardRef((function(e,a){var t=e.children,c=e.classes,l=e.className,m=e.color,b=void 0===m?"default":m,h=e.component,u=void 0===h?"button":h,p=e.disabled,j=void 0!==p&&p,g=e.disableFocusRipple,x=void 0!==g&&g,f=e.focusVisibleClassName,v=e.size,y=void 0===v?"large":v,O=e.variant,w=void 0===O?"circular":O,N=Object(i.a)(e,["children","classes","className","color","component","disabled","disableFocusRipple","focusVisibleClassName","size","variant"]);return s.createElement(n.a,Object(o.a)({className:Object(r.default)(c.root,l,"large"!==y&&c["size".concat(Object(d.a)(y))],j&&c.disabled,"extended"===w&&c.extended,{primary:c.primary,secondary:c.secondary,inherit:c.colorInherit}[b]),component:u,disabled:j,focusRipple:!x,focusVisibleClassName:Object(r.default)(c.focusVisible,f),ref:a},N),s.createElement("span",{className:c.label},t))}));a.a=Object(c.a)((function(e){return{root:Object(o.a)({},e.typography.button,{boxSizing:"border-box",minHeight:36,transition:e.transitions.create(["background-color","box-shadow","border"],{duration:e.transitions.duration.short}),borderRadius:"50%",padding:0,minWidth:0,width:56,height:56,boxShadow:e.shadows[6],"&:active":{boxShadow:e.shadows[12]},color:e.palette.getContrastText(e.palette.grey[300]),backgroundColor:e.palette.grey[300],"&:hover":{backgroundColor:e.palette.grey.A100,"@media (hover: none)":{backgroundColor:e.palette.grey[300]},"&$disabled":{backgroundColor:e.palette.action.disabledBackground},textDecoration:"none"},"&$focusVisible":{boxShadow:e.shadows[6]},"&$disabled":{color:e.palette.action.disabled,boxShadow:e.shadows[0],backgroundColor:e.palette.action.disabledBackground}}),label:{width:"100%",display:"inherit",alignItems:"inherit",justifyContent:"inherit"},primary:{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main,"&:hover":{backgroundColor:e.palette.primary.dark,"@media (hover: none)":{backgroundColor:e.palette.primary.main}}},secondary:{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main,"&:hover":{backgroundColor:e.palette.secondary.dark,"@media (hover: none)":{backgroundColor:e.palette.secondary.main}}},extended:{borderRadius:24,padding:"0 16px",width:"auto",minHeight:"auto",minWidth:48,height:48,"&$sizeSmall":{width:"auto",padding:"0 8px",borderRadius:17,minWidth:34,height:34},"&$sizeMedium":{width:"auto",padding:"0 16px",borderRadius:20,minWidth:40,height:40}},focusVisible:{},disabled:{},colorInherit:{color:"inherit"},sizeSmall:{width:40,height:40},sizeMedium:{width:48,height:48}}}),{name:"MuiFab"})(l)}}]);
//# sourceMappingURL=89.223bde32.chunk.js.map