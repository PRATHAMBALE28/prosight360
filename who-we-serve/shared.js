/* ============================================================
   Prosight · shared.js
   Contact Sales + Book Demo modals + small helpers
   Loaded by homepage and every subpage.
   ============================================================ */
(function () {
  'use strict';

  // Inject modal CSS once — ensures modals work on pages that don't load shared.css (e.g. homepage)
  const MODAL_CSS = `
    .ps-modal-backdrop { position: fixed; inset: 0; z-index: 200; background: rgba(10,14,20,0.55); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: none; align-items: flex-start; justify-content: center; padding: 60px 20px 40px; overflow-y: auto; font-family: 'Sora', system-ui, -apple-system, sans-serif; }
    .ps-modal-backdrop.is-open { display: flex; animation: psModalFade .18s ease-out; }
    @keyframes psModalFade { from { opacity: 0; } to { opacity: 1; } }
    .ps-modal { position: relative; background: #fff; border-radius: 16px; width: 100%; max-width: 560px; padding: 36px 36px 32px; box-shadow: 0 30px 80px rgba(0,0,0,0.24); animation: psModalRise .22s cubic-bezier(.2,.9,.3,1.2); color: #0A0A0A; }
    .ps-modal--demo { max-width: 640px; }
    @keyframes psModalRise { from { transform: translateY(18px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .ps-modal__close { position: absolute; top: 14px; right: 14px; width: 34px; height: 34px; border-radius: 50%; background: #F4F4F2; border: none; color: #5A5A5A; font-size: 22px; line-height: 1; cursor: pointer; transition: all .12s; }
    .ps-modal__close:hover { background: #E8E8E4; color: #0A0A0A; }
    .ps-modal__eyebrow { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #0066FF; font-weight: 600; margin-bottom: 10px; }
    .ps-modal__h { font-family: 'Fraunces', 'Times New Roman', serif; font-size: 26px; font-weight: 600; color: #0A0A0A; letter-spacing: -0.015em; line-height: 1.2; margin-bottom: 8px; }
    .ps-modal__sub { font-size: 14px; color: #5A5A5A; line-height: 1.55; margin-bottom: 22px; }
    .ps-modal__foot { margin-top: 18px; padding-top: 18px; border-top: 1px solid #E8E8E4; text-align: right; }
    .ps-contact-grid { display: grid; gap: 14px; }
    .ps-contact-row { display: flex; gap: 14px; align-items: flex-start; padding: 14px 16px; background: #FAFAF9; border: 1px solid #E8E8E4; border-radius: 10px; }
    .ps-contact-ico { font-size: 18px; line-height: 1.3; flex-shrink: 0; }
    .ps-contact-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #A8A49E; font-weight: 600; margin-bottom: 3px; }
    .ps-contact-val { font-size: 14.5px; color: #0A0A0A; font-weight: 500; }
    a.ps-contact-val { color: #0066FF; text-decoration: none; }
    a.ps-contact-val:hover { text-decoration: underline; }
    .ps-form { display: grid; gap: 14px; }
    .ps-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .ps-field { display: flex; flex-direction: column; gap: 5px; }
    .ps-field--full { grid-column: 1 / -1; }
    .ps-field span { font-size: 12px; font-weight: 500; color: #5A5A5A; }
    .ps-field input, .ps-field select, .ps-field textarea { font: inherit; font-size: 14px; padding: 10px 12px; background: #fff; color: #0A0A0A; border: 1px solid #E8E8E4; border-radius: 8px; outline: none; transition: border-color .12s, box-shadow .12s; width: 100%; }
    .ps-field textarea { resize: vertical; min-height: 72px; font-family: inherit; }
    .ps-field input:focus, .ps-field select:focus, .ps-field textarea:focus { border-color: #0066FF; box-shadow: 0 0 0 3px rgba(0,102,255,0.12); }
    .ps-form__foot { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding-top: 8px; flex-wrap: wrap; }
    .ps-form__tiny { font-size: 11.5px; color: #A8A49E; line-height: 1.45; max-width: 340px; }
    .ps-btn { font-family: 'Sora', system-ui, sans-serif; font-size: 13.5px; font-weight: 500; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; transition: all .12s; }
    .ps-btn--primary { background: #0066FF; color: #fff; }
    .ps-btn--primary:hover { background: #0055DD; transform: translateY(-1px); }
    .ps-form__thanks { text-align: center; padding: 10px 0 6px; }
    .ps-form__check { width: 56px; height: 56px; border-radius: 50%; background: #F0FDF4; color: #16A34A; font-size: 28px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; }
    .ps-form__thanks h4 { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; color: #0A0A0A; margin-bottom: 6px; }
    .ps-form__thanks p { font-size: 14px; color: #5A5A5A; line-height: 1.55; }
    .ps-form__thanks a { color: #0066FF; font-weight: 500; text-decoration: none; }
    @media (max-width: 640px) {
      .ps-modal-backdrop { padding: 0; align-items: stretch; }
      .ps-modal { max-width: none !important; border-radius: 0; padding: 28px 22px 40px; min-height: 100%; }
      .ps-modal__h { font-size: 22px; }
      .ps-form__row { grid-template-columns: 1fr; }
      .ps-form__foot { flex-direction: column; align-items: stretch; }
      .ps-form__foot .ps-btn { width: 100%; }
      .ps-form__tiny { max-width: none; }
    }`;
  if (!document.getElementById('ps-modal-css')) {
    const st = document.createElement('style');
    st.id = 'ps-modal-css';
    st.textContent = MODAL_CSS;
    document.head.appendChild(st);
  }

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
              <a href="mailto:admin@prosight360.in" class="ps-contact-val">admin@prosight360.in</a>
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
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;
        try {
          const fd = new FormData(form);
          fd.append('_subject', 'New Prosight Demo Request');
          fd.append('_captcha', 'false');
          fd.append('_template', 'table');
          const res = await fetch('https://formsubmit.co/admin@prosight360.in', {
            method: 'POST',
            body: fd,
            headers: { 'Accept': 'application/json' }
          });
          if (!res.ok) throw new Error('Submit failed');
          form.style.display = 'none';
          thanks.hidden = false;
        } catch (err) {
          alert('Sorry, submission failed. Please email admin@prosight360.in directly or call +91 96071 67264.');
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
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
    mountMobileNav();
  });

  // ── Mobile hamburger + drawer for subpages ────────────────────
  function mountMobileNav() {
    const nav = document.querySelector('.topnav');
    const inner = nav && nav.querySelector('.topnav__inner');
    if (!nav || !inner || nav.dataset.mobileReady === '1') return;
    nav.dataset.mobileReady = '1';

    const ICON_OPEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
    const ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

    const burger = document.createElement('button');
    burger.className = 'topnav__burger';
    burger.setAttribute('aria-label', 'Toggle menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = ICON_OPEN;
    inner.appendChild(burger);

    const linksEl = nav.querySelector('.topnav__links');
    const ctaEl   = nav.querySelector('.topnav__cta');
    const drawer  = document.createElement('div');
    drawer.className = 'topnav__mobile';
    const frag = [];
    if (linksEl) linksEl.querySelectorAll('a').forEach(a => frag.push(a.outerHTML));
    if (ctaEl)   ctaEl.querySelectorAll('a').forEach(a => frag.push(a.outerHTML));
    drawer.innerHTML = frag.join('');
    nav.appendChild(drawer);

    const close = () => { drawer.classList.remove('is-open'); burger.setAttribute('aria-expanded','false'); burger.innerHTML = ICON_OPEN; document.body.style.overflow = ''; };
    const show  = () => { drawer.classList.add('is-open');    burger.setAttribute('aria-expanded','true');  burger.innerHTML = ICON_CLOSE; document.body.style.overflow = 'hidden'; };
    burger.addEventListener('click', () => drawer.classList.contains('is-open') ? close() : show());
    drawer.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) close(); });
  }

  window.Prosight = Object.assign(window.Prosight || {}, { openContact: () => open('contact'), openDemo: () => open('demo') });
})();
