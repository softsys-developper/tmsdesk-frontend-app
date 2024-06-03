export const useProfileServices = () => {

    // 
   const MenuProfileSignOut = () => {
        localStorage.removeItem('nToken')
        location.assign('/')
   };

   return {
    MenuProfileSignOut
   };
};
