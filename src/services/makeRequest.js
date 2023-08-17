import axios from "axios";

/**
 * Reusuable API call with axios
 * @param {string} method http method such as 'GET', 'POST', 'PUT', 'DELETE'
 * @param {string} endPoint Api endpoint such as "conferences", "speakers"
 * @param {string} accessToken Access token from auth
 * @param {object} data Any data that needs to be passed to the DB
 * @returns {Promise} An axios promise
 */
export const makeRequest = (method, endPoint, accessToken, data) => {
  const baseURL =
    import.meta.env.VITE_ENV === "production"
      ? import.meta.env.VITE_DB_URL
      : import.meta.env.VITE_DB_SERVER;

  return axios({
    url: `${baseURL}/${endPoint}`,
    method: method,
    data: data,
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};
