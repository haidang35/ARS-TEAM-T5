import axios from "axios";
import { BASE_URL_SERVER } from "../../../../Configs/server";
import authService from "../../../Admin/Auth/Service/AuthServices";

const API_ENDPOINT = {
    USER_REGISTER: "/api/user/register",
}

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

    userRegister =  async (data) =>{
        return await axios.post( BASE_URL_SERVER + API_ENDPOINT.USER_REGISTER, data);
    }
}

const authServices = new AuthService();
export default authServices;


