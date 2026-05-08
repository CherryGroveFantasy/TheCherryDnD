(function() {
    'use strict';

    const triggers = document.querySelectorAll('.dropdown-trigger');
    const menus = document.querySelectorAll('.dropdown-menu');

    // Toggle a specific dropdown
    function toggleMenu(trigger) {
        const targetId = trigger.getAttribute('data-menu');
        const menu = document.getElementById('dropdown-' + targetId);
        if (!menu) return;

        const isActive = trigger.classList.contains('active');

        // Close all menus and deactivate all triggers
        closeAllMenus();

        // If the clicked menu wasn't already open, open it
        if (!isActive) {
            trigger.classList.add('active');
            menu.classList.add('show');
        }
    }

    function closeAllMenus() {
        triggers.forEach(t => t.classList.remove('active'));
        menus.forEach(m => m.classList.remove('show'));
    }

    // Click event on triggers
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            toggleMenu(this);
        });
    });

    // Close menus when clicking outside
    document.addEventListener('click', function() {
        closeAllMenus();
    });

    // Prevent clicking inside a menu from closing it
    menus.forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Optional: keyboard accessibility
    triggers.forEach(trigger => {
        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu(this);
            }
        });
    });
})();
