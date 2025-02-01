import axios from "axios";

const API_URL = "http://localhost:5000/users";

export const fetchUsers = async () => (await axios.get(API_URL)).data;
export const getUser = async (id: number) =>
  (await axios.get(`${API_URL}/${id}`)).data;
interface User {
  id?: number;
  name: string;
  email: string;
}

export const addUser = async (user: User) => await axios.post(API_URL, user);
export const updateUser = async (id: number, user: User) =>
  await axios.put(`${API_URL}/${id}`, user);
export const deleteUser = async (id: number) =>
  await axios.delete(`${API_URL}/${id}`);
