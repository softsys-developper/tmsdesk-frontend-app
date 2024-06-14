import axios from 'axios';

export const useApiServices = () => {
   const createData = async (url: string, data: any) => {
      try {
         const response = await axios.post(url, data);
         return response.data;
      } catch (error) {
         console.error('Erreur lors de la création des données:', error);
         throw error;
      }
   };

   const readData = async (url: string) => {
      try {
         const response = await axios.get(url);
         return response.data;
      } catch (error) {
         console.error('Erreur lors de la lecture des données:', error);
         throw error;
      }
   };

   const showData = async (url: string, id: string) => {
      try {
         const response = await axios.get(`${url}/${id}`);
         return response.data;
      } catch (error) {
         console.error('Erreur lors de la lecture des données:', error);
         throw error;
      }
   };

   const updateData = async (url: string, data: string) => {
      try {
         const response = await axios.post(url, data);
         return response.data;
      } catch (error) {
         console.error('Erreur lors de la mise à jour des données:', error);
         throw error;
      }
   };

   const deleteData = async (url: string) => {
      try {
         const response = await axios.delete(url);
         return response.data;
      } catch (error) {
         console.error('Erreur lors de la suppression des données:', error);
         throw error;
      }
   };

   return {
      createData,
      updateData,
      readData,
      deleteData,
      showData,
   };
};
