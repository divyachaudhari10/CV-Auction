import axios from "axios";
import config from "../config";

const path = config.API_URL;

class LoginAndRegisterService {

  
  registerUser = async (data) => {
    console.log(data);
    return await axios.post(`${path}/user`, data)
      .then(response => {
        localStorage.removeItem('user');
        localStorage.setItem('user',JSON.stringify(data));
        console.log("Registration successful:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("Error during registration:", error.response ? error.response.data : error.message);
        return null;
      });
  };

  loginUser = async (userData) => {
    try {
      const response = await axios.post(`${path}/LoginService/login`, userData);
      return response.data; 
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      throw new Error("Login failed, please try again.");
    }
  };
  

  forgotPassword = (data) => {
    return axios.get(`${path}`+ "/" + data.Uemail)
      .then(response => {
        console.log("Forgot password request successful:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("Error during forgot password:", error.response ? error.response.data : error.message);
        return null;
      });
  };

  updatePassword = (data) => {
    return axios.put(`${path}/${data.Uemail}`, data)
      .then(response => {
        console.log("Password updated successfully:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("Error during password update:", error.response ? error.response.data : error.message);
        return null;
      });
  };

  getHeader = () => {
    const token = localStorage.getItem("jwtToken"); // Retrieve the token from localStorage
    const head = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token in the Authorization header
      },
    };
    return head;
  };
}

export default new LoginAndRegisterService();
