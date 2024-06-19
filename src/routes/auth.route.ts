import SignAuth from "@/pages/auth/sign.auth.vue";
import Change_passwordAuth from "@/pages/auth/sign_change_password.auth.vue";
import Sign_emailAuth from "@/pages/auth/sign_email.auth.vue";


export const routeAuth = {
   path: '/sign',
   children: [
      {
         path: 'sign-in',
         name: 'SignIn',
         component: SignAuth
      },
      {
         path: 'change-password',
         name: 'SignChangePassword',
         component: Change_passwordAuth
      },
      {
         path: 'send-email',
         name: 'SignEmail',
         component: Sign_emailAuth
      },
   ],
};
