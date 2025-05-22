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
        // Menu mobile
        const menuIcon = document.querySelector('#menu-icon');
        const navbar = document.querySelector('.navbar');

        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            menuIcon.classList.toggle('active');
            navbar.classList.toggle('active');

            // Desativa o scroll quando o menu está aberto
            if (navbar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Efeito de movimento do mouse nos botões "Saiba mais"
        document.querySelectorAll(".swiper-slide button").forEach(button => {
            button.addEventListener("mousemove", function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Atualiza a posição do gradiente de brilho
                this.style.setProperty("--mouse-x", `${x}px`);
                this.style.setProperty("--mouse-y", `${y}px`);
            });
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuIcon.classList.remove('bx-x');
                menuIcon.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Efeito de movimento do mouse em TODOS os botões WhatsApp
        document.querySelectorAll(".whatsapp-btn").forEach(button => {
            button.addEventListener("mousemove", function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                this.style.setProperty("--mouse-x", `${x}px`);
                this.style.setProperty("--mouse-y", `${y}px`);
            });
        });

        // Efeito de movimento do mouse nos cards
        document.querySelectorAll(".card2").forEach(card2 => {
            card2.addEventListener("mousemove", function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                this.style.setProperty("--mouse-x", `${x}px`);
                this.style.setProperty("--mouse-y", `${y}px`);
            });
        });

        // Animação de contagem dos números
        function animateCountUp(targetElement, finalValue, suffix = '', duration = 2000) {
            const startValue = 0;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);

                // Easing function (easeOutQuad)
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
        }

        // Função para formatar números (adicionar '+' e separadores de milhar)
        function formatNumber(num) {
            return '+' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }

        // Observador de interseção para iniciar a animação quando os cards estiverem visíveis
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.card2');

                    cards.forEach(card2 => {
                        const numberElement = card2.querySelector('p');
                        const fullText = numberElement.textContent;

                        // Extrai o número e o texto adicional
                        const match = fullText.match(/^([+\d.]+)\s*(.*)$/);
                        if (match) {
                            const numberText = match[1];
                            const suffixText = match[2] ? ' ' + match[2] : '';

                            // Extrai o valor numérico removendo o '+' e os pontos
                            const numberValue = parseInt(numberText.replace(/[+.]/g, ''));

                            // Cria um span para o número que será animado
                            numberElement.innerHTML = `<p class="counting-number">+0</p>${suffixText}`;

                            // Inicia a animação
                            const numberSpan = numberElement.querySelector('.counting-number');
                            animateCountUp(numberElement, numberValue, suffixText);
                        }
                    });

                    // Para de observar após a animação começar
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Observa o container dos cards
        const cardsContainer = document.querySelector('.home-cards');
        if (cardsContainer) {
            observer.observe(cardsContainer);
        }

        // Adicione esta função ao seu script existente (dentro da tag <script>)

        // Função para animar os números das estatísticas
        function animateInsightNumbers() {
            const insightCards = document.querySelectorAll('.insight-card');

            insightCards.forEach(card => {
                const titleElement = card.querySelector('.insight-card-title');
                const originalValue = titleElement.textContent.trim();

                // Extrai apenas o número (remove o símbolo %)
                const numberValue = parseInt(originalValue.replace('%', ''));

                // Configuração da animação
                const duration = 2000; // 1.5 segundos
                const startTime = performance.now();

                // Função de atualização
                const updateNumber = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);

                    // Easing function (easeOutQuad)
                    const easedProgress = 1 - Math.pow(1 - progress, 3);

                    const currentNumber = Math.floor(easedProgress * numberValue);
                    titleElement.textContent = `${currentNumber}%`;

                    if (progress < 1) {
                        requestAnimationFrame(updateNumber);
                    } else {
                        titleElement.textContent = originalValue; // Garante o valor exato no final
                    }
                };

                // Inicia a animação
                requestAnimationFrame(updateNumber);
            });
        }

        // Observador para iniciar a animação quando a seção de insights estiver visível
        const insightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateInsightNumbers();
                    insightObserver.unobserve(entry.target); // Para de observar após a animação
                }
            });
        }, { threshold: 0.5 });

        // Observa a seção de insights
        const insightSection = document.querySelector('.insight-section');
        if (insightSection) {
            insightObserver.observe(insightSection);
        }

        function checkCircleProgressPosition() {
            const timelineItems = document.querySelectorAll('.timeline_item');
            const progressBar = document.querySelector('.timeline_progress-bar');

            const progressRect = progressBar.getBoundingClientRect();
            const progressStartY = progressRect.top + window.scrollY;
            const progressHeight = progressRect.height;

            timelineItems.forEach(item => {
                const circle = item.querySelector('.timeline_circle');
                const textBox = item.querySelector('.timeline_text_box');
                const text = item.querySelector('.timeline_text');

                const circleRect = circle.getBoundingClientRect();
                const circleY = circleRect.top + window.scrollY;

                if (circleY >= progressStartY && circleY <= (progressStartY + progressHeight)) {
                    circle.classList.add('active-circle');
                    textBox.classList.add('active-box');
                    text.classList.add('active-text');
                } else {
                    circle.classList.remove('active-circle');
                    textBox.classList.remove('active-box');
                    text.classList.remove('active-text');
                }
            });

            requestAnimationFrame(checkCircleProgressPosition);
        }

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

        window.addEventListener('load', () => {
            setTimeout(checkCircleProgressPosition, 1000);
        });

        window.addEventListener('resize', () => {
            checkCircleProgressPosition();
        });
