/* interactive behavior: reveal on scroll, parallax, simple floating tilt, theme toggle */

document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Intersection Observer for reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-delay, .reveal-delay-2, .reveal-delay-3').forEach((el) => {
    // add small delays for classes
    if (el.classList.contains('reveal-delay')) el.style.transitionDelay = '120ms';
    if (el.classList.contains('reveal-delay-2')) el.style.transitionDelay = '240ms';
    if (el.classList.contains('reveal-delay-3')) el.style.transitionDelay = '360ms';
    observer.observe(el);
  });

  // Simple parallax for hero blob and floating cards (based on mouse move)
  const hero = document.querySelector('.hero');
  const floats = document.querySelectorAll('.floating');

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;

    // move hero blob slightly
    const blob = document.querySelector('.hero-blob');
    if (blob) blob.style.transform = `translate(${mx * 20}px, ${my * -10}px) rotate(${mx * 6}deg)`;

    floats.forEach((f, i) => {
      const speed = (i + 1) * 4;
      f.style.transform = `translate(calc(-50% + ${mx * speed}px), calc(-50% + ${my * speed * -1}px))`;
    });
  });

  // small tilt on hovering cards
  document.querySelectorAll('.project-card, .card').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (y - 0.5) * 8;
      const ry = (x - 0.5) * -8;
      el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // simple theme toggle (light/dark)
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    if (document.documentElement.hasAttribute('data-theme')) {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.textContent = 'Dark';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggle.textContent = 'Light';
    }
  });

  // keyboard accessible skip to content (optional): focus first section on brand click
  document.querySelector('.brand').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('home').scrollIntoView({behavior:'smooth'});
  });

  // sample form behavior: show a tiny toast (non-submitting, since no backend)
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // simple validation already handled by HTML required
    alert('Thanks! This demo form does not send email. Replace with your backend or Formspree endpoint.');
  });
});
