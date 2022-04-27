import axios from 'axios';
import { AUTH_TOKEN, BASE_URL_SERVER } from '../../../../../Configs/server';



const API_ENDPOINT = {
  GET_ROLE_LIST: "/api/roles",
  GET_DETAILS: "/api/roles/",
  UPDATE_DETAILS: "/api/roles/",
  CREATE_NEW: "/api/roles",
  DELETE_ROLE: "/api/roles/"
}

const configs = {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
};

class RoleService {

  getRoleList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_ROLE_LIST);
  };

  getRoleDetails = async (id) => {
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

  deleteRole = async (id) => {
    return await axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE_ROLE + id, configs);
  }
}

const roleService = new RoleService();
export default roleService;