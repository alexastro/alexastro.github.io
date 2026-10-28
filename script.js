(() => {
  const root = document.documentElement;
  const languageButtons = [...document.querySelectorAll('[data-set-lang]')];
  const themeButton = document.querySelector('.theme-toggle');
  const title = document.querySelector('title');
  const description = document.querySelector('meta[name="description"]');
  const socialTitle = document.querySelector('meta[property="og:title"]');
  const socialDescription = document.querySelector('meta[property="og:description"]');
  let currentLanguage = 'en';

  const updateThemeLabel = () => {
    if (!themeButton) return;
    const languageKey = currentLanguage[0].toUpperCase() + currentLanguage.slice(1);
    const targetTheme = root.dataset.theme === 'dark' ? 'Dark' : '';
    const label = themeButton.dataset[`label${languageKey}${targetTheme}`];
    themeButton.setAttribute('aria-label', label);
    themeButton.title = label;
  };

  const setLanguage = (language) => {
    currentLanguage = language;
    document.querySelectorAll('[data-en][data-pt]').forEach((element) => {
      element.textContent = element.dataset[language];
    });
    const languageKey = language === 'en' ? 'En' : 'Pt';
    document.querySelectorAll('[data-aria-en][data-aria-pt]').forEach((element) => {
      element.setAttribute('aria-label', element.dataset[`aria${languageKey}`]);
    });
    document.querySelectorAll('[data-alt-en][data-alt-pt]').forEach((element) => {
      element.alt = element.dataset[`alt${languageKey}`];
    });
    root.lang = language;
    const pageTitle = language === 'pt' ? 'Alexandre Ribas Sousa — Engenheiro e Investigador' : 'Alexandre Ribas Sousa — Engineer & Researcher';
    if (title) title.textContent = pageTitle;
    if (socialTitle) socialTitle.content = pageTitle;
    if (description) description.content = description.dataset[`meta${languageKey}`];
    if (socialDescription && description) socialDescription.content = description.content;
    languageButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.setLang === language));
    });
    updateThemeLabel();
    try { localStorage.setItem('alex-cv-language', language); } catch (_) { /* Storage may be unavailable in private browsing. */ }
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    updateThemeLabel();
    try { localStorage.setItem('alex-cv-theme', theme); } catch (_) { /* Storage may be unavailable in private browsing. */ }
  };

  let savedLanguage = 'en';
  let savedTheme = 'light';
  try {
    savedLanguage = localStorage.getItem('alex-cv-language') || savedLanguage;
    savedTheme = localStorage.getItem('alex-cv-theme') || savedTheme;
  } catch (_) { /* Use the page defaults when storage is unavailable. */ }

  languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.setLang)));
  themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  setLanguage(savedLanguage);
  setTheme(savedTheme);
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
