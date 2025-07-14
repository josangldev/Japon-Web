// Importa los estilos principales de la aplicación
import "./index.css";

// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // --- MENÚ HAMBURGUESA (responsive) ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuContent = document.getElementById('menu-content');
    if (menuToggle && menuContent) {
        // Clases que se aplican para mostrar el menú en modo móvil y desktop
        const menuShowClasses = [
            'flex', 'flex-col', 'gap-4', 'bg-sakura', 'text-tori', 'rounded-lg', 'shadow-lg', 'p-4', 'border', 'border-tori',
            'absolute', 'right-4', 'top-16', 'z-20',
            'md:static', 'md:bg-transparent', 'md:text-tori', 'md:shadow-none', 'md:p-0', 'md:border-0', 'md:flex-row', 'md:gap-8',
            'transition-all', 'duration-300', 'animate-fadeIn'
        ];
        // Evento para mostrar/ocultar el menú al hacer click en el botón
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            if (menuContent.classList.contains('hidden')) {
                // Mostrar menú con animación
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
                // Ocultar menú con animación
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
        // Oculta el menú si se hace click fuera de él
        document.addEventListener('click', (event) => {
            if (!menuContent.contains(event.target) && !menuToggle.contains(event.target)) {
                menuShowClasses.forEach(cls => menuContent.classList.remove(cls));
                menuContent.classList.add('hidden');
            }
        });
    }
    // --- MODO OSCURO ---
    const darkToggle = document.getElementById('dark-toggle');
    const html = document.documentElement;
    const userTheme = localStorage.getItem('theme');
    // Aplica el tema guardado por el usuario o el preferido por el sistema
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
    // Evento para alternar entre modo claro y oscuro
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
            // Guarda la preferencia del usuario en localStorage
            if (html.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
    // --- ANIMACIÓN DE APARICIÓN DE ARTÍCULOS AL HACER SCROLL ---
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Añade animación cuando el elemento entra en pantalla
                    entry.target.classList.add("animate-fadeIn");
                    entry.target.classList.remove("opacity-0");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    // Aplica la animación a todos los elementos con la clase .content-article
    document.querySelectorAll(".content-article").forEach(el => {
        el.classList.add("opacity-0");
        observer.observe(el);
    });
});
