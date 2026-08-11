document.addEventListener('DOMContentLoaded', () => {

    // 1. Header com Efeito Glassmorphism no Scroll
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Menu Mobile Responsivo
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navList.classList.contains('active')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                    document.body.style.overflow = 'hidden'; // Evita scroll ao abrir menu
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                    document.body.style.overflow = 'auto';
                }
            }
        });

        // Fechar menu ao clicar em qualquer link de navegação
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                document.body.style.overflow = 'auto';
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            });
        });
    }

    // 3. Intersection Observer para Animações (Scroll Reveal)
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, parseInt(delay, 10));
                } else {
                    entry.target.classList.add('active');
                }

                observer.unobserve(entry.target);
            });
        }, revealOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 4. Integração do Formulário com WhatsApp
    const whatsappForm = document.getElementById('whatsappForm');

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nomeEl = document.getElementById('nome');
            const mensagemEl = document.getElementById('mensagem');

            const nome = nomeEl ? nomeEl.value.trim() : '';
            const interesse = mensagemEl ? mensagemEl.value.trim() : '';

            if (!nome || !interesse) {
                alert('Por favor, preencha seu nome e sua mensagem.');
                return;
            }

            const textoMensagem = `Olá, equipe CT GYM! Meu nome é *${nome}*.\n\nGostaria de saber mais: ${interesse}`;
            const numeroWhatsApp = '5512991469961';

            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensagem)}`;
            window.open(urlWhatsApp, '_blank');
        });
    }
});