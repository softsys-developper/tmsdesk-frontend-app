import{l as z,d as m,x as Q,a as d,c as _,w as s,m as v,n as H,p as J,u as e,t as te,q as le,s as C,v as R,e as a,y as oe,z as B,A as x,B as ne,C as re,D as K,E as ie,F as de,G as ce,b as r,H as ue,I as pe,J as fe,K as _e,L as me,N as he,O as ve,P as j,Q as L,o as ge,_ as ye,R as I,S as xe,T as be,U as we,h as $e,V as w,W as q,X as Le,Y as A,Z as O,$ as S,a0 as Se,a1 as Ce,a2 as Be,a3 as Pe,a4 as G,a5 as T,a6 as ke,a7 as U,a8 as De,a9 as Ie,aa as Oe,ab as M,ac as qe}from"./index-aC3qMT-u.js";import{u as Ae}from"./livraison.hook-Co1EsVk8.js";/**
 * @license lucide-vue-next v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=z("CheckIcon",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=z("ChevronDownIcon",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-vue-next v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=z("ChevronUpIcon",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]),Te=m({__name:"Select",props:{open:{type:Boolean},defaultOpen:{type:Boolean},defaultValue:{},modelValue:{},dir:{},name:{},autocomplete:{},disabled:{type:Boolean},required:{type:Boolean}},emits:["update:modelValue","update:open"],setup(c,{emit:n}){const o=Q(c,n);return(u,g)=>(d(),_(e(te),H(J(e(o))),{default:s(()=>[v(u.$slots,"default")]),_:3},16))}}),Ue=m({__name:"SelectValue",props:{placeholder:{},asChild:{type:Boolean},as:{}},setup(c){const n=c;return(i,p)=>(d(),_(e(le),H(J(n)),{default:s(()=>[v(i.$slots,"default")]),_:3},16))}}),Me=m({__name:"SelectTrigger",props:{disabled:{type:Boolean},asChild:{type:Boolean},as:{},class:{}},setup(c){const n=c,i=C(()=>{const{class:o,...u}=n;return u}),p=R(i);return(o,u)=>(d(),_(e(ne),B(e(p),{class:e(x)("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",n.class)}),{default:s(()=>[v(o.$slots,"default"),a(e(oe),{"as-child":""},{default:s(()=>[a(e(W),{class:"w-4 h-4 opacity-50"})]),_:1})]),_:3},16,["class"]))}}),ze=m({inheritAttrs:!1,__name:"SelectContent",props:{forceMount:{type:Boolean},position:{default:"popper"},bodyLock:{type:Boolean},side:{},sideOffset:{},align:{},alignOffset:{},avoidCollisions:{type:Boolean},collisionBoundary:{},collisionPadding:{},arrowPadding:{},sticky:{},hideWhenDetached:{type:Boolean},updatePositionStrategy:{},prioritizePosition:{type:Boolean},asChild:{type:Boolean},as:{},class:{}},emits:["closeAutoFocus","escapeKeyDown","pointerDownOutside"],setup(c,{emit:n}){const i=c,p=n,o=C(()=>{const{class:g,...b}=i;return b}),u=Q(o,p);return(g,b)=>(d(),_(e(de),null,{default:s(()=>[a(e(ie),B({...e(u),...g.$attrs},{class:e(x)("relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",g.position==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",i.class)}),{default:s(()=>[a(e(Ge)),a(e(re),{class:K(e(x)("p-1",g.position==="popper"&&"h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width]"))},{default:s(()=>[v(g.$slots,"default")]),_:3},8,["class"]),a(e(Qe))]),_:3},16,["class"])]),_:3}))}}),Ee=m({__name:"SelectGroup",props:{asChild:{type:Boolean},as:{},class:{}},setup(c){const n=c,i=C(()=>{const{class:p,...o}=n;return o});return(p,o)=>(d(),_(e(ce),B({class:e(x)("p-1 w-full",n.class)},i.value),{default:s(()=>[v(p.$slots,"default")]),_:3},16,["class"]))}}),Fe={class:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center"},Ne=m({__name:"SelectItem",props:{value:{},disabled:{type:Boolean},textValue:{},asChild:{type:Boolean},as:{},class:{}},setup(c){const n=c,i=C(()=>{const{class:o,...u}=n;return u}),p=R(i);return(o,u)=>(d(),_(e(fe),B(e(p),{class:e(x)("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",n.class)}),{default:s(()=>[r("span",Fe,[a(e(ue),null,{default:s(()=>[a(e(Re),{class:"h-4 w-4"})]),_:1})]),a(e(pe),null,{default:s(()=>[v(o.$slots,"default")]),_:3})]),_:3},16,["class"]))}}),je=m({__name:"SelectLabel",props:{for:{},asChild:{type:Boolean},as:{},class:{}},setup(c){const n=c;return(i,p)=>(d(),_(e(_e),{class:K(e(x)("py-1.5 pl-8 pr-2 text-sm font-semibold",n.class))},{default:s(()=>[v(i.$slots,"default")]),_:3},8,["class"]))}}),Ge=m({__name:"SelectScrollUpButton",props:{asChild:{type:Boolean},as:{},class:{}},setup(c){const n=c,i=C(()=>{const{class:o,...u}=n;return u}),p=R(i);return(o,u)=>(d(),_(e(me),B(e(p),{class:e(x)("flex cursor-default items-center justify-center py-1",n.class)}),{default:s(()=>[v(o.$slots,"default",{},()=>[a(e(Ve),{class:"h-4 w-4"})])]),_:3},16,["class"]))}}),Qe=m({__name:"SelectScrollDownButton",props:{asChild:{type:Boolean},as:{},class:{}},setup(c){const n=c,i=C(()=>{const{class:o,...u}=n;return u}),p=R(i);return(o,u)=>(d(),_(e(he),B(e(p),{class:e(x)("flex cursor-default items-center justify-center py-1",n.class)}),{default:s(()=>[v(o.$slots,"default",{},()=>[a(e(W),{class:"h-4 w-4"})])]),_:3},16,["class"]))}}),He=[{label:"Site Livraison",type:"text",placeholder:"Libelle",name:"site_livraison",value:"",select:[]},{label:"Date depart",type:"date",placeholder:"Date depart",name:"date_depart",value:"",select:[]},{label:"Date retour",type:"date",placeholder:"Ex: Unil",name:"date_retour",value:"",select:[]},{label:"Moyen Livraison",type:"text",placeholder:"Moyen Livraison",name:"moyen_livraison",value:"",select:[]},{label:"Agent Livraison",type:"text",placeholder:"Agent Livraison",name:"agent_livraison",value:"",select:[]},{label:"Chaffeur",type:"text",placeholder:"Ex: Unil",name:"chaffeur",value:"",select:[]}],Je={class:"flex flex-col w-full gap-4 bg-white rounded-lg mb-4"},Ke={class:"w-11/12 m-auto flex gap-4 items-start pb-8 flex-col"},We={class:"w-full grid grid-cols-2 gap-2"},Xe={class:""},Ye={class:"w-full bg-white rounded-md space-y-4"},Ze={class:"flex w-full flex-col lg:flex-row gap-4"},es={class:"bg-white rounded-md flex flex-col gap-2 w-full"},ss=r("div",{class:"bg-gray-200 rounded-t-md p-3"},[r("span",{class:"text-base font-bold"}," Ajouter des produits ou services ")],-1),as={class:"gap-2 pb-2"},ts={class:"w-full"},ls={class:"flex flex-col w-full gap-3"},os=["value"],ns={class:"flex flex-col"},rs=r("label",{for:"",class:"text-sm flex gap-1"},"Quantité",-1),is={class:"flex w-full m-auto"},ds=r("span",{class:""},null,-1),cs={class:""},us={class:"flex flex-col gap-2"},ps=["onClick"],fs={class:"flex justify-between w-full"},_s=r("span",{class:""},null,-1),ms=["disabled"],hs={key:1,class:""},ys=m({__name:"livraison_add_logic.page",setup(c){const{toast:n}=ve(),{readData:i,showData:p}=xe(),o=j({loading:!1}),u=L(),g=L([]),b=L([]),P=L([]),$=j({id:"",quantite:"",reference:"",produit_service_id:"",quantite_livree:""}),k=L(!1),E=be(),D=we(),X=()=>{o.loading=!0,i(I.PRODUCT_LIST).then(l=>{g.value=l.datas,o.loading=!1}).catch(()=>{o.loading=!1}),i(I.PROFORMA_LIST).then(l=>{u.value=l.datas,o.loading=!1}).catch(()=>{o.loading=!1})},Y=l=>{var f,t;console.log(l),P.value.push({reference:l.reference,id:(f=b.value.find(h=>h.reference==l.reference))==null?void 0:f.id,produit_service_id:(t=b.value.find(h=>h.reference==l.reference))==null?void 0:t.id,quantite:l.quantite,quantite_livree:l.quantite})},Z=l=>{P.value=P.value.filter(f=>f.id!==l)},F=L(),ee=l=>{console.log(l.target.value),F.value=l.target.value,p(I.PRODUCT_PROFORMA_LIST,l.target.value).then(f=>{b.value=f.datas,o.loading=!1}).catch(()=>{o.loading=!1})},{formatLivraisonData:N}=Ae(),{ServerError:se}=qe(),ae=async()=>{try{k.value=!0;const l=h=>{const y=document.querySelector(`#${h}`);return y==null?void 0:y.value},f={proformaId:F.value,produits_livres:JSON.stringify(P.value),site_livraison:l("site_livraison"),date_depart:l("date_depart"),date_retour:l("date_retour"),moyen_livraison:l("date_retour"),agent_livraison:l("date_retour"),chauffeur:l("chaffeur")},{data:t}=await Oe.post(D.query.id?`${I.PROFORMA_UPDATE}/${D.query.id}`:`${I.LIVRAISON_CREATE}`,f);if(t){const h=t;if(k.value=!1,n({title:"Livraisons",description:h.message}),D.query.id){const y=M().Livraisons.map(V=>(V.id==D.query.id&&(V=N([t.data])),{...V}));M().Livraisons=y,E.push({name:"LOGISC_LIVRAISONS"})}else{const y=t.data;M().Livraisons.unshift(...N([y])),E.push({name:"LOGISC_LIVRAISONS"})}}}catch(l){k.value=!1,se(l,n)}};return ge(()=>{X()}),(l,f)=>(d(),_(ye,null,{content:s(()=>[r("section",Je,[a($e,{title:`Logistique | ${l.$route.query.id?"Modification Livraion":"Création Livraion"}`},{created:s(()=>[]),_:1},8,["title"]),r("div",Ke,[r("div",We,[(d(!0),w(A,null,q(e(He),t=>(d(),w("div",Xe,[a(Le,{title:t.label,name:t.name,label:t.label,type:t.type,placeholder:t.placeholder,select:t.select},null,8,["title","name","label","type","placeholder","select"])]))),256))]),r("div",Ye,[r("div",Ze,[r("div",es,[ss,r("div",as,[r("div",ts,[r("div",ls,[r("select",{name:"",id:"",onInput:ee,class:"p-2 border-[1px] rounded-md"},[(d(!0),w(A,null,q(u.value,t=>(d(),w("option",{value:t.id},O(t.numero_proforma),9,os))),256))],32),a(e(Te),{class:"flex flex-col",modelValue:$.reference,"onUpdate:modelValue":f[0]||(f[0]=t=>$.reference=t)},{default:s(()=>[a(e(Me),null,{default:s(()=>[a(e(Ue),{placeholder:"Chossisez le product"})]),_:1}),a(e(ze),null,{default:s(()=>[a(e(Ee),null,{default:s(()=>[a(e(je)),(d(!0),w(A,null,q(b.value,t=>(d(),_(e(Ne),{value:t.reference},{default:s(()=>[S(O(t.reference),1)]),_:2},1032,["value"]))),256))]),_:1})]),_:1})]),_:1},8,["modelValue"]),r("div",ns,[rs,Se(r("input",{type:"text","onUpdate:modelValue":f[1]||(f[1]=t=>$.quantite=t),placeholder:"Ex : 500",class:"border-[1px] w-full rounded-md py-2 px-4"},null,512),[[Ce,$.quantite]])])])])]),r("div",is,[ds,a(Be,{disabled:$.quantite=="",onClick:f[2]||(f[2]=t=>Y($)),class:"bg-gray-800 text-white px-3 text-sm font-bold py-2 rounded-md"},{default:s(()=>[S(" Ajouter ")]),_:1},8,["disabled"])])]),a(e(De),{class:"bg-orange-50/50 w-full"},{default:s(()=>[a(e(Pe),{class:"bg-gray-800"},{default:s(()=>[a(e(G),null,{default:s(()=>[a(e(T),null,{default:s(()=>[S("Reference")]),_:1}),a(e(T),null,{default:s(()=>[S("Quantités")]),_:1}),a(e(T),{class:""},{default:s(()=>[S(" Actions ")]),_:1})]),_:1})]),_:1}),a(e(ke),null,{default:s(()=>[(d(!0),w(A,null,q(P.value,(t,h)=>(d(),_(e(G),{key:h},{default:s(()=>[a(e(U),null,{default:s(()=>[r("div",cs,[r("span",us,O(t.reference),1)])]),_:2},1024),a(e(U),{class:"font-medium"},{default:s(()=>[S(O(t.quantite),1)]),_:2},1024),a(e(U),{class:"text-right"},{default:s(()=>[r("i",{class:"ri-close-fill cursor-pointer",onClick:y=>Z(t.id)},null,8,ps)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),r("div",fs,[_s,r("button",{onClick:ae,class:"bg-gray-800 px-4 py-2 font-bold text-white rounded-md",disabled:k.value},[k.value?(d(),_(Ie,{key:0,size:"w-6 h-6"})):(d(),w("span",hs,O(e(D).query.id?"Modification une livraison":"Créer une livraison"),1))],8,ms)])])])])]),_:1}))}});export{ys as default};
