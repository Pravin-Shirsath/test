(this.webpackJsonpreactify=this.webpackJsonpreactify||[]).push([[64],{2454:function(e,t,n){"use strict";n.r(t);var a=n(3),c=n(15),r=n(7),i=n(1),o=n(44),s=n.n(o),u=n(541),l=n(533),m=n(530),d=n(477),j=n(321),b=n(527),f=n(476),O=n(531),h=n(151),x=n(793),p=n(542),v=n(63),g=n(40),E=n(10),C=n(107),N=n(169),w=n(0);t.default=function(e){var t=Object(i.useRef)(),n=Object(i.useState)(!1),o=Object(r.a)(n,2),y=o[0],k=o[1],_=Object(i.useState)(null),L=Object(r.a)(_,2),T=L[0],S=L[1],R=Object(i.useState)(null),D=Object(r.a)(R,2),M=D[0],H=D[1],z=Object(i.useState)(!1),A=Object(r.a)(z,2),P=A[0],I=A[1],W=Object(i.useState)(null),B=Object(r.a)(W,2),Y=B[0],F=B[1],G=Object(i.useState)(!1),J=Object(r.a)(G,2),X=J[0],q=J[1],U=Object(i.useState)(""),V=Object(r.a)(U,2),$=V[0],K=V[1],Q=Object(i.useState)(!1),Z=Object(r.a)(Q,2),ee=Z[0],te=Z[1],ne=Object(i.useState)({customer_email:"",customer_name:"",id:"",photo_url:""}),ae=Object(r.a)(ne,2),ce=ae[0],re=ae[1];Object(i.useEffect)((function(){ie()}),[]);var ie=function(){k(!0),g.d.get("newCustomers.js").then((function(e){S(e.data),k(!1)})).catch((function(e){S(null),k(!1)}))},oe=function(){I(!P)},se=function(e,t){F(Object(a.a)(Object(a.a)({},Y),{},Object(c.a)({},e,t)))},ue=function(e,t){re(Object(a.a)(Object(a.a)({},ce),{},Object(c.a)({},e,t)))};return Object(w.jsxs)(i.Fragment,{children:[y&&Object(w.jsx)(C.a,{}),Object(w.jsx)(v.Scrollbars,{className:"rct-scroll",autoHeight:!0,autoHeightMin:100,autoHeightMax:290,autoHide:!0,children:Object(w.jsx)("ul",{className:"list-group new-customer-list",children:T&&T.map((function(e,n){return Object(w.jsxs)("li",{className:"list-group-item d-flex justify-content-between",children:[Object(w.jsx)("div",{className:"d-flex align-items-start",children:Object(w.jsxs)("div",{className:"media",children:[Object(w.jsx)("div",{className:"media-left mr-15",children:""===e.photo_url?Object(w.jsx)(p.a,{children:e.customer_name.charAt(0)}):Object(w.jsx)("img",{src:e.photo_url,alt:"project logo",className:"media-object rounded-circle",width:"40",height:"40"})}),Object(w.jsxs)("div",{className:"media-body",children:[Object(w.jsx)("span",{className:"d-block fs-14",children:e.customer_name}),Object(w.jsx)("span",{className:"d-block fs-12 text-muted",children:e.customer_email})]})]})}),Object(w.jsxs)("div",{className:"d-flex align-items-end",children:[Object(w.jsx)("button",{type:"button",className:"text-primary",onClick:function(){return function(e){I(!0),F(e),te(!1)}(e)},children:Object(w.jsx)("i",{className:"zmdi zmdi-edit"})}),Object(w.jsx)("button",{type:"button",className:"text-danger",onClick:function(){return function(e){t.current.open(),H(e)}(e)},children:Object(w.jsx)("i",{className:"zmdi zmdi-close"})})]})]},n)}))})}),Object(w.jsx)("div",{className:"d-flex p-3",children:Object(w.jsx)(h.a,{variant:"contained",color:"primary",className:"text-white",onClick:function(){return I(!0),te(!0),F(null),void re({customer_email:"",customer_name:"",id:"",photo_url:""})},children:Object(w.jsx)(E.a,{id:"widgets.addNew"})})}),Object(w.jsx)(N.a,{ref:t,title:"Are You Sure Want To Delete?",message:"Are You Sure Want To Delete Permanently This Customer.",onConfirm:function(){return function(){t.current.close(),k(!0);var e=T,n=e.indexOf(M);setTimeout((function(){e.splice(n,1),S(e),k(!1),q(!0),K("Customer Deleted Successfully")}),1500)}()}}),P&&Object(w.jsxs)(u.a,{isOpen:P,toggle:oe,children:[Object(w.jsx)(l.a,{toggle:oe,children:ee?"Add New Customer":"Edit Customer"}),Object(w.jsx)(m.a,{children:ee?Object(w.jsxs)(d.a,{children:[Object(w.jsxs)(j.a,{children:[Object(w.jsx)(b.a,{for:"customerName",children:"Name"}),Object(w.jsx)(f.a,{type:"text",name:"name",id:"customerName",value:ce.customer_name,onChange:function(e){return ue("customer_name",e.target.value)}})]}),Object(w.jsxs)(j.a,{children:[Object(w.jsx)(b.a,{for:"customerEmail",children:"Email"}),Object(w.jsx)(f.a,{type:"email",name:"email",id:"customerEmail",value:ce.customer_email,onChange:function(e){return ue("customer_email",e.target.value)}})]})]}):Object(w.jsxs)(d.a,{children:[Object(w.jsxs)(j.a,{children:[Object(w.jsx)(b.a,{for:"customerId",children:"Id"}),Object(w.jsx)(f.a,{type:"text",name:"name",id:"customerId",defaultValue:Y.customer_id,readOnly:!0})]}),Object(w.jsxs)(j.a,{children:[Object(w.jsx)(b.a,{for:"customerName",children:"Name"}),Object(w.jsx)(f.a,{type:"text",name:"name",id:"customerName",value:Y.customer_name,onChange:function(e){return se("customer_name",e.target.value)}})]}),Object(w.jsxs)(j.a,{children:[Object(w.jsx)(b.a,{for:"customerEmail",children:"Email"}),Object(w.jsx)(f.a,{type:"email",name:"email",id:"customerEmail",value:Y.customer_email,onChange:function(e){return se("customer_email",e.target.value)}})]})]})}),Object(w.jsx)(O.a,{children:ee?Object(w.jsxs)("div",{children:[Object(w.jsx)(h.a,{variant:"contained",color:"primary",className:"text-white",onClick:function(){return function(){if(""!==ce.customer_name&&""!==ce.customer_email){I(!1),k(!0);var e=ce;e.id=new Date,e.photo_url="";var t=T;setTimeout((function(){t.push(e),S(t),k(!1),q(!0),K("Customer Added Successfully")}),1500)}}()},children:Object(w.jsx)(E.a,{id:"button.add"})})," ",Object(w.jsx)(h.a,{variant:"contained",className:"btn-danger text-white",onClick:oe,children:Object(w.jsx)(E.a,{id:"button.cancel"})})]}):Object(w.jsxs)("div",{children:[Object(w.jsx)(h.a,{variant:"contained",color:"primary",className:"text-white",onClick:function(){return function(){if(""!==Y.customer_name&&""!==Y.customer_email){var e;F(!1),k(!0);for(var t=0;t<T.length;t++)T[t].customer_id===Y.customer_id&&(e=t);setTimeout((function(){k(!1),q(!0),I(!1),K("Customer Updated Success"),S(s()(T,Object(c.a)({},e,{$set:Y})))}),1500)}}()},children:Object(w.jsx)(E.a,{id:"button.update"})})," ",Object(w.jsx)(h.a,{variant:"contained",className:"btn-danger text-white",onClick:oe,children:Object(w.jsx)(E.a,{id:"button.cancel"})})]})})]}),Object(w.jsx)(x.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:X,onClose:function(){return q(!1)},autoHideDuration:2e3,message:Object(w.jsx)("span",{id:"message-id",children:$})})]})}},749:function(e,t,n){"use strict";var a=n(13),c=n(15),r=n(5),i=n(1),o=n(18),s=n(22),u=n(182),l=n(32),m=i.forwardRef((function(e,t){var n=e.action,c=e.classes,s=e.className,l=e.message,m=e.role,d=void 0===m?"alert":m,j=Object(a.a)(e,["action","classes","className","message","role"]);return i.createElement(u.a,Object(r.a)({role:d,square:!0,elevation:6,className:Object(o.default)(c.root,s),ref:t},j),i.createElement("div",{className:c.message},l),n?i.createElement("div",{className:c.action},n):null)}));t.a=Object(s.a)((function(e){var t="light"===e.palette.type?.8:.98,n=Object(l.d)(e.palette.background.default,t);return{root:Object(r.a)({},e.typography.body2,Object(c.a)({color:e.palette.getContrastText(n),backgroundColor:n,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:e.shape.borderRadius,flexGrow:1},e.breakpoints.up("sm"),{flexGrow:"initial",minWidth:288})),message:{padding:"8px 0"},action:{display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}}}),{name:"MuiSnackbarContent"})(m)},793:function(e,t,n){"use strict";var a=n(13),c=n(15),r=n(5),i=n(1),o=n(18),s=n(22),u=n(66),l=n(38),m=n(83),d=n(43),j=n(79);function b(e){return e.substring(2).toLowerCase()}var f=function(e){var t=e.children,n=e.disableReactTree,a=void 0!==n&&n,c=e.mouseEvent,r=void 0===c?"onClick":c,o=e.onClickAway,s=e.touchEvent,u=void 0===s?"onTouchEnd":s,f=i.useRef(!1),O=i.useRef(null),h=i.useRef(!1),x=i.useRef(!1);i.useEffect((function(){return setTimeout((function(){h.current=!0}),0),function(){h.current=!1}}),[]);var p=i.useCallback((function(e){O.current=l.findDOMNode(e)}),[]),v=Object(d.a)(t.ref,p),g=Object(j.a)((function(e){var t=x.current;if(x.current=!1,h.current&&O.current&&!function(e){return document.documentElement.clientWidth<e.clientX||document.documentElement.clientHeight<e.clientY}(e))if(f.current)f.current=!1;else{var n;if(e.composedPath)n=e.composedPath().indexOf(O.current)>-1;else n=!Object(m.a)(O.current).documentElement.contains(e.target)||O.current.contains(e.target);n||!a&&t||o(e)}})),E=function(e){return function(n){x.current=!0;var a=t.props[e];a&&a(n)}},C={ref:v};return!1!==u&&(C[u]=E(u)),i.useEffect((function(){if(!1!==u){var e=b(u),t=Object(m.a)(O.current),n=function(){f.current=!0};return t.addEventListener(e,g),t.addEventListener("touchmove",n),function(){t.removeEventListener(e,g),t.removeEventListener("touchmove",n)}}}),[g,u]),!1!==r&&(C[r]=E(r)),i.useEffect((function(){if(!1!==r){var e=b(r),t=Object(m.a)(O.current);return t.addEventListener(e,g),function(){t.removeEventListener(e,g)}}}),[g,r]),i.createElement(i.Fragment,null,i.cloneElement(t,C))},O=n(25),h=n(91),x=n(498),p=n(749),v=i.forwardRef((function(e,t){var n=e.action,c=e.anchorOrigin,s=(c=void 0===c?{vertical:"bottom",horizontal:"center"}:c).vertical,l=c.horizontal,m=e.autoHideDuration,d=void 0===m?null:m,b=e.children,v=e.classes,g=e.className,E=e.ClickAwayListenerProps,C=e.ContentProps,N=e.disableWindowBlurListener,w=void 0!==N&&N,y=e.message,k=e.onClose,_=e.onEnter,L=e.onEntered,T=e.onEntering,S=e.onExit,R=e.onExited,D=e.onExiting,M=e.onMouseEnter,H=e.onMouseLeave,z=e.open,A=e.resumeHideDuration,P=e.TransitionComponent,I=void 0===P?x.a:P,W=e.transitionDuration,B=void 0===W?{enter:u.b.enteringScreen,exit:u.b.leavingScreen}:W,Y=e.TransitionProps,F=Object(a.a)(e,["action","anchorOrigin","autoHideDuration","children","classes","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onClose","onEnter","onEntered","onEntering","onExit","onExited","onExiting","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"]),G=i.useRef(),J=i.useState(!0),X=J[0],q=J[1],U=Object(j.a)((function(){k&&k.apply(void 0,arguments)})),V=Object(j.a)((function(e){k&&null!=e&&(clearTimeout(G.current),G.current=setTimeout((function(){U(null,"timeout")}),e))}));i.useEffect((function(){return z&&V(d),function(){clearTimeout(G.current)}}),[z,d,V]);var $=function(){clearTimeout(G.current)},K=i.useCallback((function(){null!=d&&V(null!=A?A:.5*d)}),[d,A,V]);return i.useEffect((function(){if(!w&&z)return window.addEventListener("focus",K),window.addEventListener("blur",$),function(){window.removeEventListener("focus",K),window.removeEventListener("blur",$)}}),[w,K,z]),!z&&X?null:i.createElement(f,Object(r.a)({onClickAway:function(e){k&&k(e,"clickaway")}},E),i.createElement("div",Object(r.a)({className:Object(o.default)(v.root,v["anchorOrigin".concat(Object(O.a)(s)).concat(Object(O.a)(l))],g),onMouseEnter:function(e){M&&M(e),$()},onMouseLeave:function(e){H&&H(e),K()},ref:t},F),i.createElement(I,Object(r.a)({appear:!0,in:z,onEnter:Object(h.a)((function(){q(!1)}),_),onEntered:L,onEntering:T,onExit:S,onExited:Object(h.a)((function(){q(!0)}),R),onExiting:D,timeout:B,direction:"top"===s?"down":"up"},Y),b||i.createElement(p.a,Object(r.a)({message:y,action:n},C)))))}));t.a=Object(s.a)((function(e){var t={top:8},n={bottom:8},a={justifyContent:"flex-end"},i={justifyContent:"flex-start"},o={top:24},s={bottom:24},u={right:24},l={left:24},m={left:"50%",right:"auto",transform:"translateX(-50%)"};return{root:{zIndex:e.zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},anchorOriginTopCenter:Object(r.a)({},t,Object(c.a)({},e.breakpoints.up("sm"),Object(r.a)({},o,m))),anchorOriginBottomCenter:Object(r.a)({},n,Object(c.a)({},e.breakpoints.up("sm"),Object(r.a)({},s,m))),anchorOriginTopRight:Object(r.a)({},t,a,Object(c.a)({},e.breakpoints.up("sm"),Object(r.a)({left:"auto"},o,u))),anchorOriginBottomRight:Object(r.a)({},n,a,Object(c.a)({},e.breakpoints.up("sm"),Object(r.a)({left:"auto"},s,u))),anchorOriginTopLeft:Object(r.a)({},t,i,Object(c.a)({},e.breakpoints.up("sm"),Object(r.a)({right:"auto"},o,l))),anchorOriginBottomLeft:Object(r.a)({},n,i,Object(c.a)({},e.breakpoints.up("sm"),Object(r.a)({right:"auto"},s,l)))}}),{flip:!1,name:"MuiSnackbar"})(v)}}]);
//# sourceMappingURL=64.6c851e84.chunk.js.map