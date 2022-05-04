import axios from 'axios';
import { AUTH_TOKEN, BASE_URL_SERVER } from '../../../../Configs/server';


const API_ENDPOINT = {
  GET_PAYMENT_LIST: "/api/payments",
  GET_DETAILS: "/api/payments/",
  UPDATE_DETAILS: "/api/payments/",
  CREATE_NEW: "/api/payments",
  DELETE_PAYMENT: "/api/payments/"
}

const configs = {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
};

class PaymentService {

  getPaymentList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_PAYMENT_LIST);
  };

  getPaymentDetails = async (id) => {
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

  deletePayment = async (id) => {
    return await axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE_PAYMENT + id, configs);
  }
}

const paymentService = new PaymentService();
export default paymentService;

