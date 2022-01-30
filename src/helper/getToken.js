import axios from "axios";

export const getToken = async () => {
  const BASE_ENDPOINT = "http://localhost:9090/";
  const url_base = `${BASE_ENDPOINT}projects/credentials`;
  const { data } = await axios(url_base);

  return data;
};
