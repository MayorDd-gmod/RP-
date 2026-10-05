/* ============================================================
   РАЗЛОМ: МАРШ СПРАВЕДЛИВОСТИ — Общие скрипты
   ============================================================ */

(function() {
    'use strict';

    // ============ КНОПКА "НАВЕРХ" ============
    const backTop = document.createElement('button');
    backTop.className = 'back-top';
    backTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backTop.title = 'Наверх';
    backTop.setAttribute('aria-label', 'Наверх');
    document.body.appendChild(backTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backTop.classList.add('visible');
        else backTop.classList.remove('visible');
    });

    backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============ ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ ============
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 90;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ============ АКТИВНЫЙ ПУНКТ МЕНЮ ============
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav .nav-item').forEach(item => {
        const href = item.getAttribute('href') || '';
        if (href === currentPage) {
            item.classList.add('active');
        }
    });

    // ============ ОГЛАВЛЕНИЕ (авто-генерация) ============
    const tocContainer = document.getElementById('toc-auto');
    if (tocContainer) {
        const headings = document.querySelectorAll('.content > h2');
        if (headings.length > 0) {
            const ol = document.createElement('ol');
            headings.forEach((h, i) => {
                if (!h.id) h.id = 'section-' + i;
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#' + h.id;
                a.textContent = h.textContent.replace('§ ', '');
                li.appendChild(a);
                ol.appendChild(li);
            });
            tocContainer.appendChild(ol);
        } else {
            tocContainer.style.display = 'none';
        }
    }

    // ============ ПОИСК (заглушка) ============
    const searchBtn = document.querySelector('.nav-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert('Поиск в разработке.\nИспользуйте Ctrl+F для поиска по странице.');
        });
    }

})();
