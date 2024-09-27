import { REGISTER_ENDPOINT } from "/js/utils/endpoints.mjs";

const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const registerForm = document.getElementById("registerForm")

async function handleFormSubmission(event) {
  event.preventDefault();

  const userData = {
    name: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  try {
    // const registerEndpointFull = `${REGISTER_ENDPOINT}`;
    const response = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Registration failed. Please try again.";
      throw new Error(errorMessage);
    }
    registerForm.reset();
    alert("Account successfully registered!")    
  } catch (error) {
    console.error("Error during registration:", error);
  }
}

document.getElementById("registerForm").addEventListener("submit", handleFormSubmission);
