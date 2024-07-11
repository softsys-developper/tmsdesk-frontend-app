import{d as b,Q as i,S as k,o as w,a,c as L,w as D,b as t,e as x,_ as I,T as n,a7 as N,i as f,Y as B,X as s,U as T,V,k as j,af as A,a9 as q,a8 as h,ag as E}from"./index-DUU6GLEY.js";const O={class:"flex flex-col w-full gap-4 bg-white rounded-lg mb-8"},P={key:0,class:"flex justify-center items-center h-64"},S={key:1,class:"flex flex-col gap-8"},C=t("svg",{class:"flex-shrink-0 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[t("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),t("polyline",{points:"7 10 12 15 17 10"}),t("line",{x1:"12",x2:"12",y1:"15",y2:"3"})],-1),R={class:"w-full mx-auto bg-white",id:"printableDiv"},F={class:"sm:w-11/12 lg:w-4/4 mx-auto"},Q={class:"flex flex-col rounded-xl dark:bg-neutral-800"},U={class:"flex justify-between"},M=t("h1",{class:"font-bold text-2xl"},"BON DE LIVRAISON",-1),Y={class:"mt-1 border-[1px] text-sm px-4 py-1 block text-gray-500 dark:text-neutral-500"},$=t("div",{class:"h-24"},[t("img",{class:"h-full",src:A,alt:""})],-1),z={class:"mt-8 grid sm:grid-cols-2 gap-3"},G=t("div",null,null,-1),H={class:"sm:text-end space-y-2"},X={class:"grid grid-cols-2 text-sm sm:grid-cols-1 gap-3 sm:gap-2"},J={class:"grid sm:grid-cols-5 gap-x-3 text-xs"},K=t("dt",{class:"col-span-3 font-semibold text-gray-800 dark:text-neutral-200"}," DATE: ",-1),W={class:"col-span-2 text-gray-500 dark:text-neutral-500"},Z={class:"grid sm:grid-cols-5 text-xs"},tt=t("dt",{class:"col-span-3 font-semibold text-gray-800 dark:text-neutral-200"}," Votre commande N*: ",-1),et={class:"col-span-2 text-gray-500 dark:text-neutral-500"},st={class:"relative flex flex-col gap-3 sm:rounded-lg mt-8"},ot={class:"min-w-full border-collapse border border-gray-200"},at=t("thead",null,[t("tr",{class:"text-xs"},[t("th",{class:"border-[1px] px-4 py-2"},"No"),t("th",{class:"border-[1px] px-4 py-2"},"Description"),t("th",{class:"border-[1px] px-4 py-2"},"QTY PO"),t("th",{class:"border-[1px] px-4 py-2"},"QTY BL"),t("th",{class:"border-[1px] px-4 py-2"},"UNIT"),t("th",{class:"border-[1px] px-4 py-2"},"Observation")])],-1),rt={class:"text-xs"},lt={class:"border-[1px] px-4 py-2"},it={class:"border-[1px] px-4 py-2"},nt={class:"border-[1px] px-4 py-2"},dt={class:"border-[1px] px-4 py-2"},ct={class:"border-[1px] px-4 py-2"},_t={class:"border-[1px] px-4 py-2"},ut={class:"flex justify-between my-16"},pt=t("div",{class:""},null,-1),xt={class:"flex justify-center items-center flex-col"},ft={class:"font-bold border-2 text-xs text-gray-700 px-6 py-2"},ht=t("p",{class:"mt-5 text-sm text-gray-500 dark:text-neutral-500 text-center border-t-[1px] pt-4"},null,-1),yt=b({__name:"livraison_bl_logic.page",setup(mt){const e=i({}),m=i({}),g=i({}),r=i(!1),d=k(),v=async()=>{r.value=!0;const{data:o}=await q.get(d.query.facture?h.LIVRAISON_DETAIL+""+d.query.id:h.LIVRAISON_DETAIL+""+d.query.id);o&&(r.value=!1,e.value=o.data.livraison,g.value=o.parametre,m.value=o.facture)};w(()=>{v()});const y=()=>{const o=document.getElementById("printableDiv");o&&E().from(o).set({margin:.5,filename:"document.pdf",jsPDF:{unit:"in",format:"letter",orientation:"portrait"}}).save()};return(o,gt)=>(a(),L(j,null,{content:D(()=>{var c,_,u;return[t("section",O,[x(I,{title:"Logistique | Bon de livraison"}),r.value?(a(),n("div",P,[x(N)])):f("",!0),e.value&&!r.value?(a(),n("div",S,[t("div",{class:"flex justify-end gap-x-3 w-11/12"},[t("a",{onClick:y,class:"py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800",href:"#"},[C,B(" BL PDF ")])]),t("div",R,[t("div",F,[t("div",Q,[t("div",U,[t("div",null,[M,t("div",Y," QUOTE # "+s((c=e.value.proforma)==null?void 0:c.numero_proforma),1)]),$]),t("div",z,[G,t("div",H,[t("div",X,[t("dl",J,[K,t("dd",W,s(e.value.date_livraison),1)]),t("dl",Z,[tt,t("dd",et,s(e.value.reference),1)])])])]),t("div",st,[t("table",ot,[at,(a(!0),n(T,null,V(e.value.produit_livres,(p,l)=>(a(),n("tbody",null,[t("tr",rt,[t("td",lt,s(l+1),1),t("td",it,s(e.value.proforma.produit_services[l].description),1),t("td",nt,s(p.quantite_livree),1),t("td",dt,s(p.quantite_restante),1),t("td",ct,s(e.value.proforma.produit_services[l].unite),1),t("td",_t,s(e.value.proforma.produit_services[l].remarque),1)])]))),256))])]),t("div",ut,[pt,t("div",xt,[t("div",ft,s((u=(_=e.value.proforma)==null?void 0:_.user)==null?void 0:u.name),1)])]),ht])])])])):f("",!0)])]}),_:1}))}});export{yt as default};
