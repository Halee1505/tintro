import axios from "axios";
import { DOMAIN } from "./domain";
const getBillByRoomId = async (id, type) => {
  const response = await axios.get(`${DOMAIN}/bill/room/${id}/${type}`);
  return response.data;
};

const updateBill = async (id, data) => {
  const response = await axios.put(`${DOMAIN}/bill/${id}`, data);
  return response.data;
};

const createBill = async (data) => {
  const response = await axios.post(`${DOMAIN}/bill`, data);
  return response.data;
};

const billApi = {
  getBillByRoomId,
  updateBill,
  createBill,
};

export default billApi;
