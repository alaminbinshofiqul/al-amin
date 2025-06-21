// Main JavaScript for Rangpur Government College Website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initScrollReveal();
  initBackToTop();
  initCounters();
  initContactForm();
  
  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const headerHeight = document.getElementById('main-header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const mainNav = document.getElementById('main-nav');
      if (mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
      }
    });
  });
  
  // Handle header scroll effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});

// Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
  
  // Toggle mobile menu
  navToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    this.classList.toggle('active');
  });
  
  // Handle dropdown menus on mobile
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    
    // For mobile view
    link.addEventListener('click', function(e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        item.classList.toggle('active');
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#main-nav') && !e.target.closest('#nav-toggle')) {
      mainNav.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
  
  // Highlight active nav item based on scroll position
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Initialize scroll reveal animations
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const revealHandler = function() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      // Element is in viewport
      if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
        element.classList.add('revealed');
      }
    });
  };
  
  // Initial check
  revealHandler();
  
  // Check on scroll
  window.addEventListener('scroll', revealHandler);
}

// Back to top button functionality
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Animate number counters
function initCounters() {
  const stats = document.querySelectorAll('.stat-number');
  let animated = false;
  
  const animateStats = function() {
    if (animated) return;
    
    const statsSection = document.querySelector('.stats-container');
    if (!statsSection) return;
    
    const statsSectionTop = statsSection.getBoundingClientRect().top;
    
    if (statsSectionTop < window.innerHeight - 100) {
      stats.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        
        const updateCounter = function() {
          const currentTime = Date.now();
          const progress = Math.min((currentTime - startTime) / duration, 1);
          
          const currentValue = Math.floor(progress * targetValue);
          stat.textContent = currentValue.toLocaleString();
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            stat.textContent = targetValue.toLocaleString();
          }
        };
        
        requestAnimationFrame(updateCounter);
      });
      
      animated = true;
    }
  };
  
  // Initial check
  animateStats();
  
  // Check on scroll
  window.addEventListener('scroll', animateStats);
}

// Handle contact form submission
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real implementation, you would send the form data to the server
      // For now, just show a success message
      
      const formData = new FormData(contactForm);
      const formValues = {};
      
      formData.forEach((value, key) => {
        formValues[key] = value;
      });
      
      // Display success message (in a real implementation, this would be after successful AJAX)
      const formContainer = contactForm.parentElement;
      formContainer.innerHTML = `
        <div class="success-message">
          <div class="success-icon">✓</div>
          <h3>Message Sent Successfully!</h3>
          <p>Thank you for contacting us, ${formValues.name}. We will get back to you shortly.</p>
        </div>
      `;
    });
  }
}
// Animations JavaScript for Rangpur Government College Website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all animation-related functionality
  initHeroSlider();
  initAnnouncementsSlider();
  initClubsSlider();
  initProgramTabs();
  initDepartmentTabs();
  initCountdowns();
  initGalleryAnimations();
});

// Hero Slider Animation
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slider .slide');
  const dots = document.querySelectorAll('.slide-dots .dot');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  let currentSlide = 0;
  let slideInterval;
  
  if (!slides.length) return;
  
  const showSlide = function(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Update dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the selected slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  };
  
  const nextSlide = function() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };
  
  const prevSlide = function() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  };
  
  // Initialize autoplay
  const startSlideInterval = function() {
    slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
  };
  
  // Set up event listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      prevSlide();
      clearInterval(slideInterval);
      startSlideInterval();
    });
    
    nextBtn.addEventListener('click', function() {
      nextSlide();
      clearInterval(slideInterval);
      startSlideInterval();
    });
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showSlide(index);
      clearInterval(slideInterval);
      startSlideInterval();
    });
  });
  
  // Start autoplay
  startSlideInterval();
  
  // Pause autoplay when mouse hovers over slider
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', function() {
      clearInterval(slideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', function() {
      clearInterval(slideInterval);
      startSlideInterval();
    });
  }
}

// Announcements Slider Animation
function initAnnouncementsSlider() {
  const announcements = document.querySelectorAll('.announcement-card');
  const prevBtn = document.querySelector('.prev-announcement');
  const nextBtn = document.querySelector('.next-announcement');
  let currentAnnouncement = 0;
  
  if (!announcements.length) return;
  
  const showAnnouncement = function(index) {
    // Hide all announcements
    announcements.forEach(announcement => {
      announcement.classList.remove('active');
    });
    
    // Show the selected announcement
    announcements[index].classList.add('active');
    currentAnnouncement = index;
  };
  
  const nextAnnouncement = function() {
    currentAnnouncement = (currentAnnouncement + 1) % announcements.length;
    showAnnouncement(currentAnnouncement);
  };
  
  const prevAnnouncement = function() {
    currentAnnouncement = (currentAnnouncement - 1 + announcements.length) % announcements.length;
    showAnnouncement(currentAnnouncement);
  };
  
  // Set up event listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevAnnouncement);
    nextBtn.addEventListener('click', nextAnnouncement);
  }
  
  // Auto-rotate announcements
  setInterval(nextAnnouncement, 8000); // Change announcement every 8 seconds
}

// Clubs Slider Animation
function initClubsSlider() {
  const clubs = document.querySelectorAll('.club-card');
  const prevBtn = document.querySelector('.prev-club');
  const nextBtn = document.querySelector('.next-club');
  let currentClub = 0;
  
  if (!clubs.length) return;
  
  const showClub = function(index) {
    // Hide all clubs
    clubs.forEach(club => {
      club.classList.remove('active');
    });
    
    // Show the selected club
    clubs[index].classList.add('active');
    currentClub = index;
  };
  
  const nextClub = function() {
    currentClub = (currentClub + 1) % clubs.length;
    showClub(currentClub);
  };
  
  const prevClub = function() {
    currentClub = (currentClub - 1 + clubs.length) % clubs.length;
    showClub(currentClub);
  };
  
  // Set up event listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevClub);
    nextBtn.addEventListener('click', nextClub);
  }
  
  // Auto-rotate clubs
  setInterval(nextClub, 7000); // Change club every 7 seconds
}

// Program Tabs Animation
function initProgramTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (!tabButtons.length || !tabPanes.length) return;
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show corresponding tab pane
      const tabId = this.getAttribute('data-tab');
      
      // Hide all tab panes
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
      });
      
      // Show the selected tab pane
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Department Tabs Animation
function initDepartmentTabs() {
  const deptTabs = document.querySelectorAll('.dept-tab');
  const facultyCards = document.querySelectorAll('.faculty-card');
  
  if (!deptTabs.length || !facultyCards.length) return;
  
  deptTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      deptTabs.forEach(t => {
        t.classList.remove('active');
      });
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Filter faculty cards
      const deptFilter = this.getAttribute('data-dept');
      
      if (deptFilter === 'all') {
        // Show all faculty cards
        facultyCards.forEach(card => {
          card.style.display = 'block';
          setTimeout(() => {
            card.classList.remove('hidden');
          }, 10);
        });
      } else {
        // Filter by department
        facultyCards.forEach(card => {
          if (card.getAttribute('data-dept') === deptFilter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.classList.remove('hidden');
            }, 10);
          } else {
            card.classList.add('hidden');
            setTimeout(() => {
              card.style.display = 'none';
            }, 500);
          }
        });
      }
    });
  });
}

// Event Countdowns Animation
function initCountdowns() {
  const countdownElements = document.querySelectorAll('.event-countdown');
  
  if (!countdownElements.length) return;
  
  const updateCountdowns = function() {
    const now = new Date().getTime();
    
    countdownElements.forEach(countdown => {
      const targetDate = new Date(countdown.getAttribute('data-date')).getTime();
      const timeRemaining = targetDate - now;
      
      if (timeRemaining > 0) {
        // Calculate days, hours, minutes
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        
        // Update countdown display
        const daysElement = countdown.querySelector('.days');
        const hoursElement = countdown.querySelector('.hours');
        const minutesElement = countdown.querySelector('.minutes');
        
        if (daysElement) {
          if (daysElement.textContent !== String(days).padStart(2, '0')) {
            daysElement.textContent = String(days).padStart(2, '0');
          }
        }
        
        if (hoursElement) {
          if (hoursElement.textContent !== String(hours).padStart(2, '0')) {
            hoursElement.textContent = String(hours).padStart(2, '0');
          }
        }
        
        if (minutesElement) {
          if (minutesElement.textContent !== String(minutes).padStart(2, '0')) {
            minutesElement.textContent = String(minutes).padStart(2, '0');
          }
        }
      } else {
        // Event has passed
        countdown.innerHTML = '<p class="event-passed">Event has started</p>';
      }
    });
  };
  
  // Update countdowns immediately
  updateCountdowns();
  
  // Update countdowns every minute
  setInterval(updateCountdowns, 60000);
}

// Gallery Animations
function initGalleryAnimations() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (!galleryItems.length) return;
  
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const overlay = this.querySelector('.gallery-overlay');
      if (overlay) {
        overlay.style.opacity = '1';
        overlay.style.transform = 'translateY(0)';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      const overlay = this.querySelector('.gallery-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transform = 'translateY(20px)';
      }
    });
  });
}
// Carousel JavaScript for Rangpur Government College Website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize any carousels or sliders
  initHeroCarousel();
  initAnnouncementsCarousel();
  initTestimonialsCarousel();
});

// Hero Carousel Functionality
function initHeroCarousel() {
  const heroSlider = document.querySelector('.hero-slider');
  if (!heroSlider) return;
  
  const slides = heroSlider.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slide-dots');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  
  let currentIndex = 0;
  let autoplayInterval;
  
  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
      
      // Reset animation by removing and re-adding elements
      const animatedElements = slide.querySelectorAll('.animate-text');
      animatedElements.forEach(el => {
        const parent = el.parentNode;
        const clone = el.cloneNode(true);
        parent.replaceChild(clone, el);
      });
    });
    
    // Show selected slide
    slides[index].classList.add('active');
    
    // Update dots
    const dots = document.querySelectorAll('.slide-dots .dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
  }
  
  // Next slide function
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }
  
  // Previous slide function
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }
  
  // Create dot indicators if they don't exist
  if (dotsContainer && slides.length > 0) {
    // Only create dots if they don't already exist
    if (dotsContainer.children.length === 0) {
      slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-slide', i);
        dot.addEventListener('click', () => {
          clearInterval(autoplayInterval);
          showSlide(i);
          startAutoplay();
        });
        dotsContainer.appendChild(dot);
      });
    }
  }
  
  // Add event listeners to buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      clearInterval(autoplayInterval);
      prevSlide();
      startAutoplay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      clearInterval(autoplayInterval);
      nextSlide();
      startAutoplay();
    });
  }
  
  // Autoplay function
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 7000); // Change slide every 7 seconds
  }
  
  // Start autoplay
  startAutoplay();
  
  // Pause autoplay on hover
  heroSlider.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });
  
  heroSlider.addEventListener('mouseleave', () => {
    startAutoplay();
  });
  
  // Touch swipe functionality for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  heroSlider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  heroSlider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance to be considered a swipe
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left (next)
      clearInterval(autoplayInterval);
      nextSlide();
      startAutoplay();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right (previous)
      clearInterval(autoplayInterval);
      prevSlide();
      startAutoplay();
    }
  }
}

// Announcements Carousel Functionality
function initAnnouncementsCarousel() {
  const announcements = document.querySelectorAll('.announcement-card');
  const prevBtn = document.querySelector('.prev-announcement');
  const nextBtn = document.querySelector('.next-announcement');
  
  if (!announcements.length) return;
  
  let currentIndex = 0;
  let autoplayInterval;
  
  // Function to show a specific announcement
  function showAnnouncement(index) {
    // Hide all announcements
    announcements.forEach(announcement => {
      announcement.classList.remove('active');
      announcement.style.transform = 'translateX(30px)';
      announcement.style.opacity = '0';
    });
    
    // Show selected announcement with animation
    setTimeout(() => {
      announcements[index].classList.add('active');
      announcements[index].style.transform = 'translateX(0)';
      announcements[index].style.opacity = '1';
    }, 50);
    
    currentIndex = index;
  }
  
  // Next announcement function
  function nextAnnouncement() {
    currentIndex = (currentIndex + 1) % announcements.length;
    showAnnouncement(currentIndex);
  }
  
  // Previous announcement function
  function prevAnnouncement() {
    currentIndex = (currentIndex - 1 + announcements.length) % announcements.length;
    showAnnouncement(currentIndex);
  }
  
  // Add event listeners to buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      clearInterval(autoplayInterval);
      prevAnnouncement();
      startAutoplay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      clearInterval(autoplayInterval);
      nextAnnouncement();
      startAutoplay();
    });
  }
  
  // Autoplay function
  function startAutoplay() {
    autoplayInterval = setInterval(nextAnnouncement, 8000); // Change announcement every 8 seconds
  }
  
  // Start autoplay
  startAutoplay();
  
  // Initialize first announcement
  showAnnouncement(0);
  
  // Touch swipe functionality for mobile
  const announcementsContainer = document.querySelector('.announcements-slider');
  
  if (announcementsContainer) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    announcementsContainer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    announcementsContainer.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    function handleSwipe() {
      const swipeThreshold = 50; // Minimum distance to be considered a swipe
      
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left (next)
        clearInterval(autoplayInterval);
        nextAnnouncement();
        startAutoplay();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right (previous)
        clearInterval(autoplayInterval);
        prevAnnouncement();
        startAutoplay();
      }
    }
  }
}

// Testimonials Carousel Functionality (if present)
function initTestimonialsCarousel() {
  const testimonials = document.querySelectorAll('.testimonial-card');
  
  if (!testimonials.length) return;
  
  let currentIndex = 0;
  let autoplayInterval;
  
  // Function to show a specific testimonial
  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
      testimonial.style.opacity = '0';
      testimonial.style.transform = 'scale(0.9)';
    });
    
    // Show selected testimonial with animation
    setTimeout(() => {
      testimonials[index].classList.add('active');
      testimonials[index].style.opacity = '1';
      testimonials[index].style.transform = 'scale(1)';
    }, 50);
    
    // Update indicators if they exist
    const indicators = document.querySelectorAll('.testimonial-indicator');
    if (indicators.length) {
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    }
    
    currentIndex = index;
  }
  
  // Next testimonial function
  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }
  
  // Create indicators if they don't exist
  const indicatorsContainer = document.querySelector('.testimonial-indicators');
  if (indicatorsContainer && testimonials.length > 0) {
    // Only create indicators if they don't already exist
    if (indicatorsContainer.children.length === 0) {
      testimonials.forEach((_, i) => {
        const indicator = document.createElement('span');
        indicator.classList.add('testimonial-indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
          clearInterval(autoplayInterval);
          showTestimonial(i);
          startAutoplay();
        });
        indicatorsContainer.appendChild(indicator);
      });
    }
  }
  
  // Autoplay function
  function startAutoplay() {
    autoplayInterval = setInterval(nextTestimonial, 6000); // Change testimonial every 6 seconds
  }
  
  // Start autoplay
  startAutoplay();
  
  // Initialize first testimonial
  showTestimonial(0);
}
// Navigation JavaScript for Rangpur Government College Website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize navigation functionality
  initMobileNav();
  initDropdownNav();
  initScrollSpy();
});

// Mobile Navigation Functionality
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (!navToggle || !mainNav) return;
  
  navToggle.addEventListener('click', function() {
    // Toggle mobile menu
    this.classList.toggle('active');
    mainNav.classList.toggle('active');
    
    // Set aria-expanded attribute for accessibility
    const expanded = mainNav.classList.contains('active');
    this.setAttribute('aria-expanded', expanded);
    
    // Toggle body scroll when menu is open
    document.body.classList.toggle('no-scroll', expanded);
    
    // Add animation to toggle icon
    const spans = this.querySelectorAll('span');
    
    if (expanded) {
      // Animate to X
      if (spans.length >= 3) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      }
    } else {
      // Reset to hamburger
      if (spans.length >= 3) {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (
      mainNav.classList.contains('active') &&
      !mainNav.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navToggle.click();
    }
  });
  
  // Close mobile menu when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      navToggle.click();
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 992 && mainNav.classList.contains('active')) {
      // Reset mobile menu on larger screens
      navToggle.classList.remove('active');
      mainNav.classList.remove('active');
      document.body.classList.remove('no-scroll');
      
      // Reset toggle icon
      const spans = navToggle.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }
  });
}

// Dropdown Navigation Functionality
function initDropdownNav() {
  const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
  
  if (!dropdownItems.length) return;
  
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdownMenu = item.querySelector('.dropdown-menu');
    
    if (!link || !dropdownMenu) return;
    
    // For desktop: show dropdown on hover
    if (window.innerWidth >= 992) {
      item.addEventListener('mouseenter', function() {
        dropdownMenu.style.opacity = '1';
        dropdownMenu.style.visibility = 'visible';
        dropdownMenu.style.transform = 'translateY(0)';
      });
      
      item.addEventListener('mouseleave', function() {
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.visibility = 'hidden';
        dropdownMenu.style.transform = 'translateY(10px)';
      });
    }
    
    // For mobile: toggle dropdown on click
    link.addEventListener('click', function(e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        
        // Close other dropdowns
        dropdownItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current dropdown
        item.classList.toggle('active');
      }
    });
    
    // Add keyboard navigation for accessibility
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        if (window.innerWidth < 992) {
          e.preventDefault();
          link.click();
        }
      }
    });
  });
  
  // Update dropdown behavior on window resize
  window.addEventListener('resize', function() {
    const isMobile = window.innerWidth < 992;
    
    dropdownItems.forEach(item => {
      const dropdownMenu = item.querySelector('.dropdown-menu');
      
      if (!dropdownMenu) return;
      
      if (isMobile) {
        // Reset hover styles on mobile
        dropdownMenu.style.opacity = '';
        dropdownMenu.style.visibility = '';
        dropdownMenu.style.transform = '';
      } else {
        // Reset active class on desktop
        item.classList.remove('active');
      }
    });
  });
}

// Scroll Spy Functionality
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!sections.length || !navLinks.length) return;
  
  // Scroll event to highlight current section in navigation
  window.addEventListener('scroll', function() {
    // Get current scroll position
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    // Add offset for fixed header
    const headerOffset = document.querySelector('header').offsetHeight;
    
    // Find current section
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerOffset - 100; // 100px offset for better UX
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // Update active navigation link
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      const href = link.getAttribute('href');
      if (href && href === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Smooth scroll to section when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only process links that point to sections
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault();
        
        const targetSection = document.querySelector(href);
        if (!targetSection) return;
        
        // Get header height for offset
        const headerHeight = document.querySelector('header').offsetHeight;
        
        // Calculate scroll position
        const scrollTarget = targetSection.offsetTop - headerHeight;
        
        // Smooth scroll to target
        window.scrollTo({
          top: scrollTarget,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const mainNav = document.getElementById('main-nav');
        const navToggle = document.getElementById('nav-toggle');
        
        if (mainNav && mainNav.classList.contains('active') && navToggle) {
          navToggle.click();
        }
      }
    });
  });
}




