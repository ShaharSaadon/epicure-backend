import{r as i,q as G,j as c,t as re,v as je,f as ce,g as de,k as V,_ as y,n as ue,C as Be,h as q,o as _e,w as $e,x as Ae,y as Oe,s as J,z as be,i as fe,m as X,p as we,T as De,A as ze,E as Le,c as qe,u as ge,a as Ue,F as He,G as Ke,H as We,l as Qe,I as Ge}from"./index-75159096.js";import{c as w,u as ae,o as Z,b as ie,a as xe,d as Ve,B as Ye,r as ve,i as Xe}from"./ButtonBase-e57c3d28.js";function le(...e){return e.reduce((t,o)=>o==null?t:function(...r){t.apply(this,r),o.apply(this,r)},()=>{})}function Je(e,t){return()=>null}function Ze(e,t){return i.isValidElement(e)&&t.indexOf(e.type.muiName)!==-1}function et(e,t){return()=>null}function tt(e,t,o,n,r){return null}function nt(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}const ot={disableDefaultClasses:!1},st=i.createContext(ot);function rt(e){const{disableDefaultClasses:t}=i.useContext(st);return o=>t?"":e(o)}const at=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function it(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function lt(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=n=>e.ownerDocument.querySelector(`input[type="radio"]${n}`);let o=t(`[name="${e.name}"]:checked`);return o||(o=t(`[name="${e.name}"]`)),o!==e}function ct(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||lt(e))}function dt(e){const t=[],o=[];return Array.from(e.querySelectorAll(at)).forEach((n,r)=>{const s=it(n);s===-1||!ct(n)||(s===0?t.push(n):o.push({documentOrder:r,tabIndex:s,node:n}))}),o.sort((n,r)=>n.tabIndex===r.tabIndex?n.documentOrder-r.documentOrder:n.tabIndex-r.tabIndex).map(n=>n.node).concat(t)}function ut(){return!0}function ft(e){const{children:t,disableAutoFocus:o=!1,disableEnforceFocus:n=!1,disableRestoreFocus:r=!1,getTabbable:s=dt,isEnabled:a=ut,open:l}=e,u=i.useRef(!1),d=i.useRef(null),g=i.useRef(null),h=i.useRef(null),x=i.useRef(null),f=i.useRef(!1),p=i.useRef(null),C=G(t.ref,p),N=i.useRef(null);i.useEffect(()=>{!l||!p.current||(f.current=!o)},[o,l]),i.useEffect(()=>{if(!l||!p.current)return;const m=w(p.current);return p.current.contains(m.activeElement)||(p.current.hasAttribute("tabIndex")||p.current.setAttribute("tabIndex","-1"),f.current&&p.current.focus()),()=>{r||(h.current&&h.current.focus&&(u.current=!0,h.current.focus()),h.current=null)}},[l]),i.useEffect(()=>{if(!l||!p.current)return;const m=w(p.current),v=S=>{const{current:B}=p;if(B!==null){if(!m.hasFocus()||n||!a()||u.current){u.current=!1;return}if(!B.contains(m.activeElement)){if(S&&x.current!==S.target||m.activeElement!==x.current)x.current=null;else if(x.current!==null)return;if(!f.current)return;let F=[];if((m.activeElement===d.current||m.activeElement===g.current)&&(F=s(p.current)),F.length>0){var A,I;const O=!!((A=N.current)!=null&&A.shiftKey&&((I=N.current)==null?void 0:I.key)==="Tab"),_=F[0],b=F[F.length-1];typeof _!="string"&&typeof b!="string"&&(O?b.focus():_.focus())}else B.focus()}}},k=S=>{N.current=S,!(n||!a()||S.key!=="Tab")&&m.activeElement===p.current&&S.shiftKey&&(u.current=!0,g.current&&g.current.focus())};m.addEventListener("focusin",v),m.addEventListener("keydown",k,!0);const P=setInterval(()=>{m.activeElement&&m.activeElement.tagName==="BODY"&&v(null)},50);return()=>{clearInterval(P),m.removeEventListener("focusin",v),m.removeEventListener("keydown",k,!0)}},[o,n,r,a,l,s]);const M=m=>{h.current===null&&(h.current=m.relatedTarget),f.current=!0,x.current=m.target;const v=t.props.onFocus;v&&v(m)},R=m=>{h.current===null&&(h.current=m.relatedTarget),f.current=!0};return c.jsxs(i.Fragment,{children:[c.jsx("div",{tabIndex:l?0:-1,onFocus:R,ref:d,"data-testid":"sentinelStart"}),i.cloneElement(t,{ref:C,onFocus:M}),c.jsx("div",{tabIndex:l?0:-1,onFocus:R,ref:g,"data-testid":"sentinelEnd"})]})}function pt(e){return typeof e=="function"?e():e}const mt=i.forwardRef(function(t,o){const{children:n,container:r,disablePortal:s=!1}=t,[a,l]=i.useState(null),u=G(i.isValidElement(n)?n.ref:null,o);if(ae(()=>{s||l(pt(r)||document.body)},[r,s]),ae(()=>{if(a&&!s)return re(o,a),()=>{re(o,null)}},[o,a,s]),s){if(i.isValidElement(n)){const d={ref:u};return i.cloneElement(n,d)}return c.jsx(i.Fragment,{children:n})}return c.jsx(i.Fragment,{children:a&&je.createPortal(n,a)})}),ht=mt;function bt(e){const t=w(e);return t.body===e?Z(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function Q(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Ee(e){return parseInt(Z(e).getComputedStyle(e).paddingRight,10)||0}function gt(e){const o=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,n=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return o||n}function ye(e,t,o,n,r){const s=[t,o,...n];[].forEach.call(e.children,a=>{const l=s.indexOf(a)===-1,u=!gt(a);l&&u&&Q(a,r)})}function oe(e,t){let o=-1;return e.some((n,r)=>t(n)?(o=r,!0):!1),o}function xt(e,t){const o=[],n=e.container;if(!t.disableScrollLock){if(bt(n)){const a=nt(w(n));o.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${Ee(n)+a}px`;const l=w(n).querySelectorAll(".mui-fixed");[].forEach.call(l,u=>{o.push({value:u.style.paddingRight,property:"padding-right",el:u}),u.style.paddingRight=`${Ee(u)+a}px`})}let s;if(n.parentNode instanceof DocumentFragment)s=w(n).body;else{const a=n.parentElement,l=Z(n);s=(a==null?void 0:a.nodeName)==="HTML"&&l.getComputedStyle(a).overflowY==="scroll"?a:n}o.push({value:s.style.overflow,property:"overflow",el:s},{value:s.style.overflowX,property:"overflow-x",el:s},{value:s.style.overflowY,property:"overflow-y",el:s}),s.style.overflow="hidden"}return()=>{o.forEach(({value:s,el:a,property:l})=>{s?a.style.setProperty(l,s):a.style.removeProperty(l)})}}function vt(e){const t=[];return[].forEach.call(e.children,o=>{o.getAttribute("aria-hidden")==="true"&&t.push(o)}),t}class Et{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,o){let n=this.modals.indexOf(t);if(n!==-1)return n;n=this.modals.length,this.modals.push(t),t.modalRef&&Q(t.modalRef,!1);const r=vt(o);ye(o,t.mount,t.modalRef,r,!0);const s=oe(this.containers,a=>a.container===o);return s!==-1?(this.containers[s].modals.push(t),n):(this.containers.push({modals:[t],container:o,restore:null,hiddenSiblings:r}),n)}mount(t,o){const n=oe(this.containers,s=>s.modals.indexOf(t)!==-1),r=this.containers[n];r.restore||(r.restore=xt(r,o))}remove(t,o=!0){const n=this.modals.indexOf(t);if(n===-1)return n;const r=oe(this.containers,a=>a.modals.indexOf(t)!==-1),s=this.containers[r];if(s.modals.splice(s.modals.indexOf(t),1),this.modals.splice(n,1),s.modals.length===0)s.restore&&s.restore(),t.modalRef&&Q(t.modalRef,o),ye(s.container,t.mount,t.modalRef,s.hiddenSiblings,!1),this.containers.splice(r,1);else{const a=s.modals[s.modals.length-1];a.modalRef&&Q(a.modalRef,!1)}return n}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function yt(e){return ce("MuiModal",e)}de("MuiModal",["root","hidden","backdrop"]);const kt=["children","closeAfterTransition","container","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","manager","onBackdropClick","onClose","onKeyDown","open","onTransitionEnter","onTransitionExited","slotProps","slots"],Ct=e=>{const{open:t,exited:o}=e;return ue({root:["root",!t&&o&&"hidden"],backdrop:["backdrop"]},rt(yt))};function Rt(e){return typeof e=="function"?e():e}function Tt(e){return e?e.props.hasOwnProperty("in"):!1}const Nt=new Et,Pt=i.forwardRef(function(t,o){var n,r;const{children:s,closeAfterTransition:a=!1,container:l,disableAutoFocus:u=!1,disableEnforceFocus:d=!1,disableEscapeKeyDown:g=!1,disablePortal:h=!1,disableRestoreFocus:x=!1,disableScrollLock:f=!1,hideBackdrop:p=!1,keepMounted:C=!1,manager:N=Nt,onBackdropClick:M,onClose:R,onKeyDown:m,open:v,onTransitionEnter:k,onTransitionExited:P,slotProps:S={},slots:B={}}=t,A=V(t,kt),I=N,[F,O]=i.useState(!v),_=i.useRef({}),b=i.useRef(null),E=i.useRef(null),j=G(E,o),U=Tt(s),K=(n=t["aria-hidden"])!=null?n:!0,ee=()=>w(b.current),D=()=>(_.current.modalRef=E.current,_.current.mountNode=b.current,_.current),W=()=>{I.mount(D(),{disableScrollLock:f}),E.current&&(E.current.scrollTop=0)},z=ie(()=>{const T=Rt(l)||ee().body;I.add(D(),T),E.current&&W()}),H=i.useCallback(()=>I.isTopModal(D()),[I]),te=ie(T=>{b.current=T,!(!T||!E.current)&&(v&&H()?W():Q(E.current,K))}),$=i.useCallback(()=>{I.remove(D(),K)},[I,K]);i.useEffect(()=>()=>{$()},[$]),i.useEffect(()=>{v?z():(!U||!a)&&$()},[v,$,U,a,z]);const L=y({},t,{closeAfterTransition:a,disableAutoFocus:u,disableEnforceFocus:d,disableEscapeKeyDown:g,disablePortal:h,disableRestoreFocus:x,disableScrollLock:f,exited:F,hideBackdrop:p,keepMounted:C}),me=Ct(L),Ne=()=>{O(!1),k&&k()},Pe=()=>{O(!0),P&&P(),a&&$()},Se=T=>{T.target===T.currentTarget&&(M&&M(T),R&&R(T,"backdropClick"))},Ie=T=>{m&&m(T),!(T.key!=="Escape"||!H())&&(g||(T.stopPropagation(),R&&R(T,"escapeKeyDown")))},Y={};s.props.tabIndex===void 0&&(Y.tabIndex="-1"),U&&(Y.onEnter=le(Ne,s.props.onEnter),Y.onExited=le(Pe,s.props.onExited));const he=(r=B.root)!=null?r:"div",Me=xe({elementType:he,externalSlotProps:S.root,externalForwardedProps:A,additionalProps:{ref:j,role:"presentation",onKeyDown:Ie},className:me.root,ownerState:L}),ne=B.backdrop,Fe=xe({elementType:ne,externalSlotProps:S.backdrop,additionalProps:{"aria-hidden":!0,onClick:Se,open:v},className:me.backdrop,ownerState:L});return!C&&!v&&(!U||F)?null:c.jsx(ht,{ref:te,container:l,disablePortal:h,children:c.jsxs(he,y({},Me,{children:[!p&&ne?c.jsx(ne,y({},Fe)):null,c.jsx(ft,{disableEnforceFocus:d,disableAutoFocus:u,disableRestoreFocus:x,isEnabled:H,open:v,children:i.cloneElement(s,Y)})]}))})}),St=Pt,It={configure:e=>{Be.configure(e)}},Mt=Object.freeze(Object.defineProperty({__proto__:null,capitalize:q,createChainedFunction:le,createSvgIcon:_e,debounce:Ve,deprecatedPropType:Je,isMuiElement:Ze,ownerDocument:w,ownerWindow:Z,requirePropFactory:et,setRef:re,unstable_ClassNameGenerator:It,unstable_useEnhancedEffect:ae,unstable_useId:$e,unsupportedProp:tt,useControlled:Ae,useEventCallback:ie,useForkRef:G,useIsFocusVisible:Oe},Symbol.toStringTag,{value:"Module"})),Ft=e=>e.scrollTop;function ke(e,t){var o,n;const{timeout:r,easing:s,style:a={}}=e;return{duration:(o=a.transitionDuration)!=null?o:typeof r=="number"?r:r[t.mode]||0,easing:(n=a.transitionTimingFunction)!=null?n:typeof s=="object"?s[t.mode]:s,delay:a.transitionDelay}}function jt(e){return ce("MuiIconButton",e)}const Bt=de("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]),_t=Bt,$t=["edge","children","className","color","disabled","disableFocusRipple","size"],At=e=>{const{classes:t,disabled:o,color:n,edge:r,size:s}=e,a={root:["root",o&&"disabled",n!=="default"&&`color${q(n)}`,r&&`edge${q(r)}`,`size${q(s)}`]};return ue(a,jt,t)},Ot=J(Ye,{name:"MuiIconButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.color!=="default"&&t[`color${q(o.color)}`],o.edge&&t[`edge${q(o.edge)}`],t[`size${q(o.size)}`]]}})(({theme:e,ownerState:t})=>y({textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(e.vars||e).palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest})},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:be(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.edge==="start"&&{marginLeft:t.size==="small"?-3:-12},t.edge==="end"&&{marginRight:t.size==="small"?-3:-12}),({theme:e,ownerState:t})=>{var o;const n=(o=(e.vars||e).palette)==null?void 0:o[t.color];return y({},t.color==="inherit"&&{color:"inherit"},t.color!=="inherit"&&t.color!=="default"&&y({color:n==null?void 0:n.main},!t.disableRipple&&{"&:hover":y({},n&&{backgroundColor:e.vars?`rgba(${n.mainChannel} / ${e.vars.palette.action.hoverOpacity})`:be(n.main,e.palette.action.hoverOpacity)},{"@media (hover: none)":{backgroundColor:"transparent"}})}),t.size==="small"&&{padding:5,fontSize:e.typography.pxToRem(18)},t.size==="large"&&{padding:12,fontSize:e.typography.pxToRem(28)},{[`&.${_t.disabled}`]:{backgroundColor:"transparent",color:(e.vars||e).palette.action.disabled}})}),wt=i.forwardRef(function(t,o){const n=fe({props:t,name:"MuiIconButton"}),{edge:r=!1,children:s,className:a,color:l="default",disabled:u=!1,disableFocusRipple:d=!1,size:g="medium"}=n,h=V(n,$t),x=y({},n,{edge:r,color:l,disabled:u,disableFocusRipple:d,size:g}),f=At(x);return c.jsx(Ot,y({className:X(f.root,a),centerRipple:!0,focusRipple:!d,disabled:u,ref:o,ownerState:x},h,{children:s}))}),Dt=wt,zt=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Lt={entering:{opacity:1},entered:{opacity:1}},qt=i.forwardRef(function(t,o){const n=we(),r={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:s,appear:a=!0,children:l,easing:u,in:d,onEnter:g,onEntered:h,onEntering:x,onExit:f,onExited:p,onExiting:C,style:N,timeout:M=r,TransitionComponent:R=De}=t,m=V(t,zt),v=i.useRef(null),k=G(v,l.ref,o),P=b=>E=>{if(b){const j=v.current;E===void 0?b(j):b(j,E)}},S=P(x),B=P((b,E)=>{Ft(b);const j=ke({style:N,timeout:M,easing:u},{mode:"enter"});b.style.webkitTransition=n.transitions.create("opacity",j),b.style.transition=n.transitions.create("opacity",j),g&&g(b,E)}),A=P(h),I=P(C),F=P(b=>{const E=ke({style:N,timeout:M,easing:u},{mode:"exit"});b.style.webkitTransition=n.transitions.create("opacity",E),b.style.transition=n.transitions.create("opacity",E),f&&f(b)}),O=P(p),_=b=>{s&&s(v.current,b)};return c.jsx(R,y({appear:a,in:d,nodeRef:v,onEnter:B,onEntered:A,onEntering:S,onExit:F,onExited:O,onExiting:I,addEndListener:_,timeout:M},m,{children:(b,E)=>i.cloneElement(l,y({style:y({opacity:0,visibility:b==="exited"&&!d?"hidden":void 0},Lt[b],N,l.props.style),ref:k},E))}))}),Ut=qt;function Ht(e){return ce("MuiBackdrop",e)}de("MuiBackdrop",["root","invisible"]);const Kt=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Wt=e=>{const{classes:t,invisible:o}=e;return ue({root:["root",o&&"invisible"]},Ht,t)},Qt=J("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.invisible&&t.invisible]}})(({ownerState:e})=>y({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Gt=i.forwardRef(function(t,o){var n,r,s;const a=fe({props:t,name:"MuiBackdrop"}),{children:l,className:u,component:d="div",components:g={},componentsProps:h={},invisible:x=!1,open:f,slotProps:p={},slots:C={},TransitionComponent:N=Ut,transitionDuration:M}=a,R=V(a,Kt),m=y({},a,{component:d,invisible:x}),v=Wt(m),k=(n=p.root)!=null?n:h.root;return c.jsx(N,y({in:f,timeout:M},R,{children:c.jsx(Qt,y({"aria-hidden":!0},k,{as:(r=(s=C.root)!=null?s:g.Root)!=null?r:d,className:X(v.root,u,k==null?void 0:k.className),ownerState:y({},m,k==null?void 0:k.ownerState),classes:v,ref:o,children:l}))}))}),Vt=Gt,Yt=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","open","slotProps","slots","theme"],Xt=J("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,!o.open&&o.exited&&t.hidden]}})(({theme:e,ownerState:t})=>y({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Jt=J(Vt,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Zt=i.forwardRef(function(t,o){var n,r,s,a,l,u;const d=fe({name:"MuiModal",props:t}),{BackdropComponent:g=Jt,BackdropProps:h,classes:x,className:f,closeAfterTransition:p=!1,children:C,container:N,component:M,components:R={},componentsProps:m={},disableAutoFocus:v=!1,disableEnforceFocus:k=!1,disableEscapeKeyDown:P=!1,disablePortal:S=!1,disableRestoreFocus:B=!1,disableScrollLock:A=!1,hideBackdrop:I=!1,keepMounted:F=!1,onBackdropClick:O,onClose:_,open:b,slotProps:E,slots:j,theme:U}=d,K=V(d,Yt),[ee,D]=i.useState(!0),W={container:N,closeAfterTransition:p,disableAutoFocus:v,disableEnforceFocus:k,disableEscapeKeyDown:P,disablePortal:S,disableRestoreFocus:B,disableScrollLock:A,hideBackdrop:I,keepMounted:F,onBackdropClick:O,onClose:_,open:b},z=y({},d,W,{exited:ee}),H=(n=(r=j==null?void 0:j.root)!=null?r:R.Root)!=null?n:Xt,te=(s=(a=j==null?void 0:j.backdrop)!=null?a:R.Backdrop)!=null?s:g,$=(l=E==null?void 0:E.root)!=null?l:m.root,L=(u=E==null?void 0:E.backdrop)!=null?u:m.backdrop;return c.jsx(St,y({slots:{root:H,backdrop:te},slotProps:{root:()=>y({},ve($,z),!Xe(H)&&{as:M,theme:U},{className:X(f,$==null?void 0:$.className,x==null?void 0:x.root,!z.open&&z.exited&&(x==null?void 0:x.hidden))}),backdrop:()=>y({},h,ve(L,z),{className:X(L==null?void 0:L.className,h==null?void 0:h.className,x==null?void 0:x.backdrop)})},onTransitionEnter:()=>D(!1),onTransitionExited:()=>D(!0),ref:o},K,W,{children:C}))}),en=Zt,tn=({title:e,type:t,options:o,onChange:n})=>{const[r,s]=i.useState(""),[a,l]=i.useState([]);i.useEffect(()=>{t==="radio"?n(r):t==="checkbox"&&n(a)},[r,a]);const u=d=>{t==="radio"?s(d.target.value):t==="checkbox"&&(d.target.checked?l(g=>[...g,d.target.value]):l(g=>g.filter(h=>h!==d.target.value)))};return c.jsxs("div",{className:"questions ",children:[c.jsx("h1",{className:"question-title",children:e}),o.map((d,g)=>c.jsxs("div",{className:"options flex",children:[c.jsx("input",{type:t,value:d,name:e,onChange:u,checked:t==="radio"?r===d:a.includes(d)}),c.jsx("p",{className:"option",children:d})]},g))]})};function nn(e){return{type:ze,dish:e}}var pe={},Re={exports:{}};(function(e){function t(o){return o&&o.__esModule?o:{default:o}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Re);var on=Re.exports,se={};const sn=Le(Mt);var Ce;function rn(){return Ce||(Ce=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=sn}(se)),se}var an=on;Object.defineProperty(pe,"__esModule",{value:!0});var Te=pe.default=void 0,ln=an(rn()),cn=c,dn=(0,ln.default)((0,cn.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");Te=pe.default=dn;const un="/assets/plus-0ed57836.svg",fn="/assets/menus-6c3b8322.svg",hn=()=>{const{dishId:e=""}=qe(),{imageMap:t,dynamicQuestions:o}=Qe,{isOpen:n}=ge(({modalModule:f})=>f),{dish:r}=ge(({restaurantModule:f})=>f),[s,a]=i.useState({...r,side:"",changes:"",quantity:1}),l=Ue(),u=He();i.useEffect(()=>{l(Ke()),l(We(e))},[]),i.useEffect(()=>{document.title=`Epicure | ${r==null?void 0:r.name}`,r&&a({...r,side:"",changes:"",quantity:1})},[r]);const d=()=>{l(Ge()),u(-1)},g=()=>{l(nn(s)),u(-1)},h=f=>{a(p=>({...p,quantity:p.quantity+f}))},x=(f,p)=>{a(C=>({...C,[f]:typeof p=="string"?p:p.join(", ")}))};return r?c.jsx(en,{open:n,onClose:d,BackdropProps:{open:!1},className:"modal",children:c.jsxs("div",{className:"dish-page",children:[c.jsx(Dt,{className:"close-container",onClick:d,children:c.jsx(Te,{className:"close-button"})}),c.jsx("img",{src:t[r.name],alt:"",className:"dish-image"}),c.jsxs("div",{className:"dish-info",children:[c.jsx("h1",{className:"dish-title",children:r.name}),c.jsx("p",{className:"ingredients",children:r.ingredients}),o.map((f,p)=>c.jsx(tn,{title:f.title,type:f.type,options:f.options,idQuestion:f.idQuestion,onChange:C=>x(f.idQuestion,C)},p)),c.jsxs("div",{className:"quantity",children:[c.jsx("h1",{className:"question-title",children:"Quantity"}),c.jsxs("div",{className:"quantity-box flex items-center",children:[c.jsx("img",{src:fn,alt:"",className:"icon",onClick:()=>h(-1)}),s.quantity,c.jsx("img",{src:un,alt:"",className:"icon",onClick:()=>h(1)})]})]}),c.jsx("button",{className:"add-bug-btn",onClick:g,children:"ADD TO BAG"})]})]})}):null};export{hn as default};
