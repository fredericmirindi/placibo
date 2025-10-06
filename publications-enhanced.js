// ===== PUBLICATIONS PAGE ENHANCED FUNCTIONALITY =====
// Professional publication search, filtering, and display system

class PublicationsManager {
    constructor() {
        this.publications = this.initializePublicationsData();
        this.filteredPublications = [...this.publications];
        this.currentView = 'grid'; // 'grid' or 'list'
        this.currentFilters = {
            search: '',
            type: 'all',
            year: 'all',
            category: 'all'
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderPublications();
        this.updateStats();
        console.log('Publications Manager initialized');
    }

    initializePublicationsData() {
        return [
            {
                id: 1,
                title: "Adaptive Proof-of-Stake Governance: A Game-Theoretic Approach to Consensus Mechanisms",
                authors: ["Frédéric Mirindi", "Dr. Sarah Johnson", "Prof. Michael Chen"],
                year: 2025,
                type: "journal",
                category: "blockchain",
                journal: "Journal of Blockchain Economics",
                status: "Published",
                abstract: "This paper presents a novel approach to proof-of-stake consensus mechanisms using game-theoretic principles. We develop an adaptive governance model that optimizes validator incentives while maintaining network security and decentralization.",
                tags: ["Game Theory", "Blockchain", "Consensus", "Governance"],
                citations: 23,
                downloads: 145,
                doi: "10.1016/j.jbe.2025.01.003",
                pdfUrl: "#",
                bibtexUrl: "#",
                supplementaryUrl: "#"
            },
            {
                id: 2,
                title: "Family Size and Child Outcomes in Sub-Saharan Africa: The Role of Social Norms",
                authors: ["Frédéric Mirindi", "Dr. Amina Hassan", "Prof. David Thompson"],
                year: 2024,
                type: "journal",
                category: "development",
                journal: "Development Economics Review",
                status: "Published",
                abstract: "Using longitudinal data from eight Sub-Saharan African countries, this study examines how family size decisions affect child educational and health outcomes, with particular attention to the mediating role of cultural norms.",
                tags: ["Development Economics", "Family Dynamics", "Education", "Health"],
                citations: 67,
                downloads: 234,
                doi: "10.1080/der.2024.08.015",
                pdfUrl: "#",
                bibtexUrl: "#",
                supplementaryUrl: "#"
            },
            {
                id: 3,
                title: "Machine Learning Applications in Economic Forecasting: A Canadian Perspective",
                authors: ["Frédéric Mirindi", "Prof. Lisa Wang", "Dr. Robert Kumar"],
                year: 2024,
                type: "conference",
                category: "ai-economics",
                journal: "Canadian Economic Association Annual Meeting",
                status: "Presented",
                abstract: "We present novel machine learning techniques for economic forecasting, with specific applications to Canadian macroeconomic indicators. Our models show significant improvement over traditional econometric approaches.",
                tags: ["Machine Learning", "Economic Forecasting", "Canadian Economy", "Time Series"],
                citations: 34,
                downloads: 189,
                doi: "10.2139/ssrn.4567890",
                pdfUrl: "#",
                bibtexUrl: "#",
                supplementaryUrl: "#"
            },
            {
                id: 4,
                title: "Digital Feminism and Social Media Activism: An Intersectional Analysis",
                authors: ["Frédéric Mirindi", "Dr. Emma Rodriguez", "Prof. James Wilson"],
                year: 2024,
                type: "conference",
                category: "digital-society",
                journal: "International Conference on Digital Society",
                status: "Accepted",
                abstract: "This research explores how digital platforms facilitate feminist activism and examines the intersectional approaches to gender equality advocacy in the digital age.",
                tags: ["Digital Society", "Feminism", "Social Media", "Intersectionality"],
                citations: 18,
                downloads: 98,
                doi: "10.1145/ids.2024.098",
                pdfUrl: "#",
                bibtexUrl: "#",
                supplementaryUrl: "#"
            },
            {
                id: 5,
                title: "Cryptocurrency Market Dynamics: A Behavioral Economics Approach",
                authors: ["Frédéric Mirindi", "Dr. Patricia Lee"],
                year: 2023,
                type: "journal",
                category: "blockchain",
                journal: "Behavioral Finance Quarterly",
                status: "Published",
                abstract: "We apply behavioral economics principles to understand cryptocurrency market volatility and investor decision-making patterns, providing insights for market regulation and investor protection.",
                tags: ["Behavioral Economics", "Cryptocurrency", "Market Dynamics", "Volatility"],
                citations: 89,
                downloads: 456,
                doi: "10.1111/bfq.2023.15.4",
                pdfUrl: "#",
                bibtexUrl: "#",
                supplementaryUrl: "#"
            },
            {
                id: 6,
                title: "AI-Enhanced Policy Analysis: Tools for Economic Impact Assessment",
                authors: ["Frédéric Mirindi", "Prof. Alexandra Kim", "Dr. Thomas Brown"],
                year: 2023,
                type: "journal",
                category: "ai-economics",
                journal: "AI & Economics Review",
                status: "Published",
                abstract: "This paper introduces AI-powered tools for policy impact assessment, demonstrating their effectiveness in predicting economic outcomes of government interventions across different sectors.",
                tags: ["Artificial Intelligence", "Policy Analysis", "Economic Impact", "Government Policy"],
                citations: 76,
                downloads: 312,
                doi: "10.1016/j.aieco.2023.09.012",
                pdfUrl: "#",
                bibtexUrl: "#",
                supplementaryUrl: "#"
            },
            {
                id: 7,
                title: "Resource Exploitation and Social Impact in the Democratic Republic of Congo",
                authors: ["Frédéric Mirindi", "Dr. Jean-Baptiste Mukendi", "Prof. Marie Dubois"],
                year: 2023,
                type: "conference",
                category: "development",
                journal: "African Economic Research Consortium Conference",
                status: "Presented",
                abstract: "An historical analysis of resource exploitation patterns in the DRC, from rubber to cobalt, examining the evolving social and economic impacts on local communities.",
                tags: ["African Economics", "Resource Extraction", "Social Impact", "Historical Analysis"],
                citations: 45,
                downloads: 167,
                doi: "10.2139/ssrn.4234567",
                pdfUrl: "#",
                bibtexUrl: "#",
                supplementaryUrl: "#"
            },
            {
                id: 8,
                title: "Hybrid Machine Learning Models for Human-Agent Interaction",
                authors: ["Frédéric Mirindi", "Dr. Carlos Martinez", "Prof. Jennifer Zhang"],
                year: 2023,
                type: "conference",
                category: "ai-economics",
                journal: "International Conference on Human-Agent Interaction",
                status: "Published",
                abstract: "We propose hybrid ML approaches that combine economic theory with agent-based modeling to improve human-computer interaction in economic decision-making contexts.",
                tags: ["Machine Learning", "Human-Computer Interaction", "Agent-Based Modeling", "Decision Making"],
                citations: 28,
                downloads: 134,
                doi: "10.1145/hai.2023.234",
                pdfUrl: "#",
                bibtexUrl: "#",
                supplementaryUrl: "#"
            },
            {
                id: 9,
                title: "Economic Modeling with Neural Networks: A Comparative Study",
                authors: ["Frédéric Mirindi", "Dr. Ahmed Hassan"],
                year: 2022,
                type: "journal",
                category: "ai-economics",
                journal: "Computational Economics",
                status: "Published",
                abstract: "A comprehensive comparison of various neural network architectures for economic modeling, with applications to inflation prediction and GDP forecasting.",
                tags: ["Neural Networks", "Economic Modeling", "Inflation", "GDP Forecasting"],
                citations: 112,
                downloads: 578,
                doi: "10.1007/s10614-022-10234-7",
                pdfUrl: "#",
                bibtexUrl: "#",
                supplementaryUrl: "#"
            },
            {
                id: 10,
                title: "Sustainable Development in Emerging Markets: A Data-Driven Approach",
                authors: ["Frédéric Mirindi", "Prof. Susan Wright", "Dr. Michael O'Connor"],
                year: 2022,
                type: "journal",
                category: "development",
                journal: "Sustainable Development Economics",
                status: "Published",
                abstract: "Using big data analytics to assess sustainable development progress in emerging markets, providing policy recommendations for achieving SDG targets.",
                tags: ["Sustainable Development", "Emerging Markets", "Big Data", "Policy Recommendations"],
                citations: 93,
                downloads: 423,
                doi: "10.1016/j.sde.2022.07.008",
                pdfUrl: "#",
                bibtexUrl: "#",
                supplementaryUrl: "#"
            }
        ];
    }

    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('publications-search');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.currentFilters.search = e.target.value.toLowerCase();
                this.filterAndRenderPublications();
            }, 300));
        }

        // Filter selects
        const typeFilter = document.getElementById('type-filter');
        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.currentFilters.type = e.target.value;
                this.filterAndRenderPublications();
            });
        }

        const yearFilter = document.getElementById('year-filter');
        if (yearFilter) {
            yearFilter.addEventListener('change', (e) => {
                this.currentFilters.year = e.target.value;
                this.filterAndRenderPublications();
            });
        }

        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.filterAndRenderPublications();
            });
        }

        // View toggle buttons
        const gridViewBtn = document.getElementById('grid-view');
        const listViewBtn = document.getElementById('list-view');

        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', () => {
                this.setView('grid');
            });
        }

        if (listViewBtn) {
            listViewBtn.addEventListener('click', () => {
                this.setView('list');
            });
        }

        // Category filter buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-filter')) {
                e.preventDefault();
                
                // Update active states
                document.querySelectorAll('.category-filter').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Apply filter
                this.currentFilters.category = e.target.dataset.category || 'all';
                this.filterAndRenderPublications();
            }
        });
    }

    filterAndRenderPublications() {
        this.filteredPublications = this.publications.filter(pub => {
            // Search filter
            if (this.currentFilters.search && 
                !pub.title.toLowerCase().includes(this.currentFilters.search) &&
                !pub.authors.some(author => author.toLowerCase().includes(this.currentFilters.search)) &&
                !pub.tags.some(tag => tag.toLowerCase().includes(this.currentFilters.search))) {
                return false;
            }

            // Type filter
            if (this.currentFilters.type !== 'all' && pub.type !== this.currentFilters.type) {
                return false;
            }

            // Year filter
            if (this.currentFilters.year !== 'all' && pub.year.toString() !== this.currentFilters.year) {
                return false;
            }

            // Category filter
            if (this.currentFilters.category !== 'all' && pub.category !== this.currentFilters.category) {
                return false;
            }

            return true;
        });

        this.renderPublications();
        this.updateStats();
    }

    setView(view) {
        this.currentView = view;
        
        // Update button states
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.getElementById(`${view}-view`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        this.renderPublications();
    }

    renderPublications() {
        const container = document.getElementById('publications-grid');
        if (!container) return;

        // Update container classes
        container.className = `pubs__grid${this.currentView === 'list' ? ' is-list' : ''}`;

        if (this.filteredPublications.length === 0) {
            container.innerHTML = this.renderEmptyState();
            return;
        }

        const publicationsHTML = this.filteredPublications.map((pub, index) => {
            return this.renderPublicationCard(pub, index);
        }).join('');

        container.innerHTML = publicationsHTML;

        // Animate cards
        setTimeout(() => {
            const cards = container.querySelectorAll('.pubs__item');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }, 50);
    }

    renderPublicationCard(pub, index) {
        const typeIcon = this.getTypeIcon(pub.type);
        const typeBadge = this.getTypeBadge(pub.type);
        const categoryBadge = this.getCategoryBadge(pub.category);

        return `
            <article class="pubs__item fade-in" data-id="${pub.id}">
                <div class="pubs__content">
                    <div class="pubs__header">
                        <div class="pubs__badges">
                            ${typeBadge}
                            ${categoryBadge}
                        </div>
                        <div class="pubs__metrics">
                            <span class="pubs__metric">
                                <i class="fas fa-quote-right"></i>
                                <span class="pubs__metric-value">${pub.citations}</span> citations
                            </span>
                            <span class="pubs__metric">
                                <i class="fas fa-download"></i>
                                <span class="pubs__metric-value">${pub.downloads}</span> downloads
                            </span>
                        </div>
                    </div>
                    
                    <h3 class="pubs__title">
                        <a href="${pub.pdfUrl}" target="_blank">${pub.title}</a>
                    </h3>
                    
                    <div class="pubs__meta">
                        <span class="pubs__authors">${pub.authors.join(', ')}</span>
                        <span class="pubs__year">${pub.year}</span>
                        <span class="pubs__journal">${pub.journal}</span>
                    </div>
                    
                    <p class="pubs__abstract">${pub.abstract}</p>
                    
                    <div class="pubs__tags">
                        ${pub.tags.map(tag => `<span class="pubs__tag">${tag}</span>`).join('')}
                    </div>
                    
                    <div class="pubs__actions">
                        <a href="${pub.pdfUrl}" class="pubs__btn pubs__btn--primary" target="_blank">
                            <i class="fas fa-file-pdf"></i> PDF
                        </a>
                        <a href="${pub.bibtexUrl}" class="pubs__btn pubs__btn--secondary" target="_blank">
                            <i class="fas fa-quote-left"></i> BibTeX
                        </a>
                        <button class="pubs__btn pubs__btn--secondary" onclick="publicationsManager.copyDOI('${pub.doi}')">
                            <i class="fas fa-link"></i> DOI
                        </button>
                        ${pub.supplementaryUrl ? `
                            <a href="${pub.supplementaryUrl}" class="pubs__btn pubs__btn--secondary" target="_blank">
                                <i class="fas fa-database"></i> Data
                            </a>
                        ` : ''}
                    </div>
                </div>
            </article>
        `;
    }

    renderEmptyState() {
        return `
            <div class="pubs__empty">
                <h3>No publications found</h3>
                <p>Try adjusting your search terms or filters to find relevant publications.</p>
                <button class="pubs__btn pubs__btn--primary" onclick="publicationsManager.resetFilters()">
                    Reset Filters
                </button>
            </div>
        `;
    }

    getTypeIcon(type) {
        const icons = {
            journal: 'fas fa-book',
            conference: 'fas fa-users',
            preprint: 'fas fa-file-alt',
            thesis: 'fas fa-graduation-cap'
        };
        return icons[type] || 'fas fa-file';
    }

    getTypeBadge(type) {
        const badges = {
            journal: '<span class="pubs__type pubs__type--journal">Journal Article</span>',
            conference: '<span class="pubs__type pubs__type--conference">Conference Paper</span>',
            preprint: '<span class="pubs__type pubs__type--preprint">Preprint</span>',
            thesis: '<span class="pubs__type pubs__type--thesis">Thesis</span>'
        };
        return badges[type] || '<span class="pubs__type">Publication</span>';
    }

    getCategoryBadge(category) {
        const badges = {
            'ai-economics': '<span class="pubs__category pubs__category--ai">AI & Economics</span>',
            'blockchain': '<span class="pubs__category pubs__category--blockchain">Blockchain</span>',
            'development': '<span class="pubs__category pubs__category--development">Development</span>',
            'digital-society': '<span class="pubs__category pubs__category--digital">Digital Society</span>'
        };
        return badges[category] || '';
    }

    updateStats() {
        const totalPubs = this.publications.length;
        const filteredCount = this.filteredPublications.length;
        const totalCitations = this.publications.reduce((sum, pub) => sum + pub.citations, 0);
        const totalDownloads = this.publications.reduce((sum, pub) => sum + pub.downloads, 0);

        // Update stats if elements exist
        const statsElements = {
            'total-publications': totalPubs,
            'filtered-publications': filteredCount,
            'total-citations': totalCitations,
            'total-downloads': totalDownloads
        };

        Object.entries(statsElements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value.toLocaleString();
            }
        });

        // Update results counter
        const resultsCounter = document.getElementById('results-counter');
        if (resultsCounter) {
            resultsCounter.textContent = `Showing ${filteredCount} of ${totalPubs} publications`;
        }
    }

    resetFilters() {
        // Reset all filters
        this.currentFilters = {
            search: '',
            type: 'all',
            year: 'all',
            category: 'all'
        };

        // Reset form inputs
        const searchInput = document.getElementById('publications-search');
        if (searchInput) searchInput.value = '';

        const selects = ['type-filter', 'year-filter', 'category-filter'];
        selects.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = 'all';
        });

        // Reset category buttons
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        const allCategoriesBtn = document.querySelector('.category-filter[data-category="all"]');
        if (allCategoriesBtn) {
            allCategoriesBtn.classList.add('active');
        }

        this.filterAndRenderPublications();
        this.showToast('Filters reset successfully');
    }

    copyDOI(doi) {
        const doiUrl = `https://doi.org/${doi}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(doiUrl).then(() => {
                this.showToast('DOI link copied to clipboard');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = doiUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast('DOI link copied to clipboard');
        }
    }

    showToast(message) {
        let toast = document.querySelector('.pubs__toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'pubs__toast';
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

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

    // Public methods for external use
    addPublication(publication) {
        this.publications.unshift({
            id: Date.now(),
            ...publication
        });
        this.filterAndRenderPublications();
    }

    removePublication(id) {
        this.publications = this.publications.filter(pub => pub.id !== id);
        this.filterAndRenderPublications();
    }

    getPublicationById(id) {
        return this.publications.find(pub => pub.id === id);
    }

    exportBibTeX() {
        const bibtex = this.filteredPublications.map(pub => {
            return `@article{${pub.authors[0].split(' ')[1]}${pub.year},
  title={${pub.title}},
  author={${pub.authors.join(' and ')}},
  journal={${pub.journal}},
  year={${pub.year}},
  doi={${pub.doi}}
}`;
        }).join('\n\n');

        const blob = new Blob([bibtex], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'publications.bib';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize Publications Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('publications-grid')) {
        window.publicationsManager = new PublicationsManager();
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PublicationsManager;
}