document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const links = document.querySelectorAll('#sidebar a');

    // Function to toggle the sidebar's visibility
    window.toggleSidebar = function() {
        sidebar.classList.toggle('active');
    }

    // Function to load content from a file
    async function loadPage(pageName) {
        try {
            const response = await fetch(pageName);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            content.innerHTML = html;
        } catch (e) {
            content.innerHTML = `<h2>Error</h2><p>Could not load the page: ${e.message}</p>`;
            console.error(e);
        }
    }

    // Add click event listener to each navigation link
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const page = link.getAttribute('data-page');
            loadPage(page);
            sidebar.classList.remove('active'); // Hide sidebar after clicking a link
        });
    });

    // Load a default page on initial load (optional)
    // loadPage('about.html');
});
