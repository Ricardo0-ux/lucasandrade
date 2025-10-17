document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.querySelector('.preloader');
  const progressBar = document.querySelector('.progress');
  
  // Simulate loading progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Hide preloader when loading is complete
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
      }, 500);
    }
    progressBar.style.width = `${progress}%`;
  }, 200);

  // Particles.js configuration
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#00c9ff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#00c9ff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }

  // Custom cursor
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursorDot && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      
      gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out"
      });
    });

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .servico-card, input[type="submit"], input[type="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorFollower, {
          scale: 1.5,
          backgroundColor: 'rgba(0, 201, 255, 0.5)',
          duration: 0.3
        });
        cursorDot.style.opacity = '0';
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(cursorFollower, {
          scale: 1,
          backgroundColor: 'transparent',
          duration: 0.3
        });
        cursorDot.style.opacity = '1';
      });
    });
  }

  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.menu-mobile-button');
  const menu = document.querySelector('.menu');
  
  if (mobileMenuButton && menu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenuButton.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuButton.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // Header scroll effect
  const header = document.querySelector('.cabecalho');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
    
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animated counters
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  };
  
  // Initialize counters when section is visible
  const statsSection = document.querySelector('.hero-stats');
  
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.unobserve(statsSection);
      }
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
  }

  // Animate skill bars
  const skillBars = document.querySelectorAll('.skill-progress');
  
  if (skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = `${width}%`;
          });
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(document.querySelector('.sobre-skills'));
  }

  // Projects filtering
  const tabButtons = document.querySelectorAll('.tab-button');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (tabButtons.length > 0 && projectCards.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        // Filter projects
        projectCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Testimonials slider
  if (document.querySelector('.testimonials-slider')) {
    const testimonialsSlider = new Swiper('.testimonials-slider', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }
    });
  }

  // Form submission
  const contactForm = document.getElementById('form-contato');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitButton = contactForm.querySelector('.submit-button');
      const buttonText = submitButton.querySelector('.button-text');
      const buttonIcon = submitButton.querySelector('.button-icon');
      
      // Simulate form submission
      submitButton.disabled = true;
      buttonText.textContent = 'Enviando...';
      
      setTimeout(() => {
        // Show success state
        submitButton.style.background = '#4BB543';
        buttonText.textContent = 'Mensagem Enviada!';
        buttonIcon.innerHTML = '<i class="fas fa-check"></i>';
        
        // Reset form after 3 seconds
        setTimeout(() => {
          contactForm.reset();
          submitButton.style.background = '';
          submitButton.disabled = false;
          buttonText.textContent = 'Enviar Mensagem';
          buttonIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
        }, 3000);
      }, 1500);
    });
  }

  // Current year in footer
  const currentYear = document.getElementById('current-year');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate sections on scroll
  gsap.utils.toArray('.section-padding').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 1
    });
  });
  
  // Animate hero content
  gsap.from('.hero-content', {
    duration: 1,
    opacity: 0,
    x: -50,
    ease: "power2.out"
  });
  
  gsap.from('.hero-image', {
    duration: 1,
    opacity: 0,
    x: 50,
    ease: "power2.out",
    delay: 0.3
  });
  
  // Floating animation for elements
  const floatElements = document.querySelectorAll('.image-frame, .servico-card, .project-card');
  floatElements.forEach(el => {
    gsap.to(el, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
});
