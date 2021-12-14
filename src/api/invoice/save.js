import { API_SERVER_URL } from "../../consts";

export const save = async (invoice) => {
  const url = `${API_SERVER_URL}/invoice`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(invoice),
  };
  const resp = await fetch(url, requestOptions);

  return resp.json();
};
