(() => {
    'use strict';

    const C = window.CONTENT;
    const S = C.shared;
    const app = document.getElementById('app');
    const footer = document.getElementById('footer');
    const langBtn = document.getElementById('lang');

    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const ext = (url, text, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${esc(url)}" target="_blank" rel="noopener">${text}</a>`;
    const tags = list => `<ul class="tags">${list.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;

    const store = {
        get(k) { try { return localStorage.getItem(k); } catch { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
    };

    // ?lang=en wins, then the last choice, then the browser language
    function initialLang() {
        const q = new URLSearchParams(location.search).get('lang');
        if (q === 'pt' || q === 'en') return q;
        const saved = store.get('lang');
        if (saved === 'pt' || saved === 'en') return saved;
        return (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
    }

    function render(lang) {
        const T = C[lang];
        const contacts = [
            ['Email', S.links.email, 'davidambroziodev@gmail.com'],
            ['LinkedIn', S.links.linkedin, 'in/david-spader-ambrozio'],
            ['GitHub', S.links.github, 'github.com/davidambz'],
            ['Bluesky', S.links.bluesky, '@davidambz.dev'],
        ];

        document.documentElement.lang = T.htmlLang;
        document.title = T.title;
        langBtn.textContent = T.langSwitch;
        langBtn.setAttribute('aria-label', lang === 'pt' ? 'Switch to English' : 'Mudar para português');
        document.querySelectorAll('[data-t]').forEach(el => {
            el.textContent = el.dataset.t.split('.').reduce((o, k) => o[k], T);
        });

        app.innerHTML = `
            <section class="hero">
                <div class="hero-row">
                    <img class="avatar" src="${S.avatar}" alt="${esc(S.name)}" width="72" height="72" />
                    <span class="status">${esc(T.status)}</span>
                </div>
                <h1>${esc(S.name)}<br><em>${esc(T.role)}</em></h1>
                <p class="intro">${esc(T.intro)}</p>
                <div class="actions">
                    ${ext(encodeURI(T.resume.file), esc(T.resume.label), 'btn primary')}
                    ${ext(S.links.github, 'GitHub', 'btn')}
                    ${ext(S.links.linkedin, 'LinkedIn', 'btn')}
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
                    ${T.experience.map(e => `
                        <li>
                            <div class="when">${esc(e.when)}</div>
                            <div>
                                <h3>${esc(e.role)} <span>@ ${esc(e.co)}</span></h3>
                                <p>${esc(e.desc)}</p>
                                ${tags(C.stacks.experience[e.co] || [])}
                            </div>
                        </li>`).join('')}
                </ol>
            </section>

            <section id="projetos">
                <p class="label">03</p>
                <h2>${esc(T.nav.projects)}</h2>
                <div class="grid">
                    ${Object.entries(T.projects).map(([name, desc]) => `
                        <a class="card" href="${S.links.github}/${name}" target="_blank" rel="noopener">
                            <h3>${esc(name)}</h3>
                            <p>${esc(desc)}</p>
                            ${tags(C.stacks.projects[name] || [])}
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
                        ${contacts.map(([label, url, text]) => `<li><span>${label}</span>${ext(url, esc(text))}</li>`).join('')}
                    </ul>
                </div>
            </section>`;

        footer.textContent = `© ${new Date().getFullYear()} ${S.name}`;
    }

    let lang = initialLang();
    render(lang);

    langBtn.addEventListener('click', () => {
        lang = lang === 'pt' ? 'en' : 'pt';
        store.set('lang', lang);
        render(lang);
    });
})();
