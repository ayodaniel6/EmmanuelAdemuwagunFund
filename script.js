// ===== FIX MOBILE VIEWPORT HEIGHT (prevents shaky hero on scroll) =====
document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');

// ===== HERO SLIDESHOW =====
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
if (slides.length > 1) {
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '+';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger counters
      if (entry.target.classList.contains('stat-num')) {
        animateCounter(entry.target);
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.program-card, .stat-card, .testimonial-card, .article-card, .about-grid, .contact-grid').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

document.querySelectorAll('.stat-num').forEach(el => observer.observe(el));

// ===== DONATION AMOUNT BUTTONS =====
const amountBtns = document.querySelectorAll('.amount-btn');
const donateBtn = document.querySelector('.donate-btn');

amountBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    amountBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const amount = parseInt(btn.dataset.amount).toLocaleString();
    donateBtn.textContent = `Donate ₦${amount} Now`;
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const status = document.getElementById('form-status');

    btn.textContent = 'Sending…';
    btn.disabled = true;

    const data = new FormData(contactForm);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();

      if (json.success) {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#16a34a';
        status.textContent = 'Thank you! I\'ll be in touch soon.';
        status.style.color = '#16a34a';
        contactForm.reset();
      } else {
        throw new Error(json.message);
      }
    } catch (err) {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      status.textContent = 'Something went wrong. Please email founder@emmanuelademuwagun.org directly.';
      status.style.color = '#dc2626';
    }

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      status.textContent = '';
    }, 5000);
  });
}

// ===== SMOOTH SCROLL OFFSET (for fixed navbar) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
