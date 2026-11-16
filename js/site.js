(() => {
    'use strict';

    const C = window.CONTENT;
    const LANGS = Object.keys(C.text);
    const app = document.getElementById('app');
    const footer = document.getElementById('footer');
    const langBtn = document.getElementById('lang');

    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const ext = (url, text, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${esc(url)}" target="_blank" rel="noopener">${esc(text)}</a>`;
    const tags = list => `<ul class="tags">${list.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;

    const store = {
        get(k) { try { return localStorage.getItem(k); } catch { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
    };

    // 'YYYY-MM' -> "mar 2026" / "Mar 2026"
    function month(ym, T) {
        const [y, m] = ym.split('-').map(Number);
        const name = new Intl.DateTimeFormat(T.locale, { month: 'short', timeZone: 'UTC' })
            .format(new Date(Date.UTC(y, m - 1, 1)))
            .replace('.', '');
        return `${name} ${y}`;
    }
    const period = (job, T) => `${month(job.start, T)} — ${job.end ? month(job.end, T) : T.present}`;

    // ?lang=en wins, then the last choice, then the browser language
    function initialLang() {
        const q = new URLSearchParams(location.search).get('lang');
        if (LANGS.includes(q)) return q;
        const saved = store.get('lang');
        if (LANGS.includes(saved)) return saved;
        return (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
    }

    function render(lang) {
        const T = C.text[lang];

        document.documentElement.lang = T.htmlLang;
        document.title = T.title;
        langBtn.textContent = T.langSwitch.label;
        langBtn.setAttribute('aria-label', T.langSwitch.aria);
        document.querySelectorAll('[data-t]').forEach(el => {
            el.textContent = el.dataset.t.split('.').reduce((o, k) => o[k], T);
        });

        app.innerHTML = `
            <section class="hero">
                <div class="hero-row">
                    <img class="avatar" src="${esc(C.avatar)}" alt="${esc(C.name)}" width="72" height="72" />
                    <span class="status">${esc(T.status)}</span>
                </div>
                <h1>${esc(C.name)}<br><em>${esc(T.role)}</em></h1>
                <p class="intro">${esc(T.intro)}</p>
                <div class="actions">
                    ${ext(encodeURI(T.resume.file), T.resume.label, 'btn primary')}
                    ${C.contacts.filter(c => ['GitHub', 'LinkedIn'].includes(c.label)).map(c => ext(c.url, c.label, 'btn')).join('')}
                </div>
            </section>

            <section id="sobre" class="about">
                <p class="label">01</p>
                <h2>${esc(T.nav.about)}</h2>
                ${T.about.map(p => `<p>${esc(p)}</p>`).join('')}
            </section>

            <section id="experiencia">
                <p class="label">02</p>
                <h2>${esc(T.nav.experience)}</h2>
                <ol class="timeline">
                    ${C.experience.map(job => `
                        <li>
                            <div class="when">${esc(period(job, T))}</div>
                            <div>
                                <h3>${esc(job[lang].role)} <span>${esc(T.at)} ${esc(job.company)}</span></h3>
                                <p>${esc(job[lang].desc)}</p>
                                ${tags(job.stack)}
                            </div>
                        </li>`).join('')}
                </ol>
            </section>

            <section id="projetos">
                <p class="label">03</p>
                <h2>${esc(T.nav.projects)}</h2>
                <div class="grid">
                    ${C.projects.map(p => `
                        <a class="card" href="${esc(`${C.github}/${p.repo}`)}" target="_blank" rel="noopener">
                            <h3>${esc(p.repo)}</h3>
                            <p>${esc(p[lang])}</p>
                            ${tags(p.stack)}
                        </a>`).join('')}
                </div>
            </section>

            <section id="contato">
                <div class="contact-box">
                    <div>
                        <p class="label">04</p>
                        <h2>${esc(T.contact.title)}</h2>
                        <p>${esc(T.contact.text)}</p>
                    </div>
                    <ul>
                        ${C.contacts.map(c => `<li><span>${esc(c.label)}</span>${ext(c.url, c.text)}</li>`).join('')}
                    </ul>
                </div>
            </section>`;

        footer.textContent = `© ${new Date().getFullYear()} ${C.name}`;
    }

    let lang = initialLang();
    render(lang);

    langBtn.addEventListener('click', () => {
        lang = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
        store.set('lang', lang);
        render(lang);
    });
})();
