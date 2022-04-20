import axios from 'axios';
import { AUTH_TOKEN, BASE_URL_SERVER } from '../../../../../Configs/server';


const API_ENDPOINT = {
  GET_FlightTicket_LIST: "/api/flightTicket",
  GET_DETAILS: "api/flight-Ticket/{id}",
  UPDATE_DETAILS: "api/flight-Ticket/{id}",
  CREATE_NEW: "/api/flight-Ticket",
  DELETE_FlightTicket: "api/flight-Ticket/{id}"
}

const configs = {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
};

class FlightTicketService {

  getFlightTicketList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_AIRLINE_LIST);
  };

  getFlightTicketDetail = async (id) => {
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
    return await axios.deleteAirline(BASE_URL_SERVER + API_ENDPOINT.DELETE_Airline + id, configs);
  }
}

const flightTicketService = new FlightTicketService()
export default flightTicketService;

