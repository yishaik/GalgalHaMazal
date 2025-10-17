(() => {
  // Theme toggle with localStorage
  const KEY = 'theme';
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  function applyTheme(v){
    const html = document.documentElement;
    if (v === 'dark' || (v === 'auto' && prefersDark)) html.classList.add('dark');
    else html.classList.remove('dark');
  }
  function getTheme(){ return localStorage.getItem(KEY) || 'auto'; }
  function setTheme(v){ localStorage.setItem(KEY, v); applyTheme(v); }
  applyTheme(getTheme());

  function enhanceHeader(){
    const header = document.querySelector('header .container');
    const nav = document.getElementById('siteNav');
    const toggle = document.getElementById('navToggle');
    if (toggle && nav) toggle.addEventListener('click', ()=> nav.classList.toggle('hidden'));

    if (header){
      // Add theme toggle button to header
      let rightBox = header.querySelector('.site-actions');
      if (!rightBox){
        rightBox = document.createElement('div');
        rightBox.className = 'site-actions hidden md:flex items-center gap-2';
        header.appendChild(rightBox);
      }
      const btn = document.createElement('button');
      btn.id = 'themeToggle';
      btn.className = 'btn text-sm';
      function label(){
        const t = getTheme();
        return t==='dark' ? 'מצב כהה' : t==='light' ? 'מצב בהיר' : 'אוטומטי';
      }
      btn.innerHTML = `<span>${label()}</span>`;
      btn.addEventListener('click', ()=>{
        const cur = getTheme();
        const next = cur==='auto' ? 'dark' : cur==='dark' ? 'light' : 'auto';
        setTheme(next); btn.innerHTML = `<span>${(next==='dark' ? 'מצב כהה' : next==='light' ? 'מצב בהיר' : 'אוטומטי')}</span>`;
      });
      rightBox.appendChild(btn);
    }
  }

  function enhanceFooter(){
    const footer = document.querySelector('footer .container');
    if (footer){
      const span = document.createElement('div');
      span.className = 'text-xs';
      const year = new Date().getFullYear();
      span.innerHTML = `נבנה באמצעות אתר סטטי · ${year} · <a class="underline" href="https://github.com/yishaik/GalgalHaMazal" target="_blank" rel="noopener">קוד מקור</a>`;
      footer.appendChild(span);
    }
  }

  // Service Worker registration
  function registerSW(){
    if ('serviceWorker' in navigator){
      navigator.serviceWorker.register('sw.js').catch(()=>{});
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    enhanceHeader();
    enhanceFooter();
    registerSW();
  });
})();
