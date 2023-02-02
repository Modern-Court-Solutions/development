import { fetchData } from "../lib/loginApi";

export const getData = async (url: string, jwt: string) => {
  return await fetchData(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${jwt}`,
    },
  });
};
