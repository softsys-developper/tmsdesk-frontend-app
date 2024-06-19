import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();
import { API_URL } from "@/routes/api.route";
import axios from "axios";

export const authService = () => {
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL.AUTH_SIGNIN}`, {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("nToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        location.assign("/");
      }
      return response.data;
    } catch (error: any) {
      console.error("Erreur lors de la connexion:", error.response.data.errors);

      toast({
        title: `${Object.keys(error.response.data.errors)}`,
        variant: "destructive",
        description: ` ${
          error.response.data.errors[
            Object.keys(error.response.data.errors)[0]
          ] || error.response.data.message
        }`,
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  const register = async (user: {
    email: string;
    password: string;
    nom: string;
    prenom: string;
  }) => {
    try {
      const response = await axios.post(`${API_URL.AUTH_SIGNUP}`, user);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      throw error;
    }
  };

  const SendMail = async (email: string) => {
    try {
      const response = await axios.post(`${API_URL.AUTH_SEND_MAIL}`, { email });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      throw error;
    }
  };

  const changePassword = async (password: string, email: any, token: any ) => {
    try {
      const response = await axios.post(`${API_URL.AUTH_GHANGE_PASSWORD}`, {
        email,
        password,
        token
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      throw error;
    }
  };

  const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  };

  return {
    login,
    logout,
    register,
    getCurrentUser,
    changePassword,
    SendMail,
  };
};
