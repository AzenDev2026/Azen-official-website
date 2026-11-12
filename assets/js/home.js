/* ============================================================
   NVazen.dev — home page behaviour: title animation, screenshot
   carousel, news swap, smooth scrolling, soft refresh.
   ============================================================ */
(function () {
    'use strict';

    var SCREEN_DURATION = 5000;
    var NEWS_DURATION = 6000;
    var currentScreen = 0;
    var screenTimer = null;
    var currentNews = 0;
    var newsTimer = null;

    /* ---------- title letters ---------- */
    function prepareTitleLetters() {
        var title = document.getElementById('nvazenTitle');
        if (!title) return;
        var text = title.textContent;
        title.innerHTML = '';
        for (var i = 0; i < text.length; i++) {
            var span = document.createElement('span');
            span.className = 'letter';
            span.textContent = text[i];
            title.appendChild(span);
        }
    }
    function playTitleAnimation() {
        var title = document.getElementById('nvazenTitle');
        if (!title) return;
        var letters = title.querySelectorAll('.letter');
        title.classList.remove('animate');
        letters.forEach(function (l) { l.style.animation = 'none'; l.style.transform = ''; });
        void title.offsetWidth;
        title.classList.add('animate');
        letters.forEach(function (letter, i) {
            letter.style.animationDelay = (i * 0.08) + 's';
            letter.style.animation = 'letterBounce 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both';
        });
        setTimeout(function () {
            title.classList.remove('animate');
            letters.forEach(function (l) { l.style.animation = ''; l.style.animationDelay = ''; });
        }, 2100);
    }

    /* ---------- screenshot carousel ---------- */
    function goToScreen(index) {
        var carousel = document.getElementById('screenCarousel');
        var slides = carousel ? carousel.querySelectorAll('.screen-slide') : [];
        var dots = document.querySelectorAll('.screen-dot');
        if (!slides.length) return;
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentScreen = index;
        carousel.style.transform = 'translateX(-' + (currentScreen * 100) + '%)';
        dots.forEach(function (dot, i) { dot.classList.toggle('active', i === currentScreen); });
    }
    function nextScreen() { goToScreen(currentScreen + 1); }
    function startScreenAutoPlay() {
        if (screenTimer) clearInterval(screenTimer);
        screenTimer = setInterval(nextScreen, SCREEN_DURATION);
    }
    function stopScreenAutoPlay() {
        if (screenTimer) { clearInterval(screenTimer); screenTimer = null; }
    }

    /* ---------- news swap ---------- */
    function buildNews() {
        var lang = window.NV.lang || 'en';
        var dict = (window.NV.translations && window.NV.translations[lang]) || {};
        var items = dict.news_items ||
            (window.NV.translations && window.NV.translations.en && window.NV.translations.en.news_items) || [];
        var container = document.getElementById('newsSwapContainer');
        var dotsBox = document.getElementById('newsDots');
        if (!container || !dotsBox) return;
        var html = '';
        items.forEach(function (item, idx) {
            var desc = item.link
                ? item.desc + ' <a href="' + item.link + '" target="_blank" rel="noopener">→ ' + window.NV.t(lang, 'download_text') + '</a>'
                : item.desc;
            html += '<div class="news-swap-item' + (idx === 0 ? ' active' : '') + '" data-news-index="' + idx + '">' +
                '<span class="news-tag">' + (item.tag || window.NV.t(lang, 'news_tag')) + '</span>' +
                '<h3>' + item.title + '</h3><p>' + desc + '</p></div>';
        });
        container.innerHTML = html;
        var dotsHtml = '';
        items.forEach(function (_, idx) {
            dotsHtml += '<button class="news-dot' + (idx === 0 ? ' active' : '') + '" data-dot-index="' + idx + '" aria-label="News ' + (idx + 1) + '"></button>';
        });
        dotsBox.innerHTML = dotsHtml;
        currentNews = 0;
        dotsBox.querySelectorAll('.news-dot').forEach(function (dot) {
            dot.addEventListener('click', function () {
                var idx = parseInt(dot.getAttribute('data-dot-index'), 10);
                if (!isNaN(idx)) { stopNewsAutoPlay(); showNews(idx); startNewsAutoPlay(); }
            });
        });
        startNewsAutoPlay();
    }
    function showNews(index) {
        var items = document.querySelectorAll('.news-swap-item');
        var dots = document.querySelectorAll('.news-dot');
        if (!items.length) return;
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;
        currentNews = index;
        items.forEach(function (item, i) { item.classList.toggle('active', i === index); });
        dots.forEach(function (dot, i) { dot.classList.toggle('active', i === index); });
    }
    function nextNews() { showNews(currentNews + 1); }
    function startNewsAutoPlay() {
        stopNewsAutoPlay();
        newsTimer = setInterval(nextNews, NEWS_DURATION);
    }
    function stopNewsAutoPlay() {
        if (newsTimer) { clearInterval(newsTimer); newsTimer = null; }
    }

    /* ---------- smooth anchor scrolling ---------- */
    function initAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                var target = document.querySelector(link.getAttribute('href'));
                if (!target) return;
                e.preventDefault();
                var header = document.querySelector('header');
                var offset = header ? header.offsetHeight + 16 : 16;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            });
        });
    }

    /* ---------- soft refresh when scrolling back up ---------- */
    function initSoftRefresh() {
        var hero = document.getElementById('heroCarousel');
        if (!hero) return;
        var sections = document.querySelectorAll(
            '.alrm-section, .news-section, .features-section, .download-section, .comment-section, .requirements-section, footer');
        var seen = false;
        var pending = false;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { seen = true; pending = true; }
                else { seen = false; }
            });
        }, { threshold: 0.35 });
        observer.observe(hero);
        window.addEventListener('scroll', function () {
            if (!pending) return;
            var rect = hero.getBoundingClientRect();
            if (rect.bottom < 120) {
                pending = false;
                sections.forEach(function (sec, index) {
                    sec.classList.remove('soft-refresh');
                    void sec.offsetWidth;
                    setTimeout(function () { sec.classList.add('soft-refresh'); }, index * 80);
                });
                setTimeout(function () {
                    sections.forEach(function (sec) { sec.classList.remove('soft-refresh'); });
                }, 2000);
            }
        }, { passive: true });
    }

    /* ---------- init ---------- */
    function init() {
        var title = document.getElementById('nvazenTitle');
        if (title) {
            prepareTitleLetters();
            title.addEventListener('click', playTitleAnimation);
        }
        goToScreen(0);
        startScreenAutoPlay();
        var laptopScreen = document.querySelector('.laptop-screen');
        if (laptopScreen) {
            laptopScreen.addEventListener('mouseenter', stopScreenAutoPlay);
            laptopScreen.addEventListener('mouseleave', startScreenAutoPlay);
        }
        document.querySelectorAll('.screen-dot').forEach(function (dot) {
            dot.addEventListener('click', function () {
                var idx = parseInt(dot.getAttribute('data-screen-index'), 10);
                if (!isNaN(idx)) { stopScreenAutoPlay(); goToScreen(idx); startScreenAutoPlay(); }
            });
        });
        buildNews();
        initAnchors();
        initSoftRefresh();
        var scrollHint = document.getElementById('scrollHint');
        if (scrollHint) {
            scrollHint.addEventListener('click', function () {
                var target = document.getElementById('alrm');
                if (target) {
                    var header = document.querySelector('header');
                    var offset = header ? header.offsetHeight + 16 : 16;
                    window.scrollTo({
                        top: target.getBoundingClientRect().top + window.pageYOffset - offset,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    if (window.NV && window.NV.onLangChange) {
        var prev = window.NV.onLangChange;
        window.NV.onLangChange = function (lang) {
            prev(lang);
            buildNews();
        };
    } else if (window.NV) {
        window.NV.onLangChange = function () { buildNews(); };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
