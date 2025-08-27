document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("#menu a");
  const content = document.getElementById("content");
  const checkbox = document.getElementById("menuCheckbox");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("data-page");

      // Load page content
      fetch(page)
        .then(res => res.text())
        .then(data => {
          content.innerHTML = data;
          checkbox.checked = false; // close menu after click
        })
        .catch(err => {
          content.innerHTML = "<p>Error loading page.</p>";
        });
    });
  });
});
