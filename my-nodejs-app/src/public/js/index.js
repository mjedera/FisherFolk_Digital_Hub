document.addEventListener('DOMContentLoaded', async function () {
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

    // Sidebar toggle
    sidebarCollapseBtn?.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('mobile-open');
            sidebarOverlay?.classList.toggle('show');
            document.body.classList.toggle('no-scroll');
        } else {
            sidebar.classList.toggle('collapsed');
            const collapsedWidth = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-collapsed-width') || '80px';
            const expandedWidth = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-expanded-width') || '250px';
            content.style.marginLeft = sidebar.classList.contains('collapsed') ? collapsedWidth.trim() : expandedWidth.trim();
            navbar?.classList.toggle('navbar-collapsed', sidebar.classList.contains('collapsed'));
        }
    });

    sidebarOverlay?.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        sidebarOverlay.classList.remove('show');
        document.body.classList.remove('no-scroll');
    });

    const handleResize = () => {
        if (!navbar) return;
        if (window.innerWidth <= 768) navbar.classList.remove('navbar-shifted', 'navbar-collapsed');
        else navbar.classList.add('navbar-shifted');
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // -------------------------------
    // Dynamic menu navigation
    // -------------------------------
    const container = document.getElementById('applicantTableContainer');
    const navbarTitle = document.querySelector('.navbar .fw-bold');

    const menuMap = {
        getDashboard: { title: 'Dashboard', action: () => container.innerHTML = '' },
        getApplicants: {
            title: 'Applicants',
            action: async () => {
                const response = await fetch('/partials/applicantTable.html');
                const applicantHtml = await response.text();
                container.innerHTML = applicantHtml;
                if (window.initApplicantTable) window.initApplicantTable();
            }
        },
        getHandbook: { title: 'Handbook', action: () => container.innerHTML = '' },
        getTags: { title: 'Dashboard', action: () => { container.innerHTML = ''; window.location.href='/dashboard'; } }
    };

    Object.keys(menuMap).forEach(id => {
        const menuItem = document.getElementById(id);
        if (menuItem) menuItem.addEventListener('click', () => {
            const menu = menuMap[id];
            menu.action();
            if(navbarTitle) navbarTitle.textContent = menu.title;
        });
    });
});
