import { makeRequest } from "./makeRequest";

export const getContacts = async (accessToken) => {
  const { data } = await makeRequest("GET", "speakers", accessToken);
  return data;
};
