import { makeRequest } from "./makeRequest";

export const getContacts = async (accessToken) => {
  const { data } = await makeRequest("GET", "speakers", accessToken);
  return data;
};

export const addContact = async (accessToken, data) => {
  const result = await makeRequest("POST", "speakers", accessToken, data);
  return result;
};
