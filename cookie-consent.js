/**
 * Prosight Cookie Consent
 * DPDP Act 2023 compliant — requires explicit opt-in before any non-essential data processing
 */
(function () {
  const CONSENT_KEY = 'ps_cookie_consent';
  const CONSENT_VERSION = '1'; // bump this to re-ask after policy changes

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
  }

  function setConsent(accepted) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: CONSENT_VERSION, accepted, ts: Date.now() }));
  }

  function dismiss(accepted) {
    setConsent(accepted);
    const banner = document.getElementById('ps-cookie-banner');
    if (banner) { banner.style.transform = 'translateY(120%)'; banner.style.opacity = '0'; setTimeout(() => banner.remove(), 400); }
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #ps-cookie-banner {
        position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
        z-index: 9999; width: calc(100% - 48px); max-width: 720px;
        background: #0B1629; color: #FAFAFA;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px; padding: 20px 24px;
        display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
        box-shadow: 0 24px 64px rgba(0,0,0,0.4);
        transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
        font-family: 'Sora', system-ui, sans-serif;
      }
      #ps-cookie-banner .ps-cc-text {
        flex: 1; min-width: 240px; font-size: 13px; line-height: 1.6;
        color: rgba(255,255,255,0.65); font-weight: 300;
      }
      #ps-cookie-banner .ps-cc-text strong {
        display: block; color: #FAFAFA; font-weight: 600; margin-bottom: 4px; font-size: 14px;
      }
      #ps-cookie-banner .ps-cc-text a {
        color: #00C9A7; text-decoration: none; font-weight: 400;
      }
      #ps-cookie-banner .ps-cc-text a:hover { text-decoration: underline; }
      #ps-cookie-banner .ps-cc-actions {
        display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap;
      }
      #ps-cookie-banner .ps-cc-accept {
        background: #0066FF; color: #fff; border: none;
        padding: 10px 20px; border-radius: 6px; font-size: 13px;
        font-weight: 600; cursor: pointer; font-family: inherit;
        transition: background 0.15s;
      }
      #ps-cookie-banner .ps-cc-accept:hover { background: #0052CC; }
      #ps-cookie-banner .ps-cc-reject {
        background: transparent; color: rgba(255,255,255,0.5);
        border: 1px solid rgba(255,255,255,0.15);
        padding: 10px 20px; border-radius: 6px; font-size: 13px;
        font-weight: 400; cursor: pointer; font-family: inherit;
        transition: all 0.15s;
      }
      #ps-cookie-banner .ps-cc-reject:hover { color: #FAFAFA; border-color: rgba(255,255,255,0.4); }
      @media (max-width: 520px) {
        #ps-cookie-banner { bottom: 12px; left: 12px; right: 12px; width: auto; transform: none; padding: 18px; }
        #ps-cookie-banner .ps-cc-actions { width: 100%; }
        #ps-cookie-banner .ps-cc-accept, #ps-cookie-banner .ps-cc-reject { flex: 1; text-align: center; }
      }
    `;
    document.head.appendChild(style);
  }

  function showBanner() {
    injectStyles();
    const banner = document.createElement('div');
    banner.id = 'ps-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div class="ps-cc-text">
        <strong>🍪 We use cookies</strong>
        This website stores data such as cookies to enable site functionality. We do not use advertising or third-party tracking cookies. By clicking Accept, you consent to data processing as described in our <a href="/privacy-policy.html">Privacy Policy</a> — in compliance with the DPDP Act 2023.
      </div>
      <div class="ps-cc-actions">
        <button class="ps-cc-accept" id="ps-cc-accept-btn">Accept</button>
        <button class="ps-cc-reject" id="ps-cc-reject-btn">Decline</button>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('ps-cc-accept-btn').addEventListener('click', () => dismiss(true));
    document.getElementById('ps-cc-reject-btn').addEventListener('click', () => dismiss(false));
  }

  // Only show if no consent stored (or version changed)
  function init() {
    const existing = getConsent();
    if (existing && existing.v === CONSENT_VERSION) return; // already decided

    // Small delay so page paints first
    setTimeout(showBanner, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
