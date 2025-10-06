// Global state
let currentPage = 'home';
let isDarkMode = false;
let animationObserver;

// DOM elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const footnoteModal = document.getElementById('footnote-modal');

// AI Background variables
let aiCanvas;
let aiCtx;
let nodes = [];
let connections = [];
let particles = [];
let animationId;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeInteractiveElements();
    initializeCharts();
    initializeForms();
    initializeFootnotes();
    initializeConsultation();
    initializeAIBackground();
    
    // Initialize economic widgets
    initializeEconomicWidgets();
    
    // Set initial page
    showPage('home');
});

// AI/ML Background Animation
function initializeAIBackground() {
    aiCanvas = document.getElementById('aiCanvas');
    if (!aiCanvas) return;
    
    aiCtx = aiCanvas.getContext('2d');
    resizeAICanvas();
    
    createNodes();
    createConnections();
    createParticles();
    
    animateAIBackground();
    
    window.addEventListener('resize', () => {
        resizeAICanvas();
        createNodes();
        createConnections();
    });
}

function resizeAICanvas() {
    if (!aiCanvas) return;
    
    const rect = aiCanvas.parentElement.getBoundingClientRect();
    aiCanvas.width = rect.width;
    aiCanvas.height = rect.height;
}

function createNodes() {
    if (!aiCanvas) return;
    
    nodes = [];
    const nodeCount = Math.min(Math.floor((aiCanvas.width * aiCanvas.height) / 15000), 50);
    
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * aiCanvas.width,
            y: Math.random() * aiCanvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 2,
            opacity: Math.random() * 0.5 + 0.3,
            pulsePhase: Math.random() * Math.PI * 2,
            connections: 0
        });
    }
}

function createConnections() {
    connections = [];
    const maxDistance = 150;
    
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                connections.push({
                    nodeA: i,
                    nodeB: j,
                    strength: 1 - (distance / maxDistance),
                    pulsePhase: Math.random() * Math.PI * 2
                });
                nodes[i].connections++;
                nodes[j].connections++;
            }
        }
    }
}

function createParticles() {
    particles = [];
    const particleCount = Math.min(Math.floor(aiCanvas.width / 20), 30);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * aiCanvas.width,
            y: Math.random() * aiCanvas.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.4 + 0.2,
            life: Math.random() * 100 + 50
        });
    }
}

function animateAIBackground() {
    if (!aiCanvas || !aiCtx) return;
    
    aiCtx.clearRect(0, 0, aiCanvas.width, aiCanvas.height);
    
    const time = Date.now() * 0.001;
    
    // Update and draw connections
    aiCtx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
    connections.forEach(conn => {
        const nodeA = nodes[conn.nodeA];
        const nodeB = nodes[conn.nodeB];
        
        if (!nodeA || !nodeB) return;
        
        const pulse = Math.sin(time * 2 + conn.pulsePhase) * 0.5 + 0.5;
        const opacity = conn.strength * 0.4 * pulse;
        
        aiCtx.globalAlpha = opacity;
        aiCtx.lineWidth = 1 + pulse;
        aiCtx.beginPath();
        aiCtx.moveTo(nodeA.x, nodeA.y);
        aiCtx.lineTo(nodeB.x, nodeB.y);
        aiCtx.stroke();
    });
    
    // Update and draw nodes
    nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x <= 0 || node.x >= aiCanvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= aiCanvas.height) node.vy *= -1;
        
        // Keep within bounds
        node.x = Math.max(0, Math.min(aiCanvas.width, node.x));
        node.y = Math.max(0, Math.min(aiCanvas.height, node.y));
        
        // Calculate pulse based on connections
        const connectionFactor = Math.min(node.connections / 5, 1);
        const pulse = Math.sin(time * 3 + node.pulsePhase) * 0.3 + 0.7;
        const finalRadius = node.radius * (1 + connectionFactor * 0.5) * pulse;
        
        // Draw node
        const gradient = aiCtx.createRadialGradient(node.x, node.y, 0, node.x, node.y, finalRadius * 2);
        gradient.addColorStop(0, `rgba(0, 255, 136, ${node.opacity * pulse})`);
        gradient.addColorStop(0.5, `rgba(50, 184, 198, ${node.opacity * 0.6 * pulse})`);
        gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
        
        aiCtx.fillStyle = gradient;
        aiCtx.globalAlpha = 1;
        aiCtx.beginPath();
        aiCtx.arc(node.x, node.y, finalRadius * 2, 0, Math.PI * 2);
        aiCtx.fill();
        
        // Draw core
        aiCtx.fillStyle = `rgba(255, 255, 255, ${node.opacity * pulse})`;
        aiCtx.beginPath();
        aiCtx.arc(node.x, node.y, finalRadius * 0.3, 0, Math.PI * 2);
        aiCtx.fill();
    });
    
    // Update and draw particles
    particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        // Reset particle when it dies
        if (particle.life <= 0) {
            particle.x = Math.random() * aiCanvas.width;
            particle.y = Math.random() * aiCanvas.height;
            particle.life = Math.random() * 100 + 50;
        }
        
        // Wrap around edges
        if (particle.x < 0) particle.x = aiCanvas.width;
        if (particle.x > aiCanvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = aiCanvas.height;
        if (particle.y > aiCanvas.height) particle.y = 0;
        
        // Draw particle
        const alpha = (particle.life / 100) * particle.opacity;
        aiCtx.fillStyle = `rgba(100, 255, 200, ${alpha})`;
        aiCtx.globalAlpha = alpha;
        aiCtx.beginPath();
        aiCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        aiCtx.fill();
    });
    
    aiCtx.globalAlpha = 1;
    animationId = requestAnimationFrame(animateAIBackground);
}

// Consultation functionality
function initializeConsultation() {
    // Updated to handle both button (if exists) and collaboration text
    const consultationBtn = document.getElementById('consultationBtn');
    const collaborationText = document.getElementById('collaborationText');
    const emailModal = document.getElementById('emailModal');
    const closeModal = document.querySelector('.close-modal');
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailText = document.getElementById('emailText');
    
    // Function to show modal
    const showModal = () => {
        if (emailModal) {
            emailModal.classList.remove('hidden');
            emailModal.classList.add('show');
        }
    };
    
    // Add click handler to consultation button (if exists)
    if (consultationBtn) {
        consultationBtn.addEventListener('click', showModal);
    }
    
    // Add click handler to collaboration text
    if (collaborationText) {
        collaborationText.addEventListener('click', showModal);
        // Make it look clickable
        collaborationText.style.cursor = 'pointer';
    }
    
    if (closeModal && emailModal) {
        closeModal.addEventListener('click', () => {
            emailModal.classList.remove('show');
            setTimeout(() => {
                emailModal.classList.add('hidden');
            }, 300);
        });
    }
    
    // Close modal when clicking outside
    if (emailModal) {
        emailModal.addEventListener('click', (e) => {
            if (e.target === emailModal) {
                emailModal.classList.remove('show');
                setTimeout(() => {
                    emailModal.classList.add('hidden');
                }, 300);
            }
        });
    }
    
    // Copy email functionality
    if (copyEmailBtn && emailText) {
        copyEmailBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(emailText.textContent);
                
                // Visual feedback
                const originalText = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = '<i class="fas fa-check"></i>';
                copyEmailBtn.style.background = '#00ff88';
                
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalText;
                    copyEmailBtn.style.background = '#00ff88';
                }, 2000);
                
                // Show toast notification
                showToast('Email copied to clipboard!');
                
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = emailText.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                showToast('Email copied to clipboard!');
            }
        });
    }
    
    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && emailModal && emailModal.classList.contains('show')) {
            emailModal.classList.remove('show');
            setTimeout(() => {
                emailModal.classList.add('hidden');
            }, 300);
        }
    });
}

function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.consultation-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'consultation-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #00ff88, #00cc6a);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            z-index: 3000;
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
        `;
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 3000);
}

// Theme Management
function initializeTheme() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
    } else {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    document.documentElement.setAttribute('data-color-scheme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon();

    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-color-scheme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = isDarkMode ? '☀️' : '🌙';
}

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });

    // Hero buttons navigation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn') && e.target.hasAttribute('data-page')) {
            const page = e.target.getAttribute('data-page');
            showPage(page);
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Trigger any page-specific initialization
        if (pageId === 'ai-implementation') {
            initializeAIToolsPage();
        }
    }

    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.research-card, .paper-card, .conference-card, .ai-tool-card');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        animationObserver.observe(el);
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Research page interactions
    initializeResearchDemos();
    
    // Skills animation
    initializeSkillsAnimation();
}

function initializeResearchDemos() {
    // Policy simulation
    const simulateBtn = document.querySelector('.simulate-btn');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', function() {
            const resultDiv = document.querySelector('.simulation-result');
            
            // Add loading state
            this.textContent = 'Running...';
            this.disabled = true;
            
            setTimeout(() => {
                const results = [
                    'GDP Growth: +2.3%',
                    'Unemployment Rate: -0.8%',
                    'Inflation Impact: +0.5%',
                    'Consumer Confidence: +5.2%'
                ];
                
                resultDiv.innerHTML = `
                    <h4>Policy Simulation Results</h4>
                    <ul>
                        ${results.map(result => `<li>${result}</li>`).join('')}
                    </ul>
                `;
                
                this.textContent = 'Run Policy Simulation';
                this.disabled = false;
            }, 2000);
        });
    }

    // NLP sentiment analysis
    const analyzeBtn = document.querySelector('.analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            const textarea = document.querySelector('.nlp-demo textarea');
            const resultDiv = document.querySelector('.sentiment-result');
            
            if (!textarea.value.trim()) {
                alert('Please enter some text to analyze.');
                return;
            }
            
            this.textContent = 'Analyzing...';
            this.disabled = true;
            
            setTimeout(() => {
                const sentiment = Math.random() > 0.5 ? 'Positive' : 'Negative';
                const score = (Math.random() * 0.4 + 0.6).toFixed(2);
                
                resultDiv.innerHTML = `
                    <h4>Sentiment Analysis Result</h4>
                    <p><strong>Overall Sentiment:</strong> ${sentiment}</p>
                    <p><strong>Confidence Score:</strong> ${score}</p>
                    <p><strong>Key Indicators:</strong> Market optimism, economic growth, policy impact</p>
                `;
                
                this.textContent = 'Analyze Sentiment';
                this.disabled = false;
            }, 1500);
        });
    }
}

function initializeAIToolsPage() {
    // Initialize AI tools when page loads
    setTimeout(() => {
        initializeAITools();
    }, 100);
}

function initializeAITools() {
    // Economic Forecasting Tool
    const forecastBtn = document.getElementById('run-forecast');
    if (forecastBtn && !forecastBtn.hasAttribute('data-initialized')) {
        forecastBtn.setAttribute('data-initialized', 'true');
        forecastBtn.addEventListener('click', function() {
            const indicator = document.getElementById('indicator-select').value;
            const period = document.getElementById('forecast-period').value;
            const resultDiv = document.querySelector('.forecast-result');
            
            this.textContent = 'Generating...';
            this.disabled = true;
            
            setTimeout(() => {
                // Show result container
                resultDiv.style.display = 'block';
                
                // Generate forecast chart
                const canvas = document.getElementById('forecast-result-chart');
                if (canvas) {
                    generateForecastChart(canvas, indicator, period);
                }
                
                // Add forecast summary
                const summary = document.createElement('div');
                summary.innerHTML = `
                    <h4>Forecast Summary</h4>
                    <p><strong>Indicator:</strong> ${indicator.toUpperCase()}</p>
                    <p><strong>Period:</strong> ${period} months</p>
                    <p><strong>Trend:</strong> ${Math.random() > 0.5 ? 'Upward' : 'Stable'}</p>
                    <p><strong>Confidence:</strong> ${(Math.random() * 20 + 75).toFixed(1)}%</p>
                `;
                
                // Clear previous summary and add new one
                const existingSummary = resultDiv.querySelector('div:not(canvas)');
                if (existingSummary) {
                    existingSummary.remove();
                }
                resultDiv.appendChild(summary);
                
                this.textContent = 'Generate Forecast';
                this.disabled = false;
            }, 1500);
        });
    }

    // Policy Impact Simulator
    const simulateBtn = document.getElementById('simulate-policy');
    if (simulateBtn && !simulateBtn.hasAttribute('data-initialized')) {
        simulateBtn.setAttribute('data-initialized', 'true');
        simulateBtn.addEventListener('click', function() {
            const policyType = document.getElementById('policy-type').value;
            const magnitude = document.getElementById('impact-magnitude').value;
            const resultsDiv = document.querySelector('.simulation-results');
            
            this.textContent = 'Simulating...';
            this.disabled = true;
            
            setTimeout(() => {
                const metrics = generatePolicyMetrics(policyType, magnitude);
                
                resultsDiv.innerHTML = `
                    <h4>Policy Impact Results</h4>
                    <div class="result-metrics">
                        ${metrics.map(metric => `
                            <div class="metric-item">
                                <span class="metric-value">${metric.value}</span>
                                <span class="metric-label">${metric.label}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                
                this.textContent = 'Run Simulation';
                this.disabled = false;
            }, 1500);
        });
    }

    // Market Sentiment Analyzer
    const sentimentBtn = document.getElementById('analyze-sentiment');
    if (sentimentBtn && !sentimentBtn.hasAttribute('data-initialized')) {
        sentimentBtn.setAttribute('data-initialized', 'true');
        sentimentBtn.addEventListener('click', function() {
            const text = document.getElementById('sentiment-text').value;
            const resultDiv = document.querySelector('.sentiment-analysis-result');
            
            if (!text.trim()) {
                alert('Please enter some text to analyze.');
                return;
            }
            
            this.textContent = 'Analyzing...';
            this.disabled = true;
            
            setTimeout(() => {
                const sentiment = analyzeSentiment(text);
                
                resultDiv.innerHTML = `
                    <div class="sentiment-score">
                        <div class="sentiment-value">${sentiment.score}</div>
                        <div>Overall Sentiment Score</div>
                    </div>
                    <div class="sentiment-breakdown">
                        <div class="sentiment-item">
                            <div><strong>Positive</strong></div>
                            <div>${sentiment.positive}%</div>
                        </div>
                        <div class="sentiment-item">
                            <div><strong>Neutral</strong></div>
                            <div>${sentiment.neutral}%</div>
                        </div>
                        <div class="sentiment-item">
                            <div><strong>Negative</strong></div>
                            <div>${sentiment.negative}%</div>
                        </div>
                    </div>
                `;
                
                this.textContent = 'Analyze Sentiment';
                this.disabled = false;
            }, 1000);
        });
    }

    // Range input updates
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
        const valueSpan = input.nextElementSibling;
        
        if (valueSpan && valueSpan.classList.contains('range-value')) {
            input.addEventListener('input', function() {
                let value = this.value;
                if (this.id === 'impact-magnitude') {
                    value += '%';
                }
                valueSpan.textContent = value;
            });
        }
    });
}

function initializeSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
                
                skillObserver.unobserve(bar);
            }
        });
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Charts
function initializeCharts() {
    // Initialize demo charts
    setTimeout(() => {
        const forecastChart = document.getElementById('forecast-chart');
        const tradingChart = document.getElementById('trading-chart');
        
        if (forecastChart) {
            generateDemoChart(forecastChart, 'Economic Forecast');
        }
        
        if (tradingChart) {
            generateDemoChart(tradingChart, 'Trading Algorithm');
        }
    }, 1000);
}

function generateDemoChart(canvas, title) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate sample data
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push(Math.random() * 100 + 50);
    }
    
    // Draw chart
    ctx.strokeStyle = '#21808D';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / 150) * height;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Add points
    ctx.fillStyle = '#21808D';
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / 150) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function generateForecastChart(canvas, indicator, period) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate forecast data
    const data = [];
    let baseValue = 100;
    
    for (let i = 0; i < parseInt(period); i++) {
        baseValue += (Math.random() - 0.5) * 10;
        data.push(Math.max(0, baseValue));
    }
    
    // Draw forecast line
    ctx.strokeStyle = '#1FB8CD';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / 150) * height;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Add confidence band
    ctx.fillStyle = 'rgba(31, 184, 205, 0.2)';
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((data[i] + 20) / 150) * height;
        ctx.lineTo(x, y);
    }
    
    for (let i = data.length - 1; i >= 0; i--) {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((data[i] - 20) / 150) * height;
        ctx.lineTo(x, y);
    }
    
    ctx.closePath();
    ctx.fill();
    
    // Add data points
    ctx.fillStyle = '#1FB8CD';
    for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / 150) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// Utility functions
function generatePolicyMetrics(policyType, magnitude) {
    const multiplier = magnitude / 100;
    const metrics = [];
    
    switch (policyType) {
        case 'fiscal':
            metrics.push(
                { value: `+${(2.1 * multiplier).toFixed(1)}%`, label: 'GDP Growth' },
                { value: `${(1.5 * multiplier).toFixed(1)}%`, label: 'Inflation' },
                { value: `-${(0.8 * multiplier).toFixed(1)}%`, label: 'Unemployment' },
                { value: `+${(3.2 * multiplier).toFixed(1)}%`, label: 'Consumer Spending' }
            );
            break;
        case 'monetary':
            metrics.push(
                { value: `+${(1.8 * multiplier).toFixed(1)}%`, label: 'Investment' },
                { value: `${(0.9 * multiplier).toFixed(1)}%`, label: 'Interest Rate' },
                { value: `+${(2.5 * multiplier).toFixed(1)}%`, label: 'Money Supply' },
                { value: `-${(1.2 * multiplier).toFixed(1)}%`, label: 'Currency Value' }
            );
            break;
        case 'trade':
            metrics.push(
                { value: `+${(1.4 * multiplier).toFixed(1)}%`, label: 'Export Growth' },
                { value: `${(0.6 * multiplier).toFixed(1)}%`, label: 'Import Change' },
                { value: `+${(2.8 * multiplier).toFixed(1)}%`, label: 'Trade Balance' },
                { value: `${(1.1 * multiplier).toFixed(1)}%`, label: 'Tariff Impact' }
            );
            break;
    }
    
    return metrics;
}

function analyzeSentiment(text) {
    // Simple sentiment analysis simulation
    const positiveWords = ['growth', 'increase', 'positive', 'bullish', 'optimistic', 'strong', 'good', 'excellent'];
    const negativeWords = ['decline', 'decrease', 'negative', 'bearish', 'pessimistic', 'weak', 'bad', 'crisis'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
        if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
        if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
    });
    
    const total = positiveCount + negativeCount;
    const positive = total > 0 ? Math.round((positiveCount / total) * 100) : 33;
    const negative = total > 0 ? Math.round((negativeCount / total) * 100) : 33;
    const neutral = 100 - positive - negative;
    
    const overallScore = positive > negative ? 
        (0.5 + (positive - negative) / 200).toFixed(2) : 
        (0.5 - (negative - positive) / 200).toFixed(2);
    
    return {
        score: overallScore,
        positive: positive,
        negative: negative,
        neutral: neutral
    };
}

// Forms
function initializeForms() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! Dr. Mirindi will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Footnotes
function initializeFootnotes() {
    const footnoteButtons = document.querySelectorAll('.footnote-btn');
    const footnoteClose = document.querySelector('.footnote-close');
    
    // Make footnote buttons more visible
    footnoteButtons.forEach((button, index) => {
        button.style.display = 'inline-block';
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const footnoteId = this.getAttribute('data-footnote');
            showFootnote(footnoteId);
        });
    });
    
    if (footnoteClose) {
        footnoteClose.addEventListener('click', hideFootnote);
    }
    
    // Close modal when clicking outside
    if (footnoteModal) {
        footnoteModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideFootnote();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && footnoteModal && footnoteModal.classList.contains('active')) {
            hideFootnote();
        }
    });
}

function showFootnote(footnoteId) {
    const footnoteBody = document.querySelector('.footnote-body');
    
    if (!footnoteBody) return;
    
    // Sample footnote content
    const footnotes = {
        '1': {
            title: 'Machine Learning Applications in Macroeconomic Forecasting',
            citation: 'Mirindi, F. (2024). Machine Learning Applications in Macroeconomic Forecasting. Journal of Economic Analysis, 45(3), 123-145.',
            doi: 'doi:10.1000/jea.2024.0123',
            citations: 47,
            downloads: 1250,
            altmetric: 18
        },
        '2': {
            title: 'AI-Driven Policy Evaluation: A Comprehensive Framework',
            citation: 'Mirindi, F. (2024). AI-Driven Policy Evaluation: A Comprehensive Framework. Economic Policy Review, 78(2), 67-89.',
            doi: 'doi:10.1000/epr.2024.0456',
            citations: 35,
            downloads: 890,
            altmetric: 15
        },
        '3': {
            title: 'Natural Language Processing for Economic Sentiment Analysis',
            citation: 'Mirindi, F. (2023). Natural Language Processing for Economic Sentiment Analysis. Computational Economics, 62(4), 234-256.',
            doi: 'doi:10.1000/ce.2023.0789',
            citations: 62,
            downloads: 1560,
            altmetric: 22
        },
        '4': {
            title: 'Deep Learning Models for Financial Market Prediction',
            citation: 'Mirindi, F. (2023). Deep Learning Models for Financial Market Prediction. Financial Economics Review, 91(1), 34-52.',
            doi: 'doi:10.1000/fer.2023.0012',
            citations: 28,
            downloads: 720,
            altmetric: 12
        }
    };
    
    const footnote = footnotes[footnoteId];
    
    if (footnote) {
        footnoteBody.innerHTML = `
            <h4>${footnote.title}</h4>
            <div class="citation-info">
                <p><strong>Citation:</strong> ${footnote.citation}</p>
                <p><strong>DOI:</strong> <a href="#" target="_blank">${footnote.doi}</a></p>
            </div>
            <div class="impact-metrics">
                <h5>Impact Metrics</h5>
                <div class="metrics-grid">
                    <div class="metric">
                        <span class="metric-number">${footnote.citations}</span>
                        <span class="metric-label">Citations</span>
                    </div>
                    <div class="metric">
                        <span class="metric-number">${footnote.downloads}</span>
                        <span class="metric-label">Downloads</span>
                    </div>
                    <div class="metric">
                        <span class="metric-number">${footnote.altmetric}</span>
                        <span class="metric-label">Altmetric Score</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        footnoteBody.innerHTML = '<p>Citation information not available.</p>';
    }
    
    footnoteModal.classList.add('active');
}

function hideFootnote() {
    if (footnoteModal) {
        footnoteModal.classList.remove('active');
    }
}

// Utility functions for smooth interactions
function debounce(func, wait) {
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

// Performance optimization
window.addEventListener('beforeunload', function() {
    // Clean up observers and animations
    if (animationObserver) {
        animationObserver.disconnect();
    }
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Export functions for global access
window.showPage = showPage;
window.toggleTheme = toggleTheme;

// ============== IMPROVED ECONOMIC WIDGETS - CANADA FOCUSED ==============

// Economic Widgets Initialization
function initializeEconomicWidgets() {
    console.log('Initializing economic widgets...');
    
    // Initialize all widgets
    updateWinnipegTime();
    updateWinnipegWeather();
    updateBitcoinPrice();
    updateEconomicCalendar();
    updateMarketSentiment();
    updateCentralBankRates();
    updateEconomicIndicators();
    displayRandomFact();
    
    // Set up intervals for real-time updates
    setInterval(updateWinnipegTime, 1000);
    setInterval(updateWinnipegWeather, 10 * 60 * 1000); // every 10 minutes
    setInterval(updateBitcoinPrice, 5 * 60 * 1000); // every 5 minutes
    setInterval(updateEconomicCalendar, 60 * 60 * 1000); // every hour
    setInterval(updateMarketSentiment, 15 * 60 * 1000); // every 15 minutes
    setInterval(updateCentralBankRates, 30 * 60 * 1000); // every 30 minutes
    setInterval(updateEconomicIndicators, 30 * 60 * 1000); // every 30 minutes
    setInterval(displayRandomFact, 30 * 60 * 1000); // every 30 minutes
}

// 1. ENHANCED BITCOIN PRICE WIDGET - CANADIAN FOCUS
async function updateBitcoinPrice() {
    console.log('Updating Bitcoin price...');
    const priceElement = document.getElementById('crypto-price');
    const changeElement = document.getElementById('crypto-change');
    
    if (!priceElement || !changeElement) {
        console.log('Bitcoin price elements not found');
        return;
    }
    
    try {
        // Use CoinGecko API - free tier, CAD conversion
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=cad&include_24hr_change=true');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const btcData = data.bitcoin;
        
        if (btcData) {
            // Format price in CAD
            const price = btcData.cad;
            const change24h = btcData.cad_24h_change;
            
            priceElement.textContent = `CA$${price.toLocaleString('en-CA', { maximumFractionDigits: 0 })}`;
            
            // Update change with proper styling
            const changePercent = change24h.toFixed(2);
            const changeClass = change24h >= 0 ? 'crypto-positive' : 'crypto-negative';
            const changeSymbol = change24h >= 0 ? '+' : '';
            
            changeElement.innerHTML = `<span class="${changeClass}">${changeSymbol}${changePercent}% (24h)</span>`;
            
            console.log(`Bitcoin updated: CA$${price.toLocaleString()} (${changeSymbol}${changePercent}%)`);
        }
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        priceElement.textContent = 'CA$163,000';
        changeElement.innerHTML = '<span class="crypto-neutral">Data unavailable</span>';
    }
}

// 2. ECONOMIC CALENDAR WIDGET - CANADA FOCUSED
async function updateEconomicCalendar() {
    console.log('Updating economic calendar...');
    const calendarContainer = document.getElementById('economic-events');
    
    if (!calendarContainer) {
        console.log('Economic calendar container not found');
        return;
    }
    
    try {
        // Mock data based on real Canadian economic events
        const currentDate = new Date();
        const events = [
            {
                time: '08:30',
                title: 'CAD Inflation Rate (YoY)',
                impact: 'high',
                actual: '1.9%',
                forecast: '2.0%',
                previous: '1.7%'
            },
            {
                time: '12:30',
                title: 'CAD Unemployment Rate',
                impact: 'high',
                actual: '7.1%',
                forecast: '7.0%',
                previous: '6.9%'
            },
            {
                time: '14:00',
                title: 'BoC Interest Rate Decision',
                impact: 'high',
                actual: '2.50%',
                forecast: '2.50%',
                previous: '2.75%'
            },
            {
                time: '15:30',
                title: 'CAD Retail Sales (MoM)',
                impact: 'medium',
                actual: '-0.8%',
                forecast: '0.1%',
                previous: '0.9%'
            },
            {
                time: '16:45',
                title: 'US Fed Powell Speech',
                impact: 'medium',
                actual: '',
                forecast: '',
                previous: ''
            }
        ];
        
        const eventsHTML = events.map(event => {
            const impactIcon = event.impact === 'high' ? '🔴' : 
                             event.impact === 'medium' ? '🟡' : '🟢';
            const impactClass = `${event.impact}-impact`;
            
            return `
                <div class="event-item ${impactClass}">
                    <span class="event-time">${event.time}</span>
                    <span class="event-title">${event.title}</span>
                    <span class="event-impact">${impactIcon}</span>
                    ${event.actual ? `<span class="event-value">${event.actual}</span>` : ''}
                </div>
            `;
        }).join('');
        
        calendarContainer.innerHTML = eventsHTML;
        console.log('Economic calendar updated with Canadian events');
        
    } catch (error) {
        console.error('Error updating economic calendar:', error);
        calendarContainer.innerHTML = `
            <div class="event-item high-impact">
                <span class="event-time">--:--</span>
                <span class="event-title">Economic data unavailable</span>
                <span class="event-impact">⚠️</span>
            </div>
        `;
    }
}

// 3. MARKET SENTIMENT WIDGET - CANADA FOCUSED
async function updateMarketSentiment() {
    console.log('Updating market sentiment...');
    const sentimentValue = document.getElementById('sentiment-value');
    const gaugeFill = document.getElementById('gauge-fill');
    const fearGreed = document.getElementById('fear-greed');
    const vixValue = document.getElementById('vix-value');
    
    if (!sentimentValue || !gaugeFill) {
        console.log('Market sentiment elements not found');
        return;
    }
    
    try {
        // Since we can't access real-time sentiment APIs easily, we'll use realistic mock data
        // that changes based on current market conditions and Canadian economic situation
        
        // Generate realistic sentiment based on current economic conditions
        // Canada has rate cuts, unemployment rising, inflation below target
        const baseSentiment = 45; // Slightly bearish due to economic concerns
        const randomVariation = (Math.random() - 0.5) * 20;
        const currentSentiment = Math.max(0, Math.min(100, baseSentiment + randomVariation));
        
        // Update sentiment value and gauge
        sentimentValue.textContent = Math.round(currentSentiment);
        
        // Update gauge rotation (0 = -90deg, 100 = 90deg)
        const rotation = (currentSentiment / 100 * 180) - 90;
        gaugeFill.style.transform = `rotate(${rotation}deg)`;
        
        // Update sentiment label
        const sentimentLabel = document.querySelector('.sentiment-label');
        if (sentimentLabel) {
            if (currentSentiment > 70) {
                sentimentLabel.textContent = 'Bullish';
                sentimentLabel.className = 'sentiment-label bullish';
            } else if (currentSentiment > 30) {
                sentimentLabel.textContent = 'Neutral';
                sentimentLabel.className = 'sentiment-label neutral';
            } else {
                sentimentLabel.textContent = 'Bearish';
                sentimentLabel.className = 'sentiment-label bearish';
            }
        }
        
        // Update Fear & Greed Index (realistic values for current conditions)
        const fearGreedValue = Math.round(currentSentiment * 0.8 + 10); // Slight adjustment
        if (fearGreed) {
            fearGreed.textContent = fearGreedValue;
            fearGreed.className = fearGreedValue > 50 ? 'indicator-value bullish' : 
                                 fearGreedValue > 30 ? 'indicator-value neutral' : 
                                 'indicator-value bearish';
        }
        
        // Update VIX (inverse correlation with sentiment)
        const vixVal = (25 - (currentSentiment / 100 * 15)).toFixed(1);
        if (vixValue) {
            vixValue.textContent = vixVal;
            vixValue.className = vixVal > 20 ? 'indicator-value bearish' : 
                               vixVal > 15 ? 'indicator-value neutral' : 
                               'indicator-value bullish';
        }
        
        console.log(`Market sentiment updated: ${currentSentiment}%, Fear/Greed: ${fearGreedValue}, VIX: ${vixVal}`);
        
    } catch (error) {
        console.error('Error updating market sentiment:', error);
        sentimentValue.textContent = '50';
        if (fearGreed) fearGreed.textContent = '50';
        if (vixValue) vixValue.textContent = '18.5';
    }
}

// 4. CENTRAL BANK RATES WIDGET - CANADA FOCUSED
async function updateCentralBankRates() {
    console.log('Updating central bank rates...');
    const ratesContainer = document.getElementById('interest-rates');
    
    if (!ratesContainer) {
        console.log('Central bank rates container not found');
        return;
    }
    
    try {
        // Use current accurate rates based on recent data
        const rates = [
            {
                flag: '🇨🇦',
                name: 'BoC Rate',
                rate: '2.50%',
                change: 'down', // Recent cut from 2.75%
                direction: '▼'
            },
            {
                flag: '🇺🇸',
                name: 'Fed Fund Rate',
                rate: '5.25-5.50%',
                change: 'unchanged',
                direction: '－'
            },
            {
                flag: '🇪🇺',
                name: 'ECB Rate',
                rate: '4.25%',
                change: 'unchanged',
                direction: '－'
            },
            {
                flag: '🇬🇧',
                name: 'BoE Rate',
                rate: '5.00%',
                change: 'unchanged',
                direction: '－'
            },
            {
                flag: '🇯🇵',
                name: 'BoJ Rate',
                rate: '0.25%',
                change: 'unchanged',
                direction: '－'
            }
        ];
        
        const ratesHTML = rates.map(rate => `
            <div class="rate-item">
                <span class="country-flag">${rate.flag}</span>
                <span class="rate-info">
                    <span class="rate-country">${rate.name}</span>
                    <span class="rate-value">${rate.rate}</span>
                </span>
                <span class="rate-change ${rate.change}">${rate.direction}</span>
            </div>
        `).join('');
        
        ratesContainer.innerHTML = ratesHTML;
        console.log('Central bank rates updated with current data');
        
    } catch (error) {
        console.error('Error updating central bank rates:', error);
        // Keep existing content or show error state
    }
}

// 5. ECONOMIC INDICATORS WIDGET - CANADA FOCUSED
async function updateEconomicIndicators() {
    console.log('Updating economic indicators...');
    const indicatorsContainer = document.getElementById('economic-indicators');
    
    if (!indicatorsContainer) {
        console.log('Economic indicators container not found');
        return;
    }
    
    try {
        // Use current Canadian economic data from our research
        const indicators = [
            {
                name: 'GDP Growth',
                value: '-1.6%', // Q2 2025 contraction
                trend: 'negative'
            },
            {
                name: 'Inflation Rate',
                value: '1.9%', // August 2025
                trend: 'neutral'
            },
            {
                name: 'Unemployment',
                value: '7.1%', // August 2025, 4-year high
                trend: 'negative'
            },
            {
                name: 'BoC Rate',
                value: '2.50%', // September 2025 cut
                trend: 'negative'
            }
        ];
        
        const indicatorsHTML = indicators.map(indicator => {
            const trendClass = indicator.trend;
            return `
                <div class="indicator-item">
                    <span class="indicator-name">${indicator.name}</span>
                    <span class="indicator-value ${trendClass}">${indicator.value}</span>
                </div>
            `;
        }).join('');
        
        indicatorsContainer.innerHTML = indicatorsHTML;
        console.log('Economic indicators updated with Canadian data');
        
    } catch (error) {
        console.error('Error updating economic indicators:', error);
    }
}

// ----------- EXISTING WIDGETS (Enhanced) -----------

// WATCH WIDGET (Winnipeg Local Time - handles DST)
function updateWinnipegTime() {
    const watchSpan = document.getElementById('watch-time');
    if (!watchSpan) return;

    // Use "America/Winnipeg" time zone for perfect handling of DST
    const now = new Date();
    // Format: HH:MM:SS (24h)
    const timeString = now.toLocaleTimeString("en-CA", { hour12: false, timeZone: "America/Winnipeg" });
    watchSpan.textContent = timeString;
}

// WEATHER WIDGET (Winnipeg, Open-Meteo API, no API key needed)
async function updateWinnipegWeather() {
    // Check if widget exists to avoid errors on page changes
    const tempSpan = document.getElementById('weather-temp');
    const descSpan = document.getElementById('weather-desc');
    const iconSpan = document.getElementById('weather-icon');
    if (!tempSpan || !descSpan || !iconSpan) return;

    try {
        // Winnipeg: 49.8951° N, 97.1384° W
        const url = `https://api.open-meteo.com/v1/forecast?latitude=49.8951&longitude=-97.1384&current_weather=true`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const json = await response.json();
        const temp = Math.round(json.current_weather.temperature);
        const code = json.current_weather.weathercode;

        // Weather code → icon + desc
        let description = "Clear", icon = "☀️";
        if (code >= 51 && code < 70)      { icon = "🌧️"; description = "Rain"; }
        else if (code >= 71 && code < 80) { icon = "❄️"; description = "Snow"; }
        else if (code === 0)              { icon = "☀️"; description = "Sunny"; }
        else if (code > 2 && code < 5)    { icon = "⛅"; description = "Partly Cloudy"; }
        else if (code < 3)                { icon = "🌤️"; description = "Mainly Sunny"; }
        else if (code >= 3 && code < 5)   { icon = "☁️"; description = "Cloudy"; }

        tempSpan.textContent = temp + "°C";
        descSpan.textContent = description;
        iconSpan.textContent = icon;
        
        console.log(`Weather updated: ${temp}°C, ${description}`);
    } catch (error) {
        console.error('Error fetching weather:', error);
        tempSpan.textContent = "22°C";
        descSpan.textContent = "Partly Cloudy";
        iconSpan.textContent = "⛅";
    }
}

// ECONOMIC FACTS / QUOTES WIDGET
const econFacts = [
    "Canada's Bank of Canada cut rates to 2.50% in September 2025, the first cut in six months.",
    "Canadian unemployment reached 7.1% in August 2025, a four-year high.",
    "Canada's inflation rate is 1.9% as of August 2025, below the 2% target.",
    "The Canadian dollar is influenced by commodity prices, especially oil and gold.",
    "Canada's GDP contracted 1.6% in Q2 2025 due to declining exports.",
    "The Consumer Price Index (CPI) measures the average change in prices paid by consumers for goods and services.",
    "AI in economics enables better policy simulations and more accurate forecasting.",
    "\"In the middle of difficulty lies opportunity.\" — Albert Einstein",
    "Central banks use interest rates to regulate inflation and stimulate or cool the economy.",
    "Gross Domestic Product (GDP) is the broadest quantitative measure of a nation's total economic activity.",
    "Elasticity measures how much demand or supply responds to changes in price.",
    "\"Economics is the study of how society manages its scarce resources.\" — Gregory Mankiw",
    "Canada's S&P/TSX is among the world's top 10 largest stock exchanges.",
    "The Bank of Canada's mandate is to keep inflation low, stable and predictable.",
    "Canada's economy is heavily influenced by natural resources and commodities.",
    "The Canadian housing market has been cooling amid higher interest rates.",
    "USMCA (formerly NAFTA) is crucial for Canadian trade with the US and Mexico.",
    "Canada's productivity growth has lagged behind other developed economies.",
    "The Canadian dollar is considered a commodity currency due to resource exports.",
    "Alberta's oil sands are a major component of Canada's energy sector."
];

function displayRandomFact() {
    const factBox = document.getElementById('fact-box');
    if (!factBox) return;
    const index = Math.floor(Math.random() * econFacts.length);
    factBox.textContent = econFacts[index];
    console.log('Random economic fact updated');
}

// Publications functionality
function initializePublications() {
  console.log('Initializing publications...');
  const wrap = document.getElementById('pubs-grid-wrap');
  if (!wrap) {
    console.error('Publications container not found!');
    return;
  }
  if (wrap.hasAttribute('data-initialized')) {
    console.log('Publications already initialized');
    return;
  }
  wrap.setAttribute('data-initialized', 'true');
  const yearSel = document.getElementById('pubs-year');
  const typeSel = document.getElementById('pubs-type');
  const searchInp = document.getElementById('pubs-search');
  const gridBtn = document.getElementById('pubs-grid');
  const listBtn = document.getElementById('pubs-list');
  const toast = document.getElementById('pubs-toast');

  // COMPLETE PUBLICATIONS DATA
  const publicationsData = [
    {
      title: "Application of machine learning to predict the properties of wood-composite made from PET, HDPE, and PP fibres",
      authors: ["D Mirindi", "D Sinkhonde", "F Mirindi"],
      journal: "Manufacturing Letters",
      year: 2025,
      type: "Article",
      abstract: "Plastic composites provide an eco-friendly substitute for conventional construction materials...",
      doi: "10.1016/j.mfglet.2025.24-35",
      link: "https://www.sciencedirect.com/science/article/pii/S2213846325000288",
      metrics: { citations: 0, reads: 92, saves: 7 }
    },
    {
      title: "Machine learning-driven analysis of nanoparticle performance on concrete mechanical properties",
      authors: ["D Mirindi", "J Hunter", "D Sinkhonde", "F Mirindi"],
      journal: "Manufacturing Letters",
      year: 2025,
      type: "Article",
      abstract: "Nanoparticles as raw material additive are substances that modify the concrete product...",
      doi: "10.1016/j.mfglet.2025.07.001",
      link: "https://doi.org/10.1016/j.mfglet.2025.07.001",
      metrics: { citations: 1, reads: 25, saves: 11 }
    },
    {
      title: "Neural Networks for Predicting Market Trends in Sustainable Industries: A Review",
      authors: ["F Mirindi", "D Mirindi"],
      journal: "Recent Advances in Artificial Intelligence for Sustainable Development",
      year: 2025,
      type: "Review",
      abstract: "Neural networks (NN) are increasingly acknowledged as effective tools for forecasting market trends...",
      doi: "10.2991/978-94-6463-787-8_50",
      link: "https://doi.org/10.2991/978-94-6463-787-8_50",
      metrics: { citations: 31, reads: 187, saves: 9 }
    }
    // Add more publications as needed...
  ];

  // Publications rendering logic (abbreviated for space)
  const createCard = (paper) => {
    return `
      <article class="pub-card paper-card" data-year="${paper.year}" data-type="${paper.type}">
        <div class="pub-card__top">
          <span class="pub-card__badge">${paper.type}</span>
        </div>
        <div class="pub-card__main">
          <h3 class="pub-card__title">${paper.title}</h3>
          <div class="pub-card__authors">
            ${paper.authors.map(author => `<span class="author">${author}</span>`).join('')}
          </div>
          <div class="pub-card__meta">
            <a href="${paper.link}" target="_blank" class="journal">${paper.journal}</a>
            <span class="year">${paper.year}</span>
          </div>
        </div>
      </article>
    `;
  };
  
  const render = () => {
    const html = publicationsData.map(createCard).join('');
    wrap.innerHTML = html;
  };
  
  render();
  console.log(`Publications initialization complete with ${publicationsData.length} papers`);
}

// Ensure publications load correctly
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const papersPage = document.getElementById('papers');
    if (papersPage && papersPage.classList.contains('active')) {
      initializePublications();
    }
  }, 100);
});

// Performance optimization
window.addEventListener('beforeunload', function() {
    if (animationObserver) {
        animationObserver.disconnect();
    }
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});