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
  const scrollReviews = (direction) => {
    const distance = cards[0]?.getBoundingClientRect().width || 320;
    track?.scrollBy({ left: direction * (distance + 18), behavior: 'smooth' });
  };

  document.querySelector('[data-reviews-prev]')?.addEventListener('click', () => scrollReviews(-1));
  document.querySelector('[data-reviews-next]')?.addEventListener('click', () => scrollReviews(1));
  track?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') scrollReviews(-1);
    if (event.key === 'ArrowRight') scrollReviews(1);
  });
})();
