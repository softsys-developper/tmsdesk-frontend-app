import{P as C,Q as A,aa as o,O as h,s as x,a8 as v,ak as y,ab as F,ac as T,d as k,o as D,a as L,c as f,w as p,b as E,e as m,_ as S,u as i,h as w,aq as I,i as M,j as O,k as $}from"./index-DL6DNVEo.js";const N=[{label:"Libellé",field:"libelle",status:null,color:null,bgColor:null}],B=()=>{const{readData:u,createData:c}=F(),{EmptyFields:r}=T(),e=C({loading:!1,loadingCreate:!1}),d=A([]);d.value=o().Livres;const{toast:l}=h(),_=s=>s.map(t=>({numero_bon_de_caisse:t.numero_bon_de_caisse,designation:t.designation,recepteur:t.recepteur,montant:t.montant,type_transaction:`<p class="' py-1  capitalize max-w-min rounded-md px-4 flex justify-center font-bold text-xs text-white ' ${t.type_transaction!=="entree"?"bg-red-500":"bg-green-500"}">${t.type_transaction}</p>`,date_transaction:t.date_transaction})),g=x(()=>o().Livres);return{FindLivreAll:()=>{e.loading=!0,u(v.LIVRE_LIST).then(s=>{o().Livres=_(s.datas),e.loading=!1}).catch(()=>{e.loading=!1})},FindLivreOne:()=>{},CreateLivre:async s=>(e.loadingCreate=!0,{data:await c(v.CAISSE_TRANSACTION_CREATE,s).then(a=>{if(a){r(s),e.loadingCreate=!1;let n=o().Livres;const b=_([a.data]);n.unshift(...b),o().Livres=n,y().open=!1,l({title:"Enregistré",description:a.message})}}).catch(a=>{if(e.loadingCreate=!1,a){const n=Object.keys(a.response.data.errors);l(n?{title:n[0],variant:"destructive",description:a.response.data.errors[n[0]][0]}:{title:"error",variant:"destructive",description:a.response.data.message})}})}),FindLivreUpdate:()=>{},FindLivreDelete:()=>{},stateLivres:d,setLivre:e,storeLivres:g}},R={class:"flex flex-col w-full gap-4 bg-white rounded-lg mb-8"},z=k({__name:"livre_compta.page",setup(u){const{FindLivreAll:c,storeLivres:r,setLivre:e}=B();return D(()=>{c()}),(d,l)=>(L(),f($,null,{content:p(()=>[E("section",R,[m(S,{title:"COMPTABILITES | Grand livre"},{created:p(()=>[]),_:1}),i(r).length!=0?(L(),f(w,{key:0,dataTables:i(r),MenuActions:i(I),display:i(N)},null,8,["dataTables","MenuActions","display"])):M("",!0),m(O,{loading:i(e).loading,data:i(r),name:"Aucune transaction"},null,8,["loading","data"])])]),_:1}))}});export{z as default};