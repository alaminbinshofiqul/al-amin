// Main JavaScript for Rangpur Government College Campus Life Section

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initHeader();
  initMobileNav();
  initScrollReveal();
});

// Header scroll effect
function initHeader() {
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile navigation
function initMobileNav() {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      
      mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
      navList.classList.toggle('active');
      
      // Toggle between menu and close icons
      const icon = mobileNavToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navList.classList.contains('active') && 
        !e.target.closest('.nav-list') && 
        !e.target.closest('.mobile-nav-toggle')) {
      navList.classList.remove('active');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      const icon = mobileNavToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Scroll reveal animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // Adjust this value to change when elements become visible
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  // Initial check
  revealOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', revealOnScroll);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const navList = document.querySelector('.nav-list');
      if (navList.classList.contains('active')) {
        navList.classList.remove('active');
        document.querySelector('.mobile-nav-toggle').setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Explore button smooth scroll
document.querySelector('.cta-button').addEventListener('click', () => {
  const campusHighlights = document.querySelector('.campus-highlights');
  
  if (campusHighlights) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = campusHighlights.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
});

// Add active class to current navigation item
function setActiveNavItem() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-list a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${currentSection}`) {
      item.classList.add('active');
    }
  });
}

// Update active nav item on scroll
window.addEventListener('scroll', setActiveNavItem);

// Initialize staggered animations
function initStaggeredAnimations() {
  const staggeredLists = document.querySelectorAll('.staggered-list');
  
  function checkLists() {
    staggeredLists.forEach(list => {
      const listTop = list.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (listTop < windowHeight - 100) {
        list.classList.add('visible');
      }
    });
  }
  
  checkLists();
  window.addEventListener('scroll', checkLists);
}

// Initialize animated counters
function initCounters() {
  const counterElements = document.querySelectorAll('.count-up');
  
  function checkCounters() {
    counterElements.forEach(counter => {
      const counterTop = counter.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (counterTop < windowHeight - 100) {
        counter.classList.add('visible');
      }
    });
  }
  
  checkCounters();
  window.addEventListener('scroll', checkCounters);
}

// Initialize on load
window.addEventListener('load', () => {
  initStaggeredAnimations();
  initCounters();
  
  // Remove preloader if exists
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.classList.add('preloader-hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});
// Animations JavaScript for Rangpur Government College Campus Life Section

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initTestimonialSlider();
  initGalleryFilter();
  initParallaxEffect();
  initScrollAnimations();
});

// Testimonial Slider
function initTestimonialSlider() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentIndex = 0;
  const totalSlides = testimonialCards.length;
  
  // Initialize the slider
  updateSlider();
  
  // Auto slide function
  let autoSlideInterval = setInterval(nextSlide, 5000);
  
  // Functions to control the slider
  function updateSlider() {
    // Hide all slides
    testimonialCards.forEach(card => {
      card.classList.remove('active');
    });
    
    // Show current slide
    testimonialCards[currentIndex].classList.add('active');
    
    // Update dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    dots[currentIndex].classList.add('active');
    
    // Reset auto slide timer
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }
  
  // Event listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
    });
    
    nextBtn.addEventListener('click', () => {
      nextSlide();
    });
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });
  });
  
  // Pause auto slide on hover
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(nextSlide, 5000);
    });
  }
  
  // Touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;
  
  const testimonialContainer = document.querySelector('.testimonial-container');
  
  if (testimonialContainer) {
    testimonialContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    testimonialContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left
      nextSlide();
    } else if (touchEndX > touchStartX + 50) {
      // Swipe right
      prevSlide();
    }
  }
}

// Gallery Filter
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Set initial active filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Get filter value
      const filterValue = btn.getAttribute('data-filter');
      
      // Filter gallery items
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          // Show item with animation
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide item with animation
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Parallax Effect
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  function updateParallax() {
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-parallax') || 0.5;
      const scrollPosition = window.pageYOffset;
      const elementTop = element.getBoundingClientRect().top + scrollPosition;
      const parallaxOffset = (scrollPosition - elementTop) * speed;
      
      element.style.transform = `translateY(${parallaxOffset}px)`;
    });
  }
  
  window.addEventListener('scroll', updateParallax);
  updateParallax();
}

// Scroll Animations
function initScrollAnimations() {
  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .reveal');
  
  function checkElementsInView() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('active');
      }
    });
  }
  
  // Initial check
  checkElementsInView();
  
  // Check on scroll
  window.addEventListener('scroll', checkElementsInView);
}

// Custom cursor effect (optional)
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  
  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .highlight-card');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });
}

// Animate on hover
function initHoverAnimations() {
  // Add hover animations to cards
  const cards = document.querySelectorAll('.highlight-card, .facility-card, .news-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hover-effect');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hover-effect');
    });
  });
}

// Text typing effect
function initTypingEffect() {
  const typingElements = document.querySelectorAll('.typewriter');
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
  });
}

// Animated background
function initAnimatedBackground() {
  const animatedBg = document.querySelector('.animated-bg');
  
  if (animatedBg) {
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random size
      const size = Math.random() * 15 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random animation duration
      particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
      
      animatedBg.appendChild(particle);
    }
  }
}

// Initialize on window load
window.addEventListener('load', () => {
  // Optional animations that can be enabled if needed
  // initCustomCursor();
  initHoverAnimations();
  // initTypingEffect();
  // initAnimatedBackground();
});
// Gallery JavaScript for Rangpur Government College Campus Life Section

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initLightbox();
});

// Initialize Gallery with Animation Effects
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Add staggered animation to gallery items
  galleryItems.forEach((item, index) => {
    // Add delay based on index for staggered effect
    item.style.animationDelay = `${index * 0.1}s`;
    
    // Add hover effects
    item.addEventListener('mouseenter', () => {
      // Scale up the image slightly
      const img = item.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.1)';
      }
      
      // Show the overlay
      const overlay = item.querySelector('.gallery-overlay');
      if (overlay) {
        overlay.style.transform = 'translateY(0)';
      }
    });
    
    item.addEventListener('mouseleave', () => {
      // Scale back to normal
      const img = item.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1)';
      }
      
      // Hide the overlay
      const overlay = item.querySelector('.gallery-overlay');
      if (overlay) {
        overlay.style.transform = 'translateY(100%)';
      }
    });
  });
  
  // Initialize masonry layout (optional)
  initMasonryLayout();
}

// Initialize Lightbox functionality
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  
  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'lightbox-content';
  
  const lightboxImage = document.createElement('img');
  lightboxImage.className = 'lightbox-image';
  
  const lightboxCaption = document.createElement('div');
  lightboxCaption.className = 'lightbox-caption';
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.innerHTML = '&times;';
  
  const prevBtn = document.createElement('button');
  prevBtn.className = 'lightbox-nav lightbox-prev';
  prevBtn.innerHTML = '&#10094;';
  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'lightbox-nav lightbox-next';
  nextBtn.innerHTML = '&#10095;';
  
  // Append elements to the DOM
  lightboxContent.appendChild(lightboxImage);
  lightboxContent.appendChild(lightboxCaption);
  lightboxContent.appendChild(closeBtn);
  lightboxContent.appendChild(prevBtn);
  lightboxContent.appendChild(nextBtn);
  lightbox.appendChild(lightboxContent);
  document.body.appendChild(lightbox);
  
  // Add CSS styles for lightbox
  const style = document.createElement('style');
  style.textContent = `
    .lightbox {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .lightbox.active {
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;
    }
    
    .lightbox-content {
      position: relative;
      max-width: 80%;
      max-height: 80%;
    }
    
    .lightbox-image {
      max-width: 100%;
      max-height: 80vh;
      border: 3px solid white;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }
    
    .lightbox-caption {
      color: white;
      text-align: center;
      padding: 10px 0;
      font-size: 1.2rem;
    }
    
    .lightbox-close {
      position: absolute;
      top: -40px;
      right: 0;
      font-size: 30px;
      color: white;
      background: transparent;
      border: none;
      cursor: pointer;
    }
    
    .lightbox-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      padding: 10px 15px;
      font-size: 20px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    
    .lightbox-nav:hover {
      background: rgba(0, 0, 0, 0.8);
    }
    
    .lightbox-prev {
      left: -60px;
    }
    
    .lightbox-next {
      right: -60px;
    }
    
    @media (max-width: 768px) {
      .lightbox-content {
        max-width: 90%;
      }
      
      .lightbox-prev {
        left: -40px;
      }
      
      .lightbox-next {
        right: -40px;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Variables to track current image
  let currentIndex = 0;
  const images = [];
  const captions = [];
  
  // Populate arrays with gallery items
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-overlay h3')?.textContent || '';
    const desc = item.querySelector('.gallery-overlay p')?.textContent || '';
    
    if (img) {
      images.push(img.src);
      captions.push(`<h3>${title}</h3><p>${desc}</p>`);
      
      // Add click event to open lightbox
      item.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(index);
      });
    }
  });
  
  // Lightbox functionality
  function openLightbox(index) {
    if (images.length > 0) {
      currentIndex = index;
      updateLightboxContent();
      lightbox.classList.add('active');
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    }
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    
    // Allow body scrolling
    document.body.style.overflow = '';
    
    // Reset after transition
    setTimeout(() => {
      lightboxImage.src = '';
    }, 300);
  }
  
  function updateLightboxContent() {
    // Add loading animation
    lightboxImage.style.opacity = '0';
    
    // Update image and caption
    lightboxImage.src = images[currentIndex];
    lightboxCaption.innerHTML = captions[currentIndex];
    
    // Show image once loaded
    lightboxImage.onload = () => {
      lightboxImage.style.opacity = '1';
    };
    
    // Update navigation visibility
    if (images.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'block';
      nextBtn.style.display = 'block';
    }
  }
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxContent();
  }
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxContent();
  }
  
  // Event listeners
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', prevImage);
  nextBtn.addEventListener('click', nextImage);
  
  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  });
}

// Initialize Masonry Layout (optional)
function initMasonryLayout() {
  // This is a simplified version of masonry layout
  // For a more robust solution, consider using a library like Masonry.js
  
  const gallery = document.querySelector('.gallery-grid');
  if (!gallery) return;
  
  // Only apply masonry if screen is larger than mobile
  if (window.innerWidth >= 768) {
    const items = gallery.querySelectorAll('.gallery-item');
    const itemWidth = items[0].offsetWidth;
    const galleryWidth = gallery.offsetWidth;
    const columnsCount = Math.floor(galleryWidth / itemWidth);
    
    // Create arrays to track column heights
    const columns = Array(columnsCount).fill(0);
    
    // Position each item
    items.forEach(item => {
      // Find the shortest column
      const shortestColumn = columns.indexOf(Math.min(...columns));
      
      // Position the item
      item.style.position = 'absolute';
      item.style.top = `${columns[shortestColumn]}px`;
      item.style.left = `${shortestColumn * itemWidth}px`;
      
      // Update column height
      columns[shortestColumn] += item.offsetHeight + 20; // 20px gap
    });
    
    // Update gallery height
    gallery.style.height = `${Math.max(...columns)}px`;
  }
}

// Initialize Gallery Filter
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Get filter value
      const filter = btn.getAttribute('data-filter');
      
      // Filter gallery items with animation
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || filter === category) {
          // Add animation class before showing
          item.classList.add('fade-in');
          item.style.display = 'block';
        } else {
          // Add animation class before hiding
          item.classList.add('fade-out');
          
          setTimeout(() => {
            item.style.display = 'none';
            item.classList.remove('fade-out');
          }, 300);
        }
      });
      
      // Update masonry layout after filtering
      setTimeout(initMasonryLayout, 400);
    });
  });
}

// Update gallery layout on window resize
window.addEventListener('resize', () => {
  // Debounce to prevent excessive calls
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    initMasonryLayout();
  }, 250);
});
