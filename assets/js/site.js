/* ============================================================
   NVazen.dev — shared runtime: preferences, theme, language,
   background effects, laptop colours, reveal animations.
   ============================================================ */
(function () {
    'use strict';
    window.NV = window.NV || {};

    var STORAGE_KEY = 'nvazen_user_prefs';

    /* ---------- preferences ---------- */
    function loadPrefs() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved) return JSON.parse(saved);
        } catch (e) { /* ignore */ }
        return { theme: 'dark', lang: 'en', laptopColor: 'auto', bgEffect: 'full' };
    }
    function savePrefs(prefs) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); }
        catch (e) { /* ignore */ }
    }

    /* ---------- theme ---------- */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
        document.querySelectorAll('[data-theme-opt]').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-theme-opt') === (theme === 'light' ? 'light' : 'dark'));
        });
    }

    /* ---------- language ---------- */
    function t(lang, key) {
        var dict = (window.NV.translations && window.NV.translations[lang]) || {};
        if (dict[key] !== undefined) return dict[key];
        var en = (window.NV.translations && window.NV.translations.en) || {};
        return en[key] !== undefined ? en[key] : '';
    }

    function applyLang(lang) {
        if (!window.NV.translations) return;
        var el = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < el.length; i++) {
            var key = el[i].getAttribute('data-i18n');
            var text = t(lang, key);
            if (text !== '') el[i].textContent = text;
        }
        document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : lang);
        document.querySelectorAll('[data-lang-opt]').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang-opt') === lang);
        });
        window.NV.lang = lang;
        if (typeof window.NV.onLangChange === 'function') window.NV.onLangChange(lang);
    }

    /* ---------- background effects ---------- */
    function setBgEffect(effect) {
        document.body.setAttribute('data-bg-effect', effect || 'full');
        document.querySelectorAll('[data-bg-opt]').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-bg-opt') === (effect || 'full'));
        });
    }

    /* ---------- laptop colour presets ---------- */
    var laptopPresets = {
        light: {
            shell: '#e8edf2', shellDark: '#d4dae0', shellEdge: '#bcc4cc',
            hinge: '#a8b2bb', bezel: '#e8edf2', base: '#dfe5eb',
            baseDark: '#c8cfd6', trackpad: '#c8cfd6',
            shadow: '0 40px 80px -20px rgba(0,0,0,0.65), 0 20px 40px -12px rgba(0,0,0,0.5)',
            glow: 'rgba(0, 120, 212, 0.18)', reflection: 'rgba(255,255,255,0.5)'
        },
        dark: {
            shell: '#2d333b', shellDark: '#22272e', shellEdge: '#1c2128',
            hinge: '#151a1f', bezel: '#2d333b', base: '#22272e',
            baseDark: '#1c2128', trackpad: '#1c2128',
            shadow: '0 40px 80px -20px rgba(0,0,0,0.7), 0 20px 40px -12px rgba(0,0,0,0.55)',
            glow: 'rgba(0, 120, 212, 0.12)', reflection: 'rgba(255,255,255,0.08)'
        },
        silver: {
            shell: '#d6dde4', shellDark: '#c2cad2', shellEdge: '#aab4bd',
            hinge: '#98a3ad', bezel: '#d6dde4', base: '#c8d0d8',
            baseDark: '#b4bdc6', trackpad: '#b4bdc6',
            shadow: '0 40px 80px -20px rgba(0,0,0,0.55), 0 20px 40px -12px rgba(0,0,0,0.4)',
            glow: 'rgba(150, 180, 220, 0.18)', reflection: 'rgba(255,255,255,0.55)'
        },
        spacegray: {
            shell: '#4a5158', shellDark: '#3c434a', shellEdge: '#2e343a',
            hinge: '#23282d', bezel: '#4a5158', base: '#3c434a',
            baseDark: '#2e343a', trackpad: '#2e343a',
            shadow: '0 40px 80px -20px rgba(0,0,0,0.7), 0 20px 40px -12px rgba(0,0,0,0.55)',
            glow: 'rgba(120, 150, 200, 0.14)', reflection: 'rgba(255,255,255,0.14)'
        }
    };
    var laptopProps = ['--laptop-shell', '--laptop-shell-dark', '--laptop-shell-edge',
        '--laptop-hinge', '--laptop-screen-bezel', '--laptop-base',
        '--laptop-base-dark', '--laptop-trackpad', '--laptop-shadow',
        '--laptop-glow', '--laptop-reflection'];

    function applyLaptopColor(setting) {
        var root = document.documentElement;
        if (setting === 'auto' || !laptopPresets[setting]) {
            laptopProps.forEach(function (p) { root.style.removeProperty(p); });
        } else {
            var c = laptopPresets[setting];
            root.style.setProperty('--laptop-shell', c.shell);
            root.style.setProperty('--laptop-shell-dark', c.shellDark);
            root.style.setProperty('--laptop-shell-edge', c.shellEdge);
            root.style.setProperty('--laptop-hinge', c.hinge);
            root.style.setProperty('--laptop-screen-bezel', c.bezel);
            root.style.setProperty('--laptop-base', c.base);
            root.style.setProperty('--laptop-base-dark', c.baseDark);
            root.style.setProperty('--laptop-trackpad', c.trackpad);
            root.style.setProperty('--laptop-shadow', c.shadow);
            root.style.setProperty('--laptop-glow', c.glow);
            root.style.setProperty('--laptop-reflection', c.reflection);
        }
        document.querySelectorAll('[data-laptop-opt]').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-laptop-opt') === setting);
        });
    }

    /* ---------- settings menu ---------- */
    function initSettingsMenu() {
        var btn = document.getElementById('settingsBtn');
        var menu = document.getElementById('settingsMenu');
        if (!btn || !menu) return;
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            menu.classList.toggle('open');
        });
        document.addEventListener('click', function (e) {
            if (!menu.contains(e.target) && e.target !== btn) menu.classList.remove('open');
        });
    }

    /* ---------- reveal on scroll ---------- */
    function initReveal() {
        var els = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.classList.add('visible'); });
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        els.forEach(function (el) { observer.observe(el); });
    }

    /* ---------- active nav link ---------- */
    function markActiveNav() {
        var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        document.querySelectorAll('.nav-link[data-nav]').forEach(function (link) {
            var target = (link.getAttribute('data-nav') || '').toLowerCase();
            link.classList.toggle('active', target === page);
        });
    }

    /* ---------- sidebar expand/collapse ---------- */
    function applySidebar(collapsed) {
        var app = document.getElementById('app');
        if (!app) return;
        app.classList.toggle('side-collapsed', !!collapsed);
    }
    function initSidebar() {
        var app = document.getElementById('app');
        var toggle = document.getElementById('sidebarToggle');
        if (!app || !toggle) return;
        toggle.addEventListener('click', function () {
            var collapsed = !app.classList.contains('side-collapsed');
            applySidebar(collapsed);
            var prefs = window.NV.prefs || loadPrefs();
            prefs.sidebarCollapsed = collapsed;
            savePrefs(prefs);
        });
    }

    /* ---------- expose ---------- */
    window.NV.loadPrefs = loadPrefs;
    window.NV.savePrefs = savePrefs;
    window.NV.applyTheme = applyTheme;
    window.NV.applyLang = applyLang;
    window.NV.t = t;
    window.NV.setBgEffect = setBgEffect;
    window.NV.applyLaptopColor = applyLaptopColor;
    window.NV.laptopPresets = laptopPresets;

    document.addEventListener('DOMContentLoaded', function () {
        var prefs = loadPrefs();
        applyTheme(prefs.theme);
        applyLang(prefs.lang);
        setBgEffect(prefs.bgEffect);
        applyLaptopColor(prefs.laptopColor);
        applySidebar(prefs.sidebarCollapsed);
        initSettingsMenu();
        initSidebar();
        initReveal();
        markActiveNav();
        window.NV.prefs = prefs;

        /* option buttons (shared header controls) */
        document.querySelectorAll('[data-lang-opt]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                prefs.lang = btn.getAttribute('data-lang-opt');
                applyLang(prefs.lang);
                savePrefs(prefs);
            });
        });
        document.querySelectorAll('[data-theme-opt]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                prefs.theme = btn.getAttribute('data-theme-opt');
                applyTheme(prefs.theme);
                savePrefs(prefs);
            });
        });
        document.querySelectorAll('[data-bg-opt]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                prefs.bgEffect = btn.getAttribute('data-bg-opt');
                setBgEffect(prefs.bgEffect);
                savePrefs(prefs);
            });
        });
        document.querySelectorAll('[data-laptop-opt]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                prefs.laptopColor = btn.getAttribute('data-laptop-opt');
                applyLaptopColor(prefs.laptopColor);
                savePrefs(prefs);
            });
        });
    });
})();
