// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Scroll Animations
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

function animateOnScroll() {
    // Animate department cards
    document.querySelectorAll('.department-card').forEach((card, index) => {
        if (isInViewport(card) && !card.classList.contains('animated')) {
            card.classList.add('animated');
            card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.2}s`;
            card.style.opacity = '0';
        }
    });

    // Animate facility cards
    document.querySelectorAll('.facility-card').forEach((card, index) => {
        if (isInViewport(card) && !card.classList.contains('animated')) {
            card.classList.add('animated');
            card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.2}s`;
            card.style.opacity = '0';
        }
    });

    // Animate research cards
    document.querySelectorAll('.research-card').forEach((card, index) => {
        if (isInViewport(card) && !card.classList.contains('animated')) {
            card.classList.add('animated');
            card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.2}s`;
            card.style.opacity = '0';
        }
    });
}

// Animate statistics
function animateNumbers() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const count = 0;
        const speed = 2000 / target; // Adjust animation speed based on target value

        function updateCount() {
            const currentCount = parseInt(counter.textContent);
            if (currentCount < target) {
                counter.textContent = Math.ceil(currentCount + 1);
                setTimeout(updateCount, speed);
            }
        }

        if (isInViewport(counter) && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            updateCount();
        }
    });
}

// Parallax effect for hero section
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Sticky header
function stickyHeader() {
    const header = document.querySelector('.header');
    const scrollTrigger = 60;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > scrollTrigger) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// Initialize animations
window.addEventListener('scroll', () => {
    animateOnScroll();
    animateNumbers();
});

window.addEventListener('load', () => {
    parallaxEffect();
    stickyHeader();
    animateOnScroll();
    animateNumbers();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});