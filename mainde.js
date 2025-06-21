// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Scroll Animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('show');
            }
        });
    }
    
    // Check elements on initial load
    checkScroll();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    
    function runCounter() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(runCounter, 50);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start counter animation when the stats section is in view
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                runCounter();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // Department Category Filtering
    const tabButtons = document.querySelectorAll('.tab-btn');
    const departmentCards = document.querySelectorAll('.department-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get category from data attribute
            const category = button.getAttribute('data-category');
            
            // Filter departments
            departmentCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Faculty Slider
    const facultyWrapper = document.querySelector('.faculty-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const facultyCards = document.querySelectorAll('.faculty-card');
    
    if (facultyWrapper && prevBtn && nextBtn) {
        let currentIndex = 0;
        let cardWidth = 0;
        let visibleCards = 3;
        
        // Function to update card width and visible cards based on screen size
        function updateCardWidth() {
            if (window.innerWidth < 768) {
                visibleCards = 1;
            } else if (window.innerWidth < 992) {
                visibleCards = 2;
            } else {
                visibleCards = 3;
            }
            
            // Calculate card width based on container width and visible cards
            const containerWidth = facultyWrapper.parentElement.clientWidth;
            cardWidth = containerWidth / visibleCards;
            
            // Update card widths
            facultyCards.forEach(card => {
                card.style.width = `${cardWidth - 30}px`; // Subtract gap
            });
        }
        
        // Initial update
        updateCardWidth();
        
        // Update on window resize
        window.addEventListener('resize', updateCardWidth);
        
        // Slide function
        function slide(direction) {
            if (direction === 'next') {
                currentIndex = (currentIndex + 1) % (facultyCards.length - visibleCards + 1);
            } else {
                currentIndex = (currentIndex - 1 + (facultyCards.length - visibleCards + 1)) % (facultyCards.length - visibleCards + 1);
            }
            
            facultyWrapper.style.transform = `translateX(-${currentIndex * (cardWidth + 30)}px)`;
        }
        
        // Event listeners for slider controls
        nextBtn.addEventListener('click', () => slide('next'));
        prevBtn.addEventListener('click', () => slide('prev'));
        
        // Add transition to faculty wrapper
        facultyWrapper.style.transition = 'transform 0.5s ease';
        facultyWrapper.style.display = 'flex';
        facultyWrapper.style.gap = '30px';
    }
    
    // Program Tabs
    const tabButtons2 = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons2.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons2.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Load More Departments Button
    const loadMoreBtn = document.querySelector('.load-more');
    const hiddenDepartments = Array.from(departmentCards).slice(6); // Hide departments after the first 6
    
    // Initially hide departments
    hiddenDepartments.forEach(dept => {
        dept.style.display = 'none';
    });
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            hiddenDepartments.forEach(dept => {
                dept.style.display = 'block';
                
                // Add animation class
                setTimeout(() => {
                    dept.classList.add('show');
                }, 100);
            });
            
            // Hide the load more button
            this.style.display = 'none';
        });
    }
    
    // Form Submission
    const departmentInquiryForm = document.getElementById('departmentInquiryForm');
    
    if (departmentInquiryForm) {
        departmentInquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Simulate form submission (in a real application, you would send this to the server)
            console.log('Form Data:', formDataObj);
            
            // Show success message
            const formContainer = this.parentElement;
            this.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Thank You!</h3>
                <p>Your inquiry has been submitted successfully. We will get back to you soon.</p>
            `;
            
            formContainer.appendChild(successMessage);
            
            // Add CSS for success message
            const style = document.createElement('style');
            style.textContent = `
                .success-message {
                    text-align: center;
                    padding: 30px;
                }
                
                .success-message i {
                    font-size: 3rem;
                    color: var(--success-color);
                    margin-bottom: 20px;
                }
                
                .success-message h3 {
                    color: var(--primary-color);
                    margin-bottom: 10px;
                }
            `;
            document.head.appendChild(style);
        });
    }
    
    // Parallax Effect for Hero Section
    const hero = document.getElementById('hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
    
    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = '#fff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = '#fff';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effect to department cards
    departmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.department-icon').style.transform = 'scale(1.1) rotate(10deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.department-icon').style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // Add CSS for department icon transition
    const style = document.createElement('style');
    style.textContent = `
        .department-icon {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Add animation to featured department section
    const featuredSection = document.querySelector('.featured-department');
    
    if (featuredSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const sectionPosition = featuredSection.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrollPosition > sectionPosition - windowHeight / 1.5) {
                featuredSection.style.backgroundPositionY = `${(scrollPosition - sectionPosition) * 0.1}px`;
            }
        });
    }
    
    // Add hover effect to research cards
    const researchCards = document.querySelectorAll('.research-card');
    
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add hover effect to facility cards
    const facilityCards = document.querySelectorAll('.facility-card');
    
    facilityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.facility-icon').style.transform = 'scale(1.1) rotate(10deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.facility-icon').style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // Add CSS for facility icon transition
    const facilityStyle = document.createElement('style');
    facilityStyle.textContent = `
        .facility-icon {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(facilityStyle);
    
    // Add typing animation to hero heading
    const heroHeading = document.querySelector('.hero-content h1');
    
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation when hero section is in view
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(typeWriter, 500);
                heroObserver.unobserve(heroHeading);
            }
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroHeading);
    }
});