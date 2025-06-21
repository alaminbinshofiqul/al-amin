// Navigation toggle for mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close navigation when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Sticky header on scroll
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.style.padding = '0.5rem 0';
    header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.padding = '1rem 0';
    header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
  }
  
  lastScrollY = window.scrollY;
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach(testimonial => testimonial.classList.remove('active'));
  testimonialDots.forEach(dot => dot.classList.remove('active'));
  
  testimonials[index].classList.add('active');
  testimonialDots[index].classList.add('active');
  currentTestimonial = index;
}

testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showTestimonial(index);
  });
});

// Auto-rotate testimonials
let testimonialInterval = setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Stop auto-rotation when user interacts with testimonials
document.querySelector('.testimonials-slider').addEventListener('mouseenter', () => {
  clearInterval(testimonialInterval);
});

document.querySelector('.testimonials-slider').addEventListener('mouseleave', () => {
  testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 5000);
});

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(faq => {
      faq.classList.remove('active');
    });
    
    // Open current item if it wasn't already open
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Form submission
const admissionForm = document.getElementById('admissionForm');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.querySelector('.close-modal');
const closeBtn = document.querySelector('.close-btn');

admissionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Generate a random application ID
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  document.getElementById('applicationId').textContent = `RGC-2025-${randomNum}`;
  
  // Show success modal
  successModal.classList.add('show');
  
  // Reset form
  admissionForm.reset();
});

// Close modal
function closeModal() {
  successModal.classList.remove('show');
}

closeModalBtn.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === successModal) {
    closeModal();
  }
});

// Form validation highlight
const formInputs = document.querySelectorAll('.admission-form input, .admission-form select, .admission-form textarea');

formInputs.forEach(input => {
  input.addEventListener('blur', () => {
    if (input.value.trim() === '' && input.hasAttribute('required')) {
      input.style.borderColor = 'var(--error-500)';
    } else {
      input.style.borderColor = 'var(--neutral-300)';
    }
  });
  
  input.addEventListener('focus', () => {
    input.style.borderColor = 'var(--primary-500)';
  });
});
// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

// Animate elements when they come into view
function animateOnScroll() {
  // Animate timeline items
  document.querySelectorAll('.timeline-item').forEach((item, index) => {
    if (isInViewport(item) && !item.classList.contains('animated')) {
      item.classList.add('animated');
      item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.2}s`;
      item.style.opacity = '0';
    }
  });
  
  // Animate program cards
  document.querySelectorAll('.program-card').forEach((card, index) => {
    if (isInViewport(card) && !card.classList.contains('animated')) {
      card.classList.add('animated');
      card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.15}s`;
      card.style.opacity = '0';
    }
  });
  
  // Animate statistics
  if (isInViewport(document.querySelector('.stats-section')) && 
      !document.querySelector('.stats-section').classList.contains('animated')) {
    document.querySelector('.stats-section').classList.add('animated');
    animateCounters();
  }
  
  // Animate form groups
  document.querySelectorAll('.form-group').forEach((group, index) => {
    if (isInViewport(group) && !group.classList.contains('animated')) {
      group.classList.add('animated');
      group.style.animation = `slideUp 0.5s ease forwards ${index * 0.2}s`;
      group.style.opacity = '0';
    }
  });
  
  // Animate FAQ items
  document.querySelectorAll('.faq-item').forEach((item, index) => {
    if (isInViewport(item) && !item.classList.contains('animated')) {
      item.classList.add('animated');
      item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.15}s`;
      item.style.opacity = '0';
    }
  });
}

// Animate statistic counters
function animateCounters() {
  const speed = 200; // Lower is faster
  
  document.querySelectorAll('.stat-number').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const count = 0;
    const increment = target / speed;
    
    const updateCount = () => {
      const currentCount = parseFloat(counter.textContent);
      const newCount = Math.ceil(currentCount + increment);
      
      if (newCount < target) {
        counter.textContent = newCount;
        setTimeout(updateCount, 1);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCount();
  });
}

// Parallax effect for hero section
function parallaxEffect() {
  const hero = document.querySelector('.hero');
  const scrollPosition = window.pageYOffset;
  
  hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
}

// Scroll animations
window.addEventListener('scroll', () => {
  animateOnScroll();
  parallaxEffect();
});

// Initial animation call
window.addEventListener('load', () => {
  animateOnScroll();
  
  // Add entrance animations to header elements
  const logoContainer = document.querySelector('.logo-container');
  logoContainer.style.animation = 'fadeIn 1s ease';
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link, index) => {
    link.style.animation = `fadeIn 0.5s ease forwards ${0.3 + (index * 0.1)}s`;
    link.style.opacity = '0';
  });
});

// Button hover effects
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseenter', (e) => {
    const x = e.clientX - button.getBoundingClientRect().left;
    const y = e.clientY - button.getBoundingClientRect().top;
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Program card interaction
document.querySelectorAll('.program-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.program-icon').style.transform = 'scale(1.2)';
    card.querySelector('.program-icon').style.transition = 'transform 0.3s ease';
  });
  
  card.addEventListener('mouseleave', () => {
    card.querySelector('.program-icon').style.transform = 'scale(1)';
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});