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