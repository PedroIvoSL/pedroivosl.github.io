document.addEventListener('DOMContentLoaded', function() {

    // --- Configuração e Inicialização do tsParticles ---
    if (typeof tsParticles !== 'undefined' && document.getElementById('particles-js')) {
        tsParticles.load("particles-js", {
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "repulse" },
                    onClick: { enable: false, mode: "push" },
                    resize: true
                },
                modes: {
                    repulse: { distance: 80, duration: 0.4 }, // Repulsão mais sutil
                    // Outros modos podem ser mantidos ou removidos se não usados
                }
            },
            particles: {
                number: { value: 40, density: { enable: true, value_area: 800 } }, // Menos partículas
                color: { value: "#3B82F6" },
                shape: { type: "circle" },
                opacity: {
                    value: {min: 0.1, max: 0.4}, // Opacidade variada
                    animation: { enable: true, speed: 0.8, minimumValue: 0.1, sync: false }
                },
                size: {
                    value: {min: 1, max: 2.5}, // Tamanho variado
                    animation: { enable: false }
                },
                links: {
                    enable: true, distance: 130, color: "#3B82F6",
                    opacity: 0.15, width: 1 // Links mais sutis
                },
                move: {
                    enable: true, speed: 0.8, direction: "none", random: true,
                    straight: false, outModes: "out" // Usar outModes em vez de out_mode
                }
            },
            detectRetina: true
        });
    } else {
        console.warn('tsParticles não carregado ou elemento #particles-js não encontrado.');
    }


    // --- Animação de Digitação para o Nome na Hero Section (Sem cursor, mais rápida) ---
    const heroNameElement = document.getElementById('hero-name');
    const nameToType = "Pedro Ivo Saba Ledo";
    const typingSpeed = 60; // Mais rápido (em milissegundos por caractere)

    function typeName(name, element, speed) {
        let i = 0;
        element.innerHTML = ''; // Limpa o conteúdo inicial, sem cursor

        function typeCharacter() {
            if (i < name.length) {
                element.innerHTML += name.charAt(i); // Adiciona o caractere
                i++;
                setTimeout(typeCharacter, speed);
            } else {
                revealHeroSubtitleAndCTA(); // Chama a função para revelar o restante
            }
        }
        if(element) typeCharacter(); // Inicia a digitação
    }

    if (heroNameElement) {
        // Pequeno delay para garantir que a página carregou antes de iniciar a animação
        setTimeout(() => {
            typeName(nameToType, heroNameElement, typingSpeed);
        }, 300);
    }

    // --- Revelar Subtítulo, Carrossel e CTA após a animação do nome ---
    function revealHeroSubtitleAndCTA() {
        const subtitle = document.getElementById('hero-subtitle');
        const cta = document.querySelector('#hero .cta-button');
        const techCarousel = document.querySelector('.tech-carousel-container'); // Seleciona o carrossel

        if (subtitle) {
            subtitle.classList.remove('hero-subtitle-hidden');
            subtitle.classList.add('hero-subtitle-visible');
        }
        if (techCarousel) { // Adiciona a revelação do carrossel
            techCarousel.style.opacity = '0'; // Garante que comece invisível se o CSS scroll-reveal não pegar
            techCarousel.style.transform = 'translateY(20px)';
            setTimeout(() => {
                techCarousel.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                techCarousel.style.opacity = '1';
                techCarousel.style.transform = 'translateY(0)';
            }, 200); // Um pequeno delay após o nome
        }
        if (cta) {
            // Delay um pouco maior para o CTA, para aparecer após o carrossel
            setTimeout(() => {
                cta.classList.remove('hero-cta-hidden');
                cta.classList.add('hero-cta-visible');
            }, 400);
        }
    }

    // --- Menu de Navegação (Smooth Scroll, Active Link, Hamburger) ---
    const mainNav = document.getElementById('main-nav');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburgerButton = document.getElementById('hamburger-button');
    const header = document.getElementById('main-header');

    if (hamburgerButton && navLinksContainer) {
        hamburgerButton.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
            hamburgerButton.classList.toggle('open');
            const isExpanded = navLinksContainer.classList.contains('open');
            hamburgerButton.setAttribute('aria-expanded', isExpanded);
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Removido e.preventDefault() para permitir navegação direta caso JS falhe
            // A rolagem suave é gerenciada pelo CSS `scroll-behavior: smooth;`
            // e o `scroll-padding-top` cuida do offset do header.
            if (navLinksContainer.classList.contains('open')) {
                navLinksContainer.classList.remove('open');
                hamburgerButton.classList.remove('open');
                hamburgerButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
            // Lógica de link ativo pode ser simplificada ou mantida com IntersectionObserver
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: `-${(header ? header.offsetHeight : 80) + 5}px 0px -65% 0px`, // Ajustado para melhor precisão
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
                navLinks.forEach(link => link.classList.remove('active'));
                if(navLink) navLink.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if(section) sectionObserver.observe(section);
    });


    // --- Animação de Scroll Reveal ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                 // entry.target.classList.remove('visible'); // Para re-animar
            }
        });
    }, { threshold: 0.05 }); // Reduzido threshold para disparar um pouco antes
    revealElements.forEach(el => {
        if(el) revealObserver.observe(el);
    });

    // --- Atualizar ano no footer ---
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // --- Formulário de Contato ---
    const contactForm = document.getElementById('form-contato');
    const formMessageElement = document.getElementById('form-message');
    if (contactForm && formMessageElement) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('nome') || "Prezado(a)"; // Nome mais formal se vazio
            formMessageElement.textContent = `Obrigado pelo contato, ${name}! Sua mensagem foi "enviada". (Simulação)`;
            formMessageElement.className = 'form-message-visible form-message-success';
            contactForm.reset();
            contactForm.querySelectorAll('.form-group label').forEach(label => {
                // Forçar o label a voltar ao estado inicial após o reset
                const input = label.previousElementSibling;
                if (input && input.value === '') { // Checa se o input está realmente vazio
                     label.style.top = ''; // Reseta para o CSS padrão
                     label.style.fontSize = '';
                     label.style.color = '';
                     label.style.backgroundColor = '';
                }
            });
            setTimeout(() => {
                formMessageElement.className = 'form-message-hidden';
            }, 6000); // Tempo um pouco maior
        });
    }

    // Lógica para labels flutuantes
    const formGroups = document.querySelectorAll('#form-contato .form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');

        function updateLabel() {
            if (input.value.trim() !== '' || document.activeElement === input || input.matches(':autofill')) {
                if (label) {
                    label.style.top = '-0.7em';
                    label.style.fontSize = '0.8rem';
                    label.style.color = '#67E8F9';
                    label.style.backgroundColor = '#0A0F1E'; // Cor de fundo do site
                }
            } else {
                 if (label) { // Resetar para o estado original do CSS
                    label.style.top = '';
                    label.style.fontSize = '';
                    label.style.color = '';
                    label.style.backgroundColor = 'transparent';
                }
            }
        }
        if(input) {
            input.addEventListener('focus', updateLabel);
            input.addEventListener('blur', updateLabel);
            input.addEventListener('input', updateLabel);
             // Para autocomplete (alguns navegadores precisam de um pequeno delay)
            input.addEventListener('animationstart', (event) => {
                if (event.animationName === 'onAutoFillStart') {
                    setTimeout(updateLabel, 1);
                }
            });
            updateLabel(); // Checa no carregamento
        }
    });
    // Adiciona a animação para detecção de autofill
    if (!document.getElementById('autofill-styles')) {
        const style = document.createElement('style');
        style.id = 'autofill-styles';
        style.innerHTML = `@keyframes onAutoFillStart { from {} to {} } input:-webkit-autofill, textarea:-webkit-autofill { animation-name: onAutoFillStart; animation-fill-mode: both; }`;
        document.head.appendChild(style);
    }


    console.log('Portfólio de Pedro Ivo Saba Ledo - V4 Scripts Carregados!');
});
