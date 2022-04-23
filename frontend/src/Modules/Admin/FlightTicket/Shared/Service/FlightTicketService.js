import axios from 'axios';
import { AUTH_TOKEN, BASE_URL_SERVER } from '../../../../../Configs/server';


const API_ENDPOINT = {
  GET_FLIGHT_TICKET_LIST: "/api/tickets",
  GET_DETAILS: "/api/tickets/",
  UPDATE_DETAILS: "/api/tickets/",
  CREATE_NEW: "/api/tickets",
  DELETE_FLIGHT_TICKET: "/api/tickets/"
}

const configs = {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
};

class FlightTicketService {

  getFlightTicketList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_FLIGHT_TICKET_LIST);
  };

  getFlightTicketDetails = async (id) => {
    return await axios.get(
      BASE_URL_SERVER + API_ENDPOINT.GET_DETAILS + id,
      configs
    );
  };

  updateDetails = async (id, data) => {
    return await axios.put(
      BASE_URL_SERVER + API_ENDPOINT.UPDATE_DETAILS + id,
      data,
      configs
    );
  };

  createNew = async (data) => {
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.CREATE_NEW, data, configs);
  };

  deleteFlightTicket = async (id) => {
    return await axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE_FLIGHT_TICKET + id, configs);
  }
}

const flightTicketService = new FlightTicketService();
export default flightTicketService;

