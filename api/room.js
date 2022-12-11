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

const roomApi = {
  getRooms,
  getRoomById,
};

export default roomApi;
