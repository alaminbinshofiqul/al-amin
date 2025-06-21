/**
 * Main JavaScript for Rangpur Government College Undergraduate Website
 * Created: 2025
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.querySelector('.preloader');
  
  // Hide preloader after page load
  window.addEventListener('load', function() {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
      
      // Start animations after preloader is gone
      document.querySelectorAll('.animate-text').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }, 500);
  });
  
  // Header scroll effect
  const header = document.querySelector('.header');
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
    // Header transformation
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
    
    // Reveal animations on scroll
    revealElements();
    
    // Counter animation when in viewport
    animateCounters();
  });
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Toggle menu icon animation
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        menuToggle.click();
      }
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active link highlighting based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  
  function highlightNavigation() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavigation);
  
  // Back to top button functionality
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Program filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const programCards = document.querySelectorAll('.program-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter program cards
      programCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Facilities Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons and panes
      tabBtns.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button and corresponding pane
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // News Slider
  let currentSlide = 0;
  const newsItems = document.querySelectorAll('.news-item');
  const totalSlides = Math.ceil(newsItems.length / 3); // Assuming 3 items per slide
  
  // Create pagination dots
  const paginationContainer = document.querySelector('.slider-pagination');
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('pagination-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    paginationContainer.appendChild(dot);
  }
  
  const paginationDots = document.querySelectorAll('.pagination-dot');
  
  // Next and Previous buttons
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  });
  
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  });
  
  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }
  
  function updateSlider() {
    // Update pagination dots
    paginationDots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    // Show current slide items
    const itemsPerSlide = window.innerWidth < 768 ? 1 : (window.innerWidth < 992 ? 2 : 3);
    
    newsItems.forEach((item, index) => {
      if (index >= currentSlide * itemsPerSlide && index < (currentSlide + 1) * itemsPerSlide) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  // Handle responsive changes
  window.addEventListener('resize', updateSlider);
  
  // Initialize slider
  updateSlider();
  
  // Form validation
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('input, select, textarea');
      
      inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value) {
          isValid = false;
          input.style.borderColor = 'var(--accent-color)';
          
          // Reset border color after 3 seconds
          setTimeout(() => {
            input.style.borderColor = '';
          }, 3000);
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (isValid) {
        // Show success message
        const formParent = form.parentElement;
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = '<p>Thank you! Your submission has been received.</p>';
        successMessage.style.backgroundColor = '#e6f7e9';
        successMessage.style.color = '#2e7d32';
        successMessage.style.padding = '15px';
        successMessage.style.borderRadius = '5px';
        successMessage.style.marginTop = '15px';
        
        formParent.appendChild(successMessage);
        
        // Reset form
        form.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  });
  
  // Reveal animations on scroll
  function revealElements() {
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-left, .reveal-right, .reveal-up, .reveal-down');
    
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementBottom = el.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100 && elementBottom > 0) {
        el.classList.add('active');
      }
    });
  }
  
  // Initialize reveal animations
  revealElements();
  
  // Counter animation
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;
  
  function animateCounters() {
    if (countersAnimated) return;
    
    counters.forEach(counter => {
      const counterTop = counter.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (counterTop < windowHeight - 100) {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const start = 0;
        const increment = Math.ceil(target / (duration / 30)); // Update every 30ms
        
        let current = start;
        const timer = setInterval(() => {
          current += increment;
          counter.textContent = current;
          
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          }
        }, 30);
        
        countersAnimated = true;
      }
    });
  }
  
  // Initialize parallax effect
  function parallaxEffect() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    parallaxSections.forEach(section => {
      const background = section.querySelector('.hero-background, .facilities::before');
      if (background) {
        const scrollPosition = window.scrollY;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionTop + sectionHeight) {
          const yPos = -(scrollPosition - sectionTop) * 0.3;
          background.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      }
    });
  }
  
  window.addEventListener('scroll', parallaxEffect);
});