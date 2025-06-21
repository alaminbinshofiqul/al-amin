const images = [
    'images/rr1.jpg',
    'images/rr2.jpg',
    'images/rr3.jpg'
  ]; // Ensure these files are in the 'images' folder
  
  let index = 0;
  const slideshow = document.getElementById('slideshow');
  
  function changeBackground() {
    slideshow.style.backgroundImage = `url('${images[index]}')`;
    index = (index + 1) % images.length;
  }
  
  window.onload = () => {
    changeBackground(); // Set initial background
    setInterval(changeBackground, 2000); // Change every 2 seconds
  };














<script>
  function showSubSection() {
    document.querySelector('.about-subsection').style.display = "block";
  }

  function hideSubSection() {
    document.querySelector('.about-subsection').style.display = "none";
  }
</script>
</body>


document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
    });
  }
  
  // Close navigation when clicking outside
  document.addEventListener('click', function(event) {
    if (mainNav && mainNav.classList.contains('active') && !mainNav.contains(event.target) && event.target !== navToggle) {
      mainNav.classList.remove('active');
    }
  });
  
  // Accordion functionality for archives
  const accordionBtn = document.querySelector('.accordion-btn');
  if (accordionBtn) {
    accordionBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      const accordionContent = this.nextElementSibling;
      
      if (this.classList.contains('active')) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        this.querySelector('i').classList.replace('fa-chevron-down', 'fa-chevron-up');
      } else {
        accordionContent.style.maxHeight = '0';
        this.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
      }
    });
  }
  
  // Notices search functionality
  const noticeSearch = document.getElementById('noticeSearch');
  if (noticeSearch) {
    noticeSearch.addEventListener('keyup', function() {
      const searchValue = this.value.toLowerCase();
      const notices = document.querySelectorAll('.notice-card');
      
      notices.forEach(function(notice) {
        const title = notice.querySelector('h3').textContent.toLowerCase();
        const content = notice.querySelector('p').textContent.toLowerCase();
        const category = notice.querySelector('.notice-meta span:nth-child(2)').textContent.toLowerCase();
        
        if (title.includes(searchValue) || content.includes(searchValue) || category.includes(searchValue)) {
          notice.style.display = '';
        } else {
          notice.style.display = 'none';
        }
      });
    });
  }
  
  // Archive search functionality
  const archiveSearch = document.getElementById('archiveSearch');
  if (archiveSearch) {
    archiveSearch.addEventListener('keyup', function() {
      const searchValue = this.value.toLowerCase();
      const archiveItems = document.querySelectorAll('.archive-item');
      
      archiveItems.forEach(function(item) {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const category = item.querySelector('.archive-meta span').textContent.toLowerCase();
        
        if (title.includes(searchValue) || category.includes(searchValue)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
  
  // Category filter for notices
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function() {
      const selectedCategory = this.value.toLowerCase();
      const notices = document.querySelectorAll('.notice-card');
      
      notices.forEach(function(notice) {
        const category = notice.querySelector('.notice-meta span:nth-child(2)').textContent.toLowerCase();
        
        if (selectedCategory === 'all' || category.includes(selectedCategory)) {
          notice.style.display = '';
        } else {
          notice.style.display = 'none';
        }
      });
    });
  }
  
  // Date filter for notices
  const dateFilter = document.getElementById('dateFilter');
  if (dateFilter) {
    dateFilter.addEventListener('change', function() {
      const selectedFilter = this.value;
      const notices = document.querySelectorAll('.notice-card');
      const today = new Date();
      
      notices.forEach(function(notice) {
        const dateText = notice.querySelector('.notice-meta span:nth-child(1)').textContent;
        const dateMatch = dateText.match(/(\w+) (\d+), (\d+)/);
        
        if (dateMatch) {
          const month = dateMatch[1];
          const day = parseInt(dateMatch[2]);
          const year = parseInt(dateMatch[3]);
          
          const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          const monthIndex = months.indexOf(month);
          
          const noticeDate = new Date(year, monthIndex, day);
          const diffTime = Math.abs(today - noticeDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          let show = true;
          
          if (selectedFilter === 'today') {
            show = diffDays <= 1;
          } else if (selectedFilter === 'week') {
            show = diffDays <= 7;
          } else if (selectedFilter === 'month') {
            show = diffDays <= 30;
          } else if (selectedFilter === 'year') {
            show = diffDays <= 365;
          }
          
          notice.style.display = show ? '' : 'none';
        }
      });
    });
  }
  
  // Year and month filters for archives
  const yearFilter = document.getElementById('yearFilter');
  const monthFilter = document.getElementById('monthFilter');
  const categoryArchiveFilter = document.getElementById('categoryArchiveFilter');
  
  if (yearFilter && monthFilter && categoryArchiveFilter) {
    const filterArchives = function() {
      const selectedYear = yearFilter.value;
      const selectedMonth = monthFilter.value;
      const selectedCategory = categoryArchiveFilter.value.toLowerCase();
      
      const archiveYears = document.querySelectorAll('.archive-year');
      
      archiveYears.forEach(function(year) {
        const yearTitle = year.querySelector('h2').textContent;
        const yearMatch = yearTitle.match(/(\d+)/);
        
        if (yearMatch && yearMatch[1] === selectedYear) {
          year.style.display = '';
          
          const archiveMonths = year.querySelectorAll('.archive-month');
          archiveMonths.forEach(function(month) {
            const monthTitle = month.querySelector('h3').textContent;
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const monthIndex = monthNames.findIndex(m => monthTitle.includes(m));
            const monthNum = (monthIndex + 1).toString().padStart(2, '0');
            
            if (selectedMonth === 'all' || monthNum === selectedMonth) {
              month.style.display = '';
              
              if (selectedCategory !== 'all') {
                const archiveItems = month.querySelectorAll('.archive-item');
                archiveItems.forEach(function(item) {
                  const category = item.querySelector('.archive-meta span').textContent.toLowerCase();
                  item.style.display = category.includes(selectedCategory) ? '' : 'none';
                });
              } else {
                const archiveItems = month.querySelectorAll('.archive-item');
                archiveItems.forEach(function(item) {
                  item.style.display = '';
                });
              }
            } else {
              month.style.display = 'none';
            }
          });
        } else {
          year.style.display = 'none';
        }
      });
    };
    
    yearFilter.addEventListener('change', filterArchives);
    monthFilter.addEventListener('change', filterArchives);
    categoryArchiveFilter.addEventListener('change', filterArchives);
  }
  
  // Form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const captcha = document.getElementById('captcha');
      if (captcha && captcha.value !== '5') {
        alert('Please enter the correct answer to the verification question.');
        return;
      }
      
      alert('Your message has been sent successfully! We will get back to you soon.');
      this.reset();
    });
  }
  
  // Notice submission form validation
  const noticeSubmissionForm = document.getElementById('noticeSubmissionForm');
  if (noticeSubmissionForm) {
    noticeSubmissionForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      alert('Your notice has been submitted for review. You will receive a confirmation email once it is approved.');
      this.reset();
    });
  }
  
  // Print functionality for notice details
  const printBtn = document.querySelector('.btn-print');
  if (printBtn) {
    printBtn.addEventListener('click', function(event) {
      event.preventDefault();
      window.print();
    });
  }
  
  // Share functionality for notice details
  const shareBtn = document.querySelector('.btn-share');
  if (shareBtn) {
    shareBtn.addEventListener('click', function(event) {
      event.preventDefault();
      
      if (navigator.share) {
        navigator.share({
          title: document.querySelector('.notice-title-area h2').textContent,
          url: window.location.href
        }).catch(console.error);
      } else {
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = window.location.href;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Link copied to clipboard!');
      }
    });
  }
});


  

// Navigation
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.navbar-toggle');
  const mobileNav = document.querySelector('.navbar-mobile');
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');
  
  navToggle.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
    menuIcon.style.display = mobileNav.classList.contains('active') ? 'none' : 'block';
    closeIcon.style.display = mobileNav.classList.contains('active') ? 'block' : 'none';
  });
  
  // Parallax effect for hero section
  window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
  });
  
  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });
  
  // Timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    observer.observe(item);
  });
  
  // Mission & Vision cards
  const missionCard = document.querySelector('.mission-card');
  const visionCard = document.querySelector('.vision-card');
  const valuesContainer = document.querySelector('.values-container');
  
  if (missionCard) observer.observe(missionCard);
  if (visionCard) observer.observe(visionCard);
  if (valuesContainer) observer.observe(valuesContainer);
  
  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;
  
  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.display = i === index ? 'block' : 'none';
    });
  }
  
  if (testimonials.length > 0) {
    showTestimonial(currentIndex);
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
      });
    }
  }
});