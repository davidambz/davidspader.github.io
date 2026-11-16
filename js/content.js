// All site content lives here. To update the site, edit this file only.
//
// - Things that are the same in every language (names, links, dates, technologies)
//   are written once.
// - Anything that changes with the language has a `pt` and an `en` version side by side,
//   so you can't add one and forget the other.
// - Dates are 'YYYY-MM'; the site formats them for each language. `end: null` means "now".
window.CONTENT = {
    name: 'David Ambrozio',
    avatar: './assets/img/avatar.png',
    github: 'https://github.com/davidambz',

    contacts: [
        { label: 'Email', url: 'mailto:davidambroziodev@gmail.com', text: 'davidambroziodev@gmail.com' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/david-spader-ambrozio-2b4139124/', text: 'in/david-spader-ambrozio' },
        { label: 'GitHub', url: 'https://github.com/davidambz', text: 'github.com/davidambz' },
        { label: 'Bluesky', url: 'https://bsky.app/profile/davidambz.dev', text: '@davidambz.dev' },
    ],

    experience: [
        {
            company: 'Finq', start: '2026-03', end: '2026-11',
            stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Google Cloud', 'Auth0', 'Stripe', 'Gemini', 'GitHub Actions'],
            pt: { role: 'Desenvolvedor Backend', desc: 'Microsserviços de uma plataforma de educação e carreira no mercado financeiro.' },
            en: { role: 'Backend Developer', desc: 'Microservices for an education and career platform for the financial market.' },
        },
        {
            company: 'Reapho', start: '2025-07', end: '2026-03',
            stack: ['TypeScript', 'NestJS', 'Next.js', 'PostgreSQL', 'Prisma', 'Docker'],
            pt: { role: 'Desenvolvedor Fullstack', desc: 'Plataforma global de quadrinhos, mangás e webtoons com trilha sonora e efeitos que reagem ao olhar do leitor (eye-tracking).' },
            en: { role: 'Fullstack Developer', desc: 'Global platform for comics, manga and webtoons, with soundtracks and effects that react to where the reader is looking (eye-tracking).' },
        },
        {
            company: 'Devhatt', start: '2023-10', end: '2024-11',
            stack: ['Node.js', 'TypeScript', 'Express', 'Go', 'PostgreSQL', 'Prisma', 'Docker', 'React'],
            pt: { role: 'Desenvolvedor Fullstack', desc: 'Projetos open source, como o Octopost e o PetDex.' },
            en: { role: 'Fullstack Developer', desc: 'Open source projects such as Octopost and PetDex.' },
        },
        {
            company: 'Asseinfo', start: '2021-05', end: '2021-08',
            stack: ['Ruby', 'Ruby on Rails', 'JavaScript', 'React', 'PostgreSQL', 'Docker'],
            pt: { role: 'Desenvolvedor Fullstack', desc: 'Sistema de gestão empresarial (ERP).' },
            en: { role: 'Fullstack Developer', desc: 'Enterprise resource planning (ERP) system.' },
        },
        {
            company: 'Híbrido', start: '2019-02', end: '2020-06',
            stack: ['PHP', 'Magento 1', 'Magento 2', 'MySQL', 'JavaScript', 'Docker'],
            pt: { role: 'Desenvolvedor Magento', desc: 'E-commerces.' },
            en: { role: 'Magento Developer', desc: 'E-commerce stores.' },
        },
        {
            company: 'Features Design', start: '2018-06', end: '2019-02',
            stack: ['PHP', 'WordPress', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
            pt: { role: 'Desenvolvedor Web', desc: 'Sites para comércios locais.' },
            en: { role: 'Web Developer', desc: 'Websites for local businesses.' },
        },
    ],

    // `repo` is the repository name under the GitHub profile above
    projects: [
        {
            repo: 'relay',
            stack: ['C++', 'TypeScript', 'WebRTC'],
            pt: 'Compartilhamento de tela peer-to-peer para Windows e Android. Vídeo e som vão direto entre os dispositivos via WebRTC, sem servidor no meio.',
            en: 'Peer-to-peer screen sharing for Windows and Android. Video and sound go straight between devices over WebRTC, with no server in the middle.',
        },
        {
            repo: 'umbra',
            stack: ['C++', 'Direct3D', 'TypeScript'],
            pt: 'Papel de parede animado para Windows: vídeo, GIF ou página HTML atrás dos ícones, com um fundo por monitor e pausa automática em jogos.',
            en: 'Animated wallpaper player for Windows: video, GIF or an HTML page behind the desktop icons, with per-monitor backgrounds and auto-pause in games.',
        },
        {
            repo: 'hostly',
            stack: ['TypeScript', 'Node.js', 'Prisma', 'PostgreSQL'],
            pt: 'Gestão de reservas para aluguel de temporada: imóveis, intermediadores, reservas e o financeiro de cada estadia.',
            en: 'Booking management for vacation rentals: properties, intermediaries, bookings and the finances of each stay.',
        },
    ],

    // Interface text for each language
    text: {
        pt: {
            locale: 'pt-BR',
            htmlLang: 'pt-br',
            title: 'David Ambrozio — Desenvolvedor Backend',
            role: 'Desenvolvedor Backend',
            status: 'Aberto a oportunidades',
            intro: 'APIs e microsserviços em Python e Node.js, de Bombinhas, SC para o mundo. Programando profissionalmente desde 2018.',
            resume: { label: 'Baixar currículo', file: './assets/curriculum/Currículo - David Ambrozio.pdf' },
            nav: { about: 'Sobre', experience: 'Experiência', projects: 'Projetos', contact: 'Contato' },
            langSwitch: { label: 'EN', aria: 'Switch to English' },
            about: [
                'Sou desenvolvedor backend, formado em Sistemas para Internet pela UNIVALI e programando profissionalmente desde 2018.',
                'Comecei com PHP, Magento e Rails; hoje trabalho principalmente com Python e Node.js, construindo APIs e microsserviços. Nas horas vagas, gosto de criar meus próprios apps, como o relay e o umbra.',
                'Gosto de APIs bem desenhadas, de sistemas que não caem e de automatizar tudo que é repetitivo.',
            ],
            at: '@',
            present: 'atual',
            contact: { title: 'Vamos conversar', text: 'Aberto a novas oportunidades como desenvolvedor backend.' },
        },
        en: {
            locale: 'en-US',
            htmlLang: 'en',
            title: 'David Ambrozio — Backend Developer',
            role: 'Backend Developer',
            status: 'Open to work',
            intro: 'APIs and microservices in Python and Node.js, from Bombinhas, Brazil to the world. Coding professionally since 2018.',
            resume: { label: 'Download resume', file: './assets/curriculum/Resume - David Ambrozio.pdf' },
            nav: { about: 'About', experience: 'Experience', projects: 'Projects', contact: 'Contact' },
            langSwitch: { label: 'PT', aria: 'Mudar para português' },
            about: [
                'I\'m a backend developer with a degree in Internet Systems from UNIVALI, coding professionally since 2018.',
                'I started with PHP, Magento and Rails; today I mostly work with Python and Node.js, building APIs and microservices. In my spare time I like building my own apps, like relay and umbra.',
                'I like well-designed APIs, systems that stay up, and automating anything repetitive.',
            ],
            at: '@',
            present: 'now',
            contact: { title: 'Let\'s talk', text: 'Open to new opportunities as a backend developer.' },
        },
    },
};
