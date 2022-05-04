import axios from 'axios';
import { AUTH_TOKEN, BASE_URL_SERVER } from '../../../../../Configs/server';


const API_ENDPOINT = {
  GET_AIRLINE_LIST: "/api/airlines",
  GET_DETAILS: "/api/airlines/",
  UPDATE_DETAILS: "/api/airlines/",
  CREATE_NEW: "/api/airlines",
  DELETE_Airline: "/api/airlines/",
  UPLOAD_LOGO: '/api/airlines/upload-logo'
}

const configs = {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
};

class AirlineService {

  getAirlineList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_AIRLINE_LIST);
  };

  getAirlineDetails = async (id) => {
    return await axios.get(
      BASE_URL_SERVER + API_ENDPOINT.GET_DETAILS + id
    );
  };

  updateDetails = async (id, data) => {
    return await axios.put(
      BASE_URL_SERVER + API_ENDPOINT.UPDATE_DETAILS + id,
      data,
    );
  };

  createNew = async (data) => {
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.CREATE_NEW, data, configs);
  };

  deleteAirline = async (id) => {
    return await axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE_Airline + id, configs);
  }

  uploadLogo = async (data) => {
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.UPLOAD_LOGO, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

const airlineService = new AirlineService();
export default airlineService;

