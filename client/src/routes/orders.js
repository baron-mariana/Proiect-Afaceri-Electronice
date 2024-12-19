import { getApiUrl } from "../utils/envUtils";

/*export const createOrder = async (payload, token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  const result = await fetch(`${getApiUrl()}/orders/create`, options);
  const response = await result.json();
  return response;
};*/


export const createOrder = async (orderData, token) => {
  const response = await fetch('http://localhost:3001/orders/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Adaugă token-ul aici
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};
