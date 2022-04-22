import axios from "axios";
import { AUTH_TOKEN, BASE_URL_SERVER } from "../../../../../Configs/server";

const API_ENDPOINT = {
    GET_FLIGHT_LIST: "/api/flights",
    GET_DETAILS: "/api/flights/",
    UPDATE_DETAILS: "/api/flights/",
    CREATE_NEW: "/api/flights",
    DELETE_FLIGHT: "/api/flights/"
  }

  const configs = {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  };
  class FlightService {
    getFlightList = async () => {
        return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_FLIGHT_LIST);
      };
    
      getFlightDetails = async (id) => {
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
    
      deleteFlight = async (id) => {
        return await axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE_FLIGHT + id, configs);
      }
  }
  const flightService = new FlightService();
  export default flightService;