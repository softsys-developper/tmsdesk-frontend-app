import{P as g,Q as A,aa as s,s as D,a8 as i,ae as m,ab as f,d as U,o as y,a as p,c as E,w as T,b as v,T as P,U as I,V as S,u as b,e as x,W as q,an as R,ac as w,g as C}from"./index-Dn4C2nQW.js";const B=()=>{const{readData:_,showData:u}=f(),e=g({loading:!1,loadingCreate:!1,facture:{}}),o=A([]);o.value=s().FacturePaids;const n=t=>t.map(a=>({id:a.id,recepteur:a.recepteur,montant:a.montant,type_transaction:`<p class="' py-1  capitalize max-w-min rounded-md px-4 flex justify-center font-bold text-xs text-white ' ${a.type_transaction!=="entrée"?"bg-red-500":"bg-green-500"}">${a.type_transaction}</p>`,banque:a.banque.nom,date_transaction:a.date_transaction})),d=D(()=>s().FacturePaids);return{FindFacturePaidAll:()=>{e.loading=!0,_(i.FACTURE_PAID_LIST).then(t=>{s().FacturePaids=n(t.datas),e.loading=!1}).catch(()=>{e.loading=!1})},FindFacturePaidOne:t=>{e.loading=!0,u(i.FACTURE_PAID_DETAIL,t).then(a=>{e.facture=a.facture,s().FacturePaids=n(a.datas),e.loading=!1}).catch(()=>{e.loading=!1})},CreateFacturePaid:async t=>{m(e,s(),"FacturePaids",n).SetCreate(i.FACTURE_PAID_CREATE,t)},FacturePaidUpdate:(t,a)=>{m(e,s(),"FacturePaids",n).SetUpdate(i.FACTURE_PAID_UPDATE,t,a)},FacturePaidDelete:t=>{m(e,s(),"FacturePaids",n).SetDelete(i.FACTURE_PAID_REMOVE,t)},stateFacturePaids:o,setFacturePaid:e,storeFacturePaids:d}},F=[{label:"Numéro Facture",type:"select",placeholder:"Choisir le numéro de la facture",name:"factureId",value:"",select:[]},{label:"Montant à payer",type:"number",placeholder:"Choisir le numéro de la facture",name:"montant",value:"",select:[]},{label:"Mode de paiement",type:"select",placeholder:"Choisir le numéro de la facture",name:"mode_paiement",value:"",select:[{id:"cash",name:"Cash"},{id:"virement",name:"Virement"},{id:"cheque",name:"Cheque"}]},{label:"Banque",type:"select",placeholder:"Choisir la banque",name:"banque",value:"",select:[]},{label:"Désignation",type:"text",placeholder:"Choisir la banque",name:"designation",value:"",select:[]}],L={class:"w-full space-y-2"},k={class:""},N=U({__name:"facture_paid.modal",setup(_){const{CreateFacturePaid:u,FacturePaidUpdate:e,setFacturePaid:o}=B(),{remplacerObjetDansTableau:n}=w(),{readData:d}=f(),h=r=>{let c=new FormData(r.target);C().isUpdate.is?e(C().isUpdate.id,c):u(c)};return y(()=>{s().Factures&&(d(i.BANQUE_LIST).then(r=>{s().Comptes=r.datas,n(F,"name","banque",r.datas)}),d(i.FACTURE_LIST).then(r=>{n(F,"name","factureId",r.datas.map(c=>({id:c.id,name:c.numero_facture})))}))}),(r,c)=>(p(),E(R,{Func:h,loading:b(o).loadingCreate,permissions:"payer-facture-client"},{form:T(()=>[v("div",L,[(p(!0),P(I,null,S(b(F),l=>(p(),P("div",k,[x(q,{title:l.label,name:l.name,label:l.label,type:l.type,placeholder:l.placeholder,select:l.select},null,8,["title","name","label","type","placeholder","select"])]))),256))])]),_:1},8,["loading"]))}});export{N as _,B as u};
