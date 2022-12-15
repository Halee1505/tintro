import axios from "axios";
import { DOMAIN } from "./domain";

const createFixRequest = async (data) => {
  const response = await axios.post(`${DOMAIN}/fixRequest`, data);
  return response.data;
};

const getFixRequestByRoomId = async (id) => {
  const response = await axios.get(`${DOMAIN}/fixRequest/room/${id}`);
  return response.data;
};

const deleteFixRequest = async (id) => {
  const response = await axios.delete(`${DOMAIN}/fixRequest/${id}`);
  return response.data;
};

const updateFixRequest = async (id, data) => {
  const response = await axios.put(`${DOMAIN}/fixRequest/${id}`, data);
  return response.data;
};

const fixRequestApi = {
  createFixRequest,
  getFixRequestByRoomId,
  deleteFixRequest,
  updateFixRequest,
};

export default fixRequestApi;
