/*import { getApiUrl } from "../utils/envUtils";

export const registerUser = async (name, email, password) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  };

  const result = await fetch(`${getApiUrl()}/users`, options);
  const response = await result.json();
  return response;
};
*/

import { getApiUrl } from "../utils/envUtils";

export const registerUser = async (name, email, password) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    };

    // Endpoint corect pentru înregistrare
    const result = await fetch(`${getApiUrl()}/auth/register`, options);

    // Verifică răspunsul serverului
    const response = await result.json();

    if (!result.ok) {
      throw new Error(response.message || "Registration failed");
    }

    return { success: true, message: response.message, data: response.data };
  } catch (error) {
    console.error("Registration Error:", error.message);
    return { success: false, message: error.message };
  }
};
