/* Small progressive enhancements for Evergreen & Gleam */
(() => {
  'use strict';

  const year = document.querySelectorAll('[data-year]');
  year.forEach((node) => { node.textContent = String(new Date().getFullYear()); });

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      menuButton.querySelector('[data-menu-label]').textContent = isOpen ? 'Close' : 'Menu';
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation menu');
        const label = menuButton.querySelector('[data-menu-label]');
        if (label) label.textContent = 'Menu';
      });
    });
  }

  const estimateForm = document.querySelector('[data-estimator]');
  if (estimateForm) {
    estimateForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const serviceSelect = estimateForm.querySelector('[name="estimate-service"]');
      const sizeInput = estimateForm.querySelector('[name="estimate-size"]');
      const output = document.querySelector('[data-estimate-result]');
      const rates = { housekeeping: 0.12, landscaping: 0.08, deepclean: 0.18, gardenreset: 0.14 };
      const labels = { housekeeping: 'housekeeping', landscaping: 'landscaping', deepclean: 'deep cleaning', gardenreset: 'garden refresh' };
      const service = serviceSelect.value;
      const size = Number(sizeInput.value);
      if (!service || !Number.isFinite(size) || size < 1) {
        output.textContent = 'Choose a service and enter a positive estimated area to see a planning range.';
        output.classList.add('is-visible');
        return;
      }
      const base = ({ housekeeping: 65, landscaping: 55, deepclean: 115, gardenreset: 95 })[service];
      const low = Math.round((base + size * rates[service]) / 5) * 5;
      const high = Math.round((base * 1.35 + size * rates[service] * 1.8) / 5) * 5;
      output.textContent = `Planning estimate: $${low}–$${high} for ${labels[service]}. This is an illustrative online estimate; a final quote depends on the space, condition, and service details.`;
      output.classList.add('is-visible');
    });
  }

})();
