const modal = document.getElementById('contactModal');
const btn = document.getElementById('contactBtn');
const closeBtn = document.getElementById('closeBtn');

const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

const openModal = () => {
    if (modal.classList.contains('active')) return;
    const scrollWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollWidth}px`;
    modal.classList.add('active');
};

const closeModal = () => {
    if (!modal.classList.contains('active')) return;
    modal.classList.remove('active');
    setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '0';
    }, 300);
};

btn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// --- Тема ---
const themeToggle = document.getElementById('theme-toggle');

const updateIcon = (theme) => {
    themeToggle.innerHTML = theme === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
};

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

// --- Navbar ---
const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
const navBurger = document.getElementById('navBurger');
const navMobile = document.getElementById('navMobile');

// Scrolled effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Burger menu
navBurger.addEventListener('click', () => {
    navBurger.classList.toggle('open');
    navMobile.classList.toggle('open');
    document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
});

// Закриття мобільного меню при кліку на посилання
navMobile.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navBurger.classList.remove('open');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Плавна прокрутка для всіх nav-link
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    });
});

// Active link при скролі
const sections = document.querySelectorAll('header, section, main, footer[id]');
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('[id]').forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// --- About counters ---
const animateCounters = () => {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(update);
            } else {
                counter.textContent = target + '+';
            }
        };
        update();
    });
};

// Запускаємо коли секція видима
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const aboutSection = document.querySelector('.about-section');
if (aboutSection) aboutObserver.observe(aboutSection);

// --- Scroll animations ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.project-card, .stat-card, .card, .about-text').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
});

// --- Scroll to top ---
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});