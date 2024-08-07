import { createWebHistory, createRouter } from 'vue-router';
import { routeDashbord } from './dashbord.route';
import { routeCrm } from './crm.route';
import { routeAuth } from './auth.route';
import { routeRh } from './rh.route';
import { routeLogisc } from './logisc.route';
import { routeProforma } from './proforma.route';
import { routeCompta } from './compta.route';
import { routeSystem } from './system.route';
import { routeSupport } from './support.route';

const routes: any = [
   routeDashbord,
   routeCrm,
   routeAuth,
   routeRh,
   routeLogisc,
   routeProforma,
   routeCompta,
   routeSystem,
   routeSupport
];

export const router = createRouter({
   history: createWebHistory(),
   routes,
   scrollBehavior(to, from, savedPosition) {
      console.log(to, from)
      if (savedPosition) {
        return savedPosition;
      } else {
        return { top: 0 };
      }
    }
});

router.beforeEach(async (to) => {
   // Storage
   const nToken = localStorage.getItem('nToken');

   if (nToken && to.path.includes('/sign')) {
      return {
         name: 'HOME',
      };
   }

   if (!nToken && !to.path.includes('/sign')) {
      return {
         name: 'SignIn',
      };
   }
});
