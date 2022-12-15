import axios from "axios";
import { DOMAIN } from "./domain";

const getUserById = async (id) => {
  const response = await axios.get(`${DOMAIN}/user/${id}`);
  return response.data;
};

const createUser = async (user) => {
  const response = await axios.post(`${DOMAIN}/user`, user);
  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${DOMAIN}/user/login`, user);
  return response.data;
};

const changePassword = async (user, password) => {
  const response = await axios.put(`${DOMAIN}/user/change/${user}`, password);
  return response.data;
};

const userApi = {
  getUserById,
  createUser,
  login,
  changePassword,
};

export default userApi;
