import { makeRequest } from "./makeRequest";

export const getConferences = async (accessToken) => {
  const { data } = await makeRequest("GET", "conferences", accessToken);
  return data;
};

export const addConference = async (accessToken, data) => {
  const result = await makeRequest("POST", "conferences", accessToken, data);
  return result;
};
