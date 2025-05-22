var swiper = new Swiper(".swiper", {
    initialSlide: 3,
    centeredSlides: true,
    loop: true,
    speed: 900,
    grabCursor: true,
    allowTouchMove: true,
    effect: "coverflow",
    coverflowEffect: {
        rotate: -10,
        stretch: -45,
        depth: 90,
        modifier: 1,
        slideShadows: true,
    },

    mousewheel: {
        thresholdDelta: 50,
        sensitivity: 1,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    // Breakpoints para responsividade (opcional)
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 1.5,
        },
        1220: {
            slidesPerView: 1.5,
        },
        1600: {
            slidesPerView: 2,
        },
    },
});

const slides = document.querySelectorAll(".swiper-slide");

function flipActiveSlide() {
    const activeSlide = document.querySelector(".swiper-slide-active");
    const button = activeSlide.querySelector("button");

    if (button) {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            activeSlide.classList.add("flipped");
        });
    }
}

slides.forEach((slide) => {
    slide.addEventListener("click", () => {
        if (slide.classList.contains("swiper-slide-active") && slide.classList.contains("flipped")) {
            slide.classList.remove("flipped");
        }
    });
});

swiper.on("slideChangeTransitionStart", () => {
    slides.forEach((slide) => {
        slide.classList.remove("flipped");
    });
    flipActiveSlide();
    flipActiveSlide();
});

flipActiveSlide();