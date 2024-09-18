document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Form alanlarından bilgileri al
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Kayıt için API'ye gönderilecek veri
    const registerData = {
        name: name,
        email: email,
        password: password,
        avatar: {
            url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
            alt: "A blurry multi-colored rainbow background"
        },
        banner: {
            url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
            alt: "A blurry multi-colored rainbow background"
        }
    };

    try {
        // API'ye POST isteği gönder
        const response = await fetch('https://v2.api.noroff.dev/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        const result = await response.json();

        if (response.ok) {
            // Başarılı kayıt sonrası kullanıcıya bildirim ver ve login sayfasına yönlendir
            alert('Registration successful! You can now log in.');
            window.location.href = 'login.html';
        } else {
            // API'den dönen hatayı göster
            alert('Registration error: ' + result.message);
        }
    } catch (error) {
        console.error('API error during registration:', error);
    }
});