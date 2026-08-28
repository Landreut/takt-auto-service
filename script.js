(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeLabel = document.querySelector('.theme-toggle-label');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  const applyTheme = (theme) => {
    const isLight = theme === 'light';
    root.dataset.theme = isLight ? 'light' : 'dark';
    themeToggle?.setAttribute('aria-pressed', String(isLight));
    themeToggle?.setAttribute('aria-label', isLight ? 'Переключить на тёмную тему' : 'Переключить на светлую тему');
    if (themeLabel) themeLabel.textContent = isLight ? 'Тёмная тема' : 'Светлая тема';
    themeMeta?.setAttribute('content', isLight ? '#f2f0eb' : '#111516');
  };

  applyTheme(localStorage.getItem('takt-theme') || 'dark');
  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('takt-theme', nextTheme);
  });

  const track = document.querySelector('[data-reviews-track]');
  const cards = track ? [...track.querySelectorAll('.review-card')] : [];
  let reviewIndex = 0;
  let pointerStartX = null;

  const renderReviews = () => {
    cards.forEach((card, index) => {
      const offset = (index - reviewIndex + cards.length) % cards.length;
      card.dataset.position = String(offset);
      card.setAttribute('aria-hidden', String(offset !== 0));
    });
  };

  const moveReviews = (direction) => {
    if (!cards.length) return;
    reviewIndex = (reviewIndex + direction + cards.length) % cards.length;
    renderReviews();
  };

  renderReviews();
  document.querySelector('[data-reviews-prev]')?.addEventListener('click', () => moveReviews(-1));
  document.querySelector('[data-reviews-next]')?.addEventListener('click', () => moveReviews(1));
  track?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') moveReviews(-1);
    if (event.key === 'ArrowRight') moveReviews(1);
  });
  track?.addEventListener('pointerdown', (event) => {
    pointerStartX = event.clientX;
    track.setPointerCapture?.(event.pointerId);
  });
  track?.addEventListener('pointerup', (event) => {
    if (pointerStartX === null) return;
    const distance = event.clientX - pointerStartX;
    if (Math.abs(distance) > 45) moveReviews(distance < 0 ? 1 : -1);
    pointerStartX = null;
  });
  track?.addEventListener('pointercancel', () => { pointerStartX = null; });

  const bookingForm = document.querySelector('[data-booking-form]');
  const formSuccess = document.querySelector('[data-form-success]');
  bookingForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    bookingForm.reset();
    if (formSuccess) formSuccess.hidden = false;
  });
})();
