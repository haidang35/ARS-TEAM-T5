import axios from 'axios';
import { AUTH_TOKEN, BASE_URL_SERVER } from '../../../../Configs/server';


const API_ENDPOINT = {
  GET_PAYMENT_LIST: "/api/payment",
  GET_DETAILS: "/api/payment/",
  UPDATE_DETAILS: "/api/payment/",
  CREATE_NEW: "/api/payment",
  DELETE_PAYMENT: "/api/payment/"
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

const paymentService1 = new PaymentService();
export default PaymentService;

