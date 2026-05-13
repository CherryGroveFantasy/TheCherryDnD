document.addEventListener('DOMContentLoaded', function () {

  const toggle         = document.getElementById('themeToggle');
  const themeStatus    = document.getElementById('themeStatus');
  const themePanel     = document.getElementById('themePanel');
  const panelToggleBtn = document.getElementById('themePanelToggle');
  const panelBody      = document.getElementById('themePanelBody');
  const STORAGE_KEY     = 'site-theme';

  // ==============================================
  // Theme Logic
  // ==============================================

  function applyTheme(theme) {
    if (theme === 'silver-red') {
      document.documentElement.setAttribute('data-theme', 'silver-red');
      toggle.checked = true;
      themeStatus.textContent = 'Crimson & Silver';
    } else {
      document.documentElement.removeAttribute('data-theme');
      toggle.checked = false;
      themeStatus.textContent = 'Royal Blue & Gold';
    }
  }

  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'blue-gold';
  }

  applyTheme(getSavedTheme());

  toggle.addEventListener('change', function () {
    const newTheme = this.checked ? 'silver-red' : 'blue-gold';
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  });

  // ==============================================
  // Mobile: toggle panel
  // ==============================================
  if (panelToggleBtn) {
    panelToggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      themePanel.classList.toggle('active');
    });
  }

  document.addEventListener('click', function (e) {
    if (!themePanel.contains(e.target)) {
      themePanel.classList.remove('active');
    }
  });

  // ==============================================
  // Auto-hide panel (desktop only)
  // ==============================================
  let hideTimer;

  function hidePanel() {
    themePanel.classList.add('hidden');
  }

  function showPanel() {
    themePanel.classList.remove('hidden');
  }

  function resetAutoHide() {
    showPanel();
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hidePanel, 3000);
  }

  function updateAutoHide() {
    clearTimeout(hideTimer);
    if (window.innerWidth > 600) {
      showPanel();
      hideTimer = setTimeout(hidePanel, 3000);
      window.addEventListener('mousemove', resetAutoHide);
      window.addEventListener('scroll', resetAutoHide);
    } else {
      showPanel();
      themePanel.classList.remove('hidden');
      window.removeEventListener('mousemove', resetAutoHide);
      window.removeEventListener('scroll', resetAutoHide);
    }
  }

  themePanel.addEventListener('mouseenter', function () {
    clearTimeout(hideTimer);
    showPanel();
  });

  themePanel.addEventListener('mouseleave', function () {
    if (window.innerWidth > 600) {
      hideTimer = setTimeout(hidePanel, 3000);
    }
  });

  updateAutoHide();
  window.addEventListener('resize', updateAutoHide);

  // ==============================================
  // Mobile Hamburger Menu
  // ==============================================
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');

      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

});