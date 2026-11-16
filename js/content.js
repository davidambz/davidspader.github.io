// All site content lives here, in Portuguese (pt) and English (en).
// To update the site, edit this file only.
window.CONTENT = {
    shared: {
        name: 'David Ambrozio',
        startYear: 2018,
        avatar: './assets/img/avatar.png',
        links: {
            email: 'mailto:davidambroziodev@gmail.com',
            github: 'https://github.com/davidambz',
            linkedin: 'https://www.linkedin.com/in/david-spader-ambrozio-2b4139124/',
            bluesky: 'https://bsky.app/profile/davidambz.dev',
        },
    },

    pt: {
        htmlLang: 'pt-br',
        title: 'David Ambrozio — Desenvolvedor Backend',
        role: 'Desenvolvedor Backend',
        status: 'Aberto a oportunidades',
        intro: 'APIs e microsserviços em Python e Node.js, de Bombinhas, SC para o mundo. Programando profissionalmente desde 2018.',
        resume: { label: 'Baixar currículo', file: './assets/curriculum/Currículo - David Ambrozio.pdf' },
        nav: { about: 'Sobre', experience: 'Experiência', projects: 'Projetos', contact: 'Contato' },
        langSwitch: 'EN',
        about: [
            'Sou desenvolvedor backend, formado em Sistemas para Internet pela UNIVALI e programando profissionalmente desde 2018.',
            'Comecei com PHP, Magento e Rails; hoje trabalho principalmente com Python e Node.js, construindo APIs e microsserviços. Nas horas vagas, gosto de criar meus próprios apps, como o relay e o umbra.',
            'Gosto de APIs bem desenhadas, de sistemas que não caem e de automatizar tudo que é repetitivo.',
        ],
        experience: [
            { role: 'Desenvolvedor Backend', co: 'Finq', when: 'mar 2026 — nov 2026', desc: 'Microsserviços de uma plataforma de educação e carreira no mercado financeiro.' },
            { role: 'Desenvolvedor Fullstack', co: 'Reapho', when: 'jul 2025 — mar 2026', desc: 'Plataforma global de quadrinhos, mangás e webtoons com trilha sonora e efeitos que reagem ao olhar do leitor (eye-tracking).' },
            { role: 'Desenvolvedor Fullstack', co: 'Devhatt', when: 'out 2023 — nov 2024', desc: 'Projetos open source, como o Octopost e o PetDex.' },
            { role: 'Desenvolvedor Fullstack', co: 'Asseinfo', when: 'mai 2021 — ago 2021', desc: 'Sistema de gestão empresarial (ERP).' },
            { role: 'Desenvolvedor Magento', co: 'Híbrido', when: 'fev 2019 — jun 2020', desc: 'E-commerces.' },
            { role: 'Desenvolvedor Web', co: 'Features Design', when: 'jun 2018 — fev 2019', desc: 'Sites para comércios locais.' },
        ],
        projects: {
            relay: 'Compartilhamento de tela peer-to-peer para Windows e Android. Vídeo e som vão direto entre os dispositivos via WebRTC, sem servidor no meio.',
            umbra: 'Papel de parede animado para Windows: vídeo, GIF ou página HTML atrás dos ícones, com um fundo por monitor e pausa automática em jogos.',
            hostly: 'Gestão de reservas para aluguel de temporada: imóveis, intermediadores, reservas e o financeiro de cada estadia.',
        },
        contact: { title: 'Vamos conversar', text: 'Aberto a novas oportunidades como desenvolvedor backend.' },
    },

    en: {
        htmlLang: 'en',
        title: 'David Ambrozio — Backend Developer',
        role: 'Backend Developer',
        status: 'Open to work',
        intro: 'APIs and microservices in Python and Node.js, from Bombinhas, Brazil to the world. Coding professionally since 2018.',
        resume: { label: 'Download resume', file: './assets/curriculum/Resume - David Ambrozio.pdf' },
        nav: { about: 'About', experience: 'Experience', projects: 'Projects', contact: 'Contact' },
        langSwitch: 'PT',
        about: [
            'I\'m a backend developer with a degree in Internet Systems from UNIVALI, coding professionally since 2018.',
            'I started with PHP, Magento and Rails; today I mostly work with Python and Node.js, building APIs and microservices. In my spare time I like building my own apps, like relay and umbra.',
            'I like well-designed APIs, systems that stay up, and automating anything repetitive.',
        ],
        experience: [
            { role: 'Backend Developer', co: 'Finq', when: 'Mar 2026 — Nov 2026', desc: 'Microservices for an education and career platform for the financial market.' },
            { role: 'Fullstack Developer', co: 'Reapho', when: 'Jul 2025 — Mar 2026', desc: 'Global platform for comics, manga and webtoons, with soundtracks and effects that react to where the reader is looking (eye-tracking).' },
            { role: 'Fullstack Developer', co: 'Devhatt', when: 'Oct 2023 — Nov 2024', desc: 'Open source projects such as Octopost and PetDex.' },
            { role: 'Fullstack Developer', co: 'Asseinfo', when: 'May 2021 — Aug 2021', desc: 'Enterprise resource planning (ERP) system.' },
            { role: 'Magento Developer', co: 'Híbrido', when: 'Feb 2019 — Jun 2020', desc: 'E-commerce stores.' },
            { role: 'Web Developer', co: 'Features Design', when: 'Jun 2018 — Feb 2019', desc: 'Websites for local businesses.' },
        ],
        projects: {
            relay: 'Peer-to-peer screen sharing for Windows and Android. Video and sound go straight between devices over WebRTC, with no server in the middle.',
            umbra: 'Animated wallpaper player for Windows: video, GIF or an HTML page behind the desktop icons, with per-monitor backgrounds and auto-pause in games.',
            hostly: 'Booking management for vacation rentals: properties, intermediaries, bookings and the finances of each stay.',
        },
        contact: { title: 'Let\'s talk', text: 'Open to new opportunities as a backend developer.' },
    },

    // Same in both languages: technologies per job (by company) and per project.
    stacks: {
        experience: {
            Finq: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Google Cloud', 'Auth0', 'Stripe', 'Gemini', 'GitHub Actions'],
            Reapho: ['TypeScript', 'NestJS', 'Next.js', 'PostgreSQL', 'Prisma', 'Docker'],
            Devhatt: ['Node.js', 'TypeScript', 'Express', 'Go', 'PostgreSQL', 'Prisma', 'Docker', 'React'],
            Asseinfo: ['Ruby', 'Ruby on Rails', 'JavaScript', 'React', 'PostgreSQL', 'Docker'],
            'Híbrido': ['PHP', 'Magento 1', 'Magento 2', 'MySQL', 'JavaScript', 'Docker'],
            'Features Design': ['PHP', 'WordPress', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
        },
        projects: {
            relay: ['C++', 'TypeScript', 'WebRTC'],
            umbra: ['C++', 'Direct3D', 'TypeScript'],
            hostly: ['TypeScript', 'Node.js', 'Prisma', 'PostgreSQL'],
        },
    },
};
