import axios  from "axios";
import { AUTH_TOKEN, BASE_URL_SERVER } from "../../../../Configs/server";


const API_ENDPOINT = {
    USER_REGISTER: "/api/user/register",
    ACCESS_AUTH_TOKEN: "/api/token",
    CURRENT_USER_ROLES: "/api/auth-user/roles",
    
  };

  class AccountService {
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

    getCurrentUserRoles = async () => {
      return await axios.get(BASE_URL_SERVER + API_ENDPOINT.CURRENT_USER_ROLES, {
          headers: {
              Authorization:  `Bearer ${AUTH_TOKEN}`
          }
      });
    }


    userRegister =  async (data) => {
        return await axios.post( BASE_URL_SERVER + API_ENDPOINT.USER_REGISTER, data )
    }
  
  }
  const accountService = new AccountService();
  export default accountService ;