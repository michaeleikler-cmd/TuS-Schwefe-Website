/* ================================================================
   TuS Schwefe — Zentrales JavaScript
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // HAMBURGER-MENÜ (Mobile)
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('open');
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    // DROPDOWN: Erster Klick öffnet das Menü, zweiter Klick navigiert
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        const trigger = dropdown.querySelector(':scope > .nav-item');
        if (!trigger) return;

        trigger.addEventListener('click', (e) => {
            const isMobile = window.innerWidth <= 968;

            if (isMobile) {
                e.preventDefault();
                e.stopPropagation();
                document.querySelectorAll('.nav-dropdown').forEach(d => {
                    if (d !== dropdown) d.classList.remove('open');
                });
                dropdown.classList.toggle('open');
                return;
            }

            // Desktop: Wenn geschlossen, öffnen statt navigieren
            if (!dropdown.classList.contains('open')) {
                e.preventDefault();
                document.querySelectorAll('.nav-dropdown').forEach(d => {
                    if (d !== dropdown) d.classList.remove('open');
                });
                dropdown.classList.add('open');
            }
        });
    });

    // Sub-Dropdown (Fußball)
    document.querySelectorAll('.nav-subdropdown > a').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const isMobile = window.innerWidth <= 968;
            const parent = trigger.closest('.nav-subdropdown');

            if (isMobile) {
                e.preventDefault();
                e.stopPropagation();
                parent.classList.toggle('open');
                return;
            }

            if (!parent.classList.contains('open')) {
                e.preventDefault();
                parent.classList.add('open');
            }
        });
    });

    // Klick außerhalb schließt Dropdowns
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown') && !e.target.closest('.nav-subdropdown')) {
            document.querySelectorAll('.nav-dropdown.open, .nav-subdropdown.open').forEach(d => {
                d.classList.remove('open');
            });
        }
    });

    // ESC schließt Dropdowns
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.nav-dropdown.open, .nav-subdropdown.open').forEach(d => {
                d.classList.remove('open');
            });
        }
    });

    // EVENT-FILTER
    document.querySelectorAll('.event-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.event-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            document.querySelectorAll('.event-item').forEach(item => {
                item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
            });
        });
    });
});

function handleMembershipForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const interest = document.getElementById('interest').value;
    const message = document.getElementById('message').value;

    const subject = encodeURIComponent('Mitgliedsanfrage: ' + name);
    const body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'E-Mail: ' + email + '\n' +
        'Interesse: ' + interest + '\n\n' +
        'Nachricht:\n' + message
    );

    window.location.href = 'mailto:info@tus-schwefe.de?subject=' + subject + '&body=' + body;
}
