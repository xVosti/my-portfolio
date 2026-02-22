const modal = document.getElementById('contactModal');
const btn = document.getElementById('contactBtn');
const closeBtn = document.getElementById('closeBtn');

// Функція для обчислення ширини смуги прокрутки
const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

const openModal = () => {
    const scrollWidth = getScrollbarWidth();
    modal.style.display = 'flex';
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollWidth}px`; 
};

const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '0';
    }, 300);
};

btn.onclick = openModal;
closeBtn.onclick = closeModal;
window.onclick = (e) => { if (e.target === modal) closeModal(); };

const themeToggle = document.getElementById('theme-toggle');

const updateIcon = (theme) => {
    themeToggle.innerHTML = theme === 'dark' 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
};

// Перевірка при завантаженні
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.onclick = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
};