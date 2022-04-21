import axios from "axios";
import { AUTH_TOKEN, BASE_URL_SERVER } from "../../../../Configs/server";

const API_ENDPOINT = {

    GET_LOCATIONS_LIST: "/api/locations",

}


const configs = {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  };


class PublicService {

    getLocationsList = async () => {
        return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_LOCATIONS_LIST);
    }
}






const publicService = new PublicService();
export default publicService;