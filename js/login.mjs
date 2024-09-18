import { LOGIN_ENDPOINT } from "/js/utils/endpoints.mjs";

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginForm = document.getElementById("loginForm");
const messageContainer = document.getElementById("message");

async function loginUser(userLogin) {
  try {
    const loginEndpointUrl = `${LOGIN_ENDPOINT}`;
    const response = await fetch(loginEndpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to log in.");
    }

    return await response.json();
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
}

async function handleFormSubmission(event) {
  event.preventDefault();

  const userCredentials = {
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  try {
    const json = await loginUser(userCredentials);
    const { accessToken, ...userData } = json.data;

    if (!accessToken) {
      throw new Error("Access token is missing.");
    }

    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("admin-user", JSON.stringify(userData));

    window.location.href = "/";
  } catch (error) {
    console.error("Login error:", error.message);
    messageContainer.textContent = `Login error: ${error.message}`;
    messageContainer.style.display = "block";
  }
}

loginForm.addEventListener("submit", handleFormSubmission);
