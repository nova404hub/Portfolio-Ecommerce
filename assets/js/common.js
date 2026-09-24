/* Shared contact handling and guarded legacy article controls. */
(() => {
  const form = document.getElementById('contact-form');
  if (form) {
    form.querySelector('button[type="submit"]').disabled = false;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const status = document.getElementById('contact-message');
      const submit = form.querySelector('button[type="submit"]');
      if (submit.disabled) return;
      const fields = ['name', 'email', 'message'].map(name => form.elements.namedItem(name));
      fields.forEach(field => field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.'));
      if (!form.reportValidity()) return;
      if (!window.emailjs) {
        status.textContent = 'The message service is unavailable. Please email abundojonalene@gmail.com directly.';
        return;
      }
      submit.disabled = true;
      form.setAttribute('aria-busy', 'true');
      status.textContent = 'Sending your message…';
      try {
        await window.emailjs.sendForm('service_aq07ojd', 'template_fjgxf0j', form, 'GhWi_CA14Lsatqb-7');
        status.textContent = 'Message sent. Thank you for getting in touch!';
        form.reset();
      } catch {
        status.textContent = 'Your message could not be sent. Please try again or email abundojonalene@gmail.com. Your message is still here.';
      } finally {
        submit.disabled = false;
        form.removeAttribute('aria-busy');
      }
    });
    form.addEventListener('input', event => {
      if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
    });
  }

  const menu = document.getElementById('nav-menu');
  const toggle = document.getElementById('nav-toggle');
  const close = document.getElementById('nav-close');
  toggle?.addEventListener('click', () => menu?.classList.add('show-menu'));
  close?.addEventListener('click', () => menu?.classList.remove('show-menu'));
  document.querySelectorAll('.nav__link').forEach(link => link.addEventListener('click', () => menu?.classList.remove('show-menu')));
  const header = document.getElementById('header');
  if (header) {
    const updateHeader = () => header.classList.toggle('scroll-header', window.scrollY >= 50);
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }
  const switcher = document.querySelector('.style__switcher');
  document.querySelector('.style__switcher-toggler')?.addEventListener('click', () => switcher?.classList.toggle('open'));
  if (switcher) window.addEventListener('scroll', () => switcher.classList.remove('open'), { passive: true });
})();

// Historical article pages retain their inline skin selection controls.
function setActiveStyle(color) {
  document.querySelectorAll('.alternate-style').forEach(style => {
    style.disabled = style.getAttribute('title') !== color;
  });
}
