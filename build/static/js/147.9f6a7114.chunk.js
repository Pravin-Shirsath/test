(this.webpackJsonpreactify=this.webpackJsonpreactify||[]).push([[147],{2514:function(e,t,o){"use strict";o.r(t);var r=o(1),a=o(1449),l=o(1448),s=o(1457),n=o(126),i=o(0);a.f(s.a),t.default=function(){return Object(r.useEffect)((function(){var e=a.d("chartdiv",l.h);e.paddingRight=0;for(var t=[],o=10,r=1;r<366;r++)o+=Math.round((Math.random()<.5?1:-1)*Math.random()*10),t.push({date:new Date(2018,0,r),name:"name"+r,value:o});e.data=[{name:"Project 1",points:35654,color:e.colors.next(),bullet:"".concat("","/assets/images/img/logo-a.png")},{name:"Project 2",points:65456,color:e.colors.next(),bullet:"".concat("","/assets/images/img/logo-b.png")},{name:"Project 3",points:45724,color:e.colors.next(),bullet:"".concat("","/assets/images/img/logo-c.png")},{name:"Project 4",points:13654,color:e.colors.next(),bullet:"".concat("","/assets/images/img/logo-d.png")}];var s=e.xAxes.push(new l.b);s.dataFields.category="name",s.renderer.grid.template.disabled=!0,s.renderer.minGridDistance=30,s.renderer.inside=!0,s.renderer.labels.template.fill=a.c("#fff"),s.renderer.labels.template.fontSize=20;var n=e.yAxes.push(new l.g);n.renderer.grid.template.strokeDasharray="4,4",n.renderer.labels.template.disabled=!0,n.min=0,e.maskBullets=!1,e.paddingBottom=0;var i=e.series.push(new l.c);i.dataFields.valueY="points",i.dataFields.categoryX="name",i.columns.template.propertyFields.fill="color",i.columns.template.propertyFields.stroke="color",i.columns.template.column.cornerRadiusTopLeft=15,i.columns.template.column.cornerRadiusTopRight=15,i.columns.template.tooltipText="{categoryX}: [bold]{valueY}[/b]";var c=i.bullets.push(new l.a).createChild(a.b);return c.horizontalCenter="middle",c.verticalCenter="bottom",c.dy=20,c.y=a.e(100),c.propertyFields.href="bullet",c.tooltipText=i.columns.template.tooltipText,c.propertyFields.fill="color",c.filters.push(new a.a),function(){e&&e.dispose()}}),[]),Object(i.jsx)(n.b,{children:Object(i.jsx)("div",{id:"chartdiv",style:{width:"100%",height:"500px"}})})}}}]);
//# sourceMappingURL=147.9f6a7114.chunk.js.map