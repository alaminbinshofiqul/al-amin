/* next */
/**
 * Main JavaScript for Rangpur Government College About Section
 * Handles core functionality and interactions
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                // Simulate form submission
                this.innerHTML = '<p class="success-message">Thank you for subscribing!</p>';
            }
        });
    }

    // Handle statistics counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateStats() {
        if (hasAnimated) return;
        
        const statsSection = document.getElementById('statistics');
        const statsSectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsSectionTop < windowHeight * 0.75) {
            hasAnimated = true;
            
            statNumbers.forEach(stat => {
                const targetValue = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, targetValue);
            });
        }
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target > 100 ? Math.ceil(target / 100) : 1;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / (target / increment)));
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Initialize Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Deactivate all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate its dot
        testimonialItems[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Set up event listeners for testimonial controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialItems.length;
            showSlide(currentSlide);
        });
        
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                currentSlide = parseInt(this.getAttribute('data-index'));
                showSlide(currentSlide);
            });
        });

        // Auto-advance slides
        let slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialItems.length;
            showSlide(currentSlide);
        }, 6000);

        // Pause auto-advance on hover
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            testimonialSlider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % testimonialItems.length;
                    showSlide(currentSlide);
                }, 6000);
            });
        }
    }

    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // Handle Gallery Image hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = "10";
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = "1";
        });
    });

    // Check if timeline items are in view
    function checkTimelineView() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.8) {
                item.classList.add('aos-animate');
            } else {
                item.classList.remove('aos-animate');
            }
        });
    }

    // Initialize scroll event listeners
    window.addEventListener('scroll', function() {
        animateStats();
        checkTimelineView();
    });

    // Trigger initial checks
    animateStats();
    checkTimelineView();

    // Add sticky header on scroll
    function handleScrollHeader() {
        const scrollY = window.scrollY;
        const header = document.querySelector('.header');
        
        if (header) {
            if (scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    }

    window.addEventListener('scroll', handleScrollHeader);
    handleScrollHeader();

    // Enhance accessibility
    const focusableElements = document.querySelectorAll('a, button, input');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });
});
/**
 * Animations JavaScript for Rangpur Government College About Section
 * Handles custom animations and visual effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        const windowHeight = window.innerHeight;
        
        timelineItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < windowHeight * 0.85) {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 200); // Staggered animation
            }
        });
    }
    
    window.addEventListener('scroll', animateTimeline);
    animateTimeline(); // Initial check
    
    // Parallax effect for sections with data-parallax attribute
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const speed = element.getAttribute('data-parallax') || 0.5;
            const offset = scrollPosition * speed;
            
            element.style.transform = `translateY(${offset}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    
    // Gallery image hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const image = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        item.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
    
    // Text typing animation for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                heroSubtitle.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }
    
    // Faculty card tilt effect
    const facultyCards = document.querySelectorAll('.faculty-card');
    
    facultyCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate tilt angle (limited to 10 degrees)
            const maxTilt = 10;
            const tiltX = ((mouseY - cardCenterY) / (cardRect.height / 2)) * maxTilt;
            const tiltY = -((mouseX - cardCenterX) / (cardRect.width / 2)) * maxTilt;
            
            // Apply the tilt effect
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset the transform on mouse leave
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Animate counter for statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    let animationTriggered = false;
    
    function initCounters() {
        if (animationTriggered) return;
        
        const statsSection = document.getElementById('statistics');
        if (!statsSection) return;
        
        const statsSectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsSectionTop < windowHeight * 0.75) {
            animationTriggered = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                
                // Start from 0
                let start = 0;
                const increment = Math.ceil(target / 50); // 50 steps
                
                // Calculate delay between updates
                const stepTime = Math.floor(duration / (target / increment));
                
                // Start the animation
                const counter = setInterval(() => {
                    start += increment;
                    
                    // Make sure we don't exceed the target
                    if (start > target) {
                        start = target;
                        clearInterval(counter);
                    }
                    
                    // Update the display
                    stat.textContent = start;
                }, stepTime);
            });
        }
    }
    
    // Check for counter animation on scroll
    window.addEventListener('scroll', initCounters);
    initCounters(); // Initial check
    
    // Add scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
    // Background particles effect (subtle)
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        heroSection.appendChild(particlesContainer);
        
        // Create 50 particles
        for (let i = 0; i < 50; i++) {
            createParticle(particlesContainer);
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position, size and animation duration
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
    
    // Add a subtle hover effect to feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                this.style.backgroundColor = 'var(--primary-color)';
                this.style.color = 'var(--text-light)';
            }, 150);
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0)';
            setTimeout(() => {
                this.style.backgroundColor = 'rgba(10, 36, 99, 0.1)';
                this.style.color = 'var(--primary-color)';
            }, 150);
        });
    });
});




