(this.webpackJsonpreactify=this.webpackJsonpreactify||[]).push([[72],{2563:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return g}));var a=n(12),i=n(1),l=n(47),c=n(284),s=n(899),o=n.n(s),r=n(27),u=n(689),d=n.n(u),b=n(59),j=n(70),v=(n(385),n(62)),m=n(234),h=n(643),f=n(21),O=n(0);function g(e){var t,n=e.location,s=(Object(b.g)(),Object(i.useState)([])),u=Object(a.a)(s,2),g=u[0],p=u[1],x=Object(i.useState)([]),N=Object(a.a)(x,2),y=N[0],k=N[1],S=Object(i.useState)(""),w=Object(a.a)(S,2),C=w[0],I=w[1],M=Object(i.useState)(1),E=Object(a.a)(M,2),P=E[0],_=E[1],D=Object(i.useState)(""),J=Object(a.a)(D,2),F=J[0],R=J[1],L=Object(i.useState)(!1),T=Object(a.a)(L,2),U=(T[0],T[1]),q=Object(i.useState)(!1),A=Object(a.a)(q,2),B=(A[0],A[1]);Object(i.useEffect)((function(){localStorage.getItem("isLoggedIn");W()}),[]);var W=function(){var e=JSON.parse(localStorage.getItem("token"));null!==e&&Object(v.I)(e,P).then((function(e){var t,n,a;200===(null===e||void 0===e?void 0:e.status)&&(p(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.results),k(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.results),R(parseInt(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.count)))})).catch((function(e){var t;401==(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.status)&&Object(m.a)(e)}))};return Object(O.jsxs)("div",{className:"user-management",children:[Object(O.jsxs)(l.a,{children:[Object(O.jsxs)("title",{children:[" ",f.a.brandName," | Customers List"]}),Object(O.jsx)("meta",{name:"description",content:"".concat(f.a.brandName," Widgets")})]}),Object(O.jsx)(h.a,{currentPage:"Customer Management",data:null===n||void 0===n||null===(t=n.state)||void 0===t?void 0:t.breadcrumbData}),Object(O.jsx)(j.a,{children:Object(O.jsxs)("div",{className:"table-responsive",children:[Object(O.jsx)("div",{className:"d-flex py-20 px-10 border-bottom",style:{justifyContent:"space-between"},children:Object(O.jsxs)("div",{className:"search-row",children:[Object(O.jsx)("input",{type:"text",placeholder:"Search",className:"search-input py-2",style:{border:"none",borderBottom:"1px solid black"},value:C,onChange:function(e){return I(e.target.value)}}),Object(O.jsx)(c.a,{variant:"contained",color:"primary",className:"text-white mx-5",style:{cursor:"pointer"},onClick:function(){var e=JSON.parse(localStorage.getItem("token"));null!==e&&Object(v.L)(e,C).then((function(e){var t,n;200===(null===e||void 0===e?void 0:e.status)&&(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.results.length)>0?(k(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.results),I("")):(k(g),I(""),r.NotificationManager.error("No user found!"))})).catch((function(e){}))},children:"Search"})]})}),Object(O.jsxs)("table",{className:"table table-middle table-hover mb-0",children:[Object(O.jsx)("thead",{children:Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{}),Object(O.jsx)("th",{children:"No"}),Object(O.jsx)("th",{children:"User"}),Object(O.jsx)("th",{children:"Email"}),Object(O.jsx)("th",{children:"Phone"}),Object(O.jsx)("th",{children:"Action"})]})}),Object(O.jsx)("tbody",{children:y&&y.map((function(e,t,n){var a=null===e||void 0===e?void 0:e.is_active;return Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{}),Object(O.jsx)("td",{children:null===e||void 0===e?void 0:e.id}),Object(O.jsx)("td",{children:null===e||void 0===e?void 0:e.username}),Object(O.jsx)("td",{children:null!==e&&void 0!==e&&e.email?null===e||void 0===e?void 0:e.email:"-"}),Object(O.jsx)("td",{children:null!==e&&void 0!==e&&e.mobile_number?null===e||void 0===e?void 0:e.mobile_number:"-"}),Object(O.jsx)("td",{className:"list-action",style:{display:"flex",gap:"3px"},children:Object(O.jsx)(o.a,{onClick:function(){return function(e,t){var n=JSON.parse(localStorage.getItem("token"));null!==n&&(null!==e&&void 0!==e&&e.is_active?Object(v.m)(n,e.id).then((function(e){200===(null===e||void 0===e?void 0:e.status)?(B(!1),U(!0),console.log("Response",e),setTimeout((function(){U(!1),W(),r.NotificationManager.success("User disable successfully  !! ")}),2e3)):(null===e||void 0===e||e.status,B(!1),r.NotificationManager.error("Error while disable user"))})).catch((function(e){B(!1),r.NotificationManager.error("Error while disable user")})):Object(v.n)(n,e.id).then((function(e){200===(null===e||void 0===e?void 0:e.status)?(B(!1),U(!0),console.log("Response",e),setTimeout((function(){U(!1),W(),r.NotificationManager.success("User enable successfully  !! ")}),2e3)):(null===e||void 0===e||e.status,B(!1),r.NotificationManager.error("Error while enable user"))})).catch((function(e){B(!1),r.NotificationManager.error("Error while enable user")})))}(e)},on:a,className:1==(null===e||void 0===e?void 0:e.is_active)?"bg-primary":"bg-danger"})})]},t)}))})]}),(null===g||void 0===g?void 0:g.length)>0&&Object(O.jsx)("div",{className:"paginationDiv",children:Object(O.jsx)(d.a,{activePage:P,itemsCountPerPage:10,pageRangeDisplayed:5,onChange:function(e){return function(e){if(P!==e){var t=JSON.parse(localStorage.getItem("token"));null!==t&&Object(v.I)(t,e).then((function(e){var t,n,a;200===(null===e||void 0===e?void 0:e.status)&&(p(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.results),k(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.results),R(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.count))})).catch((function(e){})),_(e)}}(e)},itemClass:"page-item",linkClass:"page-link",hideFirstLastPages:!0,totalItemsCount:F})})]})})]})}},643:function(e,t,n){"use strict";var a=n(11),i=n(26),l=n(12),c=n(1),s=n(59),o=(n(644),n(0));t.a=function(e){var t=e.currentPage,n=e.data,r=void 0===n?[]:n,u=(e.props,Object(c.useState)(r)),d=Object(l.a)(u,2);d[0],d[1];Object(c.useEffect)((function(){}),[]);var b=Object(s.g)();console.log(r,"daaata..");var j=function(){var e=Object(i.a)(Object(a.a)().mark((function e(t,n){var i,l;return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(i=[],l=0;l<n;l++)i.push(r[l]);console.log(i,"myarray"),b.push(t.url,{breadcrumbData:i});case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return Object(o.jsxs)("div",{className:"page-title d-flex  align-items-center",children:[void 0!=r&&r.length>0&&r.map((function(e,t){return Object(o.jsxs)("div",{className:"page-title-wrap  d-flex  align-items-center mr-1 bread-titile-box",style:{cursor:"pointer"},children:[Object(o.jsx)("i",{className:"ti-angle-left text-dark  custombredcrum-icon"})," ",Object(o.jsx)("span",{onClick:function(){return j(e,t)},className:"globalFontFamily custombredcrum-heding",children:e.name})]},t)})),Object(o.jsxs)("div",{className:"page-title-wrap   d-flex  align-items-center text-white m-0",style:{cursor:"pointer"},children:[Object(o.jsx)("i",{className:"ti-angle-left  text-white custombredcrum-icon"}),Object(o.jsx)("span",{className:"globalFontFamily custombredcrum-heding",children:t})]})]})}},644:function(e,t,n){},899:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l(n(3)),i=l(n(1));function l(e){return e&&e.__esModule?e:{default:e}}var c={on:a.default.bool.isRequired,onClick:a.default.func.isRequired,enabled:a.default.bool,className:a.default.string};function s(e){var t=e.on,n=e.onClick,a=e.onDisabledClick,l=e.enabled,c=e.className,s=e.children,o=["switch",c,t?"on ":"",l?"":"disabled "].join(" ");return i.default.createElement("div",{className:o,onClick:function(e){return l?n(e):a(e)}},i.default.createElement("div",{className:"switch-toggle",children:s}))}s.propTypes=c,s.defaultProps={enabled:!0,className:"",onDisabledClick:function(){}},t.default=s}}]);
//# sourceMappingURL=72.5ef2d36a.chunk.js.map