import{r as b,a as h,u as r,b as x,c as y,A as p,d as S,e as F,f as M,g as v,o as D,h as m,w as f,_ as E,N as I,i as g,j as N,k as T,l as k,m as o,n as w,M as O,p as $,q as j}from"./index--MAioM0C.js";const B=[{label:"Libelle",field:"libelle_salaire",status:null,color:null,bgColor:null},{label:"Montants",field:"montant",status:null,color:null,bgColor:null}],L=()=>{const{readData:_,createData:d}=F(),{EmptyFields:i}=M(),a=b({loading:!1,loadingCreate:!1}),u=h([]);u.value=r().Transactions;const{toast:c}=x(),l=e=>e.map(t=>({numero_bon_de_caisse:t.numero_bon_de_caisse,designation:t.designation,recepteur:t.recepteur,montant:t.montant,type_transaction:`<p class="' py-1  capitalize max-w-min rounded-md px-4 flex justify-center font-bold text-xs text-white ' ${t.type_transaction!=="entree"?"bg-red-500":"bg-green-500"}">${t.type_transaction}</p>`,date_transaction:t.date_transaction})),A=y(()=>r().Transactions);return{FindTransactionAll:()=>{a.loading=!0,_(p.CAISSE_TRANSACTION_LIST).then(e=>{r().Transactions=l(e.datas),a.loading=!1}).catch(()=>{a.loading=!1})},FindTransactionOne:()=>{},CreateTransaction:async e=>(a.loadingCreate=!0,{data:await d(p.CAISSE_TRANSACTION_CREATE,e).then(n=>{if(n){i(e),a.loadingCreate=!1;let s=r().Transactions;const C=l([n.data]);s.unshift(...C),r().Transactions=s,S().open=!1,c({title:"Enregistré",description:n.message})}}).catch(n=>{if(a.loadingCreate=!1,n){const s=Object.keys(n.response.data.errors);c(s?{title:s[0],variant:"destructive",description:n.response.data.errors[s[0]][0]}:{title:"error",variant:"destructive",description:n.response.data.message})}})}),FindTransactionUpdate:()=>{},FindTransactionDelete:()=>{},stateTransactions:u,setTransaction:a,storeTransactions:A}},R={class:"flex flex-col w-full gap-4 bg-white rounded-lg mb-8"},G=v({__name:"transaction_compta.page",setup(_){const{FindTransactionAll:d,storeTransactions:i,setTransaction:a}=L();return D(()=>{d()}),(u,c)=>{const l=I("TransactionModal");return g(),m(E,null,{content:f(()=>[N("section",R,[T(k,{title:"COMPTABILITES | Transactions bancaire"},{created:f(()=>[T(l,{name:"Ajouter un transaction",title:"Ajouter un nouvel transaction"})]),_:1}),o(i).length!=0?(g(),m(w,{key:0,dataTables:o(i),MenuActions:o(O),display:o(B)},null,8,["dataTables","MenuActions","display"])):$("",!0),T(j,{loading:o(a).loading,data:o(i),name:"Aucune Transactions"},null,8,["loading","data"])])]),_:1})}}});export{G as default};
