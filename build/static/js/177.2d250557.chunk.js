(this.webpackJsonpreactify=this.webpackJsonpreactify||[]).push([[177],{2646:function(s,e,a){"use strict";a.r(e);var c=a(12),t=a(1),i=a(35),n=a(604),r=a(605),j=a(227),l=a(151),d=a(19),o=a(0);e.default=function(s){var e=Object(t.useState)(null),a=Object(c.a)(e,2),x=a[0],b=a[1],m=Object(t.useState)(null),g=Object(c.a)(m,2),O=g[0],u=g[1];Object(t.useEffect)((function(){u(!0),p()}),[]);var p=function(){i.a.get("https://data.fixer.io/api/latest?access_key=4e83fa57182d17c76a14535831d547c6").then((function(s){b(s.data),u(!1)})).catch((function(s){console.log(s),u(!1)}))};return O?Object(o.jsx)(j.a,{}):Object(o.jsxs)("div",{className:"stock-exchange",children:[null!==x&&Object(o.jsxs)(n.a,{className:"list-unstyled p-0",children:[Object(o.jsxs)(r.a,{children:[Object(o.jsxs)("span",{children:[Object(o.jsx)("img",{src:"".concat("","/assets/images/flag-icons/icons8-canada.png'"),className:"img-fluid mr-10",alt:"cad"})," CAD (Canadian Dollar)"]}),Object(o.jsxs)("span",{children:[Object(o.jsx)("i",{className:"ti-arrow-up text-success"})," ",x.rates?x.rates.CAD.toFixed(2):0]})]}),Object(o.jsxs)(r.a,{children:[Object(o.jsxs)("span",{children:[Object(o.jsx)("img",{src:"".concat("","/assets/images/flag-icons/icons8-germany.png"),className:"img-fluid mr-10",alt:"eur"})," EUR (Euro)"]}),Object(o.jsxs)("span",{children:[Object(o.jsx)("i",{className:"ti-arrow-down text-danger"})," ",x.rates?x.rates.EUR.toFixed(2):0]})]}),Object(o.jsxs)(r.a,{children:[Object(o.jsxs)("span",{children:[Object(o.jsx)("img",{src:"".concat("","/assets/images/flag-icons/icons8-south_korea.png"),className:"img-fluid mr-10",alt:"krw"})," KRW (Korea)"]}),Object(o.jsxs)("span",{children:[Object(o.jsx)("i",{className:"ti-arrow-down text-danger"})," ",x.rates?x.rates.NZD.toFixed(2):0]})]}),Object(o.jsxs)(r.a,{children:[Object(o.jsxs)("span",{children:[Object(o.jsx)("img",{src:"".concat("","/assets/images/flag-icons/icons8-india.png"),className:"img-fluid mr-10",alt:"inr"})," INR (Indian Rupees)"]}),Object(o.jsxs)("span",{children:[Object(o.jsx)("i",{className:"ti-arrow-up text-success"})," ",x.rates?x.rates.INR.toFixed(2):0]})]}),Object(o.jsxs)(r.a,{children:[Object(o.jsxs)("span",{children:[Object(o.jsx)("img",{src:"".concat("","/assets/images/icons8-singapore.png"),className:"img-fluid mr-10",alt:"sgd"})," SGD (Singapore Dollar)"]}),Object(o.jsxs)("span",{children:[Object(o.jsx)("i",{className:"ti-arrow-down text-danger"})," ",x.rates?x.rates.SGD.toFixed(2):0]})]})]}),Object(o.jsxs)(l.c,{customClasses:"border-0 fs-12 text-base",children:[Object(o.jsx)("i",{className:"mr-5 zmdi zmdi-refresh"}),Object(o.jsx)(d.a,{id:"widgets.updated10Minago"})]})]})}}}]);
//# sourceMappingURL=177.2d250557.chunk.js.map