(this.webpackJsonpreactify=this.webpackJsonpreactify||[]).push([[90],{2503:function(e,t,s){"use strict";s.r(t);var a=s(7),c=s(1),n=s(973),i=s.n(n),o=s(477),r=s(527),l=s(872),d=s(476),u=s(14),b=(s(339),s(126)),m=s(107),j=s(10),f=s(0),h={toolbar:[[{header:[1,2,3,4,5,6,!1]}],[{font:[]}],["bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["link","image"],["clean"],[{align:[]}],["code-block"]]},x=["header","font","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image","align","code-block"];t.default=function(){var e=Object(c.useState)(!1),t=Object(a.a)(e,2),s=t[0],n=t[1];return Object(f.jsx)(c.Fragment,{children:s?Object(f.jsx)(m.a,{}):Object(f.jsxs)(c.Fragment,{children:[Object(f.jsxs)(o.a,{className:"editor",children:[Object(f.jsxs)("div",{className:"form-wrap row no-gutters",children:[Object(f.jsx)(r.a,{for:"exampleEmail",sm:2,children:"To :"}),Object(f.jsx)(l.a,{sm:10,children:Object(f.jsx)(d.a,{type:"email",name:"email",id:"exampleEmail"})})]}),Object(f.jsxs)("div",{className:"form-wrap row no-gutters",children:[Object(f.jsx)(r.a,{for:"exampleEmail",sm:2,children:"Subject :"}),Object(f.jsx)(l.a,{sm:10,children:Object(f.jsx)(d.a,{type:"text",name:"text",id:"exampleText"})})]})]}),Object(f.jsx)(i.a,{modules:h,formats:x,placeholder:"Enter Your Message.."}),Object(f.jsxs)(b.c,{children:[Object(f.jsx)("button",{type:"button",onClick:function(){return n(!0),void setTimeout((function(){n(!1),u.NotificationManager.success("Email has been sent successfully!")}),3e3)},className:"btn btn-success btn-sm mr-10",children:Object(f.jsx)(j.a,{id:"widgets.send"})}),Object(f.jsx)("button",{type:"button",onClick:function(){return n(!0),void setTimeout((function(){n(!1),u.NotificationManager.success("Email Saved!")}),3e3)},className:"btn btn-secondary btn-sm mr-10",children:Object(f.jsx)(j.a,{id:"widgets.saveAsDrafts"})})]})]})})}},872:function(e,t,s){"use strict";var a=s(5),c=s(23),n=s(1),i=s.n(n),o=s(2),r=s.n(o),l=s(11),d=s.n(l),u=s(9),b=["className","cssModule","widths","tag"],m=r.a.oneOfType([r.a.number,r.a.string]),j=r.a.oneOfType([r.a.bool,r.a.number,r.a.string,r.a.shape({size:r.a.oneOfType([r.a.bool,r.a.number,r.a.string]),order:m,offset:m})]),f={tag:u.o,xs:j,sm:j,md:j,lg:j,xl:j,className:r.a.string,cssModule:r.a.object,widths:r.a.array},h={tag:"div",widths:["xs","sm","md","lg","xl"]},x=function(e,t,s){return!0===s||""===s?e?"col":"col-"+t:"auto"===s?e?"col-auto":"col-"+t+"-auto":e?"col-"+s:"col-"+t+"-"+s},O=function(e){var t=e.className,s=e.cssModule,n=e.widths,o=e.tag,r=Object(c.a)(e,b),l=[];n.forEach((function(t,a){var c=e[t];if(delete r[t],c||""===c){var n=!a;if(Object(u.i)(c)){var i,o=n?"-":"-"+t+"-",b=x(n,t,c.size);l.push(Object(u.k)(d()(((i={})[b]=c.size||""===c.size,i["order"+o+c.order]=c.order||0===c.order,i["offset"+o+c.offset]=c.offset||0===c.offset,i)),s))}else{var m=x(n,t,c);l.push(m)}}})),l.length||l.push("col");var m=Object(u.k)(d()(t,l),s);return i.a.createElement(o,Object(a.a)({},r,{className:m}))};O.propTypes=f,O.defaultProps=h,t.a=O}}]);
//# sourceMappingURL=90.1b7e79f3.chunk.js.map