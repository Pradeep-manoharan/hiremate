document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic - Default is Light, toggle enables Dark
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const iconContainer = toggleBtn; // We will swap innerHTML or just handle SVG via CSS/JS update if needed, but for now simple attribute toggle.

    // Check local storage. If 'dark', enable dark mode.
    const currentTheme = localStorage.getItem('hiremate-theme');
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        updateIcon('dark');
    } else {
        updateIcon('light');
    }

    toggleBtn.addEventListener('click', () => {
        // If currently dark, switch to light (default)
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('hiremate-theme', 'light');
            updateIcon('light');
        } else {
            // Switch to Dark
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('hiremate-theme', 'dark');
            updateIcon('dark');
        }
    });

    function updateIcon(theme) {
        // Optional: Update SVG based on theme. 
        // Light Mode -> Show Moon (click to go dark)
        // Dark Mode -> Show Sun (click to go light)

        const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

        const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

        if (theme === 'light') {
            toggleBtn.innerHTML = moonIcon; // Show Moon when in Light mode
        } else {
            toggleBtn.innerHTML = sunIcon; // Show Sun when in Dark mode
        }
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
