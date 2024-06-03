import DashbordPage from "@/pages/dashbord.page.vue";

export const routeDashbord = {
   path: '/',
   component: DashbordPage,
   name: 'HOME',
   children: [
      {
         path: '',
         name: '',
      },
   ],
};
