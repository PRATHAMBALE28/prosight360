/* ============================================================
   Prosight · shared.js
   Contact Sales + Book Demo modals + small helpers
   Loaded by homepage and every subpage.
   ============================================================ */
(function () {
  'use strict';

  const CONTACT_HTML = `
    <div class="ps-modal-backdrop" data-modal="contact">
      <div class="ps-modal ps-modal--contact" role="dialog" aria-label="Contact Sales">
        <button class="ps-modal__close" aria-label="Close">&times;</button>
        <div class="ps-modal__eyebrow">Contact Sales</div>
        <h3 class="ps-modal__h">Talk to our India team</h3>
        <p class="ps-modal__sub">For procurement queries, pilots, or technical briefings. We respond within one business day.</p>
        <div class="ps-contact-grid">
          <div class="ps-contact-row">
            <span class="ps-contact-ico">📞</span>
            <div>
              <div class="ps-contact-label">Sales &amp; support</div>
              <a href="tel:+919607167264" class="ps-contact-val">+91 96071 67264</a>
            </div>
          </div>
          <div class="ps-contact-row">
            <span class="ps-contact-ico">✉️</span>
            <div>
              <div class="ps-contact-label">Email</div>
              <a href="mailto:autonex360@gmail.com" class="ps-contact-val">autonex360@gmail.com</a>
            </div>
          </div>
          <div class="ps-contact-row">
            <span class="ps-contact-ico">📍</span>
            <div>
              <div class="ps-contact-label">Headquarters</div>
              <span class="ps-contact-val">Pune, Maharashtra · India</span>
            </div>
          </div>
          <div class="ps-contact-row">
            <span class="ps-contact-ico">🕒</span>
            <div>
              <div class="ps-contact-label">Hours</div>
              <span class="ps-contact-val">Mon–Fri · 09:30 – 18:30 IST</span>
            </div>
          </div>
        </div>
        <div class="ps-modal__foot">
          <button type="button" class="ps-btn ps-btn--primary" data-action="open-demo">Or book a demo →</button>
        </div>
      </div>
    </div>`;

  const DEMO_HTML = `
    <div class="ps-modal-backdrop" data-modal="demo">
      <div class="ps-modal ps-modal--demo" role="dialog" aria-label="Book a demo">
        <button class="ps-modal__close" aria-label="Close">&times;</button>
        <div class="ps-modal__eyebrow">Book a demo</div>
        <h3 class="ps-modal__h">See the M530 in action.</h3>
        <p class="ps-modal__sub">30 minutes, live, with an engineer from our Pune team. Your officers, your questions, your compliance.</p>
        <form class="ps-form" novalidate>
          <div class="ps-form__row">
            <label class="ps-field"><span>First name *</span><input type="text" name="first_name" required></label>
            <label class="ps-field"><span>Last name *</span><input type="text" name="last_name" required></label>
          </div>
          <div class="ps-form__row">
            <label class="ps-field"><span>Work email *</span><input type="email" name="email" required></label>
            <label class="ps-field"><span>Phone *</span><input type="tel" name="phone" required></label>
          </div>
          <div class="ps-form__row">
            <label class="ps-field"><span>Organisation / Department *</span><input type="text" name="org" required></label>
            <label class="ps-field"><span>Role *</span><input type="text" name="role" required></label>
          </div>
          <div class="ps-form__row">
            <label class="ps-field"><span>State</span>
              <select name="state">
                <option value="">Select…</option>
                <option>Andhra Pradesh</option><option>Assam</option><option>Bihar</option>
                <option>Chhattisgarh</option><option>Delhi</option><option>Goa</option>
                <option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option>
                <option>Jharkhand</option><option>Karnataka</option><option>Kerala</option>
                <option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option>
                <option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option>
                <option>Odisha</option><option>Punjab</option><option>Rajasthan</option>
                <option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option>
                <option>Tripura</option><option>Uttar Pradesh</option><option>Uttarakhand</option>
                <option>West Bengal</option><option>Other / Central</option>
              </select>
            </label>
            <label class="ps-field"><span>Approx. officers / units</span>
              <select name="unit_count">
                <option value="">Select…</option>
                <option>Under 50</option>
                <option>50 – 200</option>
                <option>200 – 1,000</option>
                <option>1,000+</option>
              </select>
            </label>
          </div>
          <label class="ps-field ps-field--full"><span>How can we help?</span>
            <textarea name="message" rows="3" placeholder="Briefly tell us about your mission, timelines, or specific questions."></textarea>
          </label>
          <div class="ps-form__foot">
            <p class="ps-form__tiny">By submitting, you agree to be contacted about your request. We follow DPDP Act 2023.</p>
            <button type="submit" class="ps-btn ps-btn--primary">Request demo</button>
          </div>
        </form>
        <div class="ps-form__thanks" hidden>
          <div class="ps-form__check">✓</div>
          <h4>Thanks — we've got it.</h4>
          <p>Our team will be in touch within one business day. For urgent enquiries, call <a href="tel:+919607167264">+91 96071 67264</a>.</p>
        </div>
      </div>
    </div>`;

  function ensureMounted() {
    if (document.getElementById('ps-modals')) return;
    const wrap = document.createElement('div');
    wrap.id = 'ps-modals';
    wrap.innerHTML = CONTACT_HTML + DEMO_HTML;
    document.body.appendChild(wrap);
    wireModal('contact');
    wireModal('demo');
  }

  function wireModal(name) {
    const backdrop = document.querySelector(`.ps-modal-backdrop[data-modal="${name}"]`);
    if (!backdrop) return;
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close(name);
    });
    backdrop.querySelector('.ps-modal__close').addEventListener('click', () => close(name));
    const openDemoBtn = backdrop.querySelector('[data-action="open-demo"]');
    if (openDemoBtn) openDemoBtn.addEventListener('click', () => { close('contact'); open('demo'); });

    if (name === 'demo') {
      const form = backdrop.querySelector('.ps-form');
      const thanks = backdrop.querySelector('.ps-form__thanks');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        // Log payload; swap to fetch() to your CRM/Formspree later.
        const data = Object.fromEntries(new FormData(form).entries());
        console.log('[Prosight demo request]', data);
        form.style.display = 'none';
        thanks.hidden = false;
      });
    }
  }

  function open(name) {
    ensureMounted();
    const backdrop = document.querySelector(`.ps-modal-backdrop[data-modal="${name}"]`);
    if (!backdrop) return;
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close(name) {
    const backdrop = document.querySelector(`.ps-modal-backdrop[data-modal="${name}"]`);
    if (!backdrop) return;
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    // reset demo form
    if (name === 'demo') {
      const form = backdrop.querySelector('.ps-form');
      const thanks = backdrop.querySelector('.ps-form__thanks');
      if (form && thanks) { form.reset(); form.style.display = ''; thanks.hidden = true; }
    }
  }

  // Global delegation: any link/button with data-ps="contact" or data-ps="demo"
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-ps]');
    if (!el) return;
    const name = el.getAttribute('data-ps');
    if (name === 'contact' || name === 'demo') {
      e.preventDefault();
      open(name);
    }
  });

  // ESC closes whichever is open
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    ['contact', 'demo'].forEach(n => {
      const b = document.querySelector(`.ps-modal-backdrop[data-modal="${n}"].is-open`);
      if (b) close(n);
    });
  });

  // Auto-upgrade common hrefs on pages that haven't been hand-wired
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a').forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (a.hasAttribute('data-ps')) return;
      if (href.endsWith('#contact') || href === '#contact') a.setAttribute('data-ps', 'contact');
      if (href.endsWith('#demo') || href === '#demo') a.setAttribute('data-ps', 'demo');
    });
    ensureMounted();
  });

  window.Prosight = Object.assign(window.Prosight || {}, { openContact: () => open('contact'), openDemo: () => open('demo') });
})();
