(this.webpackJsonpreactify=this.webpackJsonpreactify||[]).push([[232],{2600:function(e,t,s){"use strict";s.r(t),s.d(t,"default",(function(){return v}));var a=s(7),c=s(1),r=s(34),n=s(37),l=s(0);var i=function(){var e=Object(c.useState)(),t=Object(a.a)(e,2),s=t[0],r=t[1];Object(c.useEffect)((function(){i()}),[]);var i=function(){var e=JSON.parse(localStorage.getItem("token"));console.log("Token",e),null!==e&&Object(n.r)(e).then((function(e){200===(null===e||void 0===e?void 0:e.status)?(r(null===e||void 0===e?void 0:e.data),console.log("Profile Info ResponseData",null===e||void 0===e?void 0:e.data)):(null===e||void 0===e||e.status,console.log("Profile Info Response",e))})).catch((function(e){console.log(e)}))};return Object(l.jsx)("div",{className:"profile-content",children:Object(l.jsxs)("div",{className:"media align-items-center",children:[Object(l.jsx)("img",{src:"".concat("","/assets/images/avatars/user-15.jpg"),alt:"user profile",className:"rounded-circle bordered",width:"140",height:"140"}),Object(l.jsx)("div",{className:"media-body pt-25",children:Object(l.jsxs)("div",{className:"d-flex flex-column align-items-baseline",children:[Object(l.jsxs)("h2",{className:"user-name text-white",children:[null===s||void 0===s?void 0:s.first_name," ",null===s||void 0===s?void 0:s.last_name]}),Object(l.jsx)("h2",{children:null===s||void 0===s?void 0:s.username}),Object(l.jsx)("p",{children:null===s||void 0===s?void 0:s.email})]})})]})})},j=s(478),o=s(322),m=s(875),d=s(528),b=s(477),x=s(59),O=s(12),u=(s(1911),s(2356)),h=s(1912),f=s(127),N=s(63),g=s(10),p=(s(87),s(152));function v(e){var t=Object(c.useState)(JSON.parse(localStorage.getItem("ProfileData")).first_name),s=Object(a.a)(t,2),n=s[0],v=s[1],y=Object(c.useState)(JSON.parse(localStorage.getItem("ProfileData")).last_name),S=Object(a.a)(y,2),w=S[0],C=S[1],A=Object(c.useState)(JSON.parse(localStorage.getItem("ProfileData")).email),P=Object(a.a)(A,2),I=P[0],k=P[1],T=Object(c.useState)(JSON.parse(localStorage.getItem("ProfileData")).mobile_number),F=Object(a.a)(T,2),M=F[0],z=F[1],J=Object(c.useState)(""),Z=Object(a.a)(J,2),q=Z[0],D=Z[1],_=Object(c.useState)(""),$=Object(a.a)(_,2),E=$[0],L=$[1],U=Object(c.useState)(""),R=Object(a.a)(U,2),W=R[0],B=R[1],G=Object(c.useState)(""),H=Object(a.a)(G,2),K=H[0],Q=H[1],V=Object(c.useState)(""),X=Object(a.a)(V,2),Y=X[0],ee=X[1],te=Object(c.useState)(""),se=Object(a.a)(te,2),ae=se[0],ce=se[1],re=Object(c.useState)(""),ne=Object(a.a)(re,2),le=ne[0],ie=ne[1],je=Object(c.useState)(""),oe=Object(a.a)(je,2),me=oe[0],de=oe[1],be=Object(c.useState)(""),xe=Object(a.a)(be,2),Oe=xe[0],ue=xe[1],he=Object(c.useState)(""),fe=Object(a.a)(he,2),Ne=fe[0],ge=fe[1],pe=Object(c.useState)(""),ve=Object(a.a)(pe,2),ye=ve[0],Se=ve[1],we=Object(c.useState)(""),Ce=Object(a.a)(we,2),Ae=Ce[0],Pe=(Ce[1],Object(c.useState)("")),Ie=Object(a.a)(Pe,2),ke=Ie[0],Te=(Ie[1],Object(c.useState)("")),Fe=Object(a.a)(Te,2),Me=Fe[0],ze=(Fe[1],Object(c.useState)("")),Je=Object(a.a)(ze,2),Ze=Je[0],qe=Je[1],De=Object(c.useState)(""),_e=Object(a.a)(De,2),$e=_e[0],Ee=_e[1],Le=Object(c.useState)(""),Ue=Object(a.a)(Le,2),Re=Ue[0],We=Ue[1],Be=Object(c.useState)(""),Ge=Object(a.a)(Be,2),He=Ge[0],Ke=(Ge[1],Object(c.useState)(!1)),Qe=Object(a.a)(Ke,2),Ve=Qe[0],Xe=Qe[1];Object(x.g)();console.log({"firstName:":n,"lastName:":w,email:I,phone:M,country:q,"zipCode:":E,"state:":W,"companyName:":K,"billingAddress:":Y,"taxNumber:":ae,"companyAddress:":le});var Ye=function(){null!==JSON.parse(localStorage.getItem("token"))?O.NotificationManager.success("Profile Updated Successfully!"):O.NotificationManager.error("accessToken not found")};return Object(l.jsxs)("div",{className:"userProfile-wrapper",children:[Object(l.jsxs)(r.a,{children:[Object(l.jsx)("title",{children:"Automaton | User Profile"}),Object(l.jsx)("meta",{name:"description",content:"User Profile"})]}),Object(l.jsx)(N.a,{title:Object(l.jsx)(g.a,{id:"sidebar.userProfile"}),match:e.match}),Object(l.jsxs)(f.a,{"data-bs-spy":"scroll",children:[Object(l.jsx)(i,{}),Object(l.jsxs)(j.a,{className:"border",children:[Object(l.jsx)("section",{className:"border border-5 py-10 d-flex align-item-center justify-content-center bg-dark text-white",children:Object(l.jsx)("h2",{children:"Personal Details"})}),Object(l.jsxs)("div",{className:"edit-form",children:[Object(l.jsxs)(o.a,{row:!0,children:[Object(l.jsxs)(m.a,{sm:6,children:[Object(l.jsxs)(m.a,{sm:12,className:"d-flex ",children:[Object(l.jsx)(d.a,{for:"firstName",sm:3,className:"d-flex",children:"First Name"}),Object(l.jsx)("span",{className:"text-danger",children:"*"}),Object(l.jsx)(b.a,{type:"text",name:"firstname",className:"input-lg",value:n,onChange:function(e){return v(e.target.value)},sm:9})]}),Object(l.jsx)("div",{className:"d-flex align-item-center justify-content-center",children:Ve&&Object(l.jsx)("p",{className:"error mt-0",children:me})})]}),Object(l.jsxs)(m.a,{sm:6,children:[Object(l.jsxs)(m.a,{sm:12,className:"d-flex ",children:[Object(l.jsx)(d.a,{for:"lastName",sm:3,className:"d-flex",children:"Last Name"}),Object(l.jsx)("span",{className:"text-danger",children:"*"}),Object(l.jsx)(b.a,{type:"text",name:"lastName",className:"input-lg",value:w,onChange:function(e){return C(e.target.value)},sm:9})]}),Object(l.jsx)("div",{className:"d-flex align-item-center justify-content-center",children:Ve&&Object(l.jsx)("p",{className:"error mt-0",children:Oe})})]})]}),Object(l.jsxs)(o.a,{row:!0,children:[Object(l.jsxs)(m.a,{sm:6,children:[Object(l.jsxs)(m.a,{sm:12,className:"d-flex ",children:[Object(l.jsx)(d.a,{for:"email",sm:3,className:"d-flex",children:"Email Id"}),Object(l.jsx)("span",{className:"text-danger",children:"*"}),Object(l.jsx)(b.a,{type:"text",name:"email",className:"input-lg",value:I,onChange:function(e){return k(e.target.value)},sm:9})]}),Object(l.jsx)("div",{className:"d-flex align-item-center justify-content-center",children:Ve&&Object(l.jsx)("p",{className:"error mt-0",children:Ne})})]}),Object(l.jsxs)(m.a,{sm:6,children:[Object(l.jsxs)(m.a,{sm:12,className:"d-flex ",children:[Object(l.jsx)(d.a,{for:"state",sm:3,children:"State"}),Object(l.jsx)(h.b,{classes:"w-100 form-control form-control-lg",style:{fontSize:"19px",type:"text"},country:q,value:W,onChange:function(e){return B(e),console.log(e)}})]}),Object(l.jsx)("div",{className:"d-flex align-item-center justify-content-center",children:Ve&&Object(l.jsx)("p",{className:"error mt-0",children:Me})})]})]}),Object(l.jsxs)(o.a,{row:!0,children:[Object(l.jsxs)(m.a,{sm:6,children:[Object(l.jsxs)(m.a,{sm:12,className:"d-flex ",children:[Object(l.jsx)(d.a,{for:"country",sm:3,children:"Country"}),Object(l.jsx)(h.a,{classes:"w-100 form-control form-control-lg text-md",value:q,onChange:function(e){return D(e)},style:{fontSize:"17px",type:"text"}})]}),Object(l.jsx)("div",{className:"d-flex align-item-center justify-content-center",children:Ve&&Object(l.jsx)("p",{className:"error mt-0",children:Ae})})]}),Object(l.jsxs)(m.a,{sm:6,children:[Object(l.jsxs)(m.a,{sm:12,className:"d-flex ",children:[Object(l.jsx)(d.a,{for:"zipCode",sm:3,children:"Zipcode"}),Object(l.jsx)(b.a,{type:"text",name:"zipcode",className:"input-lg",value:E,onChange:function(e){return L(e.target.value)},sm:9})]}),Object(l.jsx)("div",{className:"d-flex align-item-center justify-content-center",children:Ve&&Object(l.jsx)("p",{className:"error mt-0",children:ke})})]})]}),Object(l.jsx)(o.a,{row:!0,children:Object(l.jsxs)(m.a,{sm:6,children:[Object(l.jsxs)(m.a,{sm:12,className:"d-flex ",children:[Object(l.jsx)(d.a,{for:"phone",sm:3,className:"d-flex",children:"Phone"}),Object(l.jsx)("span",{className:"text-danger",children:"*"}),Object(l.jsx)(u.a,{placeholder:"Enter phone number",value:M,onChange:function(e){return z(e)},defaultCountry:"IN",className:"w-100 form-control form-control-lg text-md",limitMaxLength:!0,sm:9})]}),Object(l.jsx)("div",{className:"d-flex align-item-center justify-content-center",children:Ve&&Object(l.jsx)("p",{className:"error mt-0",children:ye})})]})})]}),Object(l.jsx)("section",{className:"border border-5 py-10 d-flex align-item-center justify-content-center bg-dark text-white",children:Object(l.jsx)("h2",{children:"Company Details"})}),Object(l.jsxs)("div",{className:"edit-form",children:[Object(l.jsxs)(o.a,{row:!0,children:[Object(l.jsxs)(m.a,{sm:6,children:[Object(l.jsxs)(m.a,{sm:12,className:"d-flex ",children:[Object(l.jsx)(d.a,{for:"companyName",sm:3,className:"d-flex",children:"Company Name"}),Object(l.jsx)("span",{className:"text-danger",children:"*"}),Object(l.jsx)(b.a,{type:"text",name:"companyName",className:"input-lg",value:K,onChange:function(e){return Q(e.target.value)},sm:9})]}),Object(l.jsx)("div",{className:"d-flex align-item-center justify-content-center",children:Ve&&Object(l.jsx)("p",{className:"error mt-0",children:Ze})})]}),Object(l.jsxs)(m.a,{sm:6,children:[Object(l.jsxs)(m.a,{sm:12,className:"d-flex ",children:[Object(l.jsx)(d.a,{for:"billingAddress",sm:3,className:"d-flex",children:"Billing Address"}),Object(l.jsx)("span",{className:"text-danger",children:"*"}),Object(l.jsx)(b.a,{style:{height:120},type:"textarea",name:"billingAddress",className:"input-lg",value:Y,onChange:function(e){return ee(e.target.value)},sm:9})]}),Object(l.jsx)("div",{className:"d-flex align-item-center justify-content-center",children:Ve&&Object(l.jsx)("p",{className:"error mt-0",children:$e})})]})]}),Object(l.jsxs)(o.a,{row:!0,children:[Object(l.jsxs)(m.a,{sm:6,children:[Object(l.jsxs)(m.a,{sm:12,className:"d-flex ",children:[Object(l.jsx)(d.a,{for:"taxNumber",sm:3,className:"d-flex",children:"Tax Number"}),Object(l.jsx)("span",{className:"text-danger",children:"*"}),Object(l.jsx)(b.a,{type:"text",name:"taxNumber",className:"input-lg",value:ae,onChange:function(e){return ce(e.target.value)},sm:9})]}),Object(l.jsx)("div",{className:"d-flex align-item-center justify-content-center",children:Ve&&Object(l.jsx)("p",{className:"error mt-0",children:Re})})]}),Object(l.jsxs)(m.a,{sm:6,children:[Object(l.jsxs)(m.a,{sm:12,className:"d-flex ",children:[Object(l.jsx)(d.a,{for:"companyAddress",sm:3,children:"company Address"}),Object(l.jsx)(b.a,{type:"textarea",style:{height:120},name:"companyAddress",className:"input-lg",value:le,onChange:function(e){return ie(e.target.value)},sm:9})]}),Object(l.jsx)("div",{className:"d-flex align-item-center justify-content-center",children:Ve&&Object(l.jsx)("p",{className:"error mt-0",children:He})})]})]}),Object(l.jsxs)(o.a,{className:"row mt-50",children:[Object(l.jsx)(m.a,{sm:6,children:Object(l.jsxs)("h4",{children:["   ",Object(l.jsx)("span",{className:"text-danger",children:"*"})," Compulsory Field"]})}),Object(l.jsx)(m.a,{sm:6,children:Object(l.jsxs)("section",{className:"row ",children:[Object(l.jsx)(m.a,{sm:6,children:Object(l.jsx)(p.a,{color:"primary",className:"btn-block text-white px-50 fw-bold bg-primary.bg-gradient",variant:"contained",size:"medium",onClick:function(){var e=/^[a-zA-Z]{1,30}$/;""===I.trim()||null===M&&void 0===M||""===n.trim()||""===w.trim()||""===K.trim()||""===Y.trim()||""===ae.trim()?(de(""),ue(""),ge(""),Se(""),qe(""),We(""),Ee(""),""==I.trim()&&ge("* This is required Field"),""==n.trim()&&de("* This is required Field"),""==w.trim()&&ue("* This is required Field"),""==K.trim()&&qe("* This is required Field"),""==Y.trim()&&Ee("* This is required Field"),""==ae.trim()&&We("* This is required Field"),null==M&&Se("* This is required Field"),Xe(!0)):(Xe(!1),de(""),ue(""),ge(""),Se(""),qe(""),We(""),Ee(""),e.test(n.trim())?e.test(w.trim())?Object(u.b)(M+"".trim(""))?/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(I.trim(""))?/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(ae+"".trim(""))?""!=E&&/^[1-9][0-9]{5}$/.test(E.trim(""))?O.NotificationManager.error("Invalid Zip-Code format!"):Ye():O.NotificationManager.error("Invalid Tax format!"):O.NotificationManager.error("Invalid email format!"):O.NotificationManager.error("Phone number must be 10 digit long!"):O.NotificationManager.error("Last name must contain only alphabet and no spacings!"):O.NotificationManager.error("First name must contain only alphabet and no spacings!"))},style:{maxWidth:"150px"},children:"Save"})}),Object(l.jsx)(m.a,{sm:6,children:Object(l.jsx)(p.a,{color:"primary",className:"btn-block px-50 py-2 text-white fw-bold btn-danger",variant:"contained",size:"medium",style:{maxWidth:"150px"},children:"Cancel"})})]})})]})]})]})]})]})}}}]);
//# sourceMappingURL=232.83fbd480.chunk.js.map