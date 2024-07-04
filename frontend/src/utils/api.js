// src/utils/api.js
const BASE_URL = "http://localhost:5000/api";

export const apiRequest = async (endpoint, method, body = null) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const config = {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "An error occurred");
  }

  return data;
};
