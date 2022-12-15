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

const createNotification = async (notification) => {
  const response = await axios.post(`${DOMAIN}/notification`, notification);
  return response.data;
};

const notificationApi = {
  getNotificationById,
  getNotificationByUserId,
  createNotification,
};

export default notificationApi;
