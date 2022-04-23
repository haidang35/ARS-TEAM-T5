import axios from 'axios';
import { AUTH_TOKEN, BASE_URL_SERVER } from '../../../../../Configs/server';


const API_ENDPOINT = {
  GET_BOOKING_LIST: "/api/bookings",
  GET_DETAILS: "/api/bookings/",
  UPDATE_DETAILS: "/api/bookings/",
  CREATE_NEW: "/api/bookings",
  DELETE_BOOKING: "/api/bookings/"
}

const configs = {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
};

class BookingService {

  getBookingList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_BOOKING_LIST);
  };

  getBookingDetails = async (id) => {
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

  deleteBooking = async (id) => {
    return await axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE_BOOKING + id, configs);
  }
}

const bookingService = new BookingService();
export default bookingService;

