import SignAuth from "@/pages/auth/sign.auth.vue";


export const routeAuth = {
   path: '/sign',
   children: [
      {
         path: 'sign-in',
         name: 'SignIn',
         component: SignAuth
      },
   ],
};
