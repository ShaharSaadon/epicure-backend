import{j as s,l as n,u,a as x,r as m,b as d,B as r}from"./index-75159096.js";import{u as p,C as j,a as C}from"./useTabs-202868b6.js";import"./ButtonBase-e57c3d28.js";const f="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAYAAAAPtVbGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACDSURBVHgB7dJNDYAwDIbhSkBCJUzCnDAJOGASkICDSUHCJCAButDdyGB/CSF9k+9AUnguAEjSr3K0GcpDmqepp6O9EEIG7JtjVQAhA0vGO1kQMrBCQZp20MbEzVADxEwCCsDGG6AycwM1BWITQ5qfw8d9SyBm4foZHAMInbK9AUn6YCcZUx4DKy0RJAAAAABJRU5ErkJggg==",B=()=>{const{filterTypes:e}=n;return s.jsx("div",{className:"restaurant-filter flex justify-center",children:s.jsx("ul",{className:"flex clean-list",children:e.map(t=>s.jsxs("li",{className:`filter-type ${t.type} flex items-center`,children:[s.jsx("p",{children:t.label}),s.jsx("img",{src:f,alt:"arrow-down",className:"arrow-icon"})]},t.type))})})},b=()=>{const{value:e,handleChange:t}=p(0),{restaurantFilter:a}=n,A=Object.values(a),c=Object.keys(a),{restaurants:l}=u(({restaurantModule:o})=>o),i=x();return m.useEffect(()=>{document.title="Epicure | Restaurant List",i(d(c[e]))},[e]),s.jsxs(r,{sx:{width:"100%"},className:"restaurant-index",children:[s.jsx(r,{className:"flex justify-center",children:s.jsx(j,{value:e,handleChange:t,filters:A})}),s.jsx(B,{}),s.jsx(C,{value:e,filters:A,data:l})]})};export{b as default};