document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initMobileNav();
    initScrollReveal();
    initEventFilter();
    initCalendar();
    initEventRegistration();
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

//Event Filter
function initEventFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            eventCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
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
}

// Calendar Implementation
function initCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentMonthElement = document.querySelector('.current-month');
    const prevBtn = document.querySelector('.calendar-nav.prev');
    const nextBtn = document.querySelector('.calendar-nav.next');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Sample events data
    const events = {
        '2025-10-15': { title: 'Annual Science Fair', type: 'academic' },
        '2025-10-20': { title: 'Research Symposium', type: 'academic' },
        '2025-10-25': { title: 'Cultural Festival', type: 'cultural' },
        '2025-10-30': { title: 'Sports Meet', type: 'sports' }
    };

    function renderCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        currentMonthElement.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;

        let calendarHTML = `
            <div class="calendar-weekdays">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
        `;

        let day = 1;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < startingDay) {
                    calendarHTML += '<div class="calendar-day empty"></div>';
                } else if (day > totalDays) {
                    calendarHTML += '<div class="calendar-day empty"></div>';
                } else {
                    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const hasEvent = events[dateString];
                    const eventClass = hasEvent ? `has-event ${hasEvent.type}` : '';
                    
                    calendarHTML += `
                        <div class="calendar-day ${eventClass}">
                            <span class="day-number">${day}</span>
                            ${hasEvent ? `<div class="event-indicator" title="${hasEvent.title}"></div>` : ''}
                        </div>
                    `;
                    day++;
                }
            }
        }

        calendarGrid.innerHTML = calendarHTML;

        // Add event listeners to days with events
        document.querySelectorAll('.calendar-day.has-event').forEach(day => {
            day.addEventListener('click', () => {
                const dayNumber = day.querySelector('.day-number').textContent;
                const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
                showEventDetails(events[dateString]);
            });
        });
    }

    function showEventDetails(event) {
        // Create and show a modal with event details
        const modal = document.createElement('div');
        modal.className = 'event-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${event.title}</h3>
                <p>Type: ${event.type}</p>
                <button class="close-modal">Close</button>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Navigation event listeners
    prevBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // Initial render
    renderCalendar();
}

// Event Registration
function initEventRegistration() {
    const registerBtns = document.querySelectorAll('.register-btn');
    const detailsBtns = document.querySelectorAll('.details-btn');

    registerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showRegistrationForm();
        });
    });

    detailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const eventCard = btn.closest('.event-card');
            const eventTitle = eventCard.querySelector('h3').textContent;
            showEventDetails(eventTitle);
        });
    });
}

function showRegistrationForm() {
    const modal = document.createElement('div');
    modal.className = 'modal registration-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Event Registration</h3>
            <form id="registrationForm">
                <div class="form-group">
                    <input type="text" id="name" required>
                    <label for="name">Full Name</label>
                </div>
                <div class="form-group">
                    <input type="email" id="email" required>
                    <label for="email">Email Address</label>
                </div>
                <div class="form-group">
                    <input type="tel" id="phone" required>
                    <label for="phone">Phone Number</label>
                </div>
                <button type="submit" class="submit-btn">
                    <span>Register</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </form>
            <button class="close-modal">×</button>
        </div>
    `;

    document.body.appendChild(modal);

    const form = modal.querySelector('#registrationForm');
    const closeBtn = modal.querySelector('.close-modal');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleRegistration(form);
    });

    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function handleRegistration(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner loading"></i> Registering...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showNotification('Registration successful! Check your email for confirmation.', 'success');
        form.closest('.modal').remove();
    }, 2000);
}

function showEventDetails(eventTitle) {
    const modal = document.createElement('div');
    modal.className = 'modal event-details-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${eventTitle}</h3>
            <div class="event-info">
                <p><i class="fas fa-calendar"></i> Date: October 15, 2025</p>
                <p><i class="fas fa-clock"></i> Time: 10:00 AM - 4:00 PM</p>
                <p><i class="fas fa-map-marker-alt"></i> Venue: Main Auditorium</p>
            </div>
            <div class="event-description">
                <h4>About the Event</h4>
                <p>Join us for this exciting event featuring various activities and opportunities for learning and networking.</p>
            </div>
            <button class="register-btn">Register Now</button>
            <button class="close-modal">×</button>
        </div>
    `;

    document.body.appendChild(modal);

    const registerBtn = modal.querySelector('.register-btn');
    const closeBtn = modal.querySelector('.close-modal');

    registerBtn.addEventListener('click', () => {
        modal.remove();
        showRegistrationForm();
    });

    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Add success-message class for animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scroll for anchor links
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