document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Prepare login data
    const loginData = {
        email: email,
        password: password
    };

    try {
        // Send POST request to the API
        const response = await fetch('https://v2.api.noroff.dev/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            // Store the access token
            localStorage.setItem('authToken', result.data.accessToken);

            // Store the user information as a JSON string
            localStorage.setItem('Adminuser', JSON.stringify({
                name: result.data.name,
                email: result.data.email,
                avatar: result.data.avatar,
                banner: result.data.banner
            }));

            alert('Login successful!');
            window.location.href = '/';
        } else {
            // Handle errors
            alert('Login error: ' + result.message);
        }
    } catch (error) {
        console.error('API error during login:', error);
    }
});