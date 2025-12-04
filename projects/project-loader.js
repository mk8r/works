// /projects/project-loader.js

document.addEventListener('DOMContentLoaded', () => {
    // OLD METHOD: const params = new URLSearchParams(window.location.search);
    
    // NEW METHOD: Get the hash from URL (e.g. "#merit-autos" -> "merit-autos")
    // If no hash is present, fall back to search params for backwards compatibility
    let projectIdOrSlug = window.location.hash.substring(1);
    
    if (!projectIdOrSlug) {
         const params = new URLSearchParams(window.location.search);
         projectIdOrSlug = params.get('id');
    }

    // Find project where slug matches string OR id matches number
    const project = projects.find(p => p.slug === projectIdOrSlug || p.id == projectIdOrSlug);

    const projectContent = document.getElementById('project-content');

    if (project) {
        document.title = `${project.title} | Project Details`;

        // --- Populate Header ---
        document.getElementById('project-platform').textContent = project.platform;
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-date').textContent = project.date || '';

        // --- Populate Overview & Approach ---
        document.getElementById('project-overview').textContent = project.overview;
        document.getElementById('project-approach').textContent = project.approach;

        // --- Populate Stats ---
        const statsContainer = document.getElementById('project-stats');
        statsContainer.innerHTML = '';
        if (project.stats) {
            for (const key in project.stats) {
                const stat = project.stats[key];
                statsContainer.innerHTML += `
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <p class="text-3xl font-bold gradient-text">${stat.value}</p>
                        <p class="text-sm text-gray-500 uppercase tracking-wider">${stat.label}</p>
                    </div>`;
            }
        }

        // --- Populate Images ---
        const imagesContainer = document.getElementById('project-images');
        imagesContainer.innerHTML = '';
        project.images.forEach(imgUrl => {
            imagesContainer.innerHTML += `
                <div class="block rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
                    <img src="${imgUrl}" alt="${project.title} screenshot" class="w-full h-48 object-cover">
                </div>`;
        });
        
        // --- Populate Evidence ---
        const evidenceContainer = document.getElementById('project-evidence');
        evidenceContainer.innerHTML = '';
        if (project.evidence && project.evidence.length > 0) {
            project.evidence.forEach(item => {
                evidenceContainer.innerHTML += `
                    <div class="flex items-start gap-4">
                        <div class="bg-gray-100 text-blue-500 rounded-full p-2 flex-shrink-0">
                            <i data-lucide="${item.icon}" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800">${item.title}</h3>
                            <p class="text-gray-600 text-sm">${item.description}</p>
                        </div>
                    </div>`;
            });
        }
        
        // --- Populate Results ---
        const resultsContainer = document.getElementById('project-results');
        resultsContainer.innerHTML = '';
        project.results.forEach(result => {
            resultsContainer.innerHTML += `
                <div class="flex items-start gap-4">
                    <div class="bg-blue-100 text-blue-500 rounded-full p-2 flex-shrink-0">
                        <i data-lucide="${result.icon}" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-800">${result.title}</h3>
                        <p class="text-gray-600">${result.description}</p>
                    </div>
                </div>`;
        });

        // --- Populate Testimonial ---
        const testimonialContainer = document.getElementById('project-testimonial-container');
        if (project.testimonial) {
            testimonialContainer.innerHTML = `
                <i data-lucide="quote" class="w-8 h-8 text-blue-300 mb-2"></i>
                <p class="text-gray-700 italic mb-4">${project.testimonial}</p>
                <div class="text-right">
                    <p class="font-bold text-gray-800">— ${project.clientName}</p>
                    <p class="text-sm text-gray-500">${project.clientTitle}</p>
                </div>`;
        } else {
            testimonialContainer.style.display = 'none';
        }
        
        // --- Populate Details ---
        const detailsContainer = document.getElementById('project-details');
        detailsContainer.innerHTML = '';
        if (project.details) {
            detailsContainer.innerHTML = `
                <div class="flex items-start gap-3">
                    <i data-lucide="globe" class="w-5 h-5 text-gray-400 mt-1"></i>
                    <div>
                        <h4 class="font-semibold">Website</h4>
                        <a href="${project.details.website}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline break-all">${project.details.website}</a>
                    </div>
                </div>
                <div class="flex items-start gap-3">
                    <i data-lucide="briefcase" class="w-5 h-5 text-gray-400 mt-1"></i>
                    <div>
                        <h4 class="font-semibold">Business</h4>
                        <p class="text-gray-600">${project.details.business}</p>
                    </div>
                </div>
                <div class="flex items-start gap-3 md:col-span-2">
                    <i data-lucide="handshake" class="w-5 h-5 text-gray-400 mt-1"></i>
                    <div>
                        <h4 class="font-semibold">Commitment</h4>
                        <p class="text-gray-600">${project.details.commitment}</p>
                    </div>
                </div>
            `;
        }

    } else {
        projectContent.innerHTML = `
            <div class="text-center">
                <h1 class="text-4xl font-bold mb-4">Project Not Found</h1>
                <p class="text-gray-600 mb-8">Sorry, we couldn't find the project you're looking for.</p>
                <a href="/index.html#projects" class="text-blue-500 hover:underline">← Back to All Projects</a>
            </div>`;
    }
    lucide.createIcons();
});