import{P as b,Q as h,aa as i,O as D,s as F,a8 as B,aj as T,ab as k,ac as v,ad as M,d as S,o as w,a as p,c as _,w as f,b as y,e as g,_ as E,u as n,h as I,aq as N,i as O,j as x,k as L}from"./index-3Lj80Sep.js";const U=[{label:"Libelles",field:"libelle",status:null,color:null,bgColor:null},{label:"Valeurs",field:"value",status:null,color:null,bgColor:null}],V=()=>{const{readData:u,createData:c}=k(),{EmptyFields:l}=v(),a=b({loading:!1,loadingCreate:!1}),d=h([]);d.value=i().Bilans;const{toast:o}=D(),m=t=>t.map(r=>({libelle:r.key.replace(/_/g," ").replace(/(^\w|\s\w)/g,e=>e.toUpperCase()),value:r.value,date_creation:M(r.created_at).format("DD/MM/YYYY")})),C=F(()=>i().Bilans);return{FindBilanAll:()=>{a.loading=!0,u(B.BILAN_LIST).then(t=>{i().Bilans=m(t.data),a.loading=!1}).catch(()=>{a.loading=!1})},FindBilanOne:()=>{},CreateBilan:async t=>(a.loadingCreate=!0,{data:await c(B.CAISSE_TRANSACTION_CREATE,t).then(e=>{if(e){l(t),a.loadingCreate=!1;let s=i().Bilans;const A=[];s.unshift(...A),i().Bilans=s,T().open=!1,o({title:"Enregistré",description:e.message})}}).catch(e=>{if(a.loadingCreate=!1,e){const s=Object.keys(e.response.data.errors);o(s?{title:s[0],variant:"destructive",description:e.response.data.errors[s[0]][0]}:{title:"error",variant:"destructive",description:e.response.data.message})}})}),FindBilanUpdate:()=>{},FindBilanDelete:()=>{},stateBilans:d,setBilan:a,storeBilans:C}},Y={class:"flex flex-col w-full gap-4 bg-white rounded-lg mb-8"},Q=S({__name:"bilan_compta.page",setup(u){const{FindBilanAll:c,storeBilans:l,setBilan:a}=V();return w(()=>{c()}),(d,o)=>(p(),_(L,null,{content:f(()=>[y("section",Y,[g(E,{title:"COMPTABILITES | Bilans"},{created:f(()=>[]),_:1}),n(l).length!=0?(p(),_(I,{key:0,dataTables:n(l),MenuActions:n(N),display:n(U)},null,8,["dataTables","MenuActions","display"])):O("",!0),g(x,{loading:n(a).loading,data:n(l),name:"Aucun bilan"},null,8,["loading","data"])])]),_:1}))}});export{Q as default};