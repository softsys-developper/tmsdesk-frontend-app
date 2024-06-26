import{m as b,n as A,V as o,l as h,W as x,A as v,Y as y,p as F,Z as T,d as D,o as E,c as p,w as L,_ as S,a as f,b as k,e as m,h as w,u as i,i as I,a6 as M,j as $,k as N}from"./index-B7Vj7lr8.js";const O=[{label:"Libellé",field:"libelle",status:null,color:null,bgColor:null}],V=()=>{const{readData:u,createData:c}=F(),{EmptyFields:r}=T(),e=b({loading:!1,loadingCreate:!1}),d=A([]);d.value=o().Livres;const{toast:l}=h(),_=s=>s.map(t=>({numero_bon_de_caisse:t.numero_bon_de_caisse,designation:t.designation,recepteur:t.recepteur,montant:t.montant,type_transaction:`<p class="' py-1  capitalize max-w-min rounded-md px-4 flex justify-center font-bold text-xs text-white ' ${t.type_transaction!=="entree"?"bg-red-500":"bg-green-500"}">${t.type_transaction}</p>`,date_transaction:t.date_transaction})),g=x(()=>o().Livres);return{FindLivreAll:()=>{e.loading=!0,u(v.LIVRE_LIST).then(s=>{o().Livres=_(s.datas),e.loading=!1}).catch(()=>{e.loading=!1})},FindLivreOne:()=>{},CreateLivre:async s=>(e.loadingCreate=!0,{data:await c(v.CAISSE_TRANSACTION_CREATE,s).then(a=>{if(a){r(s),e.loadingCreate=!1;let n=o().Livres;const C=_([a.data]);n.unshift(...C),o().Livres=n,y().open=!1,l({title:"Enregistré",description:a.message})}}).catch(a=>{if(e.loadingCreate=!1,a){const n=Object.keys(a.response.data.errors);l(n?{title:n[0],variant:"destructive",description:a.response.data.errors[n[0]][0]}:{title:"error",variant:"destructive",description:a.response.data.message})}})}),FindLivreUpdate:()=>{},FindLivreDelete:()=>{},stateLivres:d,setLivre:e,storeLivres:g}},B={class:"flex flex-col w-full gap-4 bg-white rounded-lg mb-8"},G=D({__name:"livre_compta.page",setup(u){const{FindLivreAll:c,storeLivres:r,setLivre:e}=V();return E(()=>{c()}),(d,l)=>(f(),p(S,null,{content:L(()=>[k("section",B,[m(w,{title:"COMPTABILITES | Grand livre"},{created:L(()=>[]),_:1}),i(r).length!=0?(f(),p(I,{key:0,dataTables:i(r),MenuActions:i(M),display:i(O)},null,8,["dataTables","MenuActions","display"])):$("",!0),m(N,{loading:i(e).loading,data:i(r),name:"Aucune transaction"},null,8,["loading","data"])])]),_:1}))}});export{G as default};
