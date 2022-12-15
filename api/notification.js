import axios from "axios";
import { DOMAIN } from "./domain";
const getNotificationById = async (id) => {
  const response = await axios.get(`${DOMAIN}/notification${id}`);
  return response.data;
};

const getNotificationByUserId = async (id) => {
  const response = await axios.get(`${DOMAIN}/notification/user/${id}`);
  return response.data;
};

const notificationApi = {
  getNotificationById,
  getNotificationByUserId,
};

export default notificationApi;
