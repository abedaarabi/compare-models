import axios from "axios";

export const getToken = async () => {
  const BASE_ENDPOINT = "http://10.25.38.36:9090/";
  const url_base = `${BASE_ENDPOINT}projects/credentials`;
  const { data } = await axios(url_base);
  //   console.log(data);
  return data;
};
