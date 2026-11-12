# NVazen 官网（azen.dev）

NVazen™ Linux 的官方网站源码 —— 基于 Windows 11 Fluent 设计语言的静态站点。

线上地址：**https://azen.dev**

## 页面

| 文件 | 说明 |
|---|---|
| `index.html` | 主页：NVazen Arc 介绍、ALRM 4 技术、新闻、下载、评价、硬件要求 |
| `downloads.html` | 下载中心：ISO 版本列表 |
| `support.html` | GitHub 仓库列表（Azen 生态全部仓库） |
| `distro.html` | 发行版列表（卡片详情渲染同目录 Markdown） |
| `search.html` | 搜索门户（搜索引擎、快捷方式、时钟、open-meteo 天气） |
| `azen/` | **旧版官网归档**（Azen Linux LTS 时期，仅存档） |

## 设计系统（assets/）

| 文件 | 说明 |
|---|---|
| `assets/css/base.css` | Win11 设计令牌（深浅主题）、头部、按钮、卡片、页脚等共享组件 |
| `assets/css/home.css` | 主页专属样式（横幅、笔记本模型、轮播等） |
| `assets/css/distro.css` | 发行版列表页样式（含 Markdown 渲染样式） |
| `assets/css/search.css` | 搜索门户样式 |
| `assets/js/i18n.js` | 四语言字典（en / zh / ja / ko），缺失键自动回退英文 |
| `assets/js/site.js` | 共享运行时：偏好存储（`nvazen_user_prefs`）、主题、语言、背景效果、笔记本配色、设置菜单、滚动动画 |
| `assets/js/home.js` | 主页行为：标题动画、截图轮播、新闻轮播、平滑滚动 |
| `assets/js/distro.js` | 发行版页行为：详情视图、零依赖 Markdown 解析器 |
| `assets/js/search.js` | 搜索门户行为：引擎、快捷方式、时钟、天气 |

## 功能

- **四语言**：English / 简体中文 / 日本語 / 한국어，⚙ 设置菜单内切换，偏好存 localStorage
- **深浅主题** + **背景效果**（亚克力 / 完全可见 / 液态玻璃）
- **笔记本颜色**（4 种配色，CSS 变量驱动）
- 截图轮播、新闻轮播、字母跳动标题动画、滚动 reveal
- 搜索页：URL 直达、热门搜索建议、自定义快捷方式、日期格式切换、open-meteo 天气 + 定位/手动城市

## 维护提示

- 全部偏好沿用同一个 `localStorage` 键 `nvazen_user_prefs`，老访客的偏好自动保留
- 新增发行版：在 `distro.html` 复制 `distro-card` 块，改 `data-md`/`data-name`/`data-sub`，图标放 `distro-icons/`
- 新增语言：在 `assets/js/i18n.js` 加字典即可，无需改页面
- 部署：纯静态，任意静态托管（Pages / Netlify / Cloudflare Pages）直接发布仓库根目录

## License

GPLv3（沿用 Azen 项目协议）
