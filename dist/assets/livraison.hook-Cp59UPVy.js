import{P as u,Q as v,aa as s,g as p,s as L,ad as f,a8 as r,ae as o,ab as _}from"./index-DcNzkE1J.js";const U=()=>{const{readData:d}=_(),t=u({loading:!1,loadingCreate:!1,loadingDelete:!1,loadingUpdate:!1}),n=v([]);n.value=s().Livraisons,p().UpdateValue=s().Livraisons[0];const i=a=>a.map(e=>({id:e.id,reference:e.reference,site_livraison:e.site_livraison,date_depart:e.date_depart,date_retour:e.date_retour,status:`<p class="' py-1  capitalize min-w-max rounded-md px-2 flex justify-center font-bold text-xs text-white ' ${e.status!=="en cours"?"bg-green-500":"bg-blue-400"}">${e.status}</p>`,produit_livres:e.produit_livres.length,date_livraison:f(e.created_at).format("DD/MM/YYYY")})),l=L(()=>s().Livraisons);return{FindLivraisonAll:()=>{t.loading=!0,d(r.LIVRAISON_LIST).then(a=>{s().Livraisons=i(a.datas),t.loading=!1}).catch(()=>{t.loading=!1})},FindLivraisonOne:()=>{},CreateLivraison:async(a,e)=>{o(t,s(),"Livraisons",i,e()).SetCreate(r.LIVRAISON_CREATE,a)},LivraisonUpdate:(a,e,c)=>{o(t,s(),"Livraisons",i,c()).SetUpdate(r.LIVRAISON_UPDATE,a,e)},LivraisonDelete:a=>{o(t,s(),"Livraisons",i).SetDelete(r.LIVRAISON_REMOVE,a)},stateLivraisons:n,setLivraison:t,storeLivraisons:l,formatLivraisonData:i}};export{U as u};
