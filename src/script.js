// JavaScript - script.js

// Lightbox öğelerini seç
var lightbox = document.getElementById("lightbox");
var lightboxImage = document.getElementById("lightbox-image");
var closeBtn = document.querySelector(".lightbox .close");

// Tüm tıklanabilir resimleri seç
var images = document.querySelectorAll(".clickable-image");

// Resimlere tıklanınca lightbox'u aç
images.forEach(function(image) {
    image.addEventListener("click", function() {
        lightbox.style.display = "block";
        lightboxImage.src = this.src; // Tıklanan resmin kaynağını lightbox'a yerleştir
    });
});

// Kapat butonuna tıklanınca lightbox'u kapat
closeBtn.addEventListener("click", function() {
    lightbox.style.display = "none";
});

// Lightbox dışına tıklayınca da kapat
lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
});

document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
        const response = await fetch('https://v2.api.noroff.dev/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Kayıt başarılı! Giriş yapabilirsiniz.');
            window.location.href = 'login.html';
        } else {
            alert('Kayıt hatası: ' + result.message);
        }
    } catch (error) {
        console.error('Kayıt API hatası:', error);
    }
});