import{P as y,Q as E,aa as o,O as N,s as D,a8 as p,aj as S,ae as u,ab as x,ac as U,ad as k,d as I,o as M,a as C,c as f,w as A,b as O,e as g,_ as B,u as i,h as v,ao as w,i as R,j as $,k as j}from"./index-DUU6GLEY.js";import{a as P}from"./compte.tables-Cp2-EN0C.js";const Q=()=>{const{readData:m,createData:d}=x(),{EmptyFields:r}=U(),n=y({loading:!1,loadingCreate:!1}),_=E([]);_.value=o().Compte_transactions;const{toast:c}=N(),T=D(()=>o().Compte_transactions),h=a=>{let e;const t=[];return Object.keys(a).forEach(s=>{s.includes("paiement_")&&t.push(s),a[s]!=null&&(e=s.split("-").length!=1?s.split("-")[1]:s.split("-")[0])}),e},l=a=>a.map(e=>{var t;return{id:e.id,banque:(t=e.banque)==null?void 0:t.nom,montant:e.montant,type_transaction:`<p class="' py-1  capitalize max-w-min rounded-md px-4 flex justify-center font-bold text-xs text-white ' ${e.type_transaction!=="entree"?"bg-red-500":"bg-green-500"}">${e.type_transaction}</p>`,type_paiement:h(e),date_creation:k(e.created_at).format("DD/MM/YYYY")}});return{FindCompte_transactionAll:()=>{n.loading=!0,m(p.BANQUE_TRANSACTION_LIST).then(a=>{o().Compte_transactions=l(a.datas),n.loading=!1}).catch(()=>{n.loading=!1})},CreateCompte_transaction:async a=>(n.loadingCreate=!0,{data:await d(p.BANQUE_TRANSACTION_CREATE,a).then(t=>{if(t){r(a),n.loadingCreate=!1;let s=o().Compte_transactions;const b=l([t.data]);s.unshift(...b),o().Compte_transactions=s,S().open=!1,c({title:"Enregistré",description:t.message})}}).catch(t=>{if(n.loadingCreate=!1,console.log(t),t){const s=Object.keys(t.response.data.errors);c(s?{title:s[0],variant:"destructive",description:t.response.data.errors[s[0]][0]}:{title:"Erreur",variant:"destructive",description:t.response.data.message})}})}),Compte_transactionUpdate:(a,e)=>{u(n,o(),"Compte_transactions",l).SetUpdate(p.BANQUE_TRANSACTION_UPDATE,a,e)},Compte_transactionDelete:a=>{u(n,o(),"Compte_transactions",l).SetDelete(p.BANQUE_TRANSACTION_REMOVE,a)},stateCompte_transactions:_,setCompte_transaction:n,storeCompte_transactions:T}},F={class:"flex flex-col w-full gap-4 bg-white rounded-lg mb-8"},G=I({__name:"compte_transaction_compta.page",setup(m){const{FindCompte_transactionAll:d,storeCompte_transactions:r,setCompte_transaction:n}=Q();return M(()=>{d()}),(_,c)=>(C(),f(j,null,{content:A(()=>[O("section",F,[g(B,{title:"COMPTABILITES | Transactions bancaire"},{created:A(()=>[]),_:1}),i(r).length!=0?(C(),f(v,{key:0,dataTables:i(r),MenuActions:i(w),display:i(P)},null,8,["dataTables","MenuActions","display"])):R("",!0),g($,{loading:i(n).loading,data:i(r),name:"Aucune Compte_transactions"},null,8,["loading","data"])])]),_:1}))}});export{G as default};
