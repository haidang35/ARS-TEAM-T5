import axios from "axios";
import { AUTH_TOKEN, BASE_URL_SERVER } from "../../../../Configs/server";

const API_ENDPOINT = {

    GET_LOCATIONS_LIST: "/api/locations",
    GET_FLIGHT_TICKETS: '/api/tickets/search',

}


const configs = {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  };


class PublicService {

    getLocationsList = async () => {
        return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_LOCATIONS_LIST);
    }
    
    getFlightTickets = async (searchData) => {
        return await axios.post(BASE_URL_SERVER + API_ENDPOINT.GET_FLIGHT_TICKETS, searchData);
    }
}

    





const publicService = new PublicService();
export default publicService;