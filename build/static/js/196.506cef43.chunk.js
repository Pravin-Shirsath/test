(this.webpackJsonpreactify=this.webpackJsonpreactify||[]).push([[196],{2546:function(e,t,c){"use strict";c.r(t);var a=c(1),s=c(7),n=c(22),r=c(473),i=c(2542),j=c(2401),d=c(105),l=c(1569),o=c(477),b=c(321),m=c(527),x=c(476),O=c(151),u=c(992),h=c.n(u),p=c(14),f=c(10),N=c(0);var v=function(e){var t=Object(a.useState)(),c=Object(s.a)(t,2),n=c[0],r=c[1],i=Object(a.useState)(),j=Object(s.a)(i,2),d=j[0],u=j[1],v=Object(a.useState)(),y=Object(s.a)(v,2),g=y[0],w=y[1],C=Object(a.useState)(),k=Object(s.a)(C,2),S=k[0],I=k[1],z=Object(a.useState)(),F=Object(s.a)(z,2),L=F[0],P=F[1],M=Object(a.useState)(),H=Object(s.a)(M,2),K=H[0],U=H[1],A=function(e){var t=e.target;P(t.name)},D=function(e){var t=e.target;U(""!==d&&""!==n&&""!==g&&""!==S),"number"===t.name?r(t.value.replace(/ /g,"")):"expiry"===t.name?w(t.value.replace(/ |\//g,"")):"cvc"===t.name?I(t.value.replace(/ |\//g,"")):u(t.value)};return Object(N.jsxs)("div",{className:"payment-wrap",children:[Object(N.jsx)("div",{className:"p-30 mb-30",children:Object(N.jsx)(l.a,{number:n,name:d,expiry:g,cvc:S,focused:L,preview:!0})}),Object(N.jsxs)("div",{className:"w-80 mx-auto",children:[Object(N.jsxs)(o.a,{children:[Object(N.jsxs)(b.a,{children:[Object(N.jsx)(m.a,{for:"cardNumber",children:Object(N.jsx)(f.a,{id:"components.cardNumber"})}),Object(N.jsx)(h.a,{type:"text",name:"number",className:"form-control",id:"cardNumber",onKeyUp:D,onFocus:A,mask:[/\d/,/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/,/\d/]})]}),Object(N.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(N.jsxs)(b.a,{className:"w-50 mr-10",children:[Object(N.jsx)(m.a,{for:"expiryDate",children:Object(N.jsx)(f.a,{id:"components.expiryDate"})}),Object(N.jsx)(h.a,{type:"text",name:"expiry",className:"form-control",id:"expiryDate",placeholder:"MM/YY",onKeyUp:D,onFocus:A,mask:[/\d/,/\d/,"/",/\d/,/\d/,/\d/,/\d/]})]}),Object(N.jsxs)(b.a,{className:"w-50 ml-10",children:[Object(N.jsx)(m.a,{for:"cvvNumber",children:Object(N.jsx)(f.a,{id:"components.cvv"})}),Object(N.jsx)(x.a,{type:"text",name:"cvc",id:"cvvNumber",onKeyUp:D,onFocus:A,maxLength:4})]})]}),Object(N.jsxs)(b.a,{children:[Object(N.jsx)(m.a,{for:"name",children:Object(N.jsx)(f.a,{id:"components.nameOnCard"})}),Object(N.jsx)(x.a,{type:"text",name:"name",id:"name",onKeyUp:D,onFocus:A})]})]}),Object(N.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(N.jsx)(O.a,{onClick:e.onChangeInfo,color:"secondary",className:"text-white",variant:"contained",children:Object(N.jsx)(f.a,{id:"button.back"})}),Object(N.jsx)(O.a,{disabled:!K,color:"primary",variant:"contained",onClick:function(){K&&p.NotificationManager.success("Payment Confirmed!")},children:Object(N.jsx)(f.a,{id:"components.confirmPayment"})})]})]})]})},y=c(15),g=c(3),w=c(872),C=c(532);var k=function(e){var t=Object(a.useState)({firstName:"",lastName:"",emailId:"",mobileNumber:"",addressLine1:"",addressLine2:"",country:"",zipCode:"",state:""}),c=Object(s.a)(t,2),n=c[0],r=c[1],i=function(e,t){var c=Object(g.a)(Object(g.a)({},n),{},Object(y.a)({},e,t));r(c)};return Object(N.jsxs)("div",{className:"billing-form-warp py-4",children:[Object(N.jsxs)(o.a,{children:[Object(N.jsxs)(b.a,{row:!0,children:[Object(N.jsxs)(w.a,{sm:6,children:[Object(N.jsxs)(m.a,{for:"firstName",children:[Object(N.jsx)(f.a,{id:"components.firstName"}),Object(N.jsx)("span",{className:"text-danger",children:"*"})]}),Object(N.jsx)(x.a,{type:"text",name:"first name",id:"firstName",className:"mb-4 mb-sm-0",onChange:function(e){return i("firstName",e.target.value)}})]}),Object(N.jsxs)(w.a,{sm:6,children:[Object(N.jsx)(m.a,{for:"lastName",children:Object(N.jsx)(f.a,{id:"components.lastName"})}),Object(N.jsx)(x.a,{type:"text",name:"last name",id:"lastName",onChange:function(e){return i("lastName",e.target.value)}})]})]}),Object(N.jsxs)(b.a,{row:!0,children:[Object(N.jsxs)(w.a,{sm:6,children:[Object(N.jsxs)(m.a,{for:"emailId",children:[Object(N.jsx)(f.a,{id:"components.email"}),Object(N.jsx)("span",{className:"text-danger",children:"*"})]}),Object(N.jsx)(x.a,{type:"email",name:"mail",id:"emailId",className:"mb-4 mb-sm-0",onChange:function(e){return i("emailId",e.target.value)}})]}),Object(N.jsxs)(w.a,{sm:6,children:[Object(N.jsxs)(m.a,{for:"contactNumber",children:[Object(N.jsx)(f.a,{id:"components.mobileNumber"}),Object(N.jsx)("span",{className:"text-danger",children:"*"})]}),Object(N.jsx)(x.a,{type:"tel",name:"number",id:"contactNumber",onChange:function(e){return i("mobileNumber",e.target.value)}})]})]}),Object(N.jsx)(b.a,{row:!0,children:Object(N.jsxs)(w.a,{sm:12,children:[Object(N.jsxs)(m.a,{for:"address1",children:[Object(N.jsx)(f.a,{id:"components.address"}),"1",Object(N.jsx)("span",{className:"text-danger",children:"*"})]}),Object(N.jsx)(x.a,{type:"textarea",name:"address",id:"address1",onChange:function(e){return i("addressLine1",e.target.value)}})]})}),Object(N.jsx)(b.a,{row:!0,children:Object(N.jsxs)(w.a,{sm:12,children:[Object(N.jsx)(m.a,{for:"address2",children:Object(N.jsx)(f.a,{id:"components.address2Optional"})}),Object(N.jsx)(x.a,{type:"textarea",name:"address",id:"address2",onChange:function(e){return i("addressLine2",e.target.value)}})]})}),Object(N.jsxs)(b.a,{row:!0,children:[Object(N.jsxs)(w.a,{sm:4,children:[Object(N.jsxs)(m.a,{for:"countryName",children:[Object(N.jsx)(f.a,{id:"components.country"}),Object(N.jsx)("span",{className:"text-danger",children:"*"})]}),Object(N.jsx)(x.a,{type:"text",name:"country",id:"countryName",className:"mb-4 mb-sm-0",onChange:function(e){return i("country",e.target.value)}})]}),Object(N.jsxs)(w.a,{sm:4,children:[Object(N.jsxs)(m.a,{for:"stateName",children:[Object(N.jsx)(f.a,{id:"components.state"}),Object(N.jsx)("span",{className:"text-danger",children:"*"})]}),Object(N.jsx)(x.a,{type:"text",name:"state",id:"stateName",className:"mb-4 mb-sm-0",onChange:function(e){return i("state",e.target.value)}})]}),Object(N.jsxs)(w.a,{sm:4,children:[Object(N.jsxs)(m.a,{for:"zip",children:[Object(N.jsx)(f.a,{id:"components.zip"}),Object(N.jsx)("span",{className:"text-danger",children:"*"})]}),Object(N.jsx)(x.a,{type:"number",name:"zip",id:"zip",onChange:function(e){return i("zipCode",e.target.value)}})]})]}),Object(N.jsx)(b.a,{row:!0,className:"mb-0",children:Object(N.jsx)(w.a,{sm:12,children:Object(N.jsxs)(m.a,{className:"ml-4",children:[Object(N.jsx)(x.a,{type:"checkbox"}),Object(N.jsx)(f.a,{id:"components.ShippingAddressText"})]})})}),Object(N.jsx)(C.a,{color:"danger",children:"All fields marked with an asterisk (*) are required"})]}),Object(N.jsx)("div",{className:"d-flex justify-content-end",children:Object(N.jsx)(O.a,{disabled:!function(){var e=n.firstName,t=n.emailId,c=n.mobileNumber,a=n.addressLine1,s=n.zipCode,r=n.country,i=n.state;return""!==e&&""!==t&&""!==a&&""!==c&&""!==s&&""!==r&&""!==i}(),onClick:e.onComplete,color:"primary",variant:"contained",children:Object(N.jsx)(f.a,{id:"components.saveContinue"})})})]})};function S(e){var t=e.children,c=e.dir;return Object(N.jsx)(d.a,{component:"div",dir:c,style:{padding:24},children:t})}var I=Object(n.a)(null,{withTheme:!0})((function(){var e=Object(a.useState)(0),t=Object(s.a)(e,2),c=t[0],n=t[1];return Object(N.jsx)("div",{className:"checkout-form-wrap",children:Object(N.jsxs)("div",{children:[Object(N.jsx)(r.a,{position:"static",color:"default",children:Object(N.jsxs)(i.a,{value:c,onChange:function(e,t){n(0)},indicatorColor:"primary",textColor:"primary",variant:"fullWidth",children:[Object(N.jsx)(j.a,{disabled:!0,label:Object(N.jsx)(f.a,{id:"components.billingAddress"})}),Object(N.jsx)(j.a,{disabled:!0,label:Object(N.jsx)(f.a,{id:"components.payment"})})]})}),0===c&&Object(N.jsx)(S,{children:Object(N.jsx)(k,{onComplete:function(){return n(1)}})}),1===c&&Object(N.jsx)(S,{children:Object(N.jsx)(v,{onChangeInfo:function(){return n(0)}})})]})})})),z=c(28),F=c(29),L=c(12),P=c(63),M=c(993),H=c.n(M);var K=function(){var e=Object(a.useState)(!1),t=Object(s.a)(e,2),c=t[0],n=t[1],r=Object(F.d)((function(e){return e.ecommerce})).cart,i=function(){if(0===r.length)return!0};return Object(N.jsxs)("div",{className:"checkout-item-wrap p-4",children:[Object(N.jsxs)("div",{className:"border-bottom d-flex justify-content-between align-items-center p-3",children:[Object(N.jsx)("span",{className:"font-weight-bold w-70",children:Object(N.jsx)(f.a,{id:"components.product"})}),Object(N.jsx)("span",{className:"font-weight-bold w-15",children:Object(N.jsx)(f.a,{id:"components.quantity"})}),Object(N.jsx)("span",{className:"font-weight-bold w-15",children:Object(N.jsx)(f.a,{id:"widgets.price"})})]}),i()?Object(N.jsx)("div",{className:"text-center p-4",children:Object(N.jsx)("h3",{children:Object(N.jsx)(f.a,{id:"components.NoItemFound"})})}):Object(N.jsx)(P.Scrollbars,{className:"rct-scroll",autoHeight:!0,autoHeightMin:100,autoHeightMax:450,autoHide:!0,children:Object(N.jsx)("ul",{className:"list-unstyled dropdown-body",children:r&&r.map((function(e,t){return Object(N.jsxs)("li",{className:"d-flex justify-content-between p-3",children:[Object(N.jsxs)("div",{className:"media overflow-hidden w-75",children:[Object(N.jsx)("div",{className:"mr-15",children:Object(N.jsx)("img",{src:e.image,alt:"products",className:"media-object",width:"63",height:"63"})}),Object(N.jsxs)("div",{className:"media-body text-truncate",children:[Object(N.jsx)("span",{className:"fs-14 d-block text-truncate",children:e.name}),Object(N.jsx)("span",{className:"fs-12 d-block text-muted text-truncate",children:e.description}),Object(N.jsx)("span",{className:"fs-12 d-block text-muted",children:e.brand})]})]}),Object(N.jsx)("div",{className:"w-10",children:Object(N.jsx)("span",{className:"text-muted fs-12 d-block mb-10",children:e.productQuantity})}),Object(N.jsx)("div",{className:"w-15",children:Object(N.jsxs)("span",{className:"text-muted fs-12 d-block mb-10",children:["$ ",e.price]})})]},t)}))})}),Object(N.jsxs)("div",{className:"border-top d-flex justify-content-between align-items-center py-4",children:[Object(N.jsx)("span",{className:"font-weight-bold text-muted",children:Object(N.jsx)(f.a,{id:"components.totalPrice"})}),Object(N.jsxs)("span",{className:"font-weight-bold",children:["$ ",function(){var e,t=0,c=Object(z.a)(r);try{for(c.s();!(e=c.n()).done;){t+=e.value.totalPrice}}catch(a){c.e(a)}finally{c.f()}return t.toFixed(2)}()]})]}),Object(N.jsx)("div",{className:"d-flex justify-content-end align-items-center",children:i()?Object(N.jsx)(O.a,{variant:"contained",color:"secondary",component:L.b,to:"/app/ecommerce/shop",className:"text-white",children:Object(N.jsx)(f.a,{id:"components.goToShop"})}):Object(N.jsx)(O.a,{variant:"contained",color:"primary",className:"text-white",onClick:function(){n(!0)},children:Object(N.jsx)(f.a,{id:"components.placeOrder"})})}),Object(N.jsx)(H.a,{success:!0,show:c,title:"Your Order Is Successfully Placed !",btnSize:"sm",onConfirm:function(){n(!1)}})]})},U=c(126),A=c(62);t.default=function(e){var t=e.match;return Object(N.jsxs)("div",{className:"checkout-wrap",children:[Object(N.jsx)(A.a,{title:Object(N.jsx)(f.a,{id:"sidebar.checkout"}),match:t}),Object(N.jsx)(U.a,{customClasses:"overflow-hidden",children:Object(N.jsx)(U.b,{noPadding:!0,children:Object(N.jsxs)("div",{className:"row no-gutters",children:[Object(N.jsx)("div",{className:"col-lg-8 col-md-6 col-sm-12",children:Object(N.jsx)(I,{})}),Object(N.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-12",children:Object(N.jsx)(K,{})})]})})})]})}}}]);
//# sourceMappingURL=196.506cef43.chunk.js.map