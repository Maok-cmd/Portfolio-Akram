document.addEventListener('DOMContentLoaded', () => {
    
    // --- MENU NAVIGATION MOBILE (BURGER) ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Déplier/Replier le menu
            nav.classList.toggle('nav-active');
            
            // Animation fluide des liens mobiles
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Mutation de l'icône burger (Croix)
            burger.classList.toggle('toggle');
        });

        // Fermer automatiquement le menu lors du clic sur un lien (sur mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    navLinks.forEach(l => l.style.animation = '');
                }
            });
        });
    }

    // --- DETECTER LA SECTION ACTIVE AU SCROLL (SCROLL-SPY) ---
    const sections = document.querySelectorAll('section');
    const navLiA = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Seuil de détection confortable à 250px pour anticiper le scroll haut de page
            if (scrollPosition >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLiA.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --- FORMULAIRE DE CONTACT (FEEDBACK VISUEL MODERNE) ---
    const contactForm = document.getElementById('portfolio-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            // Bloquer le bouton et afficher un feedback visuel vivant sans casser l'UX avec une alert()
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = '#2ecc71'; // Vert de confirmation personnalisé
            submitBtn.innerText = `Merci ${name}, message bien reçu !`;
            
            // Simuler l'attente et réinitialiser l'état initial du bouton
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
                submitBtn.innerText = originalText;
                contactForm.reset();
            }, 3500);
        });
    }
});