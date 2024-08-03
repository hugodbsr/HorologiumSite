document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.querySelector('.carousel-container');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeButton = document.querySelector('.lightbox .close');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const percentageDoneSMTIV = document.querySelector('.bar-percentage-SMTIV');

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let TranslationDone = 60;

    percentageDoneSMTIV.textContent = TranslationDone + "%";
    percentageDoneSMTIV.style.width = TranslationDone + "%";

    const images = [
        'ressources/images-view/img1.jpg',
        'ressources/images-view/img2.jpg',
        'ressources/images-view/img3.jpg',
        'ressources/images-view/img4.jpg',
        'ressources/images-view/img5.jpg',
        'ressources/images-view/img6.jpg',
        'ressources/images-view/img7.jpg',
        'ressources/images-view/img8.jpg'
    ];



    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Image';
        img.className = 'carousel-image';
        img.dataset.index = index;
        carouselContainer.appendChild(img);

        const indicator = document.createElement('span');
        indicator.className = 'carousel-indicator';
        indicator.dataset.index = index;
        indicatorsContainer.appendChild(indicator);
    });

    function updateCarousel() {
        carouselContainer.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
        updateIndicators();
    }

    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        for(let i = 0; i < indicators.length; i++) {
            if(i===currentIndex) {
                indicators[i].classList.add('active');
            }
            else{
                indicators[i].classList.remove('active');
            }
        }
    }

    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex = currentIndex - 1;
        } else {
            currentIndex = images.length - 1;
        }
        updateCarousel();
    });

    nextButton.addEventListener('click', function () {
        if (currentIndex < images.length - 1) {
            currentIndex = currentIndex + 1;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    carouselContainer.addEventListener('click', function (event) {
        if (event.target && event.target.className === 'carousel-image') {
            const index = event.target.dataset.index;
            lightboxImage.src = images[index];
            lightbox.style.display = 'block';
        }
    });

    closeButton.addEventListener('click', function () {
        lightbox.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    carouselContainer.addEventListener('touchstart', function (event) {
        startX = event.touches[0].pageX;
        isDragging = true;
    });

    carouselContainer.addEventListener('touchmove', function (event) {
        if (!isDragging) return;

        const diffX = event.touches[0].pageX - startX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                if (currentIndex > 0) {
                    currentIndex = currentIndex - 1;
                } else {
                    currentIndex = images.length - 1;
                }
            } else {
                if (currentIndex < images.length - 1) {
                    currentIndex = currentIndex + 1;
                } else {
                    currentIndex = 0;
                }
            }
            updateCarousel();
            isDragging = false;
        }
    });

    carouselContainer.addEventListener('touchend', function () {
        isDragging = false;
    });

    updateCarousel();
});
