document.addEventListener('DOMContentLoaded', function () {
    // ============ SWIPER ============
    const initSwiper = () => {
        const swiperEl = document.querySelector('.swiper');
        if (!swiperEl) return;

        const swiper = new Swiper(".swiper", {
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
            breakpoints: {
                0: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 1.5 },
                1220: { slidesPerView: 1.5 },
                1600: { slidesPerView: 2 }
            }
        });

        // Flip slide functionality
        const slides = document.querySelectorAll(".swiper-slide");
        if (!slides.length) return;

        const handleButtonClick = (event) => {
            event.stopPropagation();
            const activeSlide = document.querySelector(".swiper-slide-active");
            activeSlide?.classList.add("flipped");
        };

        const flipActiveSlide = () => {
            const activeSlide = document.querySelector(".swiper-slide-active");
            if (!activeSlide) return;

            const button = activeSlide.querySelector("button");
            if (button) {
                button.removeEventListener('click', handleButtonClick);
                button.addEventListener('click', handleButtonClick);
            }
        };

        slides.forEach(slide => {
            slide.addEventListener('click', () => {
                if (slide.classList.contains("swiper-slide-active") &&
                    slide.classList.contains("flipped")) {
                    slide.classList.remove("flipped");
                }
            });
        });

        swiper.on("slideChangeTransitionStart", () => {
            slides.forEach(slide => slide.classList.remove("flipped"));
            flipActiveSlide();
        });

        flipActiveSlide();
    };

    // ============ MENU MOBILE ============
    const initMobileMenu = () => {
        const menuIcon = document.querySelector('#menu-icon');
        const navbar = document.querySelector('.navbar');
        if (!menuIcon || !navbar) return;

        // Ícones SVG como strings
        const menuIconSVG = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;

        const closeIconSVG = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" 
                  stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;

        // Inicializa com o ícone de menu
        menuIcon.innerHTML = menuIconSVG;

        menuIcon.addEventListener('click', () => {
            const isActive = navbar.classList.toggle('active');

            // Alterna entre os ícones
            menuIcon.innerHTML = isActive ? closeIconSVG : menuIconSVG;
            menuIcon.classList.toggle('active');

            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        });

        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuIcon.innerHTML = menuIconSVG;
                menuIcon.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    };

    // ============ HOVER EFFECTS ============
    const initHoverEffects = () => {
        const setupHoverEffect = (selector) => {
            document.querySelectorAll(selector).forEach(element => {
                element.addEventListener('mousemove', function (e) {
                    const rect = this.getBoundingClientRect();
                    this.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    this.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                });
            });
        };

        setupHoverEffect('.swiper-slide button');
        setupHoverEffect('.whatsapp-btn');
        setupHoverEffect('.card2');
    };

    // ============ ANIMAÇÕES ============
    const initAnimations = () => {
        // Animação de contagem
        const animateCountUp = (targetElement, finalValue, suffix = '', duration = 2000) => {
            const startValue = 0;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(easedProgress * finalValue);

                targetElement.innerHTML = `<p class="counting-number">${formatNumber(currentValue)}</p>${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    targetElement.innerHTML = `<p class="counting-number">${formatNumber(finalValue)}</p>${suffix}`;
                }
            };

            requestAnimationFrame(updateCount);
        };

        const formatNumber = (num) => '+' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        // Observador para cards
        const cardsContainer = document.querySelector('.home-cards');
        if (cardsContainer) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.card2').forEach(card2 => {
                            const numberElement = card2.querySelector('p');
                            if (!numberElement) return;

                            const fullText = numberElement.textContent;
                            const match = fullText.match(/^([+\d.]+)\s*(.*)$/);
                            if (match) {
                                const numberText = match[1];
                                const suffixText = match[2] ? ' ' + match[2] : '';
                                const numberValue = parseInt(numberText.replace(/[+.]/g, ''));

                                numberElement.innerHTML = `<p class="counting-number">+0</p>${suffixText}`;
                                animateCountUp(numberElement, numberValue, suffixText);
                            }
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(cardsContainer);
        }

        // Animação de números de insights
        const insightSection = document.querySelector('.insight-section');
        if (insightSection) {
            const insightObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        document.querySelectorAll('.insight-card').forEach(card => {
                            const titleElement = card.querySelector('.insight-card-title');
                            if (!titleElement) return;

                            const originalValue = titleElement.textContent.trim();
                            const numberValue = parseInt(originalValue.replace('%', ''));
                            const duration = 2000;
                            const startTime = performance.now();

                            const updateNumber = (currentTime) => {
                                const elapsedTime = currentTime - startTime;
                                const progress = Math.min(elapsedTime / duration, 1);
                                const easedProgress = 1 - Math.pow(1 - progress, 3);
                                const currentNumber = Math.floor(easedProgress * numberValue);

                                titleElement.textContent = `${currentNumber}%`;

                                if (progress < 1) {
                                    requestAnimationFrame(updateNumber);
                                } else {
                                    titleElement.textContent = originalValue;
                                }
                            };

                            requestAnimationFrame(updateNumber);
                        });
                        insightObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            insightObserver.observe(insightSection);
        }
    };

    // ============ TIMELINE ============
    const initTimeline = () => {
        const timelineItems = document.querySelectorAll('.timeline_item');
        const progressBar = document.querySelector('.timeline_progress-bar');
        if (!timelineItems.length || !progressBar) return;

        const style = document.createElement('style');
        style.textContent = `
            .timeline_circle.active-circle {
                background: linear-gradient(to bottom right, white 30%, #d5d8f6 80%, #fdf7fe 100%) !important;
                transition: all 0.7s ease-in-out;
            }
            .timeline_text_box.active-box {
                border-color: rgba(255, 255, 255, 0.8) !important;
                transition: all 0.7s ease-in-out;
            }
            .timeline_text.active-text {
                color: #ffffffe6 !important;
                text-shadow: none !important;
                transition: all 0.7s ease-in-out;
            }
        `;
        document.head.appendChild(style);

        const checkCircleProgressPosition = () => {
            const progressRect = progressBar.getBoundingClientRect();
            const progressStartY = progressRect.top + window.scrollY;
            const progressHeight = progressRect.height;

            timelineItems.forEach(item => {
                const circle = item.querySelector('.timeline_circle');
                const textBox = item.querySelector('.timeline_text_box');
                const text = item.querySelector('.timeline_text');
                const circleRect = circle.getBoundingClientRect();
                const circleY = circleRect.top + window.scrollY;

                const isActive = circleY >= progressStartY && circleY <= (progressStartY + progressHeight);
                circle.classList.toggle('active-circle', isActive);
                textBox.classList.toggle('active-box', isActive);
                text.classList.toggle('active-text', isActive);
            });

            requestAnimationFrame(checkCircleProgressPosition);
        };

        window.addEventListener('load', () => setTimeout(checkCircleProgressPosition, 1000));
        window.addEventListener('resize', checkCircleProgressPosition);
    };

    // ============ INIT ALL ============
    initSwiper();
    initMobileMenu();
    initHoverEffects();
    initAnimations();
    initTimeline();
});

document.addEventListener('DOMContentLoaded', () => {
    // Novo código para o efeito hover nos cards de comparação
    const leftComparisonCard = document.querySelector(".comparision-versus-bottom-left-card");
    const rightComparisonCard = document.querySelector(".comparision-versus-bottom-right-card");

    function applyComparisonHoverEffect(event) {
        const card = event.currentTarget;
        // getBoundingClientRect é mais preciso para obter posições relativas à viewport
        const rect = card.getBoundingClientRect();
        // event.clientX e event.clientY são posições relativas à viewport
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--card-hover-opacity", "1");
        card.style.setProperty("--card-hover-x", `${x}px`);
        card.style.setProperty("--card-hover-y", `${y}px`);
    }

    function removeComparisonHoverEffect(event) {
        const card = event.currentTarget;
        card.style.setProperty("--card-hover-opacity", "0");
    }

    if (leftComparisonCard) {
        leftComparisonCard.addEventListener("mousemove", applyComparisonHoverEffect);
        leftComparisonCard.addEventListener("pointermove", applyComparisonHoverEffect);
        leftComparisonCard.addEventListener("pointerleave", removeComparisonHoverEffect);
    }

    if (rightComparisonCard) {
        rightComparisonCard.addEventListener("mousemove", applyComparisonHoverEffect);
        rightComparisonCard.addEventListener("pointermove", applyComparisonHoverEffect);
        rightComparisonCard.addEventListener("pointerleave", removeComparisonHoverEffect);
    }
});
