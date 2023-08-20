import { makeRequest } from "./makeRequest";

export const getContacts = async (accessToken) => {
  const { data } = await makeRequest("GET", "speakers", accessToken);
  return data;
};

export const addContact = async (accessToken, data) => {
  const response = await makeRequest("POST", "speakers", accessToken, data);
  return response;
};

export const deleteContact = async (accessToken, id) => {
  const response = await makeRequest("DELETE", `speakers/${id}`, accessToken);
  return response;
};

export const getContact = async (accessToken, id) => {
  const { data } = await makeRequest("GET", `speakers/${id}`, accessToken);
  return data;
};
