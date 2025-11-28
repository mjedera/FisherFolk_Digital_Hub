// userDashboard.js - improved toggle to avoid horizontal scrollbar on collapse
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const sidebarCollapseBtn = document.getElementById('sidebarCollapse');
    const content = document.getElementById('content');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const navbar = document.querySelector('.navbar');
    const messageBox = document.getElementById('messageBox');

    const showMessage = (message, type = '') => {
        if (!messageBox) return;
        messageBox.textContent = message;
        messageBox.className = `message-box show ${type}`;
        setTimeout(() => messageBox.classList.remove('show'), 3000);
    };

    // Ensure no stray inline margin-left remains (cleanup)
    function cleanupInlineStyles() {
        if (content) content.style.removeProperty('margin-left');
    }

    // Keep overflow-x hidden while collapsed to prevent tiny scrollbars
    function setOverflowHidden(enabled) {
        if (enabled) {
            document.documentElement.style.overflowX = 'hidden';
            document.body.style.overflowX = 'hidden';
        } else {
            document.documentElement.style.overflowX = '';
            document.body.style.overflowX = '';
        }
    }

    function toggleDesktopCollapse() {
        if (!sidebar) return;
        const isCollapsed = sidebar.classList.toggle('collapsed');

        // Add a body-level class so CSS can handle content/navbar shifts
        document.body.classList.toggle('sidebar-collapsed', isCollapsed);

        // remove any inline margin-left set previously to avoid rounding issues
        cleanupInlineStyles();

        // force overflow hidden while collapsed to prevent horizontal scrollbar flashes
        setOverflowHidden(isCollapsed);

        // update navbar classes
        if (navbar) navbar.classList.toggle('navbar-collapsed', isCollapsed);
    }

    function openMobileSidebar() {
        if (!sidebar) return;
        sidebar.classList.add('mobile-open');
        if (sidebarOverlay) sidebarOverlay.classList.add('show');
        document.body.classList.add('no-scroll');
        setOverflowHidden(true); // prevent x-scroll while mobile menu open
    }
    function closeMobileSidebar() {
        if (!sidebar) return;
        sidebar.classList.remove('mobile-open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('show');
        document.body.classList.remove('no-scroll');
        setOverflowHidden(false);
    }

    if (sidebarCollapseBtn && sidebar) {
        sidebarCollapseBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // mobile: toggle open/close
                if (sidebar.classList.contains('mobile-open')) closeMobileSidebar();
                else openMobileSidebar();
            } else {
                // desktop: collapse/expand
                toggleDesktopCollapse();
            }
        });
    }

    if (sidebarOverlay && sidebar) {
        sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    // keep navbar state consistent on resize (and ensure mobile state cleared on desktop)
    function handleResize() {
        if (!navbar) return;
        if (window.innerWidth <= 768) {
            navbar.classList.remove('navbar-shifted', 'navbar-collapsed');
        } else {
            navbar.classList.add('navbar-shifted');
            // cleanup mobile state if user resized up
            if (sidebar && sidebar.classList.contains('mobile-open')) {
                closeMobileSidebar();
            }
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // On load remove inline styles that might have been added before
    cleanupInlineStyles();

    // --- Fragment loading logic (NEW) ---
    // Generic loader — fetches an HTML fragment from the server and injects into #content
    async function loadFragment(name, url, { replace = true } = {}) {
        if (!content) {
            console.warn(`Cannot load fragment "${name}" — #content not found.`);
            return;
        }

        try {
            // small UX hint while loading
            const loadingPlaceholder = `<div class="text-center p-4"><div class="spinner-border" role="status" aria-hidden="true"></div> <div class="mt-2">Loading ${name}...</div></div>`;
            if (replace) content.innerHTML = loadingPlaceholder;

            const res = await fetch(url, { credentials: 'same-origin' });
            if (!res.ok) throw new Error(`Failed to load fragment ${name} (${res.status})`);
            const html = await res.text();

            // Inject trusted server-side fragment
            content.innerHTML = html;
        } catch (err) {
            console.error(err);
            content.innerHTML = `<p class="text-danger text-center mt-4">Error loading ${name} content.</p>`;
            showMessage(`Unable to load ${name}`, 'error');
        }
    }

    // Automatically load the applicants fragment on dashboard load.
    // If you don't want auto-loading, remove this line or guard it (e.g., check URL).
    loadFragment('applicants', '/fragments/applicants');

    // Optional: If you want the fragment to load when clicking a sidebar link/button,
    // add data-fragment="applicants" to that element. Example:
    // <a href="#" data-fragment="applicants">Applicants</a>
    
    document.querySelectorAll('[data-fragment="applicants"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            // Close mobile sidebar if open (nice UX)
            if (sidebar && sidebar.classList.contains('mobile-open')) closeMobileSidebar();
            loadFragment('applicants', '/fragments/applicants');
        });
    });

    // optional dev hints
    if (!sidebar) console.warn('accounts.js: #sidebar not found in DOM.');
    if (!sidebarCollapseBtn) console.warn('accounts.js: #sidebarCollapse (button) not found in DOM.');
    if (!content) console.warn('accounts.js: #content not found in DOM.');
});
