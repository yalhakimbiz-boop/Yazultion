document.addEventListener('DOMContentLoaded', () => {

    // Custom cursor logic removed as per user request


    // Typing Effect Logic
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = [
            'Web Designer',
            'Software Developer',
            'Game Creator',
            'Data Specialist',
            'Multidisciplinary Creator'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 150;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 50; // faster when deleting
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingDelay = 1500; // Pause at the end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingDelay = 500; // Pause before typing next word
            }

            setTimeout(type, typingDelay);
        }

        // Start typing effect
        setTimeout(type, 1000);
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Navigation Highlight Logic
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Scroll Observer for Fade-In
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        scrollObserver.observe(el);
    });

    window.addEventListener('scroll', highlightNav);

    // Initial Trigger for Hero
    setTimeout(() => {
        const hero = document.querySelector('.hero.fade-in');
        if (hero) hero.classList.add('visible');
    }, 100);
});
