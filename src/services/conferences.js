import { makeRequest } from "./makeRequest";

export const getConferences = async (accessToken) => {
  const { data } = await makeRequest("GET", "conferences", accessToken);
  return data;
};
