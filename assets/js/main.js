document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Sticky Navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // Dark Mode Toggle
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const body = document.body;
  
  // Check local storage or system preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark-mode');
  }

  if (themeToggles.length > 0) {
    const updateThemeIcons = (isDark) => {
      themeToggles.forEach(toggle => {
        const moonIcon = toggle.querySelector('.fa-moon');
        const sunIcon = toggle.querySelector('.fa-sun');
        if (isDark) {
          if(moonIcon) moonIcon.style.display = 'none';
          if(sunIcon) sunIcon.style.display = 'inline-block';
        } else {
          if(moonIcon) moonIcon.style.display = 'inline-block';
          if(sunIcon) sunIcon.style.display = 'none';
        }
      });
    };

    // Initial icon state
    updateThemeIcons(body.classList.contains('dark-mode'));

    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark);
      });
    });
  }

  // RTL Toggle
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  
  const currentDir = localStorage.getItem('dir');
  if (currentDir === 'rtl') {
    body.classList.add('rtl');
    document.documentElement.setAttribute('dir', 'rtl');
  }

  if (rtlToggles.length > 0) {
    rtlToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        body.classList.toggle('rtl');
        if (body.classList.contains('rtl')) {
          localStorage.setItem('dir', 'rtl');
          document.documentElement.setAttribute('dir', 'rtl');
        } else {
          localStorage.setItem('dir', 'ltr');
          document.documentElement.setAttribute('dir', 'ltr');
        }
      });
    });
  }

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all accordions
      document.querySelectorAll('.accordion-item').forEach(acc => {
        acc.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Animated Counters
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const observerOptions = {
      threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.getAttribute('data-target'));
          let startValue = 0;
          const duration = 2000;
          const increment = endValue / (duration / 16);

          const updateCounter = () => {
            startValue += increment;
            if (startValue < endValue) {
              target.innerText = Math.ceil(startValue);
              requestAnimationFrame(updateCounter);
            } else {
              target.innerText = endValue;
            }
          };

          updateCounter();
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // Form Validation & Password Toggle
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.querySelector('input[type="password"]');

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePassword.classList.toggle('fa-eye');
      togglePassword.classList.toggle('fa-eye-slash');
    });
  }

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Blog Details Logic
  const blogCards = document.querySelectorAll('.card');
  if (blogCards.length > 0 && currentPage === 'blog.html') {
    blogCards.forEach(card => {
      const btn = card.querySelector('.btn-outline');
      if (btn && btn.innerText.includes('Read Article')) {
        btn.addEventListener('click', (e) => {
          const img = card.querySelector('.card-img-wrap img')?.src;
          const category = card.querySelector('span')?.innerText;
          const title = card.querySelector('.card-title')?.innerText;
          const description = card.querySelector('.card-text')?.innerText;

          const blogData = { img, category, title, description };
          localStorage.setItem('selectedBlog', JSON.stringify(blogData));
        });
      }
    });
  }

  if (currentPage === 'blog-details.html') {
    const blogData = JSON.parse(localStorage.getItem('selectedBlog'));
    if (blogData) {
      const detailCategory = document.getElementById('blog-category');
      const detailTitle = document.getElementById('blog-title');
      const detailImg = document.getElementById('blog-image');
      const detailFirstPara = document.getElementById('blog-description');

      if (detailCategory) detailCategory.innerText = blogData.category || 'Executive Insights';
      if (detailTitle) detailTitle.innerText = blogData.title || 'How to Hook B2B Buyers in 3 Lines';
      if (detailImg) detailImg.src = blogData.img || 'assets/images/blog-thumb.png';
      if (detailFirstPara) detailFirstPara.innerText = blogData.description || '';
    }
  }
});
