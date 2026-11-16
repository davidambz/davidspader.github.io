(() => {
    'use strict';

    const C = window.CONTENT;
    const LANGS = Object.keys(C.text);
    const SITE = 'https://davidambz.dev/';
    const app = document.getElementById('app');
    const footer = document.getElementById('footer');
    const langBtn = document.getElementById('lang');
    const themeBtn = document.getElementById('theme');
    const root = document.documentElement;
    const systemLight = window.matchMedia('(prefers-color-scheme: light)');

    let lang;
    const T = () => C.text[lang];

    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    // link to another site: new tab, announced to screen readers
    const ext = (url, html, cls = '') =>
        `<a${cls ? ` class="${cls}"` : ''} href="${esc(url)}" target="_blank" rel="noopener">${html}<span class="sr-only"> ${esc(T().newTab)}</span></a>`;
    const tags = list => `<ul class="tags">${list.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;
    const arrow = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M8 7h9v9"/></svg>';

    const store = {
        get(k) { try { return localStorage.getItem(k); } catch { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
    };

    const setAttr = (selector, attr, value) => document.querySelectorAll(selector).forEach(el => el.setAttribute(attr, value));

    // 'YYYY-MM' -> "mar 2026" / "Mar 2026"
    function month(ym) {
        const [y, m] = ym.split('-').map(Number);
        const name = new Intl.DateTimeFormat(T().locale, { month: 'short', timeZone: 'UTC' })
            .format(new Date(Date.UTC(y, m - 1, 1)))
            .replace('.', '');
        return `${name} ${y}`;
    }
    const period = job => `${month(job.start)} — ${job.end ? month(job.end) : T().present}`;

    // ?lang=en wins, then the last choice, then the browser language
    function initialLang() {
        const q = new URLSearchParams(location.search).get('lang');
        if (LANGS.includes(q)) return q;
        const saved = store.get('lang');
        if (LANGS.includes(saved)) return saved;
        return (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
    }

    // the theme in use: the visitor's choice if they made one, otherwise the system's
    const currentTheme = () => root.dataset.theme || (systemLight.matches ? 'light' : 'dark');
    function syncTheme() {
        themeBtn.setAttribute('aria-label', currentTheme() === 'dark' ? T().theme.toLight : T().theme.toDark);
        // browser bar color follows the theme actually shown, including a manual pick
        setAttr('meta[name="theme-color"]', 'content', getComputedStyle(root).getPropertyValue('--bg').trim());
    }

    function render() {
        const t = T();
        const url = lang === 'pt' ? SITE : `${SITE}?lang=${lang}`;

        root.lang = t.htmlLang;
        document.title = t.title;
        setAttr('meta[name="description"]', 'content', t.description);
        setAttr('meta[property="og:title"]', 'content', t.title);
        setAttr('meta[property="og:description"]', 'content', t.description);
        setAttr('meta[property="og:locale"]', 'content', t.locale.replace('-', '_'));
        setAttr('meta[property="og:url"]', 'content', url);
        setAttr('link[rel="canonical"]', 'href', url);

        langBtn.textContent = t.langSwitch.label;
        langBtn.lang = t.langSwitch.lang;
        langBtn.setAttribute('aria-label', t.langSwitch.aria);
        document.querySelectorAll('[data-t]').forEach(el => {
            el.textContent = el.dataset.t.split('.').reduce((o, k) => o[k], t);
        });
        document.querySelector('.top nav').setAttribute('aria-label', t.nav.label);

        app.innerHTML = `
            <section class="hero">
                <div class="hero-row">
                    <img class="avatar" src="${esc(C.avatar)}" alt="${esc(C.name)}" width="64" height="64" />
                    <span class="status">${esc(t.status)}</span>
                </div>
                <h1>${esc(C.name)}<br><em>${esc(t.role)}</em></h1>
                <p class="intro">${esc(t.intro)}</p>
                <div class="actions">
                    <a class="btn primary" href="${encodeURI(t.resume.file)}" download>${esc(t.resume.label)} <span class="meta">${esc(t.resume.meta)}</span></a>
                    ${C.contacts.filter(c => ['GitHub', 'LinkedIn'].includes(c.label)).map(c => ext(c.url, esc(c.label), 'btn')).join('')}
                </div>
            </section>

            <section id="sobre" class="about">
                <p class="label">01</p>
                <h2>${esc(t.nav.about)}</h2>
                ${t.about.map(p => `<p>${esc(p)}</p>`).join('')}
            </section>

            <section id="experiencia">
                <p class="label">02</p>
                <h2>${esc(t.nav.experience)}</h2>
                <ol class="timeline">
                    ${C.experience.map(job => `
                        <li>
                            <div class="when">${esc(period(job))}</div>
                            <div>
                                <h3>${esc(job[lang].role)} <span>${esc(t.at)} ${esc(job.company)}</span></h3>
                                <p>${esc(job[lang].desc)}</p>
                                ${tags(job.stack)}
                            </div>
                        </li>`).join('')}
                </ol>
            </section>

            <section id="projetos">
                <p class="label">03</p>
                <h2>${esc(t.nav.projects)}</h2>
                <div class="grid">
                    ${C.projects.map(p => `
                        <a class="card" href="${esc(`${C.github}/${p.repo}`)}" target="_blank" rel="noopener">
                            <h3>${esc(p.repo)} ${arrow}</h3>
                            <p>${esc(p[lang])}</p>
                            ${tags(p.stack)}
                            <span class="sr-only">${esc(t.newTab)}</span>
                        </a>`).join('')}
                </div>
            </section>

            <section id="contato">
                <div class="contact-box">
                    <div>
                        <h2>${esc(t.contact.title)}</h2>
                        <p>${esc(t.contact.text)}</p>
                    </div>
                    <ul>
                        ${C.contacts.map(c => `
                            <li>
                                <span>${esc(c.label)}</span>
                                <span class="contact-link">
                                    ${c.url.startsWith('mailto:') ? `<a href="${esc(c.url)}">${esc(c.text)}</a>` : ext(c.url, esc(c.text))}
                                    ${c.copy ? `<button class="copy" type="button" data-copy="${esc(c.text)}" aria-label="${esc(t.copy.aria)}">${esc(t.copy.label)}</button>` : ''}
                                </span>
                            </li>`).join('')}
                    </ul>
                </div>
            </section>`;

        footer.textContent = `© ${new Date().getFullYear()} ${C.name}`;
        syncTheme();
    }

    lang = initialLang();
    render();

    themeBtn.addEventListener('click', () => {
        root.dataset.theme = currentTheme() === 'dark' ? 'light' : 'dark';
        store.set('theme', root.dataset.theme);
        syncTheme();
    });
    systemLight.addEventListener('change', syncTheme);

    langBtn.addEventListener('click', () => {
        lang = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
        store.set('lang', lang);
        render();
    });

    // copy the email, with a short "Copied" confirmation
    app.addEventListener('click', async e => {
        const btn = e.target.closest('[data-copy]');
        if (!btn) return;
        try {
            await navigator.clipboard.writeText(btn.dataset.copy);
        } catch {
            // clipboard blocked: select the address so it can be copied by hand
            const sel = getSelection();
            const range = document.createRange();
            range.selectNodeContents(btn.previousElementSibling);
            sel.removeAllRanges();
            sel.addRange(range);
            return;
        }
        btn.textContent = T().copy.done;
        btn.classList.add('done');
        clearTimeout(btn.timer);
        btn.timer = setTimeout(() => { btn.textContent = T().copy.label; btn.classList.remove('done'); }, 2000);
    });
})();
