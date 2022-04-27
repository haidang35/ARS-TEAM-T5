import { async } from "@firebase/util";
import axios from "axios";
import { BASE_URL_SERVER } from "../../../../Configs/server";

const API_ENDPOINT = {
  ACCESS_AUTH_TOKEN: "/api/token",
  USER_REGISTER: "/api/user/register",
  CURRENT_USER_ROLES: '/api/auth-user/roles'
};



class AuthService {
  accessAuthToken = async (data) => {
    return await axios.post(
      BASE_URL_SERVER + API_ENDPOINT.ACCESS_AUTH_TOKEN,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  };
  // registerNewUser = async (data) =>{
  //     return await axios.post(BASE_URL_SERVER)
  // }


  getCurrentUserRoles = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.CURRENT_USER_ROLES, {
        headers: {
            Authorization:  `Bearer ${localStorage.getItem('access_token')}`
        }
    });
  }
}
const authService = new AuthService();
export default authService;
