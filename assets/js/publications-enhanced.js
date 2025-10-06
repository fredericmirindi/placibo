/* ===== PUBLICATIONS ENHANCED - COMPLETE INTERACTIVE FUNCTIONALITY ===== */
/* Advanced publications search, filtering, and display system with AI background */

class PublicationsShowcase {
    constructor() {
        this.publicationsData = [];
        this.filteredData = [];
        this.currentView = 'grid';
        this.activeCategory = 'all';
        this.stats = {
            totalPapers: 8,
            totalCitations: 145,
            hIndex: 7,
            totalReads: 1300
        };

        // AI Background for Publications page
        this.aiCanvasPublications = null;
        this.aiCtxPublications = null;
        this.nodesPublications = [];
        this.connectionsPublications = [];
        this.particlesPublications = [];
        this.animationIdPublications = null;

        this.init();
    }

    init() {
        this.loadPublicationsData();
        this.initializeEventListeners();
        this.initializeCategoryFilters();
        this.updateResearchStats();
        this.initializePublicationsAIBackground();
    }

    /* ===== AI BACKGROUND SYSTEM ===== */
    initializePublicationsAIBackground() {
        this.aiCanvasPublications = document.getElementById('aiCanvasPublications');
        if (!this.aiCanvasPublications) return;

        this.aiCtxPublications = this.aiCanvasPublications.getContext('2d');
        this.resizePublicationsCanvas();
        this.createPublicationsNodes();
        this.createPublicationsConnections();
        this.createPublicationsParticles();
        this.animatePublicationsBackground();

        window.addEventListener('resize', () => {
            this.resizePublicationsCanvas();
            this.createPublicationsNodes();
            this.createPublicationsConnections();
        });
    }

    resizePublicationsCanvas() {
        if (!this.aiCanvasPublications) return;
        const rect = this.aiCanvasPublications.parentElement.getBoundingClientRect();
        this.aiCanvasPublications.width = rect.width;
        this.aiCanvasPublications.height = rect.height;
    }

    createPublicationsNodes() {
        if (!this.aiCanvasPublications) return;
        this.nodesPublications = [];
        const nodeCount = Math.min(Math.floor((this.aiCanvasPublications.width * this.aiCanvasPublications.height) / 15000), 50);

        for (let i = 0; i < nodeCount; i++) {
            this.nodesPublications.push({
                x: Math.random() * this.aiCanvasPublications.width,
                y: Math.random() * this.aiCanvasPublications.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2,
                opacity: Math.random() * 0.5 + 0.3,
                pulsePhase: Math.random() * Math.PI * 2,
                connections: 0
            });
        }
    }

    createPublicationsConnections() {
        this.connectionsPublications = [];
        const maxDistance = 150;

        for (let i = 0; i < this.nodesPublications.length; i++) {
            for (let j = i + 1; j < this.nodesPublications.length; j++) {
                const dx = this.nodesPublications[i].x - this.nodesPublications[j].x;
                const dy = this.nodesPublications[i].y - this.nodesPublications[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    this.connectionsPublications.push({
                        nodeA: i,
                        nodeB: j,
                        strength: 1 - (distance / maxDistance),
                        pulsePhase: Math.random() * Math.PI * 2
                    });
                    this.nodesPublications[i].connections++;
                    this.nodesPublications[j].connections++;
                }
            }
        }
    }

    createPublicationsParticles() {
        this.particlesPublications = [];
        const particleCount = Math.min(Math.floor(this.aiCanvasPublications.width / 20), 30);

        for (let i = 0; i < particleCount; i++) {
            this.particlesPublications.push({
                x: Math.random() * this.aiCanvasPublications.width,
                y: Math.random() * this.aiCanvasPublications.height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.4 + 0.2,
                life: Math.random() * 100 + 50
            });
        }
    }

    animatePublicationsBackground() {
        if (!this.aiCanvasPublications || !this.aiCtxPublications) return;

        this.aiCtxPublications.clearRect(0, 0, this.aiCanvasPublications.width, this.aiCanvasPublications.height);
        const time = Date.now() * 0.001;

        // Update and draw connections
        this.aiCtxPublications.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        this.connectionsPublications.forEach(conn => {
            const nodeA = this.nodesPublications[conn.nodeA];
            const nodeB = this.nodesPublications[conn.nodeB];
            if (!nodeA || !nodeB) return;

            const pulse = Math.sin(time * 2 + conn.pulsePhase) * 0.5 + 0.5;
            const opacity = conn.strength * 0.4 * pulse;

            this.aiCtxPublications.globalAlpha = opacity;
            this.aiCtxPublications.lineWidth = 1 + pulse;
            this.aiCtxPublications.beginPath();
            this.aiCtxPublications.moveTo(nodeA.x, nodeA.y);
            this.aiCtxPublications.lineTo(nodeB.x, nodeB.y);
            this.aiCtxPublications.stroke();
        });

        // Update and draw nodes
        this.nodesPublications.forEach((node, i) => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x <= 0 || node.x >= this.aiCanvasPublications.width) node.vx *= -1;
            if (node.y <= 0 || node.y >= this.aiCanvasPublications.height) node.vy *= -1;

            // Keep within bounds
            node.x = Math.max(0, Math.min(this.aiCanvasPublications.width, node.x));
            node.y = Math.max(0, Math.min(this.aiCanvasPublications.height, node.y));

            // Calculate pulse based on connections
            const connectionFactor = Math.min(node.connections / 5, 1);
            const pulse = Math.sin(time * 3 + node.pulsePhase) * 0.3 + 0.7;
            const finalRadius = node.radius * (1 + connectionFactor * 0.5) * pulse;

            // Draw node
            const gradient = this.aiCtxPublications.createRadialGradient(node.x, node.y, 0, node.x, node.y, finalRadius * 2);
            gradient.addColorStop(0, `rgba(0, 255, 136, ${node.opacity * pulse})`);
            gradient.addColorStop(0.5, `rgba(50, 184, 198, ${node.opacity * 0.6 * pulse})`);
            gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');

            this.aiCtxPublications.fillStyle = gradient;
            this.aiCtxPublications.globalAlpha = 1;
            this.aiCtxPublications.beginPath();
            this.aiCtxPublications.arc(node.x, node.y, finalRadius * 2, 0, Math.PI * 2);
            this.aiCtxPublications.fill();

            // Draw core
            this.aiCtxPublications.fillStyle = `rgba(255, 255, 255, ${node.opacity * pulse})`;
            this.aiCtxPublications.beginPath();
            this.aiCtxPublications.arc(node.x, node.y, finalRadius * 0.3, 0, Math.PI * 2);
            this.aiCtxPublications.fill();
        });

        // Update and draw particles
        this.particlesPublications.forEach((particle, i) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;

            // Reset particle when it dies
            if (particle.life <= 0) {
                particle.x = Math.random() * this.aiCanvasPublications.width;
                particle.y = Math.random() * this.aiCanvasPublications.height;
                particle.life = Math.random() * 100 + 50;
            }

            // Wrap around edges
            if (particle.x < 0) particle.x = this.aiCanvasPublications.width;
            if (particle.x > this.aiCanvasPublications.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.aiCanvasPublications.height;
            if (particle.y > this.aiCanvasPublications.height) particle.y = 0;

            // Draw particle
            const alpha = (particle.life / 100) * particle.opacity;
            this.aiCtxPublications.fillStyle = `rgba(100, 255, 200, ${alpha})`;
            this.aiCtxPublications.globalAlpha = alpha;
            this.aiCtxPublications.beginPath();
            this.aiCtxPublications.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.aiCtxPublications.fill();
        });

        this.aiCtxPublications.globalAlpha = 1;
        this.animationIdPublications = requestAnimationFrame(() => this.animatePublicationsBackground());
    }

    /* ===== DATA LOADING ===== */
    loadPublicationsData() {
        // Complete publications data with all 8 papers
        this.publicationsData = [
            {
                title: "Application of machine learning to predict the properties of wood-composite made from PET, HDPE, and PP fibres",
                authors: ["D Mirindi", "D Sinkhonde", "F Mirindi"],
                journal: "Manufacturing Letters",
                year: 2025,
                type: "Article",
                category: ["ai-ml", "sustainability"],
                impact: "high",
                openAccess: true,
                abstract: "Plastic composites provide an eco-friendly substitute for conventional construction materials. This research employs machine learning algorithms for prediction analysis of wood-plastic composite properties.",
                doi: "10.1016/j.mfglet.2025.24-35",
                link: "https://www.sciencedirect.com/science/article/pii/S2213846325000288",
                metrics: { citations: 8, reads: 156, saves: 12, altmetric: 15 },
                keywords: ["Machine Learning", "Sustainability", "Materials", "Prediction", "Composites"]
            },
            {
                title: "Neural Networks for Predicting Market Trends in Sustainable Industries: A Review",
                authors: ["F Mirindi", "D Mirindi"],
                journal: "Recent Advances in Artificial Intelligence for Sustainable Development",
                year: 2025,
                type: "Review",
                category: ["ai-ml", "economics", "sustainability"],
                impact: "very-high",
                openAccess: true,
                abstract: "Neural networks are increasingly acknowledged as effective tools for forecasting market trends in sustainable industries, providing enhanced decision-making capabilities in complex, dynamic environments.",
                doi: "10.2991/978-94-6463-787-8_50",
                link: "https://doi.org/10.2991/978-94-6463-787-8_50",
                metrics: { citations: 31, reads: 287, saves: 19, altmetric: 24 },
                keywords: ["Neural Networks", "Market Prediction", "Sustainability", "Economics", "AI"]
            },
            {
                title: "Forecasting Energy Prices Using Machine Learning Algorithms: A Comparative Analysis",
                authors: ["F Mirindi", "D Mirindi"],
                journal: "Machine Learning Technologies on Energy Economics and Finance",
                year: 2025,
                type: "Article",
                category: ["ai-ml", "economics"],
                impact: "high",
                openAccess: false,
                abstract: "Accurate forecasting of energy prices is crucial for effective decision-making in the energy sector. This chapter explores machine learning applications for energy price prediction.",
                doi: "10.1007/978-3-031-94862-6_6",
                link: "https://link.springer.com/chapter/10.1007/978-3-031-94862-6_6",
                metrics: { citations: 12, reads: 89, saves: 8, altmetric: 18 },
                keywords: ["Energy Economics", "Price Forecasting", "Machine Learning", "Comparative Analysis"]
            },
            {
                title: "Advance toward Artificial Superintelligence with OpenAI's O1 reinforcement learning and ethics",
                authors: ["D Mirindi", "D Sinkhonde", "F Mirindi", "T Bezabih"],
                journal: "2025 6th International Conference on Artificial Intelligence, Robotics",
                year: 2025,
                type: "Conference",
                category: ["ai-ml"],
                impact: "very-high",
                openAccess: true,
                abstract: "This study assesses OpenAI O1's reinforcement learning framework and its potential implications for superintelligence, examining policy initialization, reward design, search mechanisms, and learning processes.",
                doi: "10.1109/AIRC64931.2025.11077494",
                link: "https://doi.org/10.1109/AIRC64931.2025.11077494",
                metrics: { citations: 45, reads: 234, saves: 21, altmetric: 32 },
                keywords: ["Artificial Intelligence", "Reinforcement Learning", "Ethics", "Superintelligence", "OpenAI"]
            },
            {
                title: "Predictive Analytics and Stochastic Programming for Construction Resource Optimization in Developing African Economies",
                authors: ["F Mirindi", "D Mirindi"],
                journal: "African Construction Economics Review",
                year: 2025,
                type: "Article",
                category: ["economics", "ai-ml"],
                impact: "high",
                openAccess: true,
                abstract: "This research investigates AI-driven predictive models for optimizing resource allocation and mitigating economic risks in large-scale construction projects across developing African economies.",
                doi: "10.5281/zenodo.17011408",
                link: "https://doi.org/10.5281/zenodo.17011408",
                metrics: { citations: 7, reads: 76, saves: 5, altmetric: 11 },
                keywords: ["Predictive Analytics", "Economics", "Construction", "Africa", "Optimization"]
            },
            {
                title: "Machine learning-driven analysis of nanoparticle performance on concrete mechanical properties",
                authors: ["D Mirindi", "J Hunter", "D Sinkhonde", "T Bezabih", "F Mirindi"],
                journal: "Green Technologies and Sustainability",
                year: 2025,
                type: "Article",
                category: ["ai-ml", "sustainability"],
                impact: "medium",
                openAccess: true,
                abstract: "This research employs machine learning algorithms to analyze nanoparticle effects on concrete mechanical properties, providing insights for sustainable construction materials.",
                doi: "10.1016/j.grets.2025.100235",
                link: "https://www.sciencedirect.com/science/article/pii/S2949736125000697",
                metrics: { citations: 8, reads: 94, saves: 6, altmetric: 12 },
                keywords: ["Machine Learning", "Nanoparticles", "Concrete", "Materials Science", "Construction"]
            },
            {
                title: "Artificial Intelligence (AI) and automation for driving green transportation systems: A comprehensive review",
                authors: ["D Mirindi", "A Khang", "F Mirindi"],
                journal: "Driving Green Transportation System Through Artificial Intelligence",
                year: 2025,
                type: "Review",
                category: ["ai-ml", "sustainability"],
                impact: "high",
                openAccess: true,
                abstract: "This comprehensive study explores AI, ML, and DL applications in green transportation systems, examining autonomous vehicles, smart traffic management, and sustainable mobility solutions.",
                doi: "10.1007/978-3-031-72617-0_1",
                link: "https://doi.org/10.1007/978-3-031-72617-0_1",
                metrics: { citations: 18, reads: 198, saves: 14, altmetric: 22 },
                keywords: ["Green Transportation", "AI", "Automation", "Sustainability", "Smart Cities"]
            },
            {
                title: "A Review on Aerospace-AI, with Ethics and Implications",
                authors: ["D Mirindi", "D Sinkhonde", "F Mirindi", "T Bezabih"],
                journal: "Aerospace Technology Review",
                year: 2025,
                type: "Review",
                category: ["ai-ml"],
                impact: "high",
                openAccess: false,
                abstract: "Comprehensive review examining AI applications in aerospace, including ML algorithms achieving 10-meter precision in trajectory prediction and 99.89% accuracy in fault detection.",
                doi: "10.11648/j.jccee.20251002.12",
                link: "https://www.sciencepublishinggroup.com/article/10.11648/j.jccee.20251002.12",
                metrics: { citations: 16, reads: 142, saves: 9, altmetric: 19 },
                keywords: ["Aerospace", "AI", "Ethics", "Machine Learning", "Aviation"]
            }
        ];

        this.filteredData = [...this.publicationsData];
        this.populateFilterOptions();
        this.renderPublications();
    }

    /* ===== FILTER SYSTEM ===== */
    populateFilterOptions() {
        // Populate year filter
        const yearSelect = document.getElementById('pubs-year');
        if (yearSelect) {
            const years = [...new Set(this.publicationsData.map(p => p.year))].sort((a, b) => b - a);
            yearSelect.innerHTML = '<option value="all">All Years</option>';
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            });
        }

        // Populate type filter
        const typeSelect = document.getElementById('pubs-type');
        if (typeSelect) {
            const types = [...new Set(this.publicationsData.map(p => p.type))].sort();
            typeSelect.innerHTML = '<option value="all">All Types</option>';
            types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                typeSelect.appendChild(option);
            });
        }
    }

    initializeEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('pubs-search');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(() => {
                this.filterPublications();
            }, 300));
        }

        // Year and type filters
        const yearSelect = document.getElementById('pubs-year');
        const typeSelect = document.getElementById('pubs-type');

        if (yearSelect) {
            yearSelect.addEventListener('change', () => this.filterPublications());
        }
        if (typeSelect) {
            typeSelect.addEventListener('change', () => this.filterPublications());
        }

        // View toggle buttons
        const gridBtn = document.getElementById('view-grid');
        const listBtn = document.getElementById('view-list');

        if (gridBtn) {
            gridBtn.addEventListener('click', () => this.setView('grid'));
        }
        if (listBtn) {
            listBtn.addEventListener('click', () => this.setView('list'));
        }
    }

    initializeCategoryFilters() {
        const categoryFilters = document.querySelectorAll('.category-filter');
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remove active class from all filters
                categoryFilters.forEach(f => f.classList.remove('active'));
                // Add active class to clicked filter
                filter.classList.add('active');
                // Update active category
                this.activeCategory = filter.dataset.category;
                this.filterPublications();
            });
        });

        // Update category counts
        this.updateCategoryCounts();
    }

    updateCategoryCounts() {
        const counts = {
            all: this.publicationsData.length,
            'ai-ml': this.publicationsData.filter(p => p.category.includes('ai-ml')).length,
            economics: this.publicationsData.filter(p => p.category.includes('economics')).length,
            sustainability: this.publicationsData.filter(p => p.category.includes('sustainability')).length
        };

        Object.keys(counts).forEach(key => {
            const mappedKey = key === 'ai-ml' ? 'ai' : key === 'economics' ? 'econ' : key === 'sustainability' ? 'sustain' : key;
            const element = document.getElementById(`count-${mappedKey}`);
            if (element) {
                element.textContent = counts[key];
            }
        });
    }

    /* ===== STATISTICS ===== */
    updateResearchStats() {
        // Update DOM elements with accurate values
        this.updateStatElement('total-papers', '8');
        this.updateStatElement('total-citations', '145');
        this.updateStatElement('h-index', '7');
        this.updateStatElement('total-reads', '1.3K');
    }

    updateStatElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    /* ===== FILTERING LOGIC ===== */
    filterPublications() {
        const searchTerm = document.getElementById('pubs-search')?.value.toLowerCase() || '';
        const yearFilter = document.getElementById('pubs-year')?.value || 'all';
        const typeFilter = document.getElementById('pubs-type')?.value || 'all';

        this.filteredData = this.publicationsData.filter(paper => {
            const matchesSearch = !searchTerm || 
                paper.title.toLowerCase().includes(searchTerm) ||
                paper.journal.toLowerCase().includes(searchTerm) ||
                paper.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
                paper.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));

            const matchesYear = yearFilter === 'all' || paper.year.toString() === yearFilter;
            const matchesType = typeFilter === 'all' || paper.type === typeFilter;
            const matchesCategory = this.activeCategory === 'all' || paper.category.includes(this.activeCategory);

            return matchesSearch && matchesYear && matchesType && matchesCategory;
        });

        this.renderPublications();
        this.showToast(`Found ${this.filteredData.length} publication${this.filteredData.length !== 1 ? 's' : ''}`);
    }

    /* ===== VIEW MANAGEMENT ===== */
    setView(view) {
        this.currentView = view;
        const gridContainer = document.getElementById('pubs-grid');
        const gridBtn = document.getElementById('view-grid');
        const listBtn = document.getElementById('view-list');

        if (gridContainer) {
            gridContainer.classList.toggle('is-list', view === 'list');
        }

        if (gridBtn && listBtn) {
            gridBtn.classList.toggle('active', view === 'grid');
            listBtn.classList.toggle('active', view === 'list');
        }
    }

    /* ===== RENDERING ===== */
    renderPublications() {
        const container = document.getElementById('pubs-grid');
        if (!container) return;

        container.setAttribute('aria-busy', 'true');

        if (this.filteredData.length === 0) {
            container.innerHTML = `
                <div class="pubs__empty">
                    <div class="empty-icon">📚</div>
                    <h3>No publications found</h3>
                    <p>Try adjusting your filters or search terms to find relevant research papers.</p>
                </div>
            `;
            return;
        }

        const publicationsHTML = this.filteredData.map((paper, index) => `
            <article class="pub-card fade-in" style="animation-delay: ${index * 0.1}s" data-category="${paper.category.join(' ')}">
                <div class="pub-card__top">
                    <span class="pub-card__badge pub-card__badge--${paper.type.toLowerCase()}">${paper.type}</span>
                    ${paper.openAccess ? '<span class="pub-card__badge pub-card__badge--open-access">Open Access</span>' : ''}
                </div>
                <div class="pub-card__main">
                    <h3 class="pub-card__title">${paper.title}</h3>
                    <div class="pub-card__authors">
                        ${paper.authors.map(author => `<span class="author${author.includes('F Mirindi') ? ' primary-author' : ''}">${author}</span>`).join('')}
                    </div>
                    <div class="pub-card__meta">
                        <a href="${paper.link}" class="journal" target="_blank" rel="noopener">${paper.journal}</a>
                        <span class="dot">•</span>
                        <span class="year">${paper.year}</span>
                        <span class="dot">•</span>
                        <span class="impact impact--${paper.impact}">${paper.impact.replace('-', ' ')}</span>
                    </div>
                    <p class="pub-card__excerpt">${paper.abstract}</p>
                    <div class="pub-card__metrics">
                        <div class="pub-chip">
                            <i class="icon">📊</i>
                            <span class="num">${paper.metrics.citations}</span>
                            <span>citations</span>
                        </div>
                        <div class="pub-chip">
                            <i class="icon">👁</i>
                            <span class="num">${paper.metrics.reads}</span>
                            <span>reads</span>
                        </div>
                        <div class="pub-chip">
                            <i class="icon">⭐</i>
                            <span class="num">${paper.metrics.altmetric}</span>
                            <span>altmetric</span>
                        </div>
                    </div>
                    <div class="pub-actions">
                        <a href="${paper.link}" class="btn btn--primary btn--sm" target="_blank" rel="noopener">
                            <i class="icon">🔗</i>
                            View Paper
                        </a>
                        <button class="btn btn--secondary btn--sm" onclick="this.parentElement.parentElement.parentElement.parentElement.querySelector('.pub-card__excerpt').style.display = this.parentElement.parentElement.parentElement.parentElement.querySelector('.pub-card__excerpt').style.display === 'none' ? 'block' : 'none'; this.textContent = this.textContent === 'Show Abstract' ? 'Hide Abstract' : 'Show Abstract';">
                            <i class="icon">📄</i>
                            ${this.currentView === 'list' ? 'Toggle Abstract' : 'Abstract'}
                        </button>
                        <button class="btn btn--secondary btn--sm" onclick="navigator.clipboard.writeText('${paper.title} - ${paper.authors.join(', ')} (${paper.year}). ${paper.journal}. DOI: ${paper.doi}'); alert('Citation copied to clipboard!');">
                            <i class="icon">📋</i>
                            Cite
                        </button>
                    </div>
                </div>
            </article>
        `).join('');

        container.innerHTML = publicationsHTML;
        container.setAttribute('aria-busy', 'false');

        // Update results count
        const countElement = document.getElementById('results-count');
        if (countElement) {
            countElement.textContent = `${this.filteredData.length} publications`;
        }
    }

    /* ===== UTILITY FUNCTIONS ===== */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    showToast(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'pubs__toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Hide and remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    /* ===== ADVANCED FEATURES ===== */
    exportPublications(format = 'bibtex') {
        let exportData = '';
        
        if (format === 'bibtex') {
            exportData = this.filteredData.map(paper => {
                const type = paper.type.toLowerCase() === 'article' ? 'article' : 'inproceedings';
                const key = `${paper.authors[0].split(' ').pop().toLowerCase()}${paper.year}${paper.title.split(' ')[0].toLowerCase()}`;
                
                return `@${type}{${key},
  title={${paper.title}},
  author={${paper.authors.join(' and ')}},
  journal={${paper.journal}},
  year={${paper.year}},
  doi={${paper.doi}},
  url={${paper.link}}
}`;
            }).join('\n\n');
        } else if (format === 'csv') {
            const headers = ['Title', 'Authors', 'Journal', 'Year', 'Type', 'DOI', 'Citations'];
            const rows = this.filteredData.map(paper => [
                paper.title,
                paper.authors.join('; '),
                paper.journal,
                paper.year,
                paper.type,
                paper.doi,
                paper.metrics.citations
            ]);
            
            exportData = [headers, ...rows].map(row => 
                row.map(cell => `"${cell}"`).join(',')
            ).join('\n');
        }

        // Download file
        const blob = new Blob([exportData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `publications_${new Date().toISOString().split('T')[0]}.${format === 'bibtex' ? 'bib' : 'csv'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast(`Publications exported as ${format.toUpperCase()}`);
    }

    /* ===== CLEANUP ===== */
    destroy() {
        if (this.animationIdPublications) {
            cancelAnimationFrame(this.animationIdPublications);
        }
        window.removeEventListener('resize', this.resizePublicationsCanvas);
    }
}

// Initialize publications showcase when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.publicationsShowcase = new PublicationsShowcase();
});

// Export functionality for external use
window.exportPublications = (format) => {
    if (window.publicationsShowcase) {
        window.publicationsShowcase.exportPublications(format);
    }
};

/* ===== KEYBOARD SHORTCUTS ===== */
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'f':
                e.preventDefault();
                document.getElementById('pubs-search')?.focus();
                break;
            case 'g':
                e.preventDefault();
                if (window.publicationsShowcase) {
                    window.publicationsShowcase.setView('grid');
                }
                break;
            case 'l':
                e.preventDefault();
                if (window.publicationsShowcase) {
                    window.publicationsShowcase.setView('list');
                }
                break;
        }
    }
});