import { URL_DATABASE } from "./constants";

export const submitAnswer = (text: string) => {
  return fetch(`${URL_DATABASE}/answers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ text }),
  }).then(function (response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

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
