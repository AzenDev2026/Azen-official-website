/* ============================================================
   NVazen.dev — search portal: engine, suggestions, quick links,
   clock, weather (open-meteo), info widget, add-shortcut modal.
   ============================================================ */
(function () {
    'use strict';

    var I18N = {
        zh: {
            placeholder: '搜索你想找的内容…',
            searchBtn: '搜索 →',
            addQuick: '添加快捷方式',
            quickName: '名称',
            quickUrl: 'URL',
            namePlaceholder: '例如：GitHub',
            urlPlaceholder: 'https://github.com',
            cancel: '取消',
            confirm: '添加',
            emptyName: '请输入名称',
            emptyUrl: '请输入URL',
            invalidUrl: '请输入有效的URL',
            remove: '删除',
            weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            hotSearches: ['今日天气', '新闻头条', 'AI 最新进展', 'Python 教程', '附近美食', '汇率换算'],
            hot: '热门',
            weatherAllow: '允许定位',
            weatherDeny: '手动选择',
            weatherConsent: '是否允许定位以显示当地天气？',
            weatherManualPlaceholder: '输入城市名，如 Sydney',
            weatherManualConfirm: '确认',
            weatherLoading: '正在加载天气…',
            weatherError: '天气加载失败',
            weatherFeelsLike: '体感',
            weatherHumidity: '湿度',
            weatherWind: '风速',
            weatherPressure: '气压',
            weatherCloud: '云量',
            weatherPrecip: '降水',
            weatherDefaultNote: '默认位置：悉尼',
            weatherCodes: {
                0: '晴', 1: '大部晴朗', 2: '多云', 3: '阴', 45: '雾', 48: '雾凇',
                51: '小毛毛雨', 53: '毛毛雨', 55: '密集毛毛雨', 61: '小雨', 63: '中雨', 65: '大雨',
                71: '小雪', 73: '中雪', 75: '大雪', 80: '小阵雨', 81: '中阵雨', 82: '强阵雨',
                95: '雷暴', 96: '雷暴伴冰雹', 99: '雷暴伴强冰雹'
            },
            hide: '隐藏',
            show: '显示',
            enterSomething: '请输入搜索内容…'
        },
        en: {
            placeholder: 'Search anything…',
            searchBtn: 'Search →',
            addQuick: 'Add shortcut',
            quickName: 'Name',
            quickUrl: 'URL',
            namePlaceholder: 'e.g. GitHub',
            urlPlaceholder: 'https://github.com',
            cancel: 'Cancel',
            confirm: 'Add',
            emptyName: 'Please enter a name',
            emptyUrl: 'Please enter a URL',
            invalidUrl: 'Please enter a valid URL',
            remove: 'Remove',
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            hotSearches: ['Weather today', 'Latest news', 'AI breakthroughs', 'Python tutorial', 'Restaurants nearby', 'Currency converter'],
            hot: 'Hot',
            weatherAllow: 'Allow location',
            weatherDeny: 'Choose manually',
            weatherConsent: 'Allow location for local weather?',
            weatherManualPlaceholder: 'Enter city, e.g. Sydney',
            weatherManualConfirm: 'Go',
            weatherLoading: 'Loading weather…',
            weatherError: 'Weather unavailable',
            weatherFeelsLike: 'Feels',
            weatherHumidity: 'Humidity',
            weatherWind: 'Wind',
            weatherPressure: 'Pressure',
            weatherCloud: 'Cloud',
            weatherPrecip: 'Precip',
            weatherDefaultNote: 'Default: Sydney',
            weatherCodes: {
                0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Fog', 48: 'Rime fog',
                51: 'Light drizzle', 53: 'Drizzle', 55: 'Dense drizzle', 61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
                71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 80: 'Light showers', 81: 'Showers', 82: 'Violent showers',
                95: 'Thunderstorm', 96: 'Thunderstorm + hail', 99: 'Thunderstorm + heavy hail'
            },
            hide: 'Hide',
            show: 'Show',
            enterSomething: 'Please enter something…'
        }
    };

    function detectLang() {
        var lang = window.NV && window.NV.prefs ? window.NV.prefs.lang : 'en';
        return String(lang).indexOf('zh') === 0 ? 'zh' : 'en';
    }
    var currentLang = detectLang();
    function t() { return I18N[currentLang]; }

    /* ---------- dom ---------- */
    var searchForm = document.getElementById('searchForm');
    var searchInput = document.getElementById('searchInput');
    var suggestionsBox = document.getElementById('suggestionsBox');
    var quickLinksContainer = document.getElementById('quickLinksContainer');
    var modalOverlay = document.getElementById('modalOverlay');
    var quickNameInput = document.getElementById('quickName');
    var quickUrlInput = document.getElementById('quickUrl');
    var cancelAddBtn = document.getElementById('cancelAdd');
    var confirmAddBtn = document.getElementById('confirmAdd');
    var dateDisplay = document.getElementById('dateDisplay');
    var weekdayDisplay = document.getElementById('weekdayDisplay');
    var timeDisplay = document.getElementById('timeDisplay');
    var dateFormatBtn = document.getElementById('dateFormatBtn');
    var infoWidget = document.getElementById('infoWidget');
    var infoToggleBtn = document.getElementById('infoToggleBtn');
    var weatherDisplay = document.getElementById('weatherDisplay');
    var weatherConsentArea = document.getElementById('weatherConsentArea');

    /* ---------- i18n ---------- */
    function applyI18n() {
        var d = t();
        searchInput.placeholder = d.placeholder;
        document.querySelector('.search-btn').textContent = d.searchBtn;
        document.querySelector('.modal-box h3').textContent = d.addQuick;
        var labels = document.querySelectorAll('.modal-box label');
        if (labels[0]) labels[0].textContent = d.quickName;
        if (labels[1]) labels[1].textContent = d.quickUrl;
        quickNameInput.placeholder = d.namePlaceholder;
        quickUrlInput.placeholder = d.urlPlaceholder;
        cancelAddBtn.textContent = d.cancel;
        confirmAddBtn.textContent = d.confirm;
        renderSuggestions();
        renderQuickLinks();
        updateDateTime();
        setInfoVisible(!infoWidget.classList.contains('collapsed'));
        updateWeatherLabels();
    }

    /* ---------- search engines ---------- */
    var engines = {
        google: { action: 'https://www.google.com/search', param: 'q' },
        bing: { action: 'https://www.bing.com/search', param: 'q' },
        ddg: { action: 'https://duckduckgo.com/', param: 'q' }
    };
    var STORAGE_ENGINE = 'nvazen_search_engine';
    var currentEngine = 'google';
    function setEngine(key) {
        if (!engines[key]) return;
        currentEngine = key;
        searchForm.action = engines[key].action;
        searchInput.name = engines[key].param;
        try { localStorage.setItem(STORAGE_ENGINE, key); } catch (e) { /* ignore */ }
    }
    try {
        var savedEngine = localStorage.getItem(STORAGE_ENGINE);
        if (savedEngine && engines[savedEngine]) setEngine(savedEngine);
    } catch (e) { /* ignore */ }

    /* ---------- suggestions ---------- */
    function renderSuggestions() {
        var d = t();
        suggestionsBox.innerHTML = d.hotSearches.map(function (item, idx) {
            return '<div class="suggestion-item" data-query="' + item + '">' +
                '<span>🔍</span><span>' + item + '</span>' +
                (idx < 3 ? '<span class="hot-tag">' + d.hot + '</span>' : '') + '</div>';
        }).join('');
    }
    suggestionsBox.addEventListener('click', function (e) {
        var item = e.target.closest('.suggestion-item');
        if (!item) return;
        searchInput.value = item.getAttribute('data-query');
        searchForm.submit();
        hideSuggestions();
    });
    function showSuggestions() { suggestionsBox.classList.add('visible'); }
    function hideSuggestions() { suggestionsBox.classList.remove('visible'); }
    searchInput.addEventListener('focus', showSuggestions);
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.search-wrapper')) hideSuggestions();
    });
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { hideSuggestions(); searchInput.blur(); }
    });

    /* ---------- URL detection ---------- */
    function isUrl(str) {
        return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/i.test(str.trim());
    }
    function normalizeUrl(str) {
        var url = str.trim();
        if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
        return url;
    }
    searchForm.addEventListener('submit', function (e) {
        var value = searchInput.value.trim();
        var d = t();
        if (value === '') {
            e.preventDefault();
            searchInput.focus();
            searchInput.placeholder = d.enterSomething;
            setTimeout(function () { searchInput.placeholder = d.placeholder; }, 1500);
            return;
        }
        if (isUrl(value)) {
            e.preventDefault();
            window.open(normalizeUrl(value), '_blank');
            hideSuggestions();
            return;
        }
        hideSuggestions();
    });

    /* ---------- quick links ---------- */
    var STORAGE_QUICKLINKS = 'nvazen_search_quicklinks';
    var defaultQuickLinks = [
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'YouTube', url: 'https://youtube.com' },
        { name: 'Gmail', url: 'https://mail.google.com' },
        { name: 'Reddit', url: 'https://reddit.com' }
    ];
    var quickLinks = [];

    function getFaviconUrl(linkUrl) {
        try {
            var url = new URL(linkUrl);
            return 'https://www.google.com/s2/favicons?domain=' + url.hostname + '&sz=64';
        } catch (e) { return ''; }
    }
    function loadQuickLinks() {
        try {
            var saved = localStorage.getItem(STORAGE_QUICKLINKS);
            quickLinks = saved ? JSON.parse(saved) : defaultQuickLinks.slice();
        } catch (e) { quickLinks = defaultQuickLinks.slice(); }
    }
    function saveQuickLinks() {
        try { localStorage.setItem(STORAGE_QUICKLINKS, JSON.stringify(quickLinks)); } catch (e) { /* ignore */ }
    }
    function renderQuickLinks() {
        quickLinksContainer.innerHTML = '';
        quickLinks.forEach(function (link, index) {
            var a = document.createElement('a');
            a.className = 'quick-link';
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';

            var icon = document.createElement('img');
            icon.className = 'quick-icon';
            icon.src = getFaviconUrl(link.url);
            icon.alt = link.name;
            icon.loading = 'lazy';
            icon.onerror = function () {
                this.style.display = 'none';
                var fallback = document.createElement('span');
                fallback.className = 'quick-icon';
                fallback.textContent = link.name.charAt(0).toUpperCase();
                fallback.style.background = 'var(--accent)';
                fallback.style.color = '#fff';
                fallback.style.fontSize = '0.7rem';
                fallback.style.fontWeight = '700';
                this.parentNode.insertBefore(fallback, this);
            };

            var nameSpan = document.createElement('span');
            nameSpan.textContent = link.name;

            var removeBtn = document.createElement('button');
            removeBtn.className = 'remove-quick';
            removeBtn.setAttribute('data-index', index);
            removeBtn.title = t().remove;
            removeBtn.textContent = '×';

            a.appendChild(icon);
            a.appendChild(nameSpan);
            a.appendChild(removeBtn);
            quickLinksContainer.appendChild(a);
        });

        var addBtn = document.createElement('button');
        addBtn.className = 'add-quick-btn';
        addBtn.textContent = '+';
        addBtn.title = t().addQuick;
        addBtn.addEventListener('click', openModal);
        quickLinksContainer.appendChild(addBtn);
    }
    quickLinksContainer.addEventListener('click', function (e) {
        var removeBtn = e.target.closest('.remove-quick');
        if (!removeBtn) return;
        e.preventDefault();
        e.stopPropagation();
        var idx = parseInt(removeBtn.getAttribute('data-index'), 10);
        if (!isNaN(idx) && idx >= 0 && idx < quickLinks.length) {
            quickLinks.splice(idx, 1);
            saveQuickLinks();
            renderQuickLinks();
        }
    });

    function openModal() {
        modalOverlay.classList.add('open');
        quickNameInput.value = '';
        quickUrlInput.value = '';
        quickNameInput.focus();
    }
    function closeModal() { modalOverlay.classList.remove('open'); }
    cancelAddBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) closeModal();
    });
    confirmAddBtn.addEventListener('click', function () {
        var d = t();
        var name = quickNameInput.value.trim();
        var url = quickUrlInput.value.trim();
        if (!name) { alert(d.emptyName); quickNameInput.focus(); return; }
        if (!url) { alert(d.emptyUrl); quickUrlInput.focus(); return; }
        try { new URL(url); } catch (e) { alert(d.invalidUrl); quickUrlInput.focus(); return; }
        quickLinks.push({ name: name, url: url });
        saveQuickLinks();
        renderQuickLinks();
        closeModal();
    });
    quickNameInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); quickUrlInput.focus(); }
    });
    quickUrlInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); confirmAddBtn.click(); }
    });

    /* ---------- clock ---------- */
    var STORAGE_DATE_FORMAT = 'nvazen_date_format';
    var currentDateFormat = 0;
    try {
        var savedFmt = localStorage.getItem(STORAGE_DATE_FORMAT);
        if (savedFmt !== null) {
            var n = parseInt(savedFmt, 10);
            if (n >= 0 && n <= 2) currentDateFormat = n;
        }
    } catch (e) { /* ignore */ }

    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function formatDate(date, format) {
        var y = date.getFullYear();
        var m = pad(date.getMonth() + 1);
        var d = pad(date.getDate());
        if (format === 0) return y + '/' + m + '/' + d;
        if (format === 1) return d + '/' + m + '/' + y;
        return m + '/' + d + '/' + y;
    }
    function updateDateTime() {
        var now = new Date();
        dateDisplay.textContent = formatDate(now, currentDateFormat);
        weekdayDisplay.textContent = t().weekdays[now.getDay()];
        timeDisplay.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
    }
    dateFormatBtn.addEventListener('click', function () {
        currentDateFormat = (currentDateFormat + 1) % 3;
        try { localStorage.setItem(STORAGE_DATE_FORMAT, String(currentDateFormat)); } catch (e) { /* ignore */ }
        updateDateTime();
    });
    updateDateTime();
    setInterval(updateDateTime, 1000);

    /* ---------- info widget visibility ---------- */
    var STORAGE_INFO_VISIBLE = 'nvazen_info_visible';
    function setInfoVisible(visible) {
        infoWidget.classList.toggle('collapsed', !visible);
        infoToggleBtn.textContent = visible ? t().hide : t().show;
        try { localStorage.setItem(STORAGE_INFO_VISIBLE, visible ? '1' : '0'); } catch (e) { /* ignore */ }
    }
    try {
        var savedVisible = localStorage.getItem(STORAGE_INFO_VISIBLE);
        setInfoVisible(savedVisible !== '0');
    } catch (e) { setInfoVisible(true); }
    infoToggleBtn.addEventListener('click', function () {
        var isVisible = !infoWidget.classList.contains('collapsed');
        setInfoVisible(!isVisible);
    });

    /* ---------- weather ---------- */
    var DEFAULT_LAT = -33.8688;
    var DEFAULT_LON = 151.2093;
    var DEFAULT_LOCATION_NAME = 'Sydney';
    var STORAGE_WEATHER_LOC = 'nvazen_weather_location';
    var STORAGE_WEATHER_CONSENT = 'nvazen_weather_consent';
    var currentWeatherLocation = null;
    var weatherErrorShown = false;

    function getWeatherIconFile(code) {
        if (code === 0 || code === 1) return 'sunny.svg';
        if (code === 2 || code === 3 || code === 45 || code === 48) return 'half-sunny.svg';
        if (code >= 51) return 'raining.svg';
        return 'sunny.svg';
    }
    function getWeatherDesc(code) {
        var map = t().weatherCodes;
        return map[code] || (currentLang === 'zh' ? '未知' : 'Unknown');
    }
    function loadSavedLocation() {
        try {
            var saved = localStorage.getItem(STORAGE_WEATHER_LOC);
            if (saved) {
                var loc = JSON.parse(saved);
                if (loc && loc.lat && loc.lon) { currentWeatherLocation = loc; return true; }
            }
        } catch (e) { /* ignore */ }
        return false;
    }
    function saveLocation(lat, lon, name) {
        currentWeatherLocation = { lat: lat, lon: lon, name: name };
        try { localStorage.setItem(STORAGE_WEATHER_LOC, JSON.stringify({ lat: lat, lon: lon, name: name })); } catch (e) { /* ignore */ }
    }
    function fetchWeather(lat, lon) {
        weatherDisplay.innerHTML = '<div class="weather-status-text">' + t().weatherLoading + '</div>';
        var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon +
            '&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m&timezone=auto';
        fetch(url).then(function (res) {
            if (!res.ok) throw new Error('Weather fetch failed');
            return res.json();
        }).then(function (data) { renderWeather(data.current); })
            .catch(function () {
                weatherDisplay.innerHTML = '<div class="weather-status-text error">' + t().weatherError + '</div>';
            });
    }
    function renderWeather(current) {
        var d = t();
        if (!current) {
            weatherDisplay.innerHTML = '<div class="weather-status-text error">' + d.weatherError + '</div>';
            return;
        }
        var code = current.weather_code;
        weatherDisplay.innerHTML =
            '<img class="weather-icon-img" src="' + getWeatherIconFile(code) + '" alt="' + getWeatherDesc(code) + '">' +
            '<div>' +
            '<div style="display:flex;align-items:baseline;gap:8px;">' +
            '<span class="weather-temp-text">' + Math.round(current.temperature_2m) + '°C</span>' +
            '<span style="font-size:12px;color:var(--text-3);">' + getWeatherDesc(code) + '</span>' +
            '</div>' +
            '<div class="weather-detail-text">' +
            '<span><strong>' + d.weatherFeelsLike + '</strong> ' + Math.round(current.apparent_temperature) + '°</span>' +
            '<span><strong>' + d.weatherHumidity + '</strong> ' + current.relative_humidity_2m + '%</span>' +
            '<span><strong>' + d.weatherWind + '</strong> ' + current.wind_speed_10m + 'km/h</span>' +
            '<span><strong>' + d.weatherPressure + '</strong> ' + Math.round(current.pressure_msl) + 'hPa</span>' +
            '<span><strong>' + d.weatherCloud + '</strong> ' + current.cloud_cover + '%</span>' +
            '<span><strong>' + d.weatherPrecip + '</strong> ' + current.precipitation + 'mm</span>' +
            '</div></div>';
    }
    function showConsentUI() {
        var d = t();
        weatherConsentArea.innerHTML =
            '<div>' + d.weatherConsent + '</div>' +
            '<div class="info-consent-actions">' +
            '<button id="weatherAllowBtn">' + d.weatherAllow + '</button>' +
            '<button id="weatherManualBtn">' + d.weatherDeny + '</button>' +
            '</div>';
        document.getElementById('weatherAllowBtn').addEventListener('click', handleAllowLocation);
        document.getElementById('weatherManualBtn').addEventListener('click', showManualInput);
    }
    function handleAllowLocation() {
        weatherConsentArea.innerHTML = '';
        try { localStorage.setItem(STORAGE_WEATHER_CONSENT, 'granted'); } catch (e) { /* ignore */ }
        if (!navigator.geolocation) {
            weatherDisplay.innerHTML = '<div class="weather-status-text error">Geolocation not supported</div>';
            return;
        }
        weatherDisplay.innerHTML = '<div class="weather-status-text">' + t().weatherLoading + '</div>';
        navigator.geolocation.getCurrentPosition(
            function (pos) {
                saveLocation(pos.coords.latitude, pos.coords.longitude, 'My location');
                fetchWeather(pos.coords.latitude, pos.coords.longitude);
            },
            function () { fallbackToDefault(); },
            { timeout: 8000 }
        );
    }
    function showManualInput() {
        var d = t();
        weatherConsentArea.innerHTML =
            '<div style="margin-bottom:4px;">' + d.weatherManualPlaceholder + '</div>' +
            '<div class="info-manual-input">' +
            '<input type="text" id="weatherManualInput" placeholder="Sydney" value="">' +
            '<button id="weatherManualConfirm">' + d.weatherManualConfirm + '</button>' +
            '</div>' +
            '<div style="font-size:11px;color:var(--text-3);margin-top:3px;">' + d.weatherDefaultNote + '</div>';
        var input = document.getElementById('weatherManualInput');
        var confirmBtn = document.getElementById('weatherManualConfirm');
        input.focus();
        var doSearch = function () {
            var name = input.value.trim();
            if (!name) return;
            weatherConsentArea.innerHTML = '';
            try { localStorage.setItem(STORAGE_WEATHER_CONSENT, 'manual'); } catch (e) { /* ignore */ }
            weatherDisplay.innerHTML = '<div class="weather-status-text">' + d.weatherLoading + '</div>';
            fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(name) + '&count=1&language=' + currentLang)
                .then(function (res) { return res.json(); })
                .then(function (geo) {
                    if (geo.results && geo.results.length > 0) {
                        var r = geo.results[0];
                        saveLocation(r.latitude, r.longitude, r.name);
                        fetchWeather(r.latitude, r.longitude);
                    } else {
                        fallbackToDefault();
                    }
                })
                .catch(function () { fallbackToDefault(); });
        };
        confirmBtn.addEventListener('click', doSearch);
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') doSearch(); });
    }
    function fallbackToDefault() {
        saveLocation(DEFAULT_LAT, DEFAULT_LON, DEFAULT_LOCATION_NAME);
        fetchWeather(DEFAULT_LAT, DEFAULT_LON);
    }
    function updateWeatherLabels() {
        if (weatherErrorShown) return;
        var d = t();
        var status = weatherDisplay.querySelector('.weather-status-text:not(.error)');
        if (status) status.textContent = d.weatherLoading;
    }
    function initWeather() {
        var hasSaved = loadSavedLocation();
        var consent = null;
        try { consent = localStorage.getItem(STORAGE_WEATHER_CONSENT); } catch (e) { /* ignore */ }
        if (hasSaved && currentWeatherLocation) {
            fetchWeather(currentWeatherLocation.lat, currentWeatherLocation.lon);
        } else if (consent === 'granted') {
            handleAllowLocation();
        } else if (consent === 'denied' || consent === 'manual') {
            fallbackToDefault();
        } else {
            weatherDisplay.innerHTML = '<div class="weather-status-text">' + t().weatherDefaultNote + '</div>';
            showConsentUI();
        }
    }

    /* ---------- init ---------- */
    function init() {
        loadQuickLinks();
        applyI18n();
        initWeather();
    }

    /* language change from the shared site.js */
    if (window.NV) {
        var prev = window.NV.onLangChange;
        window.NV.onLangChange = function (lang) {
            if (prev) prev(lang);
            currentLang = String(lang).indexOf('zh') === 0 ? 'zh' : 'en';
            applyI18n();
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
