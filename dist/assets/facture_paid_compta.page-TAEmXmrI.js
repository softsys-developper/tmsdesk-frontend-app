import{d,S as _,o as f,a as n,c as s,w as o,b as m,e as a,_ as p,u as e,g as u,f as b,h as g,am as C,i as F,j as P,k as h}from"./index-Dn4C2nQW.js";import{u as v,_ as y}from"./facture_paid.modal.vue_vue_type_script_setup_true_lang-C5ijspR3.js";const D=[{label:"ID",field:"id",status:null,color:null,bgColor:null},{label:"Recepteur",field:"recepteur",status:null,color:null,bgColor:null},{label:"Montant",field:"montant",status:null,color:null,bgColor:null},{label:"Type transaction",field:"type_transaction",status:null,color:null,bgColor:null},{label:"Banque",field:"banque",status:null,color:null,bgColor:null},{label:"Date de transaction",field:"date_transaction",status:null,color:null,bgColor:null}],M={class:"flex flex-col w-full gap-4 bg-white rounded-lg mb-8"},A=d({__name:"facture_paid_compta.page",setup($){const r=_(),{storeFacturePaids:l,FacturePaidDelete:i,FindFacturePaidOne:c,setFacturePaid:t}=v();return f(()=>{c(r.query.id)}),(k,x)=>(n(),s(h,null,{content:o(()=>[m("section",M,[a(p,{title:"Facture | Versements "+(e(t).facture.numero_facture!=null?e(t).facture.numero_facture:"")},{created:o(()=>[a(y,{name:"Nouveau versement",title:e(u)().isUpdate.is?"Modifier le versement":"Nouveau versement"},null,8,["title"]),a(b,{funDelete:e(i),id:e(u)().isDelete.id},null,8,["funDelete","id"])]),_:1},8,["title"]),e(l).length!=0?(n(),s(g,{key:0,dataTables:e(l),MenuActions:e(C),display:e(D)},null,8,["dataTables","MenuActions","display"])):F("",!0),a(P,{loading:e(t).loading,data:e(l),name:"Aucune facture_paids"},null,8,["loading","data"])])]),_:1}))}});export{A as default};