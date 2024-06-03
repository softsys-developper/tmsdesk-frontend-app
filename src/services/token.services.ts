import axios from 'axios';

export const TOKEN = () => {
   // Configurer axios pour inclure le token dans les en-têtes de requête

   const Token = localStorage.getItem('nToken');
   console.log(Token)
   if (Token) {
      axios.defaults.headers.common['authorization'] = `Bearer ${Token}`
   }
};
