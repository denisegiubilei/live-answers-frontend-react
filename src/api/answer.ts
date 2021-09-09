import { URL_DATABASE } from "./constants";

export const listAnswers = () => {
  return fetch(`${URL_DATABASE}/answers`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then(function (response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
