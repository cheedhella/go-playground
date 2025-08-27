function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

// Define simple page content
const routes = {
  home: `<h1>Home Page</h1><p>Welcome to the homepage!</p>`,
  page1: `<h1>Page 1</h1><p>This is Page 1 content.</p>`,
  page2: `<h1>Page 2</h1><p>This is Page 2 content.</p>`
};

function loadPage() {
  const hash = window.location.hash.substring(1) || "home";
  document.getElementById("app").innerHTML = routes[hash] || `<h1>404</h1><p>Page not found.</p>`;
}

// Initial load
window.addEventListener("load", loadPage);
// Handle navigation
window.addEventListener("hashchange", loadPage);
