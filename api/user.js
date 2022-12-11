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

const userApi = {
  getUserById,
  createUser,
  login,
};

export default userApi;
