// /script.js

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // ==========================================
    // 1. NICHE CONFIGURATION
    // ==========================================
    const nicheConfig = {
        'automotive-sales': {
            label: "Automotive Sales",
            headline: "Automotive E-commerce & Dealership Growth",
            clients: ["overrigsupply.com", "meritautos.com", "dubaicarrent.com", "enjoy-automaten.de", "txeins.de"]
        },
        'auto-services': {
            label: "Auto Services",
            headline: "Lead Gen for Specialized Automotive Services",
            clients: ["vehicledefencekeys.co.uk", "acornschoolofmotoring.co.uk", "compareairportparkingextras.co.uk"]
        },
        'home-construction': {
            label: "Home & HVAC",
            headline: "High-Ticket Leads for Home Services & HVAC",
            clients: ["jackontremodeling.com", "aceroofingenterprises.com", "renovaplus.com.au", "nugenhomes.com", "cagaragedoors.ca", "modernclim.fr", "raplumbingandheating.co.uk", "arthur-bonnet"]
        },
        'lifestyle-fashion': {
            label: "Lifestyle & Fashion",
            headline: "Scaling Fashion & Lifestyle E-commerce",
            clients: ["artistryitalianfashion.com", "scapethreads.com", "homestuff.co.uk", "ospreysports.com", "comfy-land.com", "purebabygallery.co.za", "ivo.lt", "tortoyse.com", "myeveseden.com"]
        },
        'medical-wellness': {
            label: "Medical & Wellness",
            headline: "Patient Acquisition for Medical & Wellness",
            clients: ["doctornow.pt", "memorialspringser.com", "katylakesdentistry.com", "lumiskn.com", "bsblates.com", "k9wellnessacademy.com"]
        },
        'real-estate': {
            label: "Real Estate",
            headline: "Real Estate & Property Investment Marketing",
            clients: ["knightbain.co.uk", "lifeplusinvestments.com", "leasetodaybuylater.com"]
        },
        'food-catering': {
            label: "Food & Hospitality",
            headline: "Bookings & Growth for Hospitality",
            clients: ["creationsculinarycatering.com", "zeffertandgold.com", "trois-saveurs.be"]
        },
        'tech-education': {
            label: "Tech & SaaS",
            headline: "Growth for SaaS, Education & Agencies",
            clients: ["applyai.pro", "webrtccourse.com", "aspirehub.com", "serpinstitute.org", "techcyclesolution.com", "gamestorywriter.com", "inmyvoicekids", "stellasroomstudio.com", "kennasatodesigns.com"]
        },
        'industrial-b2b': {
            label: "Industrial B2B",
            headline: "B2B Leads for Industrial & Commercial Services",
            clients: ["raftmetal.ro", "powerhouseenergytx.com", "rocketcleaningsolutions.com", "cleaningpal.co"]
        }
    };

    // Helper: Normalize URL
    const normalizeUrl = (url) => {
        if (!url) return '';
        return url.toLowerCase()
            .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
            .replace(/\/$/, ""); 
    };

    // ==========================================
    // 2. EXISTING CORE FUNCTIONS (Kept Intact)
    // ==========================================

    // --- Mobile menu toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

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
        const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
        if(elements) elements.forEach(el => observer.observe(el));
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

    // ==========================================
    // 3. UPGRADED PROJECT RENDERING & FILTERING
    // ==========================================
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtonsContainer = document.getElementById('project-filters');
    const filterButtons = filterButtonsContainer ? filterButtonsContainer.querySelectorAll('.filter-btn') : [];
    const sectionTitle = document.getElementById('projects-section-title'); 
    const nicheContainer = document.getElementById('niche-filter-container');
    
    // --- Infinite Scroll Variables ---
    const loaderContainer = document.getElementById('infinite-scroll-trigger');
    const BATCH_SIZE = 9;       
    let currentFilteredList = []; 
    let currentRenderedCount = 0; 

    // --- FIX 1: createProjectCard ---
    // Removed 'opacity-0' class which was hiding the cards permanently
    const createProjectCard = (project) => {
        const projectCard = document.createElement('div');
        const projectIdentifier = project.slug ? project.slug : project.id;
        
        // Use 'scroll-animate' (which has opacity: 0 in CSS) but REMOVED 'opacity-0' (Tailwind)
        projectCard.className = "bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 scroll-animate flex flex-col";
        
        const imageSrc = (project.images && project.images.length > 0) ? project.images[0] : 'https://via.placeholder.com/600x400';

        projectCard.innerHTML = `
            <div class="relative">
                <img src="${imageSrc}" alt="${project.title}" class="w-full h-56 object-cover flex-shrink-0">
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
        return projectCard;
    };

    // --- FIX 2: loadNextBatch ---
    // Added direct observer.observe(card) to ensure animation triggers immediately
    const loadNextBatch = () => {
        if (currentRenderedCount >= currentFilteredList.length) {
            if (loaderContainer) loaderContainer.classList.remove('visible');
            return;
        }

        if (loaderContainer) loaderContainer.classList.add('visible');

        // Small delay for smooth effect
        setTimeout(() => {
            const nextBatch = currentFilteredList.slice(currentRenderedCount, currentRenderedCount + BATCH_SIZE);
            
            nextBatch.forEach(project => {
                const card = createProjectCard(project);
                if(projectsGrid) {
                    projectsGrid.appendChild(card);
                    // Manually observe the new card so it fades in
                    observer.observe(card);
                }
            });

            currentRenderedCount += nextBatch.length;
            lucide.createIcons();

            if (currentRenderedCount >= currentFilteredList.length) {
                if (loaderContainer) loaderContainer.classList.remove('visible');
            }
        }, 300); // Reduced delay slightly for snappier feel
    };


    // --- Render Function ---
    const renderProjects = (filterType, filterValue) => {
        if (!projectsGrid || typeof projects === 'undefined') return;

        let headlineText = "Featured Projects";
        currentFilteredList = []; 

        // --- FILTER LOGIC ---
        if (filterType === 'niche') {
            const config = nicheConfig[filterValue];
            if (config) {
                headlineText = config.headline;
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                document.querySelectorAll('.niche-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.niche === filterValue);
                });

                const targetClients = config.clients.map(c => normalizeUrl(c));
                currentFilteredList = projects.filter(project => {
                    const website = project.details && project.details.website ? normalizeUrl(project.details.website) : '';
                    return targetClients.some(client => website.includes(client));
                });
            }
        } else {
            const category = filterValue || filterType; 
            
            headlineText = category === 'all' ? "Featured Projects" : 
                           category === 'featured' ? "Featured Projects" : 
                           `${category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`; 
            
            if(document.querySelectorAll('.niche-btn').length > 0) {
                document.querySelectorAll('.niche-btn').forEach(btn => btn.classList.remove('active'));
            }

            currentFilteredList = projects.filter(project => {
                if (category === 'all') return true;
                if (!project.tags) return false;
                return project.tags.includes(category); 
            });
        }

        // Update Headline
        if (sectionTitle) sectionTitle.textContent = headlineText;

        // Reset Grid & Count
        projectsGrid.innerHTML = ''; 
        currentRenderedCount = 0;

        // Handle Empty Results
        if (currentFilteredList.length === 0) {
            projectsGrid.innerHTML = `<p class="text-gray-500 text-center col-span-full">No projects found in this category.</p>`;
            if (loaderContainer) loaderContainer.classList.remove('visible');
            return;
        }

        // --- Trigger first batch ---
        loadNextBatch();
    };

    // --- Infinite Scroll Observer ---
    if (loaderContainer) {
        const infiniteScrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && currentRenderedCount < currentFilteredList.length) {
                    loadNextBatch();
                }
            });
        }, { rootMargin: '100px' });
        infiniteScrollObserver.observe(loaderContainer);
    }

    // --- Event Listeners for Standard Buttons ---
    if (filterButtonsContainer) {
        filterButtonsContainer.addEventListener('click', (e) => {
            const target = e.target.closest('.filter-btn');
            if (!target) return;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');

            const category = target.dataset.category;
            const newUrl = window.location.pathname; 
            window.history.pushState({path: newUrl}, '', newUrl);

            renderProjects('service', category);
        });
    }

    // ==========================================
    // 4. GENERATE NICHE BUTTONS & URL LOGIC
    // ========================================== 
    if (nicheContainer) {
        Object.keys(nicheConfig).forEach(key => {
            const config = nicheConfig[key];
            const btn = document.createElement('button');
            btn.className = 'niche-btn'; 
            btn.dataset.niche = key;
            btn.textContent = config.label;
            
            btn.addEventListener('click', () => {
                const newUrl = window.location.pathname + '?category=' + key;
                window.history.pushState({path: newUrl}, '', newUrl);
                renderProjects('niche', key);
            });
            
            nicheContainer.appendChild(btn);
        });
    }

    // --- Mobile Scroll Arrows Logic ---
    const scrollWrapper = document.getElementById('niche-filter-container');
    const leftBtn = document.getElementById('niche-scroll-left');
    const rightBtn = document.getElementById('niche-scroll-right');

    if (scrollWrapper && leftBtn && rightBtn) {
        const updateArrows = () => {
            if (scrollWrapper.scrollLeft > 10) {
                leftBtn.classList.remove('hidden');
                leftBtn.classList.add('flex');
            } else {
                leftBtn.classList.add('hidden');
                leftBtn.classList.remove('flex');
            }
            const maxScrollLeft = scrollWrapper.scrollWidth - scrollWrapper.clientWidth - 2;
            if (scrollWrapper.scrollLeft >= maxScrollLeft) {
                rightBtn.classList.add('hidden');
                rightBtn.classList.remove('flex');
            } else {
                rightBtn.classList.remove('hidden');
                rightBtn.classList.add('flex');
            }
        };

        leftBtn.addEventListener('click', () => scrollWrapper.scrollBy({ left: -200, behavior: 'smooth' }));
        rightBtn.addEventListener('click', () => scrollWrapper.scrollBy({ left: 200, behavior: 'smooth' }));
        scrollWrapper.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows);
        setTimeout(updateArrows, 100);
    }

    // Check URL on Load
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam && nicheConfig[categoryParam]) {
        renderProjects('niche', categoryParam);
        setTimeout(() => {
            const gridSection = document.getElementById('projects-section-title');
            if(gridSection) gridSection.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    } else {
        renderProjects('service', 'all');
    }

    // Handle Back Button
    window.addEventListener('popstate', () => {
        const currentParams = new URLSearchParams(window.location.search);
        const currentCat = currentParams.get('category');
        if (currentCat && nicheConfig[currentCat]) {
            renderProjects('niche', currentCat);
        } else {
            const allBtn = document.querySelector('[data-category="all"]');
            if(allBtn) allBtn.click();
            else renderProjects('service', 'all');
        }
    });
    // ==========================================
    // 5. NAVIGATION FIX (Add this to bottom of script.js)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Stop default jump
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 1. Close Mobile Menu (if open)
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }

                // 2. Smooth Scroll with Header Offset
                // This ensures the title isn't hidden behind your menu bar
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});