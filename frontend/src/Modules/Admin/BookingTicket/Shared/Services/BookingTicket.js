import axios from 'axios';
import { AUTH_TOKEN, BASE_URL_SERVER } from '../../../../../Configs/server';


const API_ENDPOINT = {
  GET_BOOKING_TICKET_LIST: "/api/bookingtickets",
  GET_DETAILS: "/api/bookingTickets/",
  UPDATE_DETAILS: "/api/bookingTickets/",
  CREATE_NEW: "/api/bookingTickets",
  DELETE_BOOKING_TICKET: "/api/bookingTickets/"
}

const configs = {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
};

class BookingTicketService {

  getBookingTicketList = async (params) => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_BOOKING_TICKET_LIST, {
      params
    });
  };

  getBookingTicketDetails = async (id) => {
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

  deleteBookingTicket = async (id) => {
    return await axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE_BOOKING_TICKET + id, configs);
  }
}

const bookingTicket = new BookingTicketService();
export default bookingTicket;

