/* ============================================================
   NVazen.dev — distro list page behaviour: detail view,
   dependency-free markdown rendering, help modal.
   ============================================================ */
(function () {
    'use strict';

    /* ---------- help modal ---------- */
    var helpBtn = document.getElementById('helpBtn');
    var helpModal = document.getElementById('helpModal');
    var helpClose = document.getElementById('helpClose');

    function openHelp() { if (helpModal) helpModal.classList.add('open'); }
    function closeHelp() { if (helpModal) helpModal.classList.remove('open'); }

    if (helpBtn) helpBtn.addEventListener('click', openHelp);
    if (helpClose) helpClose.addEventListener('click', closeHelp);
    if (helpModal) {
        helpModal.addEventListener('click', function (e) {
            if (e.target === helpModal) closeHelp();
        });
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeHelp();
    });

    /* ---------- view switching ---------- */
    var listView = document.getElementById('listView');
    var detailView = document.getElementById('detailView');
    var backBtn = document.getElementById('backBtn');
    var detailTitle = document.getElementById('detailTitle');
    var detailSub = document.getElementById('detailSub');
    var detailIcon = document.getElementById('detailIcon');
    var mdBody = document.getElementById('mdBody');

    function showList() {
        if (detailView) detailView.classList.remove('active');
        if (listView) listView.style.display = '';
        window.scrollTo({ top: 0, behavior: 'auto' });
        if (location.hash) {
            try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* ignore */ }
        }
    }
    function showDetail() {
        if (listView) listView.style.display = 'none';
        if (detailView) detailView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'auto' });
    }
    if (backBtn) backBtn.addEventListener('click', showList);

    /* ---------- minimal markdown parser ---------- */
    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function renderInline(text) {
        var t = escapeHtml(text);
        t = t.replace(/`([^`]+)`/g, function (_, code) { return '<code>' + code + '</code>'; });
        t = t.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, function (_, alt, src) {
            return '<img src="' + src + '" alt="' + alt + '">';
        });
        t = t.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, function (_, txt, href) {
            var safe = /^(https?:|mailto:|#|\/|\.)/i.test(href) ? href : '#';
            return '<a href="' + safe + '" target="_blank" rel="noopener">' + txt + '</a>';
        });
        t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        t = t.replace(/__([^_]+)__/g, '<strong>$1</strong>');
        t = t.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
        t = t.replace(/(^|[^_])_([^_\n]+)_/g, '$1<em>$2</em>');
        t = t.replace(/~~([^~]+)~~/g, '<del>$1</del>');
        return t;
    }

    function splitTableRow(line) {
        var s = line.trim();
        if (s.charAt(0) === '|') s = s.slice(1);
        if (s.charAt(s.length - 1) === '|') s = s.slice(0, -1);
        return s.split('|').map(function (c) { return c.trim(); });
    }
    function isTableSep(line) {
        return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(line);
    }

    function parseMarkdown(md) {
        var lines = md.replace(/\r\n?/g, '\n').split('\n');
        var out = [];
        var i = 0;

        while (i < lines.length) {
            var line = lines[i];

            if (/^\s*$/.test(line)) { i++; continue; }

            if (/^\s*```/.test(line)) {
                var lang = line.replace(/^\s*```/, '').trim();
                var buf = [];
                i++;
                while (i < lines.length && !/^\s*```/.test(lines[i])) {
                    buf.push(lines[i]);
                    i++;
                }
                i++;
                out.push(
                    '<pre><code' + (lang ? ' class="lang-' + escapeHtml(lang) + '"' : '') + '>' +
                    escapeHtml(buf.join('\n')) + '</code></pre>'
                );
                continue;
            }

            if (/^\s*([-*_])\s*\1\s*\1[\s\1]*$/.test(line)) {
                out.push('<hr>');
                i++;
                continue;
            }

            var h = line.match(/^\s*(#{1,6})\s+(.*)$/);
            if (h) {
                var level = h[1].length;
                out.push('<h' + level + '>' + renderInline(h[2].trim()) + '</h' + level + '>');
                i++;
                continue;
            }

            if (/^\s*>/.test(line)) {
                var quote = [];
                while (i < lines.length && /^\s*>/.test(lines[i])) {
                    quote.push(lines[i].replace(/^\s*>\s?/, ''));
                    i++;
                }
                out.push('<blockquote>' + parseMarkdown(quote.join('\n')) + '</blockquote>');
                continue;
            }

            if (line.indexOf('|') !== -1 && i + 1 < lines.length && isTableSep(lines[i + 1])) {
                var headers = splitTableRow(line);
                var aligns = splitTableRow(lines[i + 1]).map(function (c) {
                    var l = c.charAt(0) === ':';
                    var r = c.charAt(c.length - 1) === ':';
                    if (l && r) return 'center';
                    if (r) return 'right';
                    if (l) return 'left';
                    return '';
                });
                i += 2;
                var rows = [];
                while (i < lines.length && lines[i].indexOf('|') !== -1 && !/^\s*$/.test(lines[i])) {
                    rows.push(splitTableRow(lines[i]));
                    i++;
                }
                var table = '<table><thead><tr>';
                headers.forEach(function (c, idx) {
                    var a = aligns[idx] ? ' style="text-align:' + aligns[idx] + '"' : '';
                    table += '<th' + a + '>' + renderInline(c) + '</th>';
                });
                table += '</tr></thead><tbody>';
                rows.forEach(function (r) {
                    table += '<tr>';
                    for (var k = 0; k < headers.length; k++) {
                        var ak = aligns[k] ? ' style="text-align:' + aligns[k] + '"' : '';
                        table += '<td' + ak + '>' + renderInline(r[k] || '') + '</td>';
                    }
                    table += '</tr>';
                });
                table += '</tbody></table>';
                out.push(table);
                continue;
            }

            if (/^\s*[-*+]\s+/.test(line)) {
                var ul = [];
                while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
                    ul.push('<li>' + renderInline(lines[i].replace(/^\s*[-*+]\s+/, '')) + '</li>');
                    i++;
                }
                out.push('<ul>' + ul.join('') + '</ul>');
                continue;
            }

            if (/^\s*\d+\.\s+/.test(line)) {
                var ol = [];
                while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
                    ol.push('<li>' + renderInline(lines[i].replace(/^\s*\d+\.\s+/, '')) + '</li>');
                    i++;
                }
                out.push('<ol>' + ol.join('') + '</ol>');
                continue;
            }

            var para = [];
            while (
                i < lines.length &&
                !/^\s*$/.test(lines[i]) &&
                !/^\s*(#{1,6})\s+/.test(lines[i]) &&
                !/^\s*```/.test(lines[i]) &&
                !/^\s*>/.test(lines[i]) &&
                !/^\s*[-*+]\s+/.test(lines[i]) &&
                !/^\s*\d+\.\s+/.test(lines[i]) &&
                !/^\s*([-*_])\s*\1\s*\1[\s\1]*$/.test(lines[i]) &&
                !(lines[i].indexOf('|') !== -1 && i + 1 < lines.length && isTableSep(lines[i + 1]))
            ) {
                para.push(lines[i]);
                i++;
            }
            if (para.length) {
                out.push('<p>' + para.map(renderInline).join('<br>') + '</p>');
            }
        }
        return out.join('\n');
    }

    /* ---------- markdown loading ---------- */
    var mdCache = {};
    function loadMarkdown(path) {
        if (mdCache[path]) return Promise.resolve(mdCache[path]);
        return fetch(path, { cache: 'no-cache' }).then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.text();
        }).then(function (text) {
            mdCache[path] = text;
            return text;
        });
    }

    function openDetail(card) {
        var mdPath = card.getAttribute('data-md');
        var name = card.getAttribute('data-name') || '发行版';
        var sub = card.getAttribute('data-sub') || '';
        var img = card.querySelector('.d-icon img');

        detailTitle.textContent = name;
        detailSub.textContent = sub;
        if (img) {
            detailIcon.src = img.src;
            detailIcon.alt = img.alt || name;
        }

        showDetail();

        mdBody.innerHTML = '<div class="state-box"><div class="spinner"></div>正在加载介绍…</div>';

        try {
            history.replaceState(null, '', '#/' + encodeURIComponent(card.getAttribute('data-distro') || ''));
        } catch (e) { /* ignore */ }

        loadMarkdown(mdPath).then(function (text) {
            mdBody.innerHTML = parseMarkdown(text);
        }).catch(function (err) {
            mdBody.innerHTML =
                '<div class="state-box">😕 无法加载介绍文件 <code>' + escapeHtml(mdPath) + '</code><br>' +
                '请确认该文件与 distro.html 位于同一目录。<br>' +
                '<span style="font-size:12px;opacity:0.7;">' + escapeHtml(String(err && err.message || err)) + '</span></div>';
        });
    }

    document.querySelectorAll('.distro-card').forEach(function (card) {
        card.addEventListener('click', function () { openDetail(card); });
    });

    (function initFromHash() {
        var hash = location.hash.replace(/^#\/?/, '');
        if (!hash) return;
        var target = document.querySelector('.distro-card[data-distro="' + hash + '"]');
        if (target) {
            setTimeout(function () { openDetail(target); }, 0);
        }
    })();
})();
