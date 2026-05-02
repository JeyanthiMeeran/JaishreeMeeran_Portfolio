/* =========================================
   SHANMUGA JAISHREE — PORTFOLIO SCRIPTS
   script.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. DARK / LIGHT THEME TOGGLE ── */
  const html      = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  let isDark = true;

  toggleBtn.addEventListener('click', () => {
    isDark = !isDark;
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
  });


  /* ── 2. HAMBURGER MOBILE MENU ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when any nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });


  /* ── 3. CURSOR GLOW (desktop only) ── */
  const cursorGlow = document.getElementById('cursorGlow');

  // Hide on touch devices
  if ('ontouchstart' in window) {
    cursorGlow.style.display = 'none';
  } else {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top  = e.clientY + 'px';
    });
  }


  /* ── 4. SCROLL REVEAL ANIMATION ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── 5. ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 130) {
        current = section.id;
      }
    });

    navAs.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });


  /* ── 6. SKILL CARD TILT ON HOVER ── */
  const skillCards = document.querySelectorAll('.skill-card');

  skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const midX   = rect.width  / 2;
      const midY   = rect.height / 2;
      const rotateX = ((y - midY) / midY) * -8;
      const rotateY = ((x - midX) / midX) *  8;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ── 7. TYPING ANIMATION FOR HERO SUB-HEADING ── */
  const heroSub   = document.querySelector('.hero-sub');
  const fullText  = heroSub ? heroSub.textContent.trim() : '';

  if (heroSub && fullText) {
    heroSub.textContent = '';
    let i = 0;

    const type = () => {
      if (i < fullText.length) {
        heroSub.textContent += fullText[i];
        i++;
        setTimeout(type, 45);
      }
    };

    // Start typing after the hero fade-in delay
    setTimeout(type, 800);
  }


  /* ── 8. SMOOTH COUNTER ANIMATION (About Stats) ── */
  const statNums = document.querySelectorAll('.stat-num');

  const animateCounter = (el) => {
    const target  = el.textContent.replace(/\D/g, '');
    const suffix  = el.textContent.replace(/[0-9]/g, '');
    const isNum   = target !== '';

    if (!isNum) return; // skip "2nd"

    let count    = 0;
    const end    = parseInt(target, 10);
    const step   = Math.ceil(end / 30);
    const timer  = setInterval(() => {
      count += step;
      if (count >= end) {
        el.textContent = end + suffix;
        clearInterval(timer);
      } else {
        el.textContent = count + suffix;
      }
    }, 40);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach(num => counterObserver.observe(num));


  /* ── 9. NAV SHRINK ON SCROLL ── */
  const navEl = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navEl.style.padding = '0.5rem 0';
    } else {
      navEl.style.padding = '1rem 0';
    }
  }, { passive: true });

});
