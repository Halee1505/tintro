import axios from "axios";
import { DOMAIN } from "./domain";
const getRooms = async () => {
  const response = await axios.get(`${DOMAIN}/room`);
  return response.data;
};

const getRoomById = async (id) => {
  const response = await axios.get(`${DOMAIN}/room/${id}`);
  return response.data;
};

const getRoomByLeaserId = async (id) => {
  const response = await axios.get(`${DOMAIN}/room/leaser/${id}`);
  return response.data;
};

const getRoomByRenterId = async (id) => {
  const response = await axios.get(`${DOMAIN}/room/renter/${id}`);
  return response.data;
};

const createRoom = async (room) => {
  const response = await axios.post(`${DOMAIN}/room`, room);
  return response.data;
};
const updateRoom = async (id, room) => {
  const response = await axios.put(`${DOMAIN}/room/${id}`, room);
  return response.data;
};

const roomApi = {
  getRooms,
  getRoomById,
  getRoomByLeaserId,
  getRoomByRenterId,
  createRoom,
  updateRoom,
};

export default roomApi;
