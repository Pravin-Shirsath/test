(this.webpackJsonpreactify=this.webpackJsonpreactify||[]).push([[54],{2701:function(e,t,a){"use strict";a.r(t);var r=a(1),o=a(69),n=a(538),c=a(775),i=a(776),l=a(777),s=a(778),d=a(779),p=a(0),u=["Payment Id","Client Name","Payment Type","Paid Date","Amount"];t.default=function(e){var t=e.paymentlist;return Object(p.jsx)(r.Fragment,{children:Object(p.jsx)(o.Scrollbars,{className:"rct-scroll",autoHeight:!0,autoHeightMin:100,autoHeightMax:424,autoHide:!0,children:Object(p.jsxs)(c.a,{className:"table-wrap",children:[Object(p.jsx)(i.a,{children:Object(p.jsx)(l.a,{children:u.map((function(e,t){return Object(p.jsx)(s.a,{className:"fw-bold",children:e},t)}))})}),Object(p.jsx)(d.a,{children:t.map((function(e,t){return Object(p.jsxs)(l.a,{children:[Object(p.jsx)(s.a,{children:e.payid}),Object(p.jsxs)(s.a,{className:"fw-bold",children:[e.firstName," ",e.lastName]}),Object(p.jsx)(s.a,{children:Object(p.jsx)(n.a,{color:e.typeColor,children:e.paymentType})}),Object(p.jsx)(s.a,{children:e.paidDate}),Object(p.jsx)(s.a,{children:e.amount})]},t)}))})]})})})}},640:function(e,t,a){"use strict";var r=a(1),o=r.createContext();t.a=o},666:function(e,t,a){"use strict";var r=a(1),o=r.createContext();t.a=o},775:function(e,t,a){"use strict";var r=a(22),o=a(6),n=a(1),c=a(24),i=a(33),l=a(666),s="table",d=n.forwardRef((function(e,t){var a=e.classes,i=e.className,d=e.component,p=void 0===d?s:d,u=e.padding,b=void 0===u?"normal":u,m=e.size,g=void 0===m?"medium":m,h=e.stickyHeader,f=void 0!==h&&h,j=Object(r.a)(e,["classes","className","component","padding","size","stickyHeader"]),v=n.useMemo((function(){return{padding:b,size:g,stickyHeader:f}}),[b,g,f]);return n.createElement(l.a.Provider,{value:v},n.createElement(p,Object(o.a)({role:p===s?null:"table",ref:t,className:Object(c.default)(a.root,i,f&&a.stickyHeader)},j)))}));t.a=Object(i.a)((function(e){return{root:{display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":Object(o.a)({},e.typography.body2,{padding:e.spacing(2),color:e.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},stickyHeader:{borderCollapse:"separate"}}}),{name:"MuiTable"})(d)},776:function(e,t,a){"use strict";var r=a(6),o=a(22),n=a(1),c=a(24),i=a(33),l=a(640),s={variant:"head"},d="thead",p=n.forwardRef((function(e,t){var a=e.classes,i=e.className,p=e.component,u=void 0===p?d:p,b=Object(o.a)(e,["classes","className","component"]);return n.createElement(l.a.Provider,{value:s},n.createElement(u,Object(r.a)({className:Object(c.default)(a.root,i),ref:t,role:u===d?null:"rowgroup"},b)))}));t.a=Object(i.a)({root:{display:"table-header-group"}},{name:"MuiTableHead"})(p)},777:function(e,t,a){"use strict";var r=a(6),o=a(22),n=a(1),c=a(24),i=a(33),l=a(640),s=a(41),d=n.forwardRef((function(e,t){var a=e.classes,i=e.className,s=e.component,d=void 0===s?"tr":s,p=e.hover,u=void 0!==p&&p,b=e.selected,m=void 0!==b&&b,g=Object(o.a)(e,["classes","className","component","hover","selected"]),h=n.useContext(l.a);return n.createElement(d,Object(r.a)({ref:t,className:Object(c.default)(a.root,i,h&&{head:a.head,footer:a.footer}[h.variant],u&&a.hover,m&&a.selected),role:"tr"===d?null:"row"},g))}));t.a=Object(i.a)((function(e){return{root:{color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,"&$hover:hover":{backgroundColor:e.palette.action.hover},"&$selected, &$selected:hover":{backgroundColor:Object(s.a)(e.palette.secondary.main,e.palette.action.selectedOpacity)}},selected:{},hover:{},head:{},footer:{}}}),{name:"MuiTableRow"})(d)},778:function(e,t,a){"use strict";var r=a(22),o=a(6),n=a(1),c=a(24),i=a(33),l=a(34),s=a(41),d=a(666),p=a(640),u=n.forwardRef((function(e,t){var a,i,s=e.align,u=void 0===s?"inherit":s,b=e.classes,m=e.className,g=e.component,h=e.padding,f=e.scope,j=e.size,v=e.sortDirection,y=e.variant,x=Object(r.a)(e,["align","classes","className","component","padding","scope","size","sortDirection","variant"]),O=n.useContext(d.a),N=n.useContext(p.a),w=N&&"head"===N.variant;g?(i=g,a=w?"columnheader":"cell"):i=w?"th":"td";var k=f;!k&&w&&(k="col");var C=h||(O&&O.padding?O.padding:"normal"),H=j||(O&&O.size?O.size:"medium"),R=y||N&&N.variant,z=null;return v&&(z="asc"===v?"ascending":"descending"),n.createElement(i,Object(o.a)({ref:t,className:Object(c.default)(b.root,b[R],m,"inherit"!==u&&b["align".concat(Object(l.a)(u))],"normal"!==C&&b["padding".concat(Object(l.a)(C))],"medium"!==H&&b["size".concat(Object(l.a)(H))],"head"===R&&O&&O.stickyHeader&&b.stickyHeader),"aria-sort":z,role:a,scope:k},x))}));t.a=Object(i.a)((function(e){return{root:Object(o.a)({},e.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:"1px solid\n    ".concat("light"===e.palette.type?Object(s.j)(Object(s.a)(e.palette.divider,1),.88):Object(s.b)(Object(s.a)(e.palette.divider,1),.68)),textAlign:"left",padding:16}),head:{color:e.palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium},body:{color:e.palette.text.primary},footer:{color:e.palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)},sizeSmall:{padding:"6px 24px 6px 16px","&:last-child":{paddingRight:16},"&$paddingCheckbox":{width:24,padding:"0 12px 0 16px","&:last-child":{paddingLeft:12,paddingRight:16},"& > *":{padding:0}}},paddingCheckbox:{width:48,padding:"0 0 0 4px","&:last-child":{paddingLeft:0,paddingRight:4}},paddingNone:{padding:0,"&:last-child":{padding:0}},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right",flexDirection:"row-reverse"},alignJustify:{textAlign:"justify"},stickyHeader:{position:"sticky",top:0,left:0,zIndex:2,backgroundColor:e.palette.background.default}}}),{name:"MuiTableCell"})(u)},779:function(e,t,a){"use strict";var r=a(6),o=a(22),n=a(1),c=a(24),i=a(33),l=a(640),s={variant:"body"},d="tbody",p=n.forwardRef((function(e,t){var a=e.classes,i=e.className,p=e.component,u=void 0===p?d:p,b=Object(o.a)(e,["classes","className","component"]);return n.createElement(l.a.Provider,{value:s},n.createElement(u,Object(r.a)({className:Object(c.default)(a.root,i),ref:t,role:u===d?null:"rowgroup"},b)))}));t.a=Object(i.a)({root:{display:"table-row-group"}},{name:"MuiTableBody"})(p)}}]);
//# sourceMappingURL=54.fecd25dd.chunk.js.map