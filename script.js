
const routes = {
  '/': 'home.html',
  '/page1': 'page1.html',
  '/page2': 'page2.html',
  '/about': 'about.html'
};

const contentEl = document.getElementById('content');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');

// toggle sidebar on small screens
function setMenuOpen(open){
  if(open){
    sidebar.classList.add('open');
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded','true');
    sidebar.setAttribute('aria-hidden','false');
  }else{
    sidebar.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded','false');
    sidebar.setAttribute('aria-hidden','true');
  }
}

// start closed on small screens
setMenuOpen(false);

menuToggle.addEventListener('click', ()=> setMenuOpen(!sidebar.classList.contains('open')));

// handle navigation links (client-side routing)
document.addEventListener('click', e=>{
  const a = e.target.closest('a[data-link]');
  if(!a) return;
  e.preventDefault();
  const href = a.getAttribute('href');
  navigateTo(href);
  if(window.innerWidth < 900) setMenuOpen(false);
});

// push state navigation
async function navigateTo(path, replace=false){
  const file = routes[path] || routes['/'];
  try {
    const res = await fetch(file);
    if(!res.ok) throw new Error('Not found');
    const html = await res.text();
    contentEl.innerHTML = html;
    contentEl.querySelectorAll('a[target=_self]').forEach(a=> a.addEventListener('click', e=> e.preventDefault()));
    if(replace) history.replaceState({path}, '', path);
    else history.pushState({path}, '', path);
    contentEl.focus();
  } catch(err){
    contentEl.innerHTML = '<h1>404</h1><p>Page not found.</p>';
  }
}

// handle back/forward
window.addEventListener('popstate', e=>{
  const path = (e.state && e.state.path) || location.pathname;
  navigateTo(path, true);
});

// initial load based on location.pathname
navigateTo(location.pathname, true);

// enhance accessibility: close sidebar with Escape
window.addEventListener('keydown', e=>{
  if(e.key === 'Escape' && sidebar.classList.contains('open')){
    setMenuOpen(false);
    menuToggle.focus();
  }
});
