document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initMobileNav();
    initScrollReveal();
    initFAQAccordion();
    initContactForm();
});

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const toggle = faq.querySelector('.toggle-icon');
                toggle.textContent = '+';
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const toggle = item.querySelector('.toggle-icon');
                toggle.textContent = '×';
            }
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner loading"></i> Sending...';
            submitBtn.disabled = true;

            try {
                // Simulate API call (replace with actual API endpoint)
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Show success message
                showNotification('Message sent successfully!', 'success');
                form.reset();

            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Add success-message class for animation
    setTimeout(() => notification.classList.add('success-message'), 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Form Input Animation
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Google Maps API Integration (optional)
function initMap() {
    const mapOptions = {
        center: { lat: 25.7444, lng: 89.2527 },
        zoom: 15,
        styles: [
            {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#242f3e" }]
            },
            {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#242f3e" }]
            },
            {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#746855" }]
            }
        ]
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    const marker = new google.maps.Marker({
        position: { lat: 25.7444, lng: 89.2527 },
        map: map,
        title: "Rangpur Government College"
    });
}