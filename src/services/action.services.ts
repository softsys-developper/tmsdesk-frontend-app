import { useProfileServices } from '@/services/profile.services';
const { MenuProfileSignOut } = useProfileServices();


// 
export const Fun_Actions = (id: string) => {
    console.log(id)
   if (id == 'MENU_SIGNOUT') {
      MenuProfileSignOut();
   }
};
