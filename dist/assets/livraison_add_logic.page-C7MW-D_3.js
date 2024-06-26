import{d as Q,l as j,m as T,n as v,o as z,c as L,w as l,_ as G,A as g,p as H,q as J,s as K,a as o,b as s,e as i,h as W,t as c,v as $,x as X,u as t,F as w,y as x,z as Y,B as Z,C as ee,D as ae,E as se,G as te,H as p,I as le,J as ie,K as ne,L as oe,N as re,O as V,P as q,Q as de,R as A,S as ce,T as ue,U as _e,V as O}from"./index-BOGQ3df1.js";import{u as fe}from"./livraison.hook-CtwpNIS_.js";const ve=[{label:"Site Livraison",type:"text",placeholder:"Libelle",name:"site_livraison",value:"",select:[]},{label:"Date depart",type:"date",placeholder:"Date depart",name:"date_depart",value:"",select:[]},{label:"Date retour",type:"date",placeholder:"Ex: Unil",name:"date_retour",value:"",select:[]},{label:"Moyen Livraison",type:"text",placeholder:"Moyen Livraison",name:"moyen_livraison",value:"",select:[]},{label:"Agent Livraison",type:"text",placeholder:"Agent Livraison",name:"agent_livraison",value:"",select:[]},{label:"Chaffeur",type:"text",placeholder:"Ex: Unil",name:"chaffeur",value:"",select:[]}],pe={class:"flex flex-col w-full gap-4 bg-white rounded-lg mb-4"},me={class:"w-11/12 m-auto flex gap-4 items-start pb-8 flex-col"},he={class:"w-full grid grid-cols-2 gap-2"},ge={class:""},xe={class:"w-full bg-white rounded-md space-y-4"},ye={class:"flex w-full flex-col lg:flex-row gap-4"},be={class:"bg-white rounded-md flex flex-col gap-2 w-full"},Le=s("div",{class:"bg-gray-200 rounded-t-md p-3"},[s("span",{class:"text-base font-bold"}," Ajouter des produits ou services ")],-1),$e={class:"gap-2 pb-2"},we={class:"w-full"},Se={class:"flex flex-col w-full gap-3"},qe=["value"],Ae={class:"flex flex-col"},Oe=s("label",{for:"",class:"text-sm flex gap-1"},"Quantité",-1),Ie={class:"flex w-full m-auto"},Re=s("span",{class:""},null,-1),Ce={class:""},De={class:"flex flex-col gap-2"},ke=["onClick"],Te={class:"flex justify-between w-full"},Ve=s("span",{class:""},null,-1),Ee=["disabled"],Me={key:1,class:""},Fe=Q({__name:"livraison_add_logic.page",setup(Pe){const{toast:S}=j(),{readData:I,showData:E}=H(),d=T({loading:!1}),R=v(),M=v([]),y=v([]),m=v([]),u=T({id:"",quantite:"",reference:"",produit_service_id:"",quantite_livree:""}),h=v(!1),C=J(),_=K(),P=()=>{d.loading=!0,I(g.PRODUCT_LIST).then(e=>{M.value=e.datas,d.loading=!1}).catch(()=>{d.loading=!1}),I(g.PROFORMA_LIST).then(e=>{R.value=e.datas,d.loading=!1}).catch(()=>{d.loading=!1})},U=e=>{var n,a;console.log(e),m.value.push({reference:e.reference,id:(n=y.value.find(r=>r.reference==e.reference))==null?void 0:n.id,produit_service_id:(a=y.value.find(r=>r.reference==e.reference))==null?void 0:a.id,quantite:e.quantite,quantite_livree:e.quantite})},N=e=>{m.value=m.value.filter(n=>n.id!==e)},D=v(),F=e=>{console.log(e.target.value),D.value=e.target.value,E(g.PRODUCT_PROFORMA_LIST,e.target.value).then(n=>{y.value=n.datas,d.loading=!1}).catch(()=>{d.loading=!1})},{formatLivraisonData:k}=fe(),B=async()=>{try{h.value=!0;const e=r=>{const f=document.querySelector(`#${r}`);return f==null?void 0:f.value},n={livraisonId:D.value,produits_livres:JSON.stringify(m.value),site_livraison:e("site_livraison"),date_depart:e("date_depart"),date_retour:e("date_retour"),moyen_livraison:e("date_retour"),agent_livraison:e("date_retour"),chauffeur:e("chaffeur")},{data:a}=await _e.post(_.query.id?`${g.PROFORMA_UPDATE}/${_.query.id}`:`${g.LIVRAISON_CREATE}`,n);if(a){const r=a;if(h.value=!1,S({title:"Livraisons",description:r.message}),!_.query.id)O().Livraisons.unshift(...k([a.data])),C.push({name:"LOGISC_LIVRAISONS"});else{const f=O().Livraisons.map(b=>(console.log(b.id==_.query.id),b.id==_.query.id&&(b=k([a.data])),{...b}));O().Livraisons=f,C.push({name:"LOGISC_LIVRAISONS"})}}}catch(e){if(h.value=!1,e!=null&&e.errors)S({title:e.errors[0].path[0],variant:"destructive",description:e.errors[0].message});else{const n=Object.keys(e.response.data.errors);S({title:n[0],variant:"destructive",description:e.response.data.errors[n[0]][0]})}}};return z(()=>{P()}),(e,n)=>(o(),L(G,null,{content:l(()=>[s("section",pe,[i(W,{title:`Logistique | ${e.$route.query.id?"Modification Livraion":"Création Livraion"}`},{created:l(()=>[]),_:1},8,["title"]),s("div",me,[s("div",he,[(o(!0),c(w,null,$(t(ve),a=>(o(),c("div",ge,[i(X,{title:a.label,name:a.name,label:a.label,type:a.type,placeholder:a.placeholder,select:a.select},null,8,["title","name","label","type","placeholder","select"])]))),256))]),s("div",xe,[s("div",ye,[s("div",be,[Le,s("div",$e,[s("div",we,[s("div",Se,[s("select",{name:"",id:"",onInput:F,class:"p-2 border-[1px] rounded-md"},[(o(!0),c(w,null,$(R.value,a=>(o(),c("option",{value:a.id},x(a.numero_proforma),9,qe))),256))],32),i(t(le),{class:"flex flex-col",modelValue:u.reference,"onUpdate:modelValue":n[0]||(n[0]=a=>u.reference=a)},{default:l(()=>[i(t(Y),null,{default:l(()=>[i(t(Z),{placeholder:"Chossisez le product"})]),_:1}),i(t(ee),null,{default:l(()=>[i(t(ae),null,{default:l(()=>[i(t(se)),(o(!0),c(w,null,$(y.value,a=>(o(),L(t(te),{value:a.reference},{default:l(()=>[p(x(a.reference),1)]),_:2},1032,["value"]))),256))]),_:1})]),_:1})]),_:1},8,["modelValue"]),s("div",Ae,[Oe,ie(s("input",{type:"text","onUpdate:modelValue":n[1]||(n[1]=a=>u.quantite=a),placeholder:"Ex : 500",class:"border-[1px] w-full rounded-md py-2 px-4"},null,512),[[ne,u.quantite]])])])])]),s("div",Ie,[Re,i(oe,{disabled:u.quantite=="",onClick:n[2]||(n[2]=a=>U(u)),class:"bg-gray-800 text-white px-3 text-sm font-bold py-2 rounded-md"},{default:l(()=>[p(" Ajouter ")]),_:1},8,["disabled"])])]),i(t(ce),{class:"bg-orange-50/50 w-full"},{default:l(()=>[i(t(re),{class:"bg-gray-800"},{default:l(()=>[i(t(V),null,{default:l(()=>[i(t(q),null,{default:l(()=>[p("Reference")]),_:1}),i(t(q),null,{default:l(()=>[p("Quantités")]),_:1}),i(t(q),{class:""},{default:l(()=>[p(" Actions ")]),_:1})]),_:1})]),_:1}),i(t(de),null,{default:l(()=>[(o(!0),c(w,null,$(m.value,(a,r)=>(o(),L(t(V),{key:r},{default:l(()=>[i(t(A),null,{default:l(()=>[s("div",Ce,[s("span",De,x(a.reference),1)])]),_:2},1024),i(t(A),{class:"font-medium"},{default:l(()=>[p(x(a.quantite),1)]),_:2},1024),i(t(A),{class:"text-right"},{default:l(()=>[s("i",{class:"ri-close-fill cursor-pointer",onClick:f=>N(a.id)},null,8,ke)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),s("div",Te,[Ve,s("button",{onClick:B,class:"bg-gray-800 px-4 py-2 font-bold text-white rounded-md",disabled:h.value},[h.value?(o(),L(ue,{key:0,size:"w-6 h-6"})):(o(),c("span",Me,x(t(_).query.id?"Modification une livraison":"Créer une livraison"),1))],8,Ee)])])])])]),_:1}))}});export{Fe as default};