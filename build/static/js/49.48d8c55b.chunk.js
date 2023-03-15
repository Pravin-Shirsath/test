(this.webpackJsonpreactify=this.webpackJsonpreactify||[]).push([[49],{1156:function(e,a,t){"use strict";var n=t(5),i=t(722),r=t(7),o=t(13),s=t(1),c=(t(164),t(18)),d=t(535),l=t(182),u=t(22),b=t(696),p=t(109),f=s.forwardRef((function(e,a){var t=e.children,u=e.classes,f=e.className,m=e.defaultExpanded,j=void 0!==m&&m,h=e.disabled,x=void 0!==h&&h,O=e.expanded,g=e.onChange,v=e.square,C=void 0!==v&&v,N=e.TransitionComponent,y=void 0===N?d.a:N,R=e.TransitionProps,k=Object(o.a)(e,["children","classes","className","defaultExpanded","disabled","expanded","onChange","square","TransitionComponent","TransitionProps"]),E=Object(p.a)({controlled:O,default:j,name:"Accordion",state:"expanded"}),I=Object(r.a)(E,2),T=I[0],w=I[1],$=s.useCallback((function(e){w(!T),g&&g(e,!T)}),[T,g,w]),B=s.Children.toArray(t),q=Object(i.a)(B),A=q[0],P=q.slice(1),V=s.useMemo((function(){return{expanded:T,disabled:x,toggle:$}}),[T,x,$]);return s.createElement(l.a,Object(n.a)({className:Object(c.default)(u.root,f,T&&u.expanded,x&&u.disabled,!C&&u.rounded),ref:a,square:C},k),s.createElement(b.a.Provider,{value:V},A),s.createElement(y,Object(n.a)({in:T,timeout:"auto"},R),s.createElement("div",{"aria-labelledby":A.props.id,id:A.props["aria-controls"],role:"region"},P)))}));a.a=Object(u.a)((function(e){var a={duration:e.transitions.duration.shortest};return{root:{position:"relative",transition:e.transitions.create(["margin"],a),"&:before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:e.palette.divider,transition:e.transitions.create(["opacity","background-color"],a)},"&:first-child":{"&:before":{display:"none"}},"&$expanded":{margin:"16px 0","&:first-child":{marginTop:0},"&:last-child":{marginBottom:0},"&:before":{opacity:0}},"&$expanded + &":{"&:before":{display:"none"}},"&$disabled":{backgroundColor:e.palette.action.disabledBackground}},rounded:{borderRadius:0,"&:first-child":{borderTopLeftRadius:e.shape.borderRadius,borderTopRightRadius:e.shape.borderRadius},"&:last-child":{borderBottomLeftRadius:e.shape.borderRadius,borderBottomRightRadius:e.shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},expanded:{},disabled:{}}}),{name:"MuiAccordion"})(f)},1157:function(e,a,t){"use strict";var n=t(5),i=t(13),r=t(1),o=t(18),s=t(190),c=t(340),d=t(22),l=t(696),u=r.forwardRef((function(e,a){var t=e.children,d=e.classes,u=e.className,b=e.expandIcon,p=e.focusVisibleClassName,f=e.IconButtonProps,m=void 0===f?{}:f,j=e.onClick,h=Object(i.a)(e,["children","classes","className","expandIcon","focusVisibleClassName","IconButtonProps","onClick"]),x=r.useContext(l.a),O=x.disabled,g=void 0!==O&&O,v=x.expanded,C=x.toggle;return r.createElement(s.a,Object(n.a)({focusRipple:!1,disableRipple:!0,disabled:g,component:"div","aria-expanded":v,className:Object(o.default)(d.root,u,g&&d.disabled,v&&d.expanded),focusVisibleClassName:Object(o.default)(d.focusVisible,d.focused,p),onClick:function(e){C&&C(e),j&&j(e)},ref:a},h),r.createElement("div",{className:Object(o.default)(d.content,v&&d.expanded)},t),b&&r.createElement(c.a,Object(n.a)({className:Object(o.default)(d.expandIcon,v&&d.expanded),edge:"end",component:"div",tabIndex:null,role:null,"aria-hidden":!0},m),b))}));a.a=Object(d.a)((function(e){var a={duration:e.transitions.duration.shortest};return{root:{display:"flex",minHeight:48,transition:e.transitions.create(["min-height","background-color"],a),padding:e.spacing(0,2),"&:hover:not($disabled)":{cursor:"pointer"},"&$expanded":{minHeight:64},"&$focused, &$focusVisible":{backgroundColor:e.palette.action.focus},"&$disabled":{opacity:e.palette.action.disabledOpacity}},expanded:{},focused:{},focusVisible:{},disabled:{},content:{display:"flex",flexGrow:1,transition:e.transitions.create(["margin"],a),margin:"12px 0","&$expanded":{margin:"20px 0"}},expandIcon:{transform:"rotate(0deg)",transition:e.transitions.create("transform",a),"&:hover":{backgroundColor:"transparent"},"&$expanded":{transform:"rotate(180deg)"}}}}),{name:"MuiAccordionSummary"})(u)},1158:function(e,a,t){"use strict";var n=t(5),i=t(13),r=t(1),o=t(18),s=t(22),c=r.forwardRef((function(e,a){var t=e.classes,s=e.className,c=Object(i.a)(e,["classes","className"]);return r.createElement("div",Object(n.a)({className:Object(o.default)(t.root,s),ref:a},c))}));a.a=Object(s.a)((function(e){return{root:{display:"flex",padding:e.spacing(1,2,2)}}}),{name:"MuiAccordionDetails"})(c)},2578:function(e,a,t){"use strict";t.r(a);var n=t(7),i=t(1),r=t(1156),o=t(1158),s=t(1157),c=t(34),d=t(40),l=t(321),u=t(476),b=t(151),p=t(29),f=t(37),m=t(45),j=t(0);var h=function(){var e=Object(p.c)(),a=Object(p.d)((function(e){return e.feedback})),t=a.searchIdeaText;return Object(j.jsx)(m.a,{customClasses:"search-filter",children:Object(j.jsxs)("form",{children:[Object(j.jsx)("h2",{className:"heading mb-30",children:"Type Your Question"}),Object(j.jsx)(l.a,{className:"mb-0 w-40",children:Object(j.jsx)(u.a,{type:"text",name:"search",onChange:function(a){return function(a){e(Object(f.Ib)(a.target.value))}(a)},value:t})}),Object(j.jsx)(b.a,{variant:"contained",color:"primary",className:"text-white",onClick:function(){return function(){e(Object(f.yb)());var t=a.searchIdeaText;setTimeout((function(){e(Object(f.db)(t))}),1500)}()},children:"Search"})]})})};a.default=function(){var e=Object(i.useState)(null),a=Object(n.a)(e,2),t=a[0],l=a[1];Object(i.useEffect)((function(){u()}),[]);var u=function(){d.d.get("faqs.js").then((function(e){l(e.data)})).catch((function(e){}))};return Object(j.jsxs)("div",{className:"faq-page-wrapper",children:[Object(j.jsxs)(c.a,{children:[Object(j.jsx)("title",{children:"Faqs"}),Object(j.jsx)("meta",{name:"description",content:"Automaton Faqs Page"})]}),Object(j.jsx)(h,{}),t&&t.map((function(e,a){return Object(j.jsxs)(r.a,{className:"mb-30 panel",defaultExpanded:!0,children:[Object(j.jsx)(s.a,{expandIcon:Object(j.jsx)("i",{className:"zmdi zmdi-chevron-down"}),className:"m-0 panel-heading",children:Object(j.jsx)("h4",{children:e.title})}),Object(j.jsx)(o.a,{children:Object(j.jsx)("p",{children:e.content})})]},a)}))]})}},696:function(e,a,t){"use strict";var n=t(1),i=n.createContext({});a.a=i},722:function(e,a,t){"use strict";t.d(a,"a",(function(){return s}));var n=t(203),i=t(205),r=t(111),o=t(204);function s(e){return Object(n.a)(e)||Object(i.a)(e)||Object(r.a)(e)||Object(o.a)()}}}]);
//# sourceMappingURL=49.48d8c55b.chunk.js.map