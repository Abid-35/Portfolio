
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    
    const heroElements = document.querySelectorAll('.hero-content h1, .hero-content .role, .hero-content .tagline, .hero-content .btn');
    setTimeout(() => {
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);


    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    
    const skillCards = document.querySelectorAll('.skill-card');
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.5  ,
       };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    skillCards.forEach(card => {
        skillObserver.observe(card);
    });
      

});



  