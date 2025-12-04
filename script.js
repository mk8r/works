// /script.js

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // --- Mobile menu toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- Animate elements on scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    const observeElements = (selector) => {
        document.querySelectorAll(selector).forEach(el => observer.observe(el));
    };
    observeElements('.scroll-animate');

    // --- Active navigation link highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 75) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('nav-link-active', 'font-bold');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav-link-active', 'font-bold');
            }
        });
    });

    // --- Project Generation and Filtering ---
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtonsContainer = document.getElementById('project-filters');
    const filterButtons = filterButtonsContainer.querySelectorAll('.filter-btn');

    const renderProjects = (category = 'all') => {
        if (!projectsGrid || typeof projects === 'undefined') return;

        const filteredProjects = projects.filter(project => 
            category === 'all' || (project.tags && project.tags.includes(category))
        );
        
        projectsGrid.innerHTML = ''; // Clear previous projects

        if (filteredProjects.length === 0) {
            projectsGrid.innerHTML = `<p class="text-gray-500 text-center col-span-full">No projects found in this category.</p>`;
            return;
        }

        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            
            // LOGIC CHANGE: Use the slug if it exists, otherwise use the ID
            const projectIdentifier = project.slug ? project.slug : project.id;

            // Updated HREF to use clean 'projects/#' structure
            // NOTE: Requires 'project.html' to be renamed to 'index.html' inside the /projects/ folder
            projectCard.className = "bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 scroll-animate flex flex-col";
            projectCard.innerHTML = `
                <div class="relative">
                    <img src="${project.images[0]}" alt="${project.title}" class="w-full h-56 object-cover flex-shrink-0">
                    <span class="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">${project.platform}</span>
                </div>
                
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                    <p class="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">${project.description}</p>
                    
                    <div class="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                        <span class="text-xs text-gray-500 font-medium">${project.date}</span>
                        <a href="projects/#${projectIdentifier}" class="text-blue-500 hover:underline font-semibold">View Details →</a>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
        
        observeElements('#projects-grid .scroll-animate');
    };

    filterButtonsContainer.addEventListener('click', (e) => {
        const target = e.target.closest('.filter-btn');
        if (!target) return;

        filterButtons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');

        const category = target.dataset.category;
        renderProjects(category);
    });

    // Initial render of all projects
    renderProjects('all');
});