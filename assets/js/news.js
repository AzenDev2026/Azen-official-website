/* ============================================================
   Azen News — article data + news page runtime
   ============================================================ */
(function () {
    'use strict';

    window.NV_NEWS = {
        order: ['2026-11-27', '2026-11-26', '2026-11-21', '2026-10-06', '2026-10-01'],
        articles: {
            '2026-11-27': {
                tag: { en: 'Release', zh: '发布', ja: 'リリース', ko: '릴리스' },
                title: {
                    en: 'NVazen 2026.11.27 — the first offline installer',
                    zh: 'NVazen 2026.11.27 —— 首个离线安装器',
                    ja: 'NVazen 2026.11.27 — 初のオフラインインストーラー',
                    ko: 'NVazen 2026.11.27 — 최초의 오프라인 설치 프로그램'
                },
                summary: {
                    en: 'A 4.1 GB ISO with every package bundled inside — install NVazen with no internet connection at all.',
                    zh: '4.1 GB 的 ISO 把全部软件包内置其中——完全不需要网络即可安装 NVazen。',
                    ja: '4.1 GB の ISO に全パッケージを内蔵——ネット接続なしで NVazen をインストールできます。',
                    ko: '4.1GB ISO에 모든 패키지가 내장 — 인터넷 연결 없이 NVazen을 설치할 수 있습니다.'
                },
                body: {
                    en: [
                        'Today\u2019s release is the biggest ISO in NVazen history: nvazen-2026.11.27-x86_64, 4.1 GB of everything you need.',
                        'It is the first offline installer the project has ever shipped. Every package required for a full installation is bundled inside the ISO itself — you can install NVazen with no internet connection at all. The base system, the KDE Plasma desktop, the complete desktop layout and all fifteen Azen apps travel straight from the ISO to your disk.',
                        'On board you will find DeepTerminal, Azenium, NAAP, NVazenMenu, Azen Search, Azen Notch, ArchiveManager, NVazenSettings, NVazen Update, sysfetch, AzenSandbox, ProcManager, GitPulse, R4NS0M and the Desktop Menu Provider.',
                        'The installer itself was redesigned as a fullscreen Windows 11 OOBE-style wizard in deep dark tones, with a network setup step that you can simply skip — the offline repository does the heavy lifting, so nothing needs to be downloaded during installation.',
                        'Your desktop arrives pre-styled: the complete KDE Plasma layout, themes, icons and cursors, plus one of three wallpapers picked at random on every install.',
                        'A note from the newsroom: this build has not been tested by the developer in a virtual machine yet. Please try it in a VM or on a spare device first and report any issues before using it on your main computer.'
                    ],
                    zh: [
                        '今天的发布带来了 NVazen 历史上体积最大的 ISO：nvazen-2026.11.27-x86_64，4.1 GB 装下了你需要的一切。',
                        '这也是项目有史以来的首个离线安装器：完整安装所需的每一个软件包都内置在 ISO 里，你完全不需要网络就能安装 NVazen。基础系统、KDE Plasma 桌面、完整的桌面布局，以及全部十五个 Azen 应用，都直接从 ISO 搬到你的硬盘上。',
                        '随行阵容包括 DeepTerminal、Azenium、NAAP、NVazenMenu、Azen Search、Azen Notch、ArchiveManager、NVazenSettings、NVazen Update、sysfetch、AzenSandbox、ProcManager、GitPulse、R4NS0M 和桌面菜单提供器。',
                        '安装器本身也换上了 Windows 11 OOBE 风格的全屏深色向导，配网步骤可以直接跳过——因为离线软件仓库已经包办了一切，安装过程中不需要下载任何东西。',
                        '装好的桌面开箱即用：完整的 KDE Plasma 布局、主题、图标和光标，并且每次安装都会从三张壁纸中随机挑选一张。',
                        '编辑部提醒：这个版本尚未经过开发者的虚拟机测试。请先在虚拟机或备用设备上试用，发现问题到 GitHub 反馈，再用于主力电脑。'
                    ],
                    ja: [
                        '本日のリリースは NVazen 史上最大の ISO、nvazen-2026.11.27-x86_64（4.1 GB）です。',
                        'プロジェクト初のオフラインインストーラーです。完全なインストールに必要なパッケージがすべて ISO に内蔵されており、ネット接続が一切なくても NVazen をインストールできます。',
                        'DeepTerminal、Azenium、NAAP、NVazenMenu、Azen Search など 15 個の Azen アプリが同梱されています。インストーラーも Windows 11 OOBE 風のフルスクリーン・ダーク UI に刷新されました。',
                        '注意：このビルドはまだ開発者が仮想マシンでテストしていません。まずテストしてからご利用ください。'
                    ],
                    ko: [
                        '오늘의 릴리스는 NVazen 역사상 가장 큰 ISO인 nvazen-2026.11.27-x86_64(4.1GB)입니다.',
                        '프로젝트 최초의 오프라인 설치 프로그램으로, 전체 설치에 필요한 모든 패키지가 ISO 안에 내장되어 인터넷 연결 없이도 NVazen을 설치할 수 있습니다.',
                        'DeepTerminal, Azenium, NAAP, NVazenMenu, Azen Search 등 15개의 Azen 앱이 함께 제공되며, 설치 프로그램은 Windows 11 OOBE 스타일의 풀스크린 다크 UI로 새롭게 디자인되었습니다.',
                        '참고: 이 빌드는 아직 개발자가 가상 머신에서 테스트하지 않았습니다. 먼저 테스트한 후 사용해 주세요.'
                    ]
                }
            },
            '2026-11-26': {
                tag: { en: 'Website', zh: '网站', ja: 'サイト', ko: '웹사이트' },
                title: {
                    en: 'Homepage banner redesigned',
                    zh: '官网首页横幅改版',
                    ja: 'ホームページのバナーを刷新',
                    ko: '홈페이지 배너 새 단장'
                },
                summary: {
                    en: 'The homepage now opens with a transparent wallpaper showcase that fades up into a clean NVazen benefits panel.',
                    zh: '首页现在以透明壁纸开场，向上渐变成 NVazen 优势面板，下方紧接着最新版本与截图。',
                    ja: 'トップページは透明な壁紙のショーケースで始まり、NVazen の利点パネルへとフェードしていきます。',
                    ko: '홈페이지가 투명한 배경화면 쇼케이스로 시작해 NVazen의 장점 패널로 이어집니다.'
                },
                body: {
                    en: [
                        'The homepage received a full banner redesign today.',
                        'The hero section is now split into two halves: the upper half is fully transparent so the desktop wallpaper shines through, fading from clear at the top down into a solid gradient; the lower half carries the claim \u201cLooks like Windows 11, but better than Windows 11\u201d along with four quick reasons to try NVazen.',
                        'Beneath the banner, the page now leads with the latest release and real machine screenshots, then walks through the features, reviews and hardware requirements.',
                        'The update counter reached 31 with this release of the new ISO.'
                    ],
                    zh: [
                        '今天官网首页横幅迎来大改版。',
                        '横幅改为上下两栏：上半部分完全透明，桌面壁纸直接透出来，从顶部的清晰渐变到下部的实色；下半部分写上了「看起来像 Windows 11，但比 Windows 11 更好」以及四条选择 NVazen 的理由。',
                        '横幅下方紧接着最新版本与实机截图，再依次是功能特性、用户评价与硬件要求。',
                        '随着新 ISO 上线，官网更新计数也来到了第 31 次。'
                    ],
                    ja: [
                        'ホームページのバナーを全面的に刷新しました。',
                        '上半分は完全に透明で壁紙が透け、下へ向かって実色へとフェード。下半分には「Looks like Windows 11, but better than Windows 11」と 4 つの利点を掲載しています。',
                        'バナーの下には最新リリースと実機スクリーンショットが続きます。'
                    ],
                    ko: [
                        '홈페이지 배너를 전면 개편했습니다.',
                        '상단 절반은 완전히 투명해서 배경화면이 비치고, 아래로 갈수록 단색으로 페이드됩니다. 하단에는 "Looks like Windows 11, but better than Windows 11" 문구와 4가지 장점이 담겼습니다.',
                        '배너 아래에는 최신 릴리스와 실기 스크린샷이 이어집니다.'
                    ]
                }
            },
            '2026-11-21': {
                tag: { en: 'Tech', zh: '技术', ja: '技術', ko: '기술' },
                title: {
                    en: 'DeepTerminal 2.6.1 + nvazen_update 1.1.0',
                    zh: 'DeepTerminal 2.6.1 与 nvazen_update 1.1.0',
                    ja: 'DeepTerminal 2.6.1 + nvazen_update 1.1.0',
                    ko: 'DeepTerminal 2.6.1 + nvazen_update 1.1.0'
                },
                summary: {
                    en: 'A polish day: DeepTerminal fixes its welcome banner and fresh tabs, while the updater learns to repair missing components.',
                    zh: '修整日：DeepTerminal 修复欢迎横幅与新标签页，更新器学会自动修复缺失组件。',
                    ja: 'DeepTerminal の歓迎バナーと新規タブを修正、アップデーターは欠けたコンポーネントの自動修復を学習しました。',
                    ko: 'DeepTerminal의 환영 배너와 새 탭을 수정하고, 업데이터가 누락된 구성 요소를 자동 복구하는 법을 배웠습니다.'
                },
                body: {
                    en: [
                        'Two small but satisfying improvements landed today.',
                        'DeepTerminal 2.6.1 fixes the welcome banner, which used to render as garbled characters on first open, and every new tab now runs clear automatically so you always start fresh.',
                        'nvazen_update 1.1.0 turns the updater into a repair tool as well: it now watches the known NVazen components and, when one is missing — for example DeepTerminal — it says \u201cDeepTerminal not found, update = install latest version\u201d and reinstalls it automatically.',
                        'The updater is also downloadable and installable on its own now, so a broken NVazen installation can heal itself over the network.'
                    ],
                    zh: [
                        '今天落地了两个小而美的改进。',
                        'DeepTerminal 2.6.1 修复了欢迎横幅——它以前在首次打开时会显示乱码；现在每个新标签页还会自动执行 clear，让你每次开始都是干净的。',
                        'nvazen_update 1.1.0 让更新器同时变成修复工具：它会盯住已知的 NVazen 组件，一旦发现某个组件缺失（比如 DeepTerminal），就会提示「DeepTerminal not found, update = install latest version」并自动重装。',
                        '更新器现在也可以单独下载安装，损坏的 NVazen 系统可以通过网络自愈了。'
                    ],
                    ja: [
                        '今日は 2 つの小さな改善が届きました。',
                        'DeepTerminal 2.6.1 は初回起動時に文字化けしていた歓迎バナーを修正し、新しいタブは自動で clear を実行するようになりました。',
                        'nvazen_update 1.1.0 はアップデーターを修理ツールにも進化させ、欠けたコンポーネントを自動で再インストールします。'
                    ],
                    ko: [
                        '오늘 두 가지 작은 개선이 도착했습니다.',
                        'DeepTerminal 2.6.1은 첫 실행 시 깨져 보이던 환영 배너를 수정했고, 새 탭은 자동으로 clear를 실행합니다.',
                        'nvazen_update 1.1.0은 업데이터를 복구 도구로도 진화시켜 누락된 구성 요소를 자동으로 다시 설치합니다.'
                    ]
                }
            },
            '2026-10-06': {
                tag: { en: 'Release', zh: '发布', ja: 'リリース', ko: '릴리스' },
                title: {
                    en: 'First NVazen ISO published on Internet Archive',
                    zh: '首个 NVazen ISO 发布于 Internet Archive',
                    ja: '最初の NVazen ISO を Internet Archive で公開',
                    ko: '첫 NVazen ISO를 Internet Archive에 공개'
                },
                summary: {
                    en: 'The first nvazen-2026.10.06-x86_64 ISO went live on Internet Archive — now marked outdated.',
                    zh: '首个 nvazen-2026.10.06-x86_64 ISO 上线 Internet Archive——现已标记为过期。',
                    ja: '最初の nvazen-2026.10.06-x86_64 ISO が Internet Archive に公開されました（現在は期限切れ）。',
                    ko: '첫 nvazen-2026.10.06-x86_64 ISO가 Internet Archive에 공개되었습니다(현재는 구버전).'
                },
                body: {
                    en: [
                        'The very first NVazen ISO, nvazen-2026.10.06-x86_64, was published on Internet Archive.',
                        'It required a network connection during installation: the installer downloaded the base system from Arch mirrors and fetched the Azen apps from GitHub, then assembled everything on the target disk.',
                        'Technology moved quickly, and that first ISO is now marked outdated — its installer, layout and app set have all been superseded by the 2026.11.27 offline build.'
                    ],
                    zh: [
                        '首个 NVazen ISO——nvazen-2026.10.06-x86_64 在 Internet Archive 上发布。',
                        '它安装时需要联网：安装器从 Arch 镜像下载基础系统、从 GitHub 拉取 Azen 应用，再在目标磁盘上组装完成。',
                        '技术更新太快，这第一张 ISO 现已标记为过期——它的安装器、布局和应用集都已被 2026.11.27 离线版全面取代。'
                    ],
                    ja: [
                        '最初の NVazen ISO（nvazen-2026.10.06-x86_64）が Internet Archive で公開されました。',
                        'インストールにはネット接続が必要で、インストーラーがミラーと GitHub からファイルを取得していました。',
                        '技術の進化が早く、この初代 ISO は現在「期限切れ」と表示されています。'
                    ],
                    ko: [
                        '최초의 NVazen ISO(nvazen-2026.10.06-x86_64)가 Internet Archive에 공개되었습니다.',
                        '설치 시 인터넷 연결이 필요했고, 설치 프로그램이 미러와 GitHub에서 파일을 받아 왔습니다.',
                        '기술 발전이 빨라 이 첫 ISO는 현재 구버전으로 표시됩니다.'
                    ]
                }
            },
            '2026-10-01': {
                tag: { en: 'Rolling', zh: '滚动', ja: 'ローリング', ko: '롤링' },
                title: {
                    en: 'NVazen becomes a rolling release — ALRM 4 arrives',
                    zh: 'NVazen 转滚动更新 —— ALRM 4 登场',
                    ja: 'NVazen がローリングリリースへ — ALRM 4 登場',
                    ko: 'NVazen, 롤링 릴리스로 전환 — ALRM 4 등장'
                },
                summary: {
                    en: 'The project switched to a rolling release model, and the ALRM 4 engine shipped with a hardened config layer.',
                    zh: '项目转向滚动更新模型，ALRM 4 引擎携更坚固的配置层登场。',
                    ja: 'プロジェクトはローリングリリースへ移行し、ALRM 4 エンジンが強化された設定レイヤーと共に登場しました。',
                    ko: '프로젝트가 롤링 릴리스 모델로 전환하고, ALRM 4 엔진이 강화된 설정 계층과 함께 등장했습니다.'
                },
                body: {
                    en: [
                        'NVazen Linux switched to a rolling release model: you always get the latest engine and system improvements without waiting for major version jumps.',
                        'Alongside it, the ALRM 4 engine refactored the config parsing module from a class into lighter free functions, and introduced a three-layer patch-library anti-tamper defence for stronger system integrity.'
                    ],
                    zh: [
                        'NVazen Linux 转向滚动更新模型：你永远能第一时间拿到最新的引擎与系统改进，无需等待大版本跳跃。',
                        '同时，ALRM 4 引擎把配置解析模块从类重构为更轻量的自由函数，并引入三层补丁库防篡改防御，让系统完整性更强。'
                    ],
                    ja: [
                        'NVazen Linux はローリングリリースへ移行し、常に最新のエンジンとシステム改善を入手できます。',
                        'ALRM 4 は設定解析モジュールを軽量な自由関数にリファクタリングし、3 層のパッチライブラリ防御を導入しました。'
                    ],
                    ko: [
                        'NVazen Linux는 롤링 릴리스 모델로 전환해 언제나 최신 엔진과 시스템 개선을 받을 수 있습니다.',
                        'ALRM 4는 설정 파싱 모듈을 가벼운 자유 함수로 리팩터링하고 3계층 패치 라이브러리 방어를 도입했습니다.'
                    ]
                }
            }
        }
    };

    /* ---------- news page runtime ---------- */
    function pick(obj, lang) {
        if (!obj) return '';
        return obj[lang] || obj.en || '';
    }

    function renderNewsPage() {
        var explorer = document.getElementById('newsExplorer');
        if (!explorer) return;
        var lang = window.NV.lang || 'en';
        var listBox = document.getElementById('newsFileList');
        var rows = '';
        (window.NV_NEWS.order || []).forEach(function (date) {
            var a = window.NV_NEWS.articles[date];
            if (!a) return;
            var title = pick(a.title, lang);
            var summary = pick(a.summary, lang);
            var tag = pick(a.tag, lang);
            var name = date + ' ' + title + '.md';
            rows += '<a class="news-file" href="#' + date + '">' +
                '<span class="nf-icon" aria-hidden="true">📰</span>' +
                '<span class="nf-name"><span class="nf-filename">' + name + '</span>' +
                '<span class="nf-summary">' + summary + '</span></span>' +
                '<span class="nf-date">' + date + '</span>' +
                '<span class="nf-tag">' + tag + '</span>' +
                '</a>';
        });
        listBox.innerHTML = rows;
        applyHashArticle();
    }

    function applyHashArticle() {
        var id = decodeURIComponent((location.hash || '').replace('#', ''));
        if (!id || !window.NV_NEWS.articles[id]) {
            closeNewspaper(false);
            return;
        }
        openNewspaper(id);
    }

    function closeNewspaper(clearHash) {
        var ov = document.getElementById('newspaperOverlay');
        if (!ov) return;
        ov.classList.remove('open');
        setTimeout(function () {
            if (ov.parentNode) ov.parentNode.removeChild(ov);
        }, 450);
        if (clearHash && location.hash) {
            history.replaceState(null, '', location.pathname + location.search);
        }
    }

    function openNewspaper(id) {
        var lang = window.NV.lang || 'en';
        var a = window.NV_NEWS.articles[id];
        if (!a) return;
        var existing = document.getElementById('newspaperOverlay');
        if (existing) existing.parentNode.removeChild(existing);

        var title = pick(a.title, lang);
        var tag = pick(a.tag, lang);
        var paras = (a.body[lang] && a.body[lang].length) ? a.body[lang] : a.body.en;
        var bodyHtml = paras.map(function (p) { return '<p>' + p + '</p>'; }).join('');

        var ov = document.createElement('div');
        ov.className = 'newspaper-overlay';
        ov.id = 'newspaperOverlay';
        ov.innerHTML =
            '<div class="np-backdrop"></div>' +
            '<div class="newspaper" role="dialog" aria-label="' + title + '">' +
            '<button class="np-close" aria-label="Close">✕</button>' +
            '<header class="np-masthead">' +
            '<span class="np-mast-name">Azen News</span>' +
            '<span class="np-mast-date">' + id + '</span>' +
            '</header>' +
            '<div class="np-rule"></div>' +
            '<h1 class="np-headline">' + title + '</h1>' +
            '<div class="np-tagline"><span class="np-tag">' + tag + '</span>' +
            '<span class="np-byline">NVazen Newsroom · azen.dev</span></div>' +
            '<div class="np-body">' + bodyHtml + '</div>' +
            '<footer class="np-foot">NVazen\u2122 Linux · azen.dev</footer>' +
            '</div>';
        document.body.appendChild(ov);
        ov.querySelector('.np-close').addEventListener('click', function (e) {
            e.preventDefault();
            closeNewspaper(true);
        });
        ov.querySelector('.np-backdrop').addEventListener('click', function () {
            closeNewspaper(true);
        });
        /* 下一帧触发展开动画（模拟摊开报纸） */
        requestAnimationFrame(function () {
            requestAnimationFrame(function () { ov.classList.add('open'); });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderNewsPage();
        window.addEventListener('hashchange', function () {
            if (document.getElementById('newsExplorer')) applyHashArticle();
        });
        if (typeof window.NV !== 'undefined' && window.NV.onLangChange === undefined) {
            var orig = window.NV.applyLang;
        }
        if (window.NV) {
            var prevOnLang = window.NV.onLangChange;
            window.NV.onLangChange = function (lang) {
                if (prevOnLang) prevOnLang(lang);
                if (document.getElementById('newsExplorer')) renderNewsPage();
                var ov = document.getElementById('newspaperOverlay');
                if (ov) {
                    var id = decodeURIComponent((location.hash || '').replace('#', ''));
                    if (id) openNewspaper(id);
                }
            };
        }
    });
})();
