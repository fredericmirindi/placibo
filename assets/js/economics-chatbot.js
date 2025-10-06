/* ===== ECONOMICS CHATBOT - COMPLETE AI ASSISTANT ===== */
/* Professional AI-powered economics chatbot with advanced functionality */

/**
 * Economics AI Chatbot - Professional Implementation
 * Specialized AI assistant for Economics, Finance, and Mathematical calculations
 * Author: Frédéric Mirindi
 * Version: 2.0.0
 */
(function() {
    'use strict';

    // Global configuration
    const CONFIG = {
        name: 'Economics AI Assistant',
        version: '2.0.0',
        maxMessages: 100,
        typingDelay: 1200,
        animationDelay: 300,
        storageKey: 'economics-chat-history',
        theme: {
            primary: '#238C8C',
            secondary: '#1fb8cd',
            accent: '#00ff88'
        }
    };

    // Economics Knowledge Base
    const ECONOMICS_KB = {
        'gdp': {
            definition: "Gross Domestic Product (GDP) is the total monetary value of all finished goods and services produced within a country's borders in a specific time period.",
            formula: "GDP = C + I + G + (X - M)",
            explanation: "Where C = Consumption, I = Investment, G = Government Spending, X = Exports, M = Imports",
            examples: ["US GDP in 2023 was approximately $25.46 trillion", "GDP per capita = GDP / Population"]
        },
        'inflation': {
            definition: "Inflation is the rate at which the general level of prices for goods and services rises, eroding purchasing power.",
            formula: "Inflation Rate = ((CPI_current - CPI_previous) / CPI_previous) × 100",
            explanation: "Measured using Consumer Price Index (CPI) or other price indices",
            examples: ["If CPI rises from 100 to 103, inflation rate = 3%", "Target inflation rate in many countries is around 2%"]
        },
        'elasticity': {
            definition: "Price elasticity of demand measures how responsive demand is to changes in price.",
            formula: "PED = (% Change in Quantity Demanded) / (% Change in Price)",
            explanation: "Elastic if |PED| > 1, Inelastic if |PED| < 1, Unit elastic if |PED| = 1",
            examples: ["Luxury goods tend to be elastic", "Necessities tend to be inelastic"]
        },
        'supply': {
            definition: "Supply is the quantity of a product that producers are willing and able to offer at various prices.",
            formula: "Qs = f(P, Pr, T, N, E)",
            explanation: "Where P=Price, Pr=Resource prices, T=Technology, N=Number of sellers, E=Expectations",
            examples: ["Law of supply: as price increases, quantity supplied increases"]
        },
        'demand': {
            definition: "Demand is the quantity of a product that consumers are willing and able to purchase at various prices.",
            formula: "Qd = f(P, I, Pr, T, E, N)",
            explanation: "Where P=Price, I=Income, Pr=Related prices, T=Tastes, E=Expectations, N=Number of buyers",
            examples: ["Law of demand: as price increases, quantity demanded decreases"]
        },
        'monetary policy': {
            definition: "Monetary policy involves managing money supply and interest rates to achieve macroeconomic objectives.",
            formula: "Money Supply × Velocity = Price Level × Real Output (MV = PY)",
            explanation: "Central banks use tools like interest rates, reserve requirements, and open market operations",
            examples: ["Lowering interest rates stimulates economic growth", "Raising rates helps control inflation"]
        }
    };

    // Economic Data for Visualizations
    const ECONOMIC_DATA = {
        gdp_growth: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            data: [2.2, -3.4, 5.7, 2.1, 2.5, 2.8],
            title: 'GDP Growth Rate (%)',
            color: '#238C8C'
        },
        inflation_rate: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [7.5, 7.9, 8.5, 8.3, 8.6, 9.1, 8.5, 8.3, 8.2, 7.7, 7.1, 6.5],
            title: 'Annual Inflation Rate (%)',
            color: '#1fb8cd'
        },
        unemployment: {
            labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
            data: [3.7, 3.6, 3.8, 3.7, 3.9, 4.0],
            title: 'Unemployment Rate (%)',
            color: '#00ff88'
        }
    };

    // Mathematical Functions
    const MATH_FUNCTIONS = {
        compound_interest: (P, r, t, n = 1) => {
            return P * Math.pow(1 + r/n, n*t);
        },
        present_value: (FV, r, t) => {
            return FV / Math.pow(1 + r, t);
        },
        elasticity: (q1, q2, p1, p2) => {
            const percentChangeQ = ((q2 - q1) / q1) * 100;
            const percentChangeP = ((p2 - p1) / p1) * 100;
            return percentChangeQ / percentChangeP;
        },
        gdp_calculation: (C, I, G, X, M) => {
            return C + I + G + (X - M);
        },
        inflation_rate: (current_cpi, previous_cpi) => {
            return ((current_cpi - previous_cpi) / previous_cpi) * 100;
        }
    };

    // Chat state management
    let chatState = {
        isOpen: false,
        messages: [],
        isTyping: false,
        currentChart: null
    };

    // DOM elements
    let elements = {};

    /**
     * Initialize the Economics AI Chatbot
     */
    function initEconomicsChatbot() {
        console.log('🤖 Initializing Economics AI Chatbot v' + CONFIG.version);
        createChatbotElements();
        bindEventHandlers();
        loadChatHistory();
        showWelcomeMessage();
        console.log('✅ Economics AI Chatbot initialized successfully');
    }

    /**
     * Create chatbot HTML elements
     */
    function createChatbotElements() {
        // Create floating action button
        const fab = document.createElement('div');
        fab.id = 'economics-chatbot-fab';
        fab.className = 'economics-chatbot-fab';
        fab.setAttribute('aria-label', 'Open Economics AI Assistant');
        fab.setAttribute('role', 'button');
        fab.setAttribute('tabindex', '0');
        fab.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
        `;
        document.body.appendChild(fab);
        elements.fab = fab;

        // Create modal
        const modal = document.createElement('div');
        modal.id = 'economics-chatbot-modal';
        modal.className = 'economics-chatbot-modal economics-hidden';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'economics-chatbot-title');
        modal.innerHTML = `
            <div class="economics-chatbot-header">
                <div class="economics-chatbot-title-section">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                    </svg>
                    <h3 id="economics-chatbot-title">${CONFIG.name}</h3>
                </div>
                <button id="economics-chatbot-close" type="button" aria-label="Close chat">
                    <span>×</span>
                </button>
            </div>
            <div class="economics-chatbot-messages" id="economics-chatbot-messages">
                <!-- Messages will be inserted here -->
            </div>
            <div class="economics-quick-actions" id="economics-quick-actions">
                <button class="economics-quick-action" data-action="gdp">GDP Calculation</button>
                <button class="economics-quick-action" data-action="inflation">Inflation Rate</button>
                <button class="economics-quick-action" data-action="elasticity">Price Elasticity</button>
                <button class="economics-quick-action" data-action="help">Help & Commands</button>
            </div>
            <form class="economics-chatbot-input-area" id="economics-chatbot-form">
                <textarea 
                    id="economics-chatbot-input" 
                    placeholder="Ask me about economics, finance, or request calculations..."
                    rows="1"
                    aria-label="Enter your message"
                ></textarea>
                <button type="submit" aria-label="Send message">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </form>
            <div class="economics-typing-indicator economics-hidden" id="economics-typing-indicator">
                <div class="economics-bot-avatar">🤖</div>
                <div class="economics-typing-dots">
                    <span class="economics-typing-dot"></span>
                    <span class="economics-typing-dot"></span>
                    <span class="economics-typing-dot"></span>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        elements.modal = modal;
        elements.messages = modal.querySelector('#economics-chatbot-messages');
        elements.input = modal.querySelector('#economics-chatbot-input');
        elements.form = modal.querySelector('#economics-chatbot-form');
        elements.closeBtn = modal.querySelector('#economics-chatbot-close');
        elements.typingIndicator = modal.querySelector('#economics-typing-indicator');
        elements.quickActions = modal.querySelector('#economics-quick-actions');
    }

    /**
     * Bind event handlers
     */
    function bindEventHandlers() {
        // FAB click handler
        elements.fab.addEventListener('click', toggleChat);
        elements.fab.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleChat();
            }
        });

        // Close button handler
        elements.closeBtn.addEventListener('click', closeChat);

        // Form submit handler
        elements.form.addEventListener('submit', handleSubmit);

        // Input handlers
        elements.input.addEventListener('keydown', handleKeydown);
        elements.input.addEventListener('input', autoResize);

        // Quick actions
        elements.quickActions.addEventListener('click', handleQuickAction);

        // Close on outside click
        elements.modal.addEventListener('click', (e) => {
            if (e.target === elements.modal) {
                closeChat();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && chatState.isOpen) {
                closeChat();
            }
        });
    }

    /**
     * Toggle chat modal
     */
    function toggleChat() {
        if (chatState.isOpen) {
            closeChat();
        } else {
            openChat();
        }
    }

    /**
     * Open chat modal
     */
    function openChat() {
        chatState.isOpen = true;
        elements.modal.classList.remove('economics-hidden');
        elements.modal.classList.add('show');
        elements.input.focus();
        
        // Update FAB appearance
        elements.fab.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        `;
    }

    /**
     * Close chat modal
     */
    function closeChat() {
        chatState.isOpen = false;
        elements.modal.classList.remove('show');
        setTimeout(() => {
            elements.modal.classList.add('economics-hidden');
        }, 300);
        
        // Reset FAB appearance
        elements.fab.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
        `;
    }

    /**
     * Handle form submission
     */
    function handleSubmit(e) {
        e.preventDefault();
        const message = elements.input.value.trim();
        
        if (!message || chatState.isTyping) return;
        
        // Add user message
        addMessage(message, 'user');
        elements.input.value = '';
        autoResize();
        
        // Process and respond
        processMessage(message);
    }

    /**
     * Handle keyboard events
     */
    function handleKeydown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            elements.form.dispatchEvent(new Event('submit'));
        }
    }

    /**
     * Auto-resize textarea
     */
    function autoResize() {
        const textarea = elements.input;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    /**
     * Handle quick action buttons
     */
    function handleQuickAction(e) {
        if (!e.target.classList.contains('economics-quick-action')) return;
        
        const action = e.target.dataset.action;
        const actionMessages = {
            gdp: "How do I calculate GDP?",
            inflation: "What is the inflation rate formula?",
            elasticity: "Explain price elasticity of demand",
            help: "What can you help me with?"
        };
        
        if (actionMessages[action]) {
            elements.input.value = actionMessages[action];
            handleSubmit(new Event('submit'));
        }
    }

    /**
     * Add message to chat
     */
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `economics-message ${sender}`;
        
        const timestamp = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="economics-bot-avatar">🤖</div>
                <div class="economics-message-content">${content}</div>
                <div class="economics-message-time">${timestamp}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="economics-message-content">${content}</div>
                <div class="economics-message-time">${timestamp}</div>
            `;
        }
        
        elements.messages.appendChild(messageDiv);
        
        // Add to chat history
        chatState.messages.push({
            content: content,
            sender: sender,
            timestamp: new Date().toISOString()
        });
        
        // Limit message history
        if (chatState.messages.length > CONFIG.maxMessages) {
            chatState.messages.shift();
            elements.messages.removeChild(elements.messages.firstChild);
        }
        
        // Scroll to bottom
        scrollToBottom();
        
        // Save to localStorage
        saveChatHistory();
        
        return messageDiv;
    }

    /**
     * Process user message and generate response
     */
    function processMessage(message) {
        showTyping();
        
        setTimeout(() => {
            const response = generateResponse(message);
            hideTyping();
            addMessage(response, 'bot');
        }, CONFIG.typingDelay);
    }

    /**
     * Generate AI response based on message
     */
    function generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for specific economic concepts
        for (const [key, concept] of Object.entries(ECONOMICS_KB)) {
            if (lowerMessage.includes(key)) {
                return formatConceptResponse(concept, key);
            }
        }
        
        // Check for mathematical calculations
        if (lowerMessage.includes('calculate') || lowerMessage.includes('compute')) {
            return handleCalculationRequest(message);
        }
        
        // Check for chart/graph requests
        if (lowerMessage.includes('chart') || lowerMessage.includes('graph') || lowerMessage.includes('visualiz')) {
            return handleVisualizationRequest(message);
        }
        
        // Help requests
        if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
            return getHelpMessage();
        }
        
        // Greeting responses
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! I'm your Economics AI Assistant. I can help with economic concepts, calculations, and data visualization. What would you like to explore today?";
        }
        
        // Default response with suggestions
        return `I understand you're asking about "${message}". While I don't have specific information on that exact topic, I can help with:

<div class="economics-chat-suggestions">
    <div class="economics-suggestion" onclick="document.getElementById('economics-chatbot-input').value='What is GDP?'; document.getElementById('economics-chatbot-form').dispatchEvent(new Event('submit'));">Economic concepts (GDP, inflation, elasticity)</div>
    <div class="economics-suggestion" onclick="document.getElementById('economics-chatbot-input').value='Calculate compound interest'; document.getElementById('economics-chatbot-form').dispatchEvent(new Event('submit'));">Mathematical calculations</div>
    <div class="economics-suggestion" onclick="document.getElementById('economics-chatbot-input').value='Show me economic data'; document.getElementById('economics-chatbot-form').dispatchEvent(new Event('submit'));">Data visualization and charts</div>
</div>

Could you try asking about one of these topics?`;
    }

    /**
     * Format economic concept response
     */
    function formatConceptResponse(concept, key) {
        let response = `<strong>${key.toUpperCase()}</strong><br><br>`;
        response += `📝 <strong>Definition:</strong><br>${concept.definition}<br><br>`;
        
        if (concept.formula) {
            response += `📊 <strong>Formula:</strong><br><div class="economics-formula">${concept.formula}</div><br>`;
        }
        
        if (concept.explanation) {
            response += `💡 <strong>Explanation:</strong><br>${concept.explanation}<br><br>`;
        }
        
        if (concept.examples && concept.examples.length > 0) {
            response += `📚 <strong>Examples:</strong><br>`;
            concept.examples.forEach(example => {
                response += `• ${example}<br>`;
            });
        }
        
        return response;
    }

    /**
     * Handle calculation requests
     */
    function handleCalculationRequest(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('compound interest')) {
            return `<strong>Compound Interest Calculator</strong><br><br>
                Please provide the values in this format:<br>
                "Calculate compound interest: Principal=$1000, Rate=5%, Time=3 years, Compounding=annually"<br><br>
                The formula is: <div class="economics-formula">A = P(1 + r/n)^(nt)</div>
                Where A = final amount, P = principal, r = annual rate, n = compounding frequency, t = time`;
        }
        
        if (lowerMessage.includes('gdp')) {
            return `<strong>GDP Calculation</strong><br><br>
                GDP = C + I + G + (X - M)<br><br>
                Please provide:<br>
                • C (Consumption)<br>
                • I (Investment)<br>
                • G (Government Spending)<br>
                • X (Exports)<br>
                • M (Imports)<br><br>
                Example: "Calculate GDP: C=$800B, I=$200B, G=$300B, X=$150B, M=$120B"`;
        }
        
        return "I can help with various economic calculations! Please specify what you'd like to calculate (GDP, inflation rate, elasticity, compound interest, etc.) and provide the necessary values.";
    }

    /**
     * Handle visualization requests
     */
    function handleVisualizationRequest(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('gdp')) {
            createChart(ECONOMIC_DATA.gdp_growth);
            return "Here's the GDP growth data visualization:";
        }
        
        if (lowerMessage.includes('inflation')) {
            createChart(ECONOMIC_DATA.inflation_rate);
            return "Here's the inflation rate data:";
        }
        
        if (lowerMessage.includes('unemployment')) {
            createChart(ECONOMIC_DATA.unemployment);
            return "Here's the unemployment rate data:";
        }
        
        return `I can create charts for:<br>
            • GDP growth rates<br>
            • Inflation trends<br>
            • Unemployment data<br><br>
            Which would you like to see?`;
    }

    /**
     * Create and display chart
     */
    function createChart(data) {
        // Create chart container
        const chartContainer = document.createElement('div');
        chartContainer.className = 'economics-chart-container';
        chartContainer.innerHTML = `
            <div class="economics-chart-title">${data.title}</div>
            <canvas class="economics-chart-canvas" width="300" height="200"></canvas>
        `;
        
        // Add chart to the last bot message
        setTimeout(() => {
            const lastMessage = elements.messages.lastChild;
            if (lastMessage && lastMessage.classList.contains('bot')) {
                lastMessage.querySelector('.economics-message-content').appendChild(chartContainer);
                
                // Create simple chart visualization
                const canvas = chartContainer.querySelector('canvas');
                const ctx = canvas.getContext('2d');
                drawSimpleChart(ctx, data);
            }
        }, 100);
    }

    /**
     * Draw simple chart on canvas
     */
    function drawSimpleChart(ctx, data) {
        const width = 300;
        const height = 200;
        const padding = 40;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Set styles
        ctx.strokeStyle = data.color;
        ctx.fillStyle = data.color;
        ctx.lineWidth = 2;
        ctx.font = '10px Arial';
        
        // Calculate scales
        const maxValue = Math.max(...data.data);
        const minValue = Math.min(...data.data);
        const range = maxValue - minValue;
        
        // Draw axes
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(padding, padding);
        ctx.stroke();
        
        // Draw data points
        ctx.beginPath();
        data.data.forEach((value, index) => {
            const x = padding + (index * (width - 2 * padding)) / (data.data.length - 1);
            const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Draw point
            ctx.fillRect(x - 2, y - 2, 4, 4);
        });
        
        ctx.stroke();
        
        // Draw labels
        ctx.fillStyle = '#333';
        data.labels.forEach((label, index) => {
            const x = padding + (index * (width - 2 * padding)) / (data.labels.length - 1);
            ctx.fillText(label, x - 10, height - padding + 15);
        });
    }

    /**
     * Get help message
     */
    function getHelpMessage() {
        return `<strong>Economics AI Assistant - Help</strong><br><br>
            I can help you with:<br><br>
            
            <strong>📚 Economic Concepts:</strong><br>
            • GDP, Inflation, Elasticity<br>
            • Supply & Demand<br>
            • Monetary Policy<br><br>
            
            <strong>🧮 Calculations:</strong><br>
            • GDP calculations<br>
            • Compound interest<br>
            • Inflation rates<br>
            • Price elasticity<br><br>
            
            <strong>📊 Data Visualization:</strong><br>
            • Economic charts and graphs<br>
            • Trend analysis<br><br>
            
            <strong>💬 Commands:</strong><br>
            • "What is [economic concept]?"<br>
            • "Calculate [formula] with [values]"<br>
            • "Show me [data type] chart"<br>
            • "Help" - Show this message<br><br>
            
            Try asking me anything about economics!`;
    }

    /**
     * Show typing indicator
     */
    function showTyping() {
        chatState.isTyping = true;
        elements.typingIndicator.classList.remove('economics-hidden');
        elements.typingIndicator.classList.add('show');
        scrollToBottom();
    }

    /**
     * Hide typing indicator
     */
    function hideTyping() {
        chatState.isTyping = false;
        elements.typingIndicator.classList.remove('show');
        setTimeout(() => {
            elements.typingIndicator.classList.add('economics-hidden');
        }, 300);
    }

    /**
     * Scroll messages to bottom
     */
    function scrollToBottom() {
        requestAnimationFrame(() => {
            elements.messages.scrollTop = elements.messages.scrollHeight;
        });
    }

    /**
     * Show welcome message
     */
    function showWelcomeMessage() {
        if (chatState.messages.length === 0) {
            setTimeout(() => {
                addMessage(`<div class="economics-bot-welcome-message">
                    <div class="economics-welcome-content">
                        <p>👋 Welcome to your <strong>Economics AI Assistant</strong>!</p>
                        <p>I'm here to help you understand economic concepts, perform calculations, and visualize data.</p>
                        <div class="economics-capabilities-grid">
                            <div class="economics-capability-tag">Economic Theory</div>
                            <div class="economics-capability-tag">Mathematical Models</div>
                            <div class="economics-capability-tag">Data Analysis</div>
                            <div class="economics-capability-tag">Market Insights</div>
                        </div>
                        <p class="economics-example-text">Try asking: "What is GDP?" or "Calculate compound interest"</p>
                    </div>
                </div>`, 'bot');
            }, 1000);
        }
    }

    /**
     * Save chat history to localStorage
     */
    function saveChatHistory() {
        try {
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(chatState.messages));
        } catch (e) {
            console.warn('Failed to save chat history:', e);
        }
    }

    /**
     * Load chat history from localStorage
     */
    function loadChatHistory() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            if (saved) {
                const messages = JSON.parse(saved);
                chatState.messages = messages.slice(-50); // Keep last 50 messages
                
                // Restore messages to UI
                messages.slice(-10).forEach(msg => { // Show last 10 messages
                    const messageDiv = document.createElement('div');
                    messageDiv.className = `economics-message ${msg.sender}`;
                    
                    if (msg.sender === 'bot') {
                        messageDiv.innerHTML = `
                            <div class="economics-bot-avatar">🤖</div>
                            <div class="economics-message-content">${msg.content}</div>
                        `;
                    } else {
                        messageDiv.innerHTML = `
                            <div class="economics-message-content">${msg.content}</div>
                        `;
                    }
                    
                    elements.messages.appendChild(messageDiv);
                });
            }
        } catch (e) {
            console.warn('Failed to load chat history:', e);
        }
    }

    /**
     * Clear chat history
     */
    function clearChat() {
        chatState.messages = [];
        elements.messages.innerHTML = '';
        localStorage.removeItem(CONFIG.storageKey);
        showWelcomeMessage();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEconomicsChatbot);
    } else {
        initEconomicsChatbot();
    }

    // Export for external use
    window.EconomicsChatbot = {
        open: openChat,
        close: closeChat,
        toggle: toggleChat,
        clear: clearChat,
        version: CONFIG.version
    };

})();