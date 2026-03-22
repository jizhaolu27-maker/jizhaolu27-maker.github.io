const page = document.body.dataset.page;
const langKey = "site-language";

const i18n = {
  en: {
    htmlLang: "en",
    toggle: "中文",
    nav: {
      home: "Home",
      logs: "Logs",
      notes: "Notes",
      links: "Links"
    },
    home: {
      eyebrow: "Personal Website",
      heroText:
        "A senior student learning Digital IC, Java, and other new knowledge. This site keeps my recent study progress and notes in one clean place.",
      logsKicker: "Recent Learning Logs",
      logsTitle: "Latest 3 updates",
      viewAllLogs: "View all logs",
      allLogsTitle: "All Learning Logs",
      allLogsCopy: "See the complete timeline of my study progress.",
      notesTitle: "Study Notes",
      notesCopy: "Open note entries and jump to the related GitHub Markdown pages."
    },
    logs: {
      kicker: "Learning Logs",
      title: "All study updates",
      copy: "A complete list of what I have been learning recently, sorted from newest to oldest."
    },
    notes: {
      kicker: "Study Notes",
      title: "Notes and references",
      copy: "These notes link to Markdown files on GitHub, so I can keep my learning material organized and easy to update."
    },
    links: {
      kicker: "Links",
      title: "Selected links",
      copy: "A short list of stable references I want to keep close at hand.",
      fixedTitle: "Fixed",
      recentTitle: "Recent"
    },
    states: {
      noLogs: "No learning logs yet.",
      noNotes: "No study notes yet.",
      noLinks: "No links yet.",
      loadLogsError: "Unable to load logs. If you are previewing locally, use a local server or GitHub Pages.",
      loadNotesError: "Unable to load notes. If you are previewing locally, use a local server or GitHub Pages.",
      loadLinksError: "Unable to load links. If you are previewing locally, use a local server or GitHub Pages."
    },
    common: {
      openMarkdown: "Open GitHub Markdown",
      openLink: "Open link"
    }
  },
  zh: {
    htmlLang: "zh-CN",
    toggle: "EN",
    nav: {
      home: "首页",
      logs: "日志",
      notes: "笔记",
      links: "链接"
    },
    home: {
      eyebrow: "个人网站",
      heroText: "我是一名正在学习数字 IC、Java 以及其他新知识的大四学生。这个网站用简洁、轻量的方式记录我最近的学习进展和学习笔记。",
      logsKicker: "最近学习日志",
      logsTitle: "最新 3 条更新",
      viewAllLogs: "查看全部日志",
      allLogsTitle: "全部学习日志",
      allLogsCopy: "查看我最近学习进展的完整时间线。",
      notesTitle: "学习笔记",
      notesCopy: "打开笔记条目，并跳转到对应的 GitHub Markdown 页面。"
    },
    logs: {
      kicker: "学习日志",
      title: "全部学习更新",
      copy: "按时间从新到旧整理我最近学习内容的完整列表。"
    },
    notes: {
      kicker: "学习笔记",
      title: "笔记与参考资料",
      copy: "这些笔记链接到 GitHub 上的 Markdown 文件，方便我持续整理和更新学习材料。"
    },
    links: {
      kicker: "链接",
      title: "精选链接",
      copy: "保留一小组稳定、常用、方便回看的参考链接。",
      fixedTitle: "固定",
      recentTitle: "最近"
    },
    states: {
      noLogs: "还没有学习日志。",
      noNotes: "还没有学习笔记。",
      noLinks: "还没有链接。",
      loadLogsError: "无法加载日志。如果你正在本地预览，请使用本地服务器或 GitHub Pages。",
      loadNotesError: "无法加载笔记。如果你正在本地预览，请使用本地服务器或 GitHub Pages。",
      loadLinksError: "无法加载链接。如果你正在本地预览，请使用本地服务器或 GitHub Pages。"
    },
    common: {
      openMarkdown: "打开 GitHub Markdown",
      openLink: "打开链接"
    }
  }
};

let currentLanguage = localStorage.getItem(langKey) || "en";
if (!i18n[currentLanguage]) {
  currentLanguage = "en";
}

function getText(path) {
  return path.split(".").reduce((value, key) => value[key], i18n[currentLanguage]);
}

function getLocalizedValue(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[currentLanguage] || value.en || value.zh || "";
  }

  return value || "";
}

function createStateCard(message) {
  const card = document.createElement("article");
  card.className = "state-card";
  card.innerHTML = `<p>${message}</p>`;
  return card;
}

async function fetchJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response.json();
}

function applyTranslations() {
  document.documentElement.lang = i18n[currentLanguage].htmlLang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = getText(element.dataset.i18n);
  });

  const toggle = document.getElementById("lang-toggle");
  if (toggle) {
    toggle.textContent = i18n[currentLanguage].toggle;
  }
}

function renderLogs(logs, container, limit) {
  container.innerHTML = "";

  if (!Array.isArray(logs) || logs.length === 0) {
    container.appendChild(createStateCard(i18n[currentLanguage].states.noLogs));
    return;
  }

  const visibleLogs = typeof limit === "number" ? logs.slice(0, limit) : logs;

  visibleLogs.forEach((log) => {
    const card = document.createElement("article");
    card.className = "log-card";
    card.innerHTML = `
      <div class="log-meta">
        <span class="log-date">${log.date}</span>
        <span>${getLocalizedValue(log.topic)}</span>
      </div>
      <h3>${getLocalizedValue(log.title)}</h3>
      <p>${getLocalizedValue(log.summary)}</p>
    `;
    container.appendChild(card);
  });
}

function renderNotes(notes, container) {
  container.innerHTML = "";

  if (!Array.isArray(notes) || notes.length === 0) {
    container.appendChild(createStateCard(i18n[currentLanguage].states.noNotes));
    return;
  }

  notes.forEach((note) => {
    const card = document.createElement("article");
    card.className = "note-card";
    card.innerHTML = `
      <div class="note-meta">
        <span class="note-tag">${getLocalizedValue(note.category)}</span>
        <span>${getLocalizedValue(note.updated)}</span>
      </div>
      <h3>${getLocalizedValue(note.title)}</h3>
      <p>${getLocalizedValue(note.description)}</p>
      <div class="note-footer">
        <a href="${note.url}" target="_blank" rel="noreferrer">${i18n[currentLanguage].common.openMarkdown}</a>
      </div>
    `;
    container.appendChild(card);
  });
}

function formatLinkText(url) {
  return String(url || "").replace(/^https?:\/\//, "");
}

function renderLinks(links, container, limit) {
  container.innerHTML = "";

  if (!Array.isArray(links) || links.length === 0) {
    container.appendChild(createStateCard(i18n[currentLanguage].states.noLinks));
    return;
  }

  const visibleLinks = typeof limit === "number" ? links.slice(0, limit) : links;

  visibleLinks.forEach((link) => {
    const item = document.createElement("article");
    item.className = "link-item";

    const title = getLocalizedValue(link.title);
    const source = getLocalizedValue(link.source);
    const hrefText = formatLinkText(link.url);

    item.innerHTML = `
      <a class="link-title" href="${link.url}" target="_blank" rel="noreferrer">${title}</a>
      <div class="link-meta">
        ${source ? `<span class="link-source">${source}</span>` : ""}
        <a class="link-url" href="${link.url}" target="_blank" rel="noreferrer">${hrefText}</a>
      </div>
    `;

    container.appendChild(item);
  });
}

async function initHomePage() {
  const container = document.getElementById("recent-logs");
  if (!container) {
    return;
  }

  try {
    const logs = await fetchJson("data/logs.json");
    renderLogs(logs, container, 3);
  } catch (error) {
    container.innerHTML = "";
    container.appendChild(createStateCard(i18n[currentLanguage].states.loadLogsError));
  }
}

async function initLogsPage() {
  const container = document.getElementById("all-logs");
  if (!container) {
    return;
  }

  try {
    const logs = await fetchJson("data/logs.json");
    renderLogs(logs, container);
  } catch (error) {
    container.innerHTML = "";
    container.appendChild(createStateCard(i18n[currentLanguage].states.loadLogsError));
  }
}

async function initNotesPage() {
  const container = document.getElementById("notes-list");
  if (!container) {
    return;
  }

  try {
    const notes = await fetchJson("data/notes.json");
    renderNotes(notes, container);
  } catch (error) {
    container.innerHTML = "";
    container.appendChild(createStateCard(i18n[currentLanguage].states.loadNotesError));
  }
}

async function initLinksPage() {
  const fixedContainer = document.getElementById("fixed-links");
  const recentContainer = document.getElementById("recent-links");

  if (!fixedContainer || !recentContainer) {
    return;
  }

  try {
    const [fixedLinks, recentLinks] = await Promise.all([
      fetchJson("data/links-fixed.json"),
      fetchJson("data/links-recent.json")
    ]);

    renderLinks(fixedLinks, fixedContainer);
    renderLinks(recentLinks, recentContainer, 5);
  } catch (error) {
    fixedContainer.innerHTML = "";
    recentContainer.innerHTML = "";
    fixedContainer.appendChild(createStateCard(i18n[currentLanguage].states.loadLinksError));
    recentContainer.appendChild(createStateCard(i18n[currentLanguage].states.loadLinksError));
  }
}

async function refreshCurrentPage() {
  if (page === "home") {
    await initHomePage();
  }

  if (page === "logs") {
    await initLogsPage();
  }

  if (page === "notes") {
    await initNotesPage();
  }

  if (page === "links") {
    await initLinksPage();
  }
}

function bindLanguageToggle() {
  const toggle = document.getElementById("lang-toggle");
  if (!toggle) {
    return;
  }

  toggle.addEventListener("click", async () => {
    currentLanguage = currentLanguage === "en" ? "zh" : "en";
    localStorage.setItem(langKey, currentLanguage);
    applyTranslations();
    await refreshCurrentPage();
  });
}

applyTranslations();
bindLanguageToggle();
refreshCurrentPage();
