import{d as h,S as C,o as y,aa as b,a8 as U,a as o,c as _,w as m,b as P,T as g,U as $,V as w,u as e,e as n,W as k,al as A,ac as S,ab as T,g as c,_ as x,f as B,h as M,an as N,i as q,j as V,k as I}from"./index-S7Y4FJNc.js";import{u as v,a as F}from"./facture_paid.forms-D-KxXlZJ.js";const L=[{label:"ID",field:"id",status:null,color:null,bgColor:null},{label:"Recepteur",field:"recepteur",status:null,color:null,bgColor:null},{label:"Montant",field:"montant",status:null,color:null,bgColor:null},{label:"Type transaction",field:"type_transaction",status:null,color:null,bgColor:null},{label:"Banque",field:"banque",status:null,color:null,bgColor:null},{label:"Date de transaction",field:"date_transaction",status:null,color:null,bgColor:null}],R={class:"w-full space-y-2"},j={class:""},E=h({__name:"facture_paid_show.modal",setup(D){const r=C(),{CreateFacturePaid:t,FacturePaidUpdate:i,setFacturePaid:d}=v(),{remplacerObjetDansTableau:l}=S(),{readData:p}=T(),f=s=>{let u=new FormData(s.target);u.append("factureId",r.query.id),c().isUpdate.is?i(c().isUpdate.id,u):t(u)};return y(()=>{b().Factures&&p(U.BANQUE_LIST).then(s=>{b().Comptes=s.datas,l(F,"name","banque",s.datas)})}),(s,u)=>(o(),_(A,{Func:f,loading:e(d).loadingCreate,permissions:"payer-facture-client"},{form:m(()=>[P("div",R,[(o(!0),g($,null,w(e(F),a=>(o(),g("div",j,[n(k,{title:a.label,name:a.name,label:a.label,type:a.type,placeholder:a.placeholder,select:a.select},null,8,["title","name","label","type","placeholder","select"])]))),256))])]),_:1},8,["loading"]))}}),H={class:"flex flex-col w-full gap-4 bg-white rounded-lg mb-8"},W=h({__name:"facture_paid_compta.page",setup(D){const r=C(),{storeFacturePaids:t,FacturePaidDelete:i,FindFacturePaidOne:d,setFacturePaid:l}=v();return y(()=>{d(r.query.id)}),(p,f)=>(o(),_(I,null,{content:m(()=>[P("section",H,[n(x,{title:"Facture | Versements "+(e(l).facture.numero_facture!=null?e(l).facture.numero_facture:"")},{created:m(()=>[n(E,{name:"Nouveau versement",title:e(c)().isUpdate.is?"Modifier le versement":"Nouveau versement"},null,8,["title"]),n(B,{funDelete:e(i),id:e(c)().isDelete.id},null,8,["funDelete","id"])]),_:1},8,["title"]),e(t).length!=0?(o(),_(M,{key:0,dataTables:e(t),MenuActions:e(N),display:e(L)},null,8,["dataTables","MenuActions","display"])):q("",!0),n(V,{loading:e(l).loading,data:e(t),name:"Aucune facture_paids"},null,8,["loading","data"])])]),_:1}))}});export{W as default};
