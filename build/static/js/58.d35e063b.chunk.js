(this.webpackJsonpreactify=this.webpackJsonpreactify||[]).push([[58],{1127:function(e,t,a){"use strict";a.d(t,"c",(function(){return b})),a.d(t,"b",(function(){return u}));var s=a(5),c=a(13),n=a(1),i=a(523),r=a(80),l=a.n(r),o=a(72),d=a(206),m=a(319);var b=function(e,t){return!(arguments.length>2&&void 0!==arguments[2])||arguments[2]?d.b.indexOf(e)<=d.b.indexOf(t):d.b.indexOf(e)<d.b.indexOf(t)},u=function(e,t){return!(arguments.length>2&&void 0!==arguments[2])||arguments[2]?d.b.indexOf(t)<=d.b.indexOf(e):d.b.indexOf(t)<d.b.indexOf(e)},j="undefined"===typeof window?n.useEffect:n.useLayoutEffect;t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(t){var a=e.withTheme,r=void 0!==a&&a,d=e.noSSR,b=void 0!==d&&d,u=e.initialWidth;function h(e){var a=Object(o.a)(),l=e.theme||a,d=Object(i.a)({theme:l,name:"MuiWithWidth",props:Object(s.a)({},e)}),h=d.initialWidth,p=d.width,x=Object(c.a)(d,["initialWidth","width"]),O=n.useState(!1),f=O[0],v=O[1];j((function(){v(!0)}),[]);var w=l.breakpoints.keys.slice().reverse().reduce((function(e,t){var a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=Object(m.a)(),c=Object(i.a)({theme:a,name:"MuiUseMediaQuery",props:{}}),r="function"===typeof e?e(a):e;r=r.replace(/^@media( ?)/m,"");var l="undefined"!==typeof window&&"undefined"!==typeof window.matchMedia,o=Object(s.a)({},c,t),d=o.defaultMatches,b=void 0!==d&&d,u=o.matchMedia,j=void 0===u?l?window.matchMedia:null:u,h=o.noSsr,p=void 0!==h&&h,x=o.ssrMatchMedia,O=void 0===x?null:x,f=n.useState((function(){return p&&l?j(r).matches:O?O(r).matches:b})),v=f[0],w=f[1];return n.useEffect((function(){var e=!0;if(l){var t=j(r),a=function(){e&&w(t.matches)};return a(),t.addListener(a),function(){e=!1,t.removeListener(a)}}}),[r,j,l]),v}(l.breakpoints.up(t));return!e&&a?t:e}),null),g=Object(s.a)({width:p||(f||b?w:void 0)||h||u},r?{theme:l}:{},x);return void 0===g.width?null:n.createElement(t,g)}return l()(h,t),h}}},1453:function(e,t,a){"use strict";var s=a(5),c=a(13),n=a(1),i=a(2),r=a.n(i),l=a(1127),o=a(72);function d(e){var t=e.children,a=e.only,s=e.width,c=Object(o.a)(),n=!0;if(a)if(Array.isArray(a))for(var i=0;i<a.length;i+=1){if(s===a[i]){n=!1;break}}else a&&s===a&&(n=!1);if(n)for(var r=0;r<c.breakpoints.keys.length;r+=1){var d=c.breakpoints.keys[r],m=e["".concat(d,"Up")],b=e["".concat(d,"Down")];if(m&&Object(l.c)(d,s)||b&&Object(l.b)(d,s)){n=!1;break}}return n?t:null}d.propTypes={children:r.a.node,className:r.a.string,implementation:r.a.oneOf(["js","css"]),initialWidth:r.a.oneOf(["xs","sm","md","lg","xl"]),lgDown:r.a.bool,lgUp:r.a.bool,mdDown:r.a.bool,mdUp:r.a.bool,only:r.a.oneOfType([r.a.oneOf(["xs","sm","md","lg","xl"]),r.a.arrayOf(r.a.oneOf(["xs","sm","md","lg","xl"]))]),smDown:r.a.bool,smUp:r.a.bool,width:r.a.string.isRequired,xlDown:r.a.bool,xlUp:r.a.bool,xsDown:r.a.bool,xsUp:r.a.bool};var m=Object(l.a)()(d),b=a(15),u=a(25),j=a(22);var h=Object(j.a)((function(e){var t={display:"none"};return e.breakpoints.keys.reduce((function(a,s){return a["only".concat(Object(u.a)(s))]=Object(b.a)({},e.breakpoints.only(s),t),a["".concat(s,"Up")]=Object(b.a)({},e.breakpoints.up(s),t),a["".concat(s,"Down")]=Object(b.a)({},e.breakpoints.down(s),t),a}),{})}),{name:"PrivateHiddenCss"})((function(e){var t=e.children,a=e.classes,s=e.className,i=e.only,r=(Object(c.a)(e,["children","classes","className","only"]),Object(o.a)()),l=[];s&&l.push(s);for(var d=0;d<r.breakpoints.keys.length;d+=1){var m=r.breakpoints.keys[d],b=e["".concat(m,"Up")],j=e["".concat(m,"Down")];b&&l.push(a["".concat(m,"Up")]),j&&l.push(a["".concat(m,"Down")])}return i&&(Array.isArray(i)?i:[i]).forEach((function(e){l.push(a["only".concat(Object(u.a)(e))])})),n.createElement("div",{className:l.join(" ")},t)}));t.a=function(e){var t=e.implementation,a=void 0===t?"js":t,i=e.lgDown,r=void 0!==i&&i,l=e.lgUp,o=void 0!==l&&l,d=e.mdDown,b=void 0!==d&&d,u=e.mdUp,j=void 0!==u&&u,p=e.smDown,x=void 0!==p&&p,O=e.smUp,f=void 0!==O&&O,v=e.xlDown,w=void 0!==v&&v,g=e.xlUp,N=void 0!==g&&g,y=e.xsDown,U=void 0!==y&&y,k=e.xsUp,D=void 0!==k&&k,C=Object(c.a)(e,["implementation","lgDown","lgUp","mdDown","mdUp","smDown","smUp","xlDown","xlUp","xsDown","xsUp"]);return"js"===a?n.createElement(m,Object(s.a)({lgDown:r,lgUp:o,mdDown:b,mdUp:j,smDown:x,smUp:f,xlDown:w,xlUp:N,xsDown:U,xsUp:D},C)):n.createElement(h,Object(s.a)({lgDown:r,lgUp:o,mdDown:b,mdUp:j,smDown:x,smUp:f,xlDown:w,xlUp:N,xsDown:U,xsUp:D},C))}},2537:function(e,t,a){"use strict";a.r(t);var s=a(7),c=a(15),n=a(1),i=a(528),r=a(1453),l=a(22),o=a(34),d=a(542),m=a(0),b=function(e){var t=e.even,a=e.adminPhotoUrl,s=e.data,c=e.selectedUserPhotoUrl;return t?Object(m.jsxs)("div",{className:"d-flex flex-nowrap mb-3",children:[Object(m.jsx)(d.a,{alt:"user profile",src:c,className:"img-fluid rounded-circle mr-15 align-self-start"}),Object(m.jsxs)("div",{className:"chat-bubble-wrap",children:[Object(m.jsx)("div",{className:"chat-bubble even bg-aqua",children:Object(m.jsx)("p",{className:"mb-0",children:s.message})}),Object(m.jsx)("span",{className:"text-left d-block font-xs text-muted mt-1",children:s.sent})]})]}):Object(m.jsxs)("div",{className:"d-flex flex-nowrap flex-row-reverse mb-3",children:[Object(m.jsx)(d.a,{alt:"user profile",src:a,className:"img-fluid rounded-circle ml-15 align-self-start"}),Object(m.jsxs)("div",{className:"chat-bubble-wrap",children:[Object(m.jsx)("div",{className:"chat-bubble odd bg-primary text-white",children:Object(m.jsx)("p",{className:"mb-0",children:s.message})}),Object(m.jsx)("span",{className:"text-right d-block font-xs text-muted mt-1",children:s.sent})]})]})},u=a(321),j=a(476),h=a(63),p=a(29),x=a(151),O=a(340),f=a(2358),v=a(652),w=a(58),g=a(129),N=a.n(g),y=a(37),U=a(71);var k=Object(w.h)((function(e){var t=Object(n.useRef)(),a=Object(n.useState)(""),c=Object(s.a)(a,2),i=c[0],r=c[1],l=Object(n.useState)(null),o=Object(s.a)(l,2),d=o[0],w=o[1],g=Object(p.c)(),k=Object(p.d)((function(e){return e.chatAppReducer})),D=function(){w(null)},C=function(a){if(a.preventDefault(),""!==i){var s={user:e.selectedUser,message:i,isAdmin:!0,time:"Just Now"};g(Object(y.ub)(s)),r(""),setTimeout((function(){t.current.scrollToBottom()}),200)}},z=k.selectedUser,M=k.admin_photo_url;return null===z?Object(m.jsx)("div",{className:"chat-box-main",children:Object(m.jsxs)("div",{className:"text-center",children:[Object(m.jsx)("i",{className:"zmdi zmdi-comments font-3x mb-2"}),Object(m.jsx)(x.a,{className:"d-none sidebar-toggler",onClick:e.onMenuIconPress,children:"Select user"})]})}):Object(m.jsxs)("div",{className:"chat-main-body",children:[Object(m.jsx)("div",{className:"chat-head",children:Object(m.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(m.jsxs)("div",{className:"media align-items-center",children:[Object(m.jsx)(O.a,{className:"mr-3 chat-sidebar-toggler d-none",color:"inherit","aria-label":"open drawer",onClick:e.onMenuIconPress,children:Object(m.jsx)(N.a,{})}),Object(m.jsx)("div",{className:"mr-10",children:Object(m.jsx)("img",{src:z.photo_url,alt:"user profile",className:"rounded-circle",width:"40",height:"40"})}),Object(m.jsxs)("div",{className:"media-body mt-1",children:[Object(m.jsxs)("h5",{className:"mb-0",children:[z.first_name,"\xa0",z.last_name]}),Object(m.jsx)("span",{className:"font-xs text-muted",children:z.status})]})]}),Object(m.jsxs)("div",{children:[Object(m.jsx)(O.a,{className:"bg-primary text-white video-icon",children:Object(m.jsx)("i",{className:"zmdi zmdi-videocam"})}),Object(m.jsx)(O.a,{className:"bg-primary text-white",children:Object(m.jsx)("i",{className:"zmdi zmdi-attachment-alt"})}),Object(m.jsx)(O.a,{"aria-owns":d?"simple-menu":null,"aria-haspopup":"true",onClick:function(e){w(e.currentTarget)},children:Object(m.jsx)("i",{className:"zmdi zmdi-more-vert"})}),Object(m.jsx)(f.a,{id:"simple-menu",anchorEl:d,open:Boolean(d),onClose:D,children:["Mute Notifications","Block","Clear Chat","Send Contact"].map((function(e,t){return Object(m.jsx)(v.a,{onClick:D,children:e},t)}))})]})]})}),Object(m.jsx)(h.Scrollbars,{className:"rct-scroll",autoHide:!0,ref:t,style:{height:function(){var t=e.location,a=Object(U.b)(t);if(e.fullHeight)return"calc(100vh - 226px)";switch(a){case"app":return"calc(100vh - 198px)";case"agency":case"boxed":return"calc(100vh - 387px)";case"horizontal":return"calc(100vh - 250px)"}}()},children:Object(m.jsx)("div",{className:"chat-body p-30",children:z.previousChats.map((function(e,t){return Object(m.jsx)(b,{even:!e.isAdmin,selectedUserPhotoUrl:z.photo_url,data:e,adminPhotoUrl:M},t)}))})}),Object(m.jsxs)("div",{className:"chat-footer d-flex px-4 align-items-center py-3",children:[Object(m.jsx)("form",{onSubmit:function(e){return C(e)},className:"mr-3 w-100",children:Object(m.jsx)(u.a,{className:"mb-0",children:Object(m.jsx)(j.a,{type:"text",id:"search-msg",placeholder:"Type your message",value:i,className:"msg-input",onChange:function(e){return r(e.target.value)}})})}),Object(m.jsxs)(x.a,{variant:"contained",color:"primary",onClick:function(e){return C(e)},className:"submit-btn bg-primary",children:["Send",Object(m.jsx)("i",{className:"zmdi zmdi-mail-send ml-2"})]})]})]})})),D=a(524),C=a(525),z=a(11),M=a.n(z),S=function(e){var t=e.user,a=e.selectedUser,s=e.onClickListItem;return Object(m.jsx)(C.a,{onClick:s,className:M()("user-list-item",{"item-active":a&&a.id===t.id}),children:Object(m.jsxs)("div",{className:"d-flex justify-content-between w-100 align-items-center",children:[Object(m.jsxs)("div",{className:"media align-items-center w-90",children:[Object(m.jsxs)("div",{className:"media-left position-relative mr-10",children:[Object(m.jsx)("img",{src:t.photo_url,className:"img-fluid rounded-circle",alt:"user profile",width:"40",height:"40"}),t.isActive&&Object(m.jsx)("span",{className:"badge badge-success badge-xs p-5 rct-notify",children:"\xa0"})]}),Object(m.jsxs)("div",{className:"media-body pt-5",children:[Object(m.jsxs)("h5",{className:"mb-0",children:[t.first_name,"\xa0",t.last_name]}),Object(m.jsx)("span",{className:"font-xs d-block",children:Object(U.e)(t.last_chat,50)})]})]}),Object(m.jsx)("div",{className:"text-right msg-count",children:0!==t.new_message_count?Object(m.jsx)("span",{className:"badge badge-danger rounded-circle",children:t.new_message_count}):null})]})})};var _=function(e){var t=Object(p.c)(),a=Object(p.d)((function(e){return e.chatAppReducer}));Object(n.useEffect)((function(){s()}),[]);var s=function(){t(Object(y.D)())},c=a.recentChatUsers,i=a.selectedUser;return null===c?Object(m.jsx)("div",{className:"no-found-user-wrap",children:Object(m.jsx)("h4",{children:"No User Found"})}):Object(m.jsx)(D.a,{className:"p-0 mb-0",children:c&&c.map((function(e,a){return Object(m.jsx)(S,{selectedUser:i,user:e,onClickListItem:function(){return function(e){t(Object(y.l)(e))}(e)}},a)}))})};var A=Object(w.h)((function(e){var t=Object(p.c)(),a=Object(p.d)((function(e){return e.chatAppReducer})).searchUsers;return Object(m.jsxs)("div",{children:[Object(m.jsxs)("div",{className:"search-wrapper mb-0 position-relative",children:[Object(m.jsx)(j.a,{type:"text",name:"search-users",id:"search",className:"search-input rounded-0 py-2 px-3",placeholder:"Search",onChange:function(e){return function(e){t(Object(y.Lb)(e.target.value)),t(Object(y.fb)(e.target.value))}(e)},value:a}),Object(m.jsx)("i",{className:"zmdi zmdi-search search-icon"})]}),Object(m.jsx)("div",{className:"chat-list",children:Object(m.jsx)(h.Scrollbars,{className:"rct-scroll",autoHide:!0,style:{height:function(){var t=e.location;switch(Object(U.b)(t)){case"app":return"calc(100vh - 188px)";case"agency":case"boxed":return"calc(100vh - 372px)";case"horizontal":return"calc(100vh - 238px)"}}()},children:Object(m.jsx)(_,{})})})]})}));var I=function(){return Object(m.jsxs)("div",{className:"chat-sidebar",children:[Object(m.jsx)("div",{className:"user-wrap d-flex justify-content-between",children:Object(m.jsxs)("div",{className:"media align-items-center",children:[Object(m.jsx)("img",{src:"".concat("","/assets/images/avatars/user-15.jpg"),alt:"user-profile",className:"img-fluid rounded-circle mr-3",width:"50",height:"50"}),Object(m.jsx)("div",{className:"media-body mt-1",children:Object(m.jsx)("h3",{className:"text-white mb-0",children:"Jhon Doe"})}),Object(m.jsx)(O.a,{className:"btn-sm text-white",children:Object(m.jsx)("i",{className:"zmdi zmdi-more-vert text-white"})})]})}),Object(m.jsx)(A,{})]})};t.default=Object(l.a)((function(e){var t;return{root:{flexGrow:1,zIndex:1,overflow:"hidden",position:"relative",display:"flex",width:"100%"},toolbar:e.mixins.toolbar,drawerPaper:(t={width:230},Object(c.a)(t,e.breakpoints.up("md"),{position:"relative",width:310}),Object(c.a)(t,"backgroundColor","#fff"),t),content:{flexGrow:1}}}),{withTheme:!0})((function(e){var t=Object(n.useState)(!1),a=Object(s.a)(t,2),c=a[0],l=a[1],d=function(){l(!c)},b=e.classes,u=e.theme,j=Object(m.jsx)(I,{});return Object(m.jsxs)("div",{className:"chat-wrapper",children:[Object(m.jsxs)(o.a,{children:[Object(m.jsx)("title",{children:"Chat App"}),Object(m.jsx)("meta",{name:"description",content:"Automaton Chat App"})]}),Object(m.jsxs)("div",{className:b.root,children:[Object(m.jsx)(r.a,{mdUp:!0,className:"user-list-wrap",children:Object(m.jsx)(i.a,{variant:"temporary",anchor:"rtl"===u.direction?"right":"left",open:c,onClose:d,classes:{paper:b.drawerPaper},ModalProps:{keepMounted:!0},children:j})}),Object(m.jsx)(r.a,{smDown:!0,implementation:"css",className:"user-list-wrap",children:Object(m.jsx)(i.a,{variant:"permanent",open:!0,classes:{paper:b.drawerPaper},children:j})}),Object(m.jsx)("div",{className:"chat-content ".concat(b.content),children:Object(m.jsx)(k,{onMenuIconPress:d})})]})]})}))},652:function(e,t,a){"use strict";var s=a(13),c=a(15),n=a(5),i=a(1),r=a(18),l=a(22),o=a(525),d=i.forwardRef((function(e,t){var a,c=e.classes,l=e.className,d=e.component,m=void 0===d?"li":d,b=e.disableGutters,u=void 0!==b&&b,j=e.ListItemClasses,h=e.role,p=void 0===h?"menuitem":h,x=e.selected,O=e.tabIndex,f=Object(s.a)(e,["classes","className","component","disableGutters","ListItemClasses","role","selected","tabIndex"]);return e.disabled||(a=void 0!==O?O:-1),i.createElement(o.a,Object(n.a)({button:!0,role:p,tabIndex:a,component:m,selected:x,disableGutters:u,classes:Object(n.a)({dense:c.dense},j),className:Object(r.default)(c.root,l,x&&c.selected,!u&&c.gutters),ref:t},f))}));t.a=Object(l.a)((function(e){return{root:Object(n.a)({},e.typography.body1,Object(c.a)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:Object(n.a)({},e.typography.body2,{minHeight:"auto"})}}),{name:"MuiMenuItem"})(d)}}]);
//# sourceMappingURL=58.d35e063b.chunk.js.map