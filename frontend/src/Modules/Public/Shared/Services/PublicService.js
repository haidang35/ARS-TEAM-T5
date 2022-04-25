import axios from "axios";
import { API_GET_IP_ADDRESS, AUTH_TOKEN, BASE_URL_SERVER } from "../../../../Configs/server";

const API_ENDPOINT = {

    GET_LOCATIONS_LIST: "/api/locations",
    GET_FLIGHT_TICKETS: '/api/tickets/search',
    BOOKING_TICKET: '/api/public/booking',
    GET_LOCKED_FLIGHT_SEATS: '/api/flights/',
    GET_BOOKING_DETAILS: '/api/bookings/',
    PAYMENT_BOOKING: '/api/payments/booking'
}

export const API_CONVERT_CURRENCY = 'https://currency-converter5.p.rapidapi.com/currency/convert';


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

    bookingTicket = async (data) => {
        return await axios.post(BASE_URL_SERVER + API_ENDPOINT.BOOKING_TICKET, data);
    }

    getLockedFlightSeats = async (flightId) => {
        return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_LOCKED_FLIGHT_SEATS + flightId + '/reserved');
    }

    getBookingDetails = async (bookingCode) => {
        return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_BOOKING_DETAILS + bookingCode);
    }

    convertCurrency = async (params) => {
        return await axios.get(API_CONVERT_CURRENCY, { params, headers: {
            'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com',
            'X-RapidAPI-Key': 'a14fa83095msh4e61c2f7cc01530p112814jsnaa0c0896cb17'
        } });
    }

    paymentBooking = async (data) => {
        return await axios.post(BASE_URL_SERVER + API_ENDPOINT.PAYMENT_BOOKING, data);
    }

    getIpAdressInfo = async () => {
        return await axios.get(API_GET_IP_ADDRESS);
    }
}

    





const publicService = new PublicService();
export default publicService;