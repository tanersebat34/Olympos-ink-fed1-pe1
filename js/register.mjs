import { REGISTER_ENDPOINT } from "/js/utils/endpoints.mjs";

const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const registerMessage = document.getElementById("register-message");

async function handleFormSubmission(event) {
  event.preventDefault();

  const userData = {
    name: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  try {
    const registerEndpointFull = `${REGISTER_ENDPOINT}`;
    const response = await fetch(registerEndpointFull, {
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

    registerMessage.textContent = "Account successfully registered!";
    registerMessage.classList.remove("hidden", "error");
    registerMessage.classList.add("success");

    setTimeout(() => {
      registerMessage.classList.add("hidden");
    }, 6000);
  } catch (error) {
    registerMessage.textContent = `Error: ${error.message}`;
    registerMessage.classList.remove("hidden", "success");
    registerMessage.classList.add("error");

    setTimeout(() => {
      registerMessage.classList.add("hidden");
    }, 6000);

    console.error("Error during registration:", error);
  }
}

document.getElementById("registerForm").addEventListener("submit", handleFormSubmission);
