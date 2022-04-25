import axios from 'axios';
import { AUTH_TOKEN, BASE_URL_SERVER } from '../../../../../Configs/server';


const API_ENDPOINT = {
  GET_USER_LIST: "/api/users",
  GET_DETAILS: "/api/users/",
  UPDATE_DETAILS: "/api/users/",
  CREATE_NEW: "/api/users",
  DELETE_USER: "/api/users/"
}

const configs = {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
};

class UserService {

  getUserList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_USER_LIST);
  };

  getUserDetails = async (id) => {
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

  deleteUser = async (id) => {
    return await axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE_USER + id, configs);
  }
}

const userService = new UserService();
export default userService;
