import "./index.css";

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuContent = document.getElementById('menu-content');
    if (menuToggle && menuContent) {
        const menuShowClasses = [
            'flex', 'flex-col', 'gap-4', 'bg-sakura', 'text-tori', 'rounded-lg', 'shadow-lg', 'p-4', 'border', 'border-tori',
            'absolute', 'right-4', 'top-16', 'z-20',
            'md:static', 'md:bg-transparent', 'md:text-tori', 'md:shadow-none', 'md:p-0', 'md:border-0', 'md:flex-row', 'md:gap-8',
            'transition-all', 'duration-300', 'animate-fadeIn'
        ];
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            if (menuContent.classList.contains('hidden')) {
                menuContent.classList.remove('hidden');
                menuShowClasses.forEach(cls => menuContent.classList.add(cls));
                menuContent.classList.add('menu-vertical-enter');
                void menuContent.offsetWidth;
                menuContent.classList.add('menu-vertical-enter-active');
                setTimeout(() => {
                    menuContent.classList.remove('menu-vertical-enter');
                    menuContent.classList.remove('menu-vertical-enter-active');
                }, 350);
            } else {
                menuContent.classList.add('menu-vertical-leave');
                void menuContent.offsetWidth;
                menuContent.classList.add('menu-vertical-leave-active');
                setTimeout(() => {
                    menuContent.classList.remove('menu-vertical-leave');
                    menuContent.classList.remove('menu-vertical-leave-active');
                    menuShowClasses.forEach(cls => menuContent.classList.remove(cls));
                    menuContent.classList.add('hidden');
                }, 350);
            }
        });
        document.addEventListener('click', (event) => {
            if (!menuContent.contains(event.target) && !menuToggle.contains(event.target)) {
                menuShowClasses.forEach(cls => menuContent.classList.remove(cls));
                menuContent.classList.add('hidden');
            }
        });
    }
    const darkToggle = document.getElementById('dark-toggle');
    const html = document.documentElement;
    const userTheme = localStorage.getItem('theme');
    if (userTheme === 'dark') {
        html.classList.add('dark');
    } else if (userTheme === 'light') {
        html.classList.remove('dark');
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const moon = document.getElementById('icon-moon');
            const sun = document.getElementById('icon-sun');
            if (moon && sun) {
                if (html.classList.contains('dark')) {
                    moon.classList.remove('rotate-180');
                    sun.classList.add('rotate-180');
                } else {
                    sun.classList.remove('rotate-180');
                    moon.classList.add('rotate-180');
                }
            }
            if (html.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-fadeIn");
                    entry.target.classList.remove("opacity-0");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    document.querySelectorAll(".content-article").forEach(el => {
        el.classList.add("opacity-0");
        observer.observe(el);
    });
});
