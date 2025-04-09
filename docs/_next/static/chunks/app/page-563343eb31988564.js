(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{39547:(e,t,a)=>{Promise.resolve().then(a.bind(a,43405))},43405:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>eo});var r=a(95155),n=a(29839),s=a(38309),o=a(22548),i=a(12115),l=a(71803),c=a(3127),d=a(54688),u=a(54581),h=a(41218),x=a(65221),y=a(16632),m=a(73731),p=a(48459),b=a(96490),f=a(68534),j=a(16652),g=a(14426),A=a(700),v=a(26803),k=a(43846),w=a(88542),C=a(26152),_=a(45777),S=a(38346),E=a(20516),M=a(89897),z=a(81197);let R={10:"Total",11:"Agriculture, Forestry, Fishing and Hunting",21:"Mining, Quarrying, and Oil and Gas Extraction",22:"Utilities",23:"Construction",31:"Manufacturing",42:"Wholesale Trade",44:"Retail Trade",48:"Transportation and Warehousing",51:"Information",52:"Finance and Insurance",53:"Real Estate and Rental and Leasing",54:"Professional, Scientific, and Technical Services",55:"Management of Companies and Enterprises",56:"Administrative and Support and Waste Management and Remediation Services",61:"Educational Services",62:"Health Care and Social Assistance",71:"Arts, Entertainment, and Recreation",72:"Accommodation and Food Services",81:"Other Services",92:"Public Administration"},L={zoom:1.5,center:[-96,38]};function I(e){let{view:t,selection:a,map:n}=e,{mode:s}=(0,d.Ut)(),o=(0,i.useRef)(null);(0,i.useEffect)(()=>{(0,v.Y)([C.a,_.a,S.a,w.a,z.a,E.a])},[]),(0,i.useEffect)(()=>{if(n){let e=o.current?(0,k.Ts)(o.current,s,{renderer:"canvas"}):null;(0,M.ZB)("counties")||(0,M.mz)("counties",n.shapes);let t=()=>e&&e.resize();return window.addEventListener("resize",t),e&&e.on("georoam",t=>{"totalZoom"in t?L.zoom=t.totalZoom:L.center=e.getOption().series[0].center}),()=>{e&&e.dispose(),window.removeEventListener("resize",t)}}},[s,n]);let l=t.sector in R?R[t.sector]:t.sector;return(0,i.useEffect)(()=>{if(o.current){let e=(0,k.FP)(o.current);if(e&&n&&a.length){let r="dark"===s?{bg:"#121212",text:"#ffffff"}:{bg:"#ffffff",text:"#000000"};e.setOption({backgroundColor:r.bg,title:{text:"".concat(l," employment in ").concat(t.year)},tooltip:{trigger:"item",textStyle:{color:r.text},backgroundColor:r.bg,borderWidth:0,formatter:e=>{let{marker:a,name:r,data:n}=e;return"<div>"+a+n.label+" ("+r+"), "+t.year+"<table><thead><tr><td><u>Sector</u></td><td><u>Employed</u></td></tr></thead>"+"<tbody><tr><td>".concat(l,"</td><td><strong>").concat(n.value,"</strong></td></tr>")+(n.sectors?n.sectors.filter((e,t)=>e.label!==l&&t<6).map(e=>"<tr><td>".concat(e.label,"</td><td>").concat(e.value,"</td></tr>")).join(""):"")+"</tbody></table></div>"}},visualMap:{name:"Employed",calculable:!0,max:2*function(e,t){if(!t.length)return 0;let a=.5*(t.length-1),r=a%1,n=Math.ceil(a);return t[Math.floor(a)].value*r+t[n].value*(1-r)}(0,a),inRange:{color:["#7E1700","#C8E9B6","#1549A2"]}},series:[{type:"map",roam:!0,map:"counties",nameProperty:"geoid",data:a,zoom:L.zoom,center:L.center}],toolbox:{feature:{myReset:{title:"reset view",icon:"path://M-2.7513 -7.5L-5.9524 -4.2989L-2.6984 -1.045M-5.8466 -4.2989L5.9524 -4.2989L5.9524 7.5L-5.8466 7.5L-5.8466 0.6217",onclick:()=>{L.zoom=1.5,L.center=[-98,38],e.setOption({series:[{zoom:L.zoom,center:L.center}]})}},saveAsImage:{name:"industryatlas_".concat(t.sector,"_").concat(t.year,"_").concat($)}}}},!0,!0)}}},[a,n,s,l,t]),(0,r.jsx)(u.A,{ref:o,sx:{width:"100%",height:"100%",minHeight:"10px"}})}var O=a(69242),F=a(56278),P=a(54492),N=a(99927),T=a(6874),U=a.n(T);function W(){let[e,t]=(0,i.useState)(!1),a=()=>t(!e);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(f.A,{onClick:a,variant:"outlined",size:"large",children:"About"}),e&&(0,r.jsxs)(F.A,{open:e,onClose:a,children:[(0,r.jsx)(P.A,{children:"About"}),(0,r.jsx)(c.A,{"aria-label":"close about dialog",onClick:a,sx:{position:"absolute",right:8,top:12},className:"close-button",children:(0,r.jsx)(O.A,{})}),(0,r.jsx)(N.A,{children:(0,r.jsxs)(l.A,{spacing:1,children:[(0,r.jsxs)(A.A,{children:["This site is a rework of"," ",(0,r.jsx)(U(),{href:"https://github.com/kenny101/industryatlas",rel:"noreferrer",target:"_blank",children:"industryatlas.org"}),"."]}),(0,r.jsxs)(A.A,{children:["It is built around the same"," ",(0,r.jsx)(U(),{href:"https://www.fpeckert.me/cbp/",rel:"noreferrer",target:"_blank",children:"County Business Patterns Database"})," ","as of ",$,", which was created as part of the"," ",(0,r.jsx)(U(),{href:"https://www.nber.org/papers/w26632",rel:"noreferrer",target:"_blank",children:"Imputing Missing Values in the US Census Bureau's County Business Patterns"})," ","paper."]}),(0,r.jsxs)(A.A,{children:["It was made by the Yale"," ",(0,r.jsx)(U(),{href:"https://dissc.yale.edu/",rel:"noreferrer",target:"_blank",children:"Data Intensive Social Science Center"}),"."]}),(0,r.jsxs)(A.A,{children:["View its source at"," ",(0,r.jsx)(U(),{href:"https://github.com/dissc-yale/industryatlas",rel:"noreferrer",target:"_blank",children:"dissc-yale/industryatlas"}),"."]})]})})]})]})}var B=a(79543),D=a(7756),H=a(13909),G=a(78321),Y=a(86731),Z=a(40117),V=a(96253),q=a(4915),Q=a(90835),J=a(71977);function K(e){let{view:t,sectors:a,selection:n}=e,[s,o]=(0,i.useState)(!1),d=()=>o(!s),[u,h]=(0,i.useState)(!1),x="industryatlas".concat(u?"":"10"===t.sector?"_total":"_"+t.sector,"_").concat(t.year,"_v").concat($,".csv");return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(f.A,{onClick:d,variant:"outlined",size:"large",children:"Download"}),s&&(0,r.jsxs)(F.A,{open:s,onClose:d,children:[(0,r.jsx)(P.A,{children:"Export"}),(0,r.jsx)(c.A,{"aria-label":"close download dialog",onClick:d,sx:{position:"absolute",right:8,top:12},className:"close-button",children:(0,r.jsx)(O.A,{})}),(0,r.jsx)(N.A,{children:(0,r.jsxs)(l.A,{spacing:1,children:[(0,r.jsx)(q.A,{sx:{float:"right"},label:"Include all sectors",labelPlacement:"start",control:(0,r.jsx)(Q.A,{checked:u,onChange:()=>h(!u)})}),(0,r.jsxs)(A.A,{children:["File (",n.length," x ",u?a.length+1:2,"): ",(0,r.jsx)("code",{children:x})]})]})}),(0,r.jsx)(J.A,{children:(0,r.jsx)(f.A,{variant:"contained",onClick:()=>{let e=document.createElement("a");document.body.appendChild(e),e.rel="noreferrer",e.target="_blank",e.download=x,e.href=URL.createObjectURL(new Blob(u?["county,"+a.join(",")+"\n"+n.map(e=>'"'+e.name+'",'+e.sectors.map(e=>null===e?"NA":e).join(",")).join("\n")]:["county,employed\n"+n.map(e=>'"'+e.name+'",'+e.value).join("\n")],{type:"text/csv; charset=utf-8"})),setTimeout(function(){e.dispatchEvent(new MouseEvent("click")),URL.revokeObjectURL.bind(null,e.href),document.body.removeChild(e)},0)},children:"Download"})})]})]})}var X=a(42047);let $="2025-04",ee={year:2016,sector:"10"},et={by_sector:{},by_year:{}};function ea(e,t){return t.value-e.value}function er(e){let{count:t,page:a,onPageChange:n}=e,s=Math.ceil(t/100)-1,o=0===a,i=a===s;return(0,r.jsxs)(l.A,{direction:"row",children:[(0,r.jsx)(c.A,{"aria-label":"Go to first page",disabled:o,onClick:e=>n(e,0),children:(0,r.jsx)(B.A,{})}),(0,r.jsx)(c.A,{"aria-label":"Go to previous page",disabled:o,onClick:e=>n(e,a-1),children:(0,r.jsx)(D.A,{})}),(0,r.jsx)(c.A,{"aria-label":"Go to next page",disabled:i,onClick:e=>n(e,a+1),children:(0,r.jsx)(H.A,{})}),(0,r.jsx)(c.A,{"aria-label":"Go to last page",disabled:i,onClick:e=>n(e,s),children:(0,r.jsx)(G.A,{})})]})}function en(){let{mode:e,setMode:t}=(0,d.Ut)(),[a,n]=(0,i.useState)({sector:[]}),[s,o]=(0,i.useState)({year:[]}),v=(0,i.useMemo)(()=>{let e={...ee},t=window.location.search;return t&&t.substring(1).split("&").forEach(t=>{let a=t.split("=");a[0]in e&&(e[a[0]]="year"===a[0]?+a[1]:a[1])}),e},[]),[k,w]=(0,i.useState)(v),C=e=>{let t={...k,[e.key]:e.value},a=[];t.year!==ee.year&&a.push("year="+t.year),t.sector!==ee.sector&&a.push("sector="+t.sector),requestAnimationFrame(()=>window.history.replaceState(void 0,"","?"+a.join("&"))),w(t)},[_,S]=(0,i.useState)(null);(0,i.useEffect)(()=>{fetch("counties_2010.geojson").then(async e=>{let t=await e.json(),a={};t.features.forEach(e=>{a[e.properties.geoid]=e.properties}),S({shapes:t,info:a})})},[]);let E=(0,i.useMemo)(()=>{let e=a.sector,t=a.sector.findIndex(e=>e===k.sector),r=[];return Object.keys(a).forEach((n,s)=>{"sector"!==n&&r.push({name:n,label:_&&n in _.info?_.info[n].region_name:n,value:a[n][t],index:s,sectors:a[n].map((t,a)=>({label:e[a]in R?R[e[a]]:e[a],value:t})).sort(ea)})}),r.sort(ea)},[a,k.sector,_]);(0,i.useEffect)(()=>{k.year>=1975&&k.year<=2018&&(k.year in et.by_year?n(et.by_year[k.year]):fetch("data/by_year/"+k.year+".json").then(async e=>{et.by_year[k.year]=await e.json(),n(et.by_year[k.year])}))},[k.year]),(0,i.useEffect)(()=>{k.sector in et.by_sector?o(et.by_sector[k.sector]):fetch("data/by_sector/"+k.sector+".json").then(async e=>{et.by_sector[k.sector]=await e.json(),o(et.by_sector[k.sector])})},[k.sector]);let M=(0,i.useMemo)(()=>a.sector.map(e=>({id:e,label:e in R?"".concat(e===ee.sector?"":"("+e+") ").concat(R[e]):e})),[a.sector]),z=(0,i.useMemo)(()=>[Math.min(...s.year),Math.max(...s.year)],[s.year]),L="dark"===e;return _?(0,r.jsx)(u.A,{sx:{position:"absolute",top:0,right:0,bottom:0,left:0,overflow:"hidden"},children:(0,r.jsxs)(l.A,{direction:"row",sx:{height:"100%"},children:[(0,r.jsxs)(h.A,{sx:{width:"350px",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[(0,r.jsx)(Y.A,{sx:{position:"absolute",height:"2.7em",width:"2.7em",p:1}}),(0,r.jsx)(x.A,{title:"Industry Atlas",sx:{pl:8,"& .MuiCardHeader-title":{fontFamily:"monospace"}}}),(0,r.jsx)(y.A,{sx:{height:"100%",overflow:"hidden"},children:(0,r.jsxs)(l.A,{spacing:2,sx:{height:"100%"},children:[(0,r.jsxs)(l.A,{direction:"row",children:[(0,r.jsx)(c.A,{onClick:()=>C({key:"year",value:z[0]}),disabled:k.year===z[0],"aria-label":"jump to first year",children:(0,r.jsx)(B.A,{})}),(0,r.jsx)(c.A,{onClick:()=>{k.year>z[0]&&C({key:"year",value:k.year-1})},disabled:k.year===z[0],"aria-label":"go to previous year",children:(0,r.jsx)(D.A,{})}),(0,r.jsx)(m.A,{sx:{mr:1,ml:1},value:k.year,label:"Year",onChange:e=>C({key:"year",value:+e.target.value}),size:"small",type:"number",slotProps:{htmlInput:{min:1975,max:2016,step:1}},fullWidth:!0,children:k.year}),(0,r.jsx)(c.A,{onClick:()=>{k.year<z[1]&&C({key:"year",value:k.year+1})},disabled:k.year===z[1],"aria-label":"go to next year",children:(0,r.jsx)(H.A,{})}),(0,r.jsx)(c.A,{onClick:()=>C({key:"year",value:z[1]}),disabled:k.year===z[1],"aria-label":"jump to first year",children:(0,r.jsx)(G.A,{})})]}),(0,r.jsx)(p.A,{size:"small",fullWidth:!0,options:M,value:M.find(e=>e.id===k.sector)||{id:"",label:""},onChange:(e,t)=>C({key:"sector",value:t.id||ee.sector}),renderInput:e=>(0,r.jsx)(m.A,{...e,label:"Sector"}),disableClearable:!0}),(0,r.jsx)(X.z,{sx:{minHeight:"140px"},getRowId:e=>e.name,columns:[{field:"label",headerName:"County",width:201},{field:"value",headerName:"Employed",width:90,align:"right"}],rows:E,pageSizeOptions:[50],initialState:{pagination:{paginationModel:{pageSize:50}}},slotProps:{pagination:{ActionsComponent:er}},density:"compact",disableRowSelectionOnClick:!0,disableDensitySelector:!0,disableColumnMenu:!0})]})}),(0,r.jsxs)(b.A,{sx:{justifyContent:"space-around"},children:[(0,r.jsx)(c.A,{color:"inherit",onClick:()=>t(L?"light":"dark"),"aria-label":"toggle dark mode",children:L?(0,r.jsx)(Z.A,{}):(0,r.jsx)(V.A,{})}),(0,r.jsx)(f.A,{variant:"text",color:"warning",onClick:()=>w(ee),children:"Reset"}),(0,r.jsx)(W,{}),(0,r.jsx)(K,{view:k,sectors:a.sector,selection:E})]})]}),(0,r.jsx)(l.A,{children:(0,r.jsx)(u.A,{sx:{position:"absolute",top:0,right:0,bottom:0,left:"350px"},children:(0,r.jsx)(l.A,{sx:{height:"100%"},children:(0,r.jsx)(I,{view:k,selection:E,map:_})})})})]})}):(0,r.jsx)(j.A,{open:!0,children:(0,r.jsxs)(l.A,{children:[(0,r.jsx)(g.A,{sx:{m:"auto"}}),(0,r.jsx)(A.A,{children:"Loading Map..."})]})})}let es=(0,n.A)({colorSchemes:{dark:{palette:{mode:"dark",primary:{main:"#a5cdff"},secondary:{main:"#68abff"}}},light:{palette:{mode:"light",primary:{main:"#00356b"},secondary:{main:"#286dc0"}}}}});function eo(){return(0,r.jsx)(i.StrictMode,{children:(0,r.jsxs)(s.A,{theme:es,defaultMode:"dark",noSsr:!0,children:[(0,r.jsx)("div",{suppressHydrationWarning:!0,children:(0,r.jsx)(o.Ay,{enableColorScheme:!0})}),(0,r.jsx)(en,{})]})})}}},e=>{var t=t=>e(e.s=t);e.O(0,[198,441,684,358],()=>t(39547)),_N_E=e.O()}]);