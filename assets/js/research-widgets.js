/* ===== RESEARCH WIDGETS - COMPLETE INTERACTIVE FUNCTIONALITY ===== */
/* Advanced AI-powered economic research tools with interactive demonstrations */

// Global variables for charts and data
let forecastChart = null;
let policyChart = null;
let sentimentChart = null;

const economicData = {
    gdp: [2.1, 2.3, 2.8, 3.1, 2.9, 2.7],
    inflation: [3.2, 3.1, 3.0, 2.9, 3.1, 3.2],
    unemployment: [3.7, 3.6, 3.5, 3.4, 3.5, 3.6]
};

// Initialize Research Widgets when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeResearchWidgets();
});

function initializeResearchWidgets() {
    // Only initialize if we're on the research page or if research widgets exist
    if (document.getElementById('forecast-chart')) {
        initializeForecastingWidget();
        initializePolicyWidget();
        initializeNLPWidget();
    }
}

/* ===== 1. AI-POWERED ECONOMIC FORECASTING WIDGET ===== */
function initializeForecastingWidget() {
    // Initialize the forecast chart
    createForecastChart();

    // Event listeners
    const runForecastBtn = document.getElementById('run-forecast');
    const timeframeSelect = document.getElementById('forecast-timeframe');

    if (runForecastBtn) {
        runForecastBtn.addEventListener('click', runForecastAnalysis);
    }

    if (timeframeSelect) {
        timeframeSelect.addEventListener('change', updateForecastTimeframe);
    }

    // Auto-update forecast metrics every 30 seconds
    setInterval(updateForecastMetrics, 30000);
}

function createForecastChart() {
    const ctx = document.getElementById('forecast-chart');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (forecastChart) {
        forecastChart.destroy();
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const labels = [];

    for (let i = 0; i < 6; i++) {
        labels.push(months[(currentMonth + i) % 12]);
    }

    forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'GDP Growth Forecast (%)',
                data: economicData.gdp,
                borderColor: '#1fb8cd',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#1fb8cd',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }, {
                label: 'Inflation Rate (%)',
                data: economicData.inflation,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointBackgroundColor: '#ff6b6b',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        font: {
                            size: 12,
                            weight: 600
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 11
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function runForecastAnalysis() {
    const button = document.getElementById('run-forecast');
    const loadingDiv = document.getElementById('forecast-loading');
    const statusElement = document.getElementById('forecast-status');
    
    if (!button) return;

    // Show loading animation
    button.disabled = true;
    button.innerHTML = '🔄 Analyzing...';
    
    if (loadingDiv) loadingDiv.classList.remove('hidden');
    
    if (statusElement) {
        statusElement.textContent = 'Running AI analysis...';
        statusElement.className = 'status-running';
    }

    // Simulate AI analysis with realistic timing
    setTimeout(() => {
        // Update forecast metrics with new predictions
        updateForecastMetrics();
        
        // Update chart with new data
        updateForecastChart();

        // Hide loading and reset button
        if (loadingDiv) loadingDiv.classList.add('hidden');
        
        button.disabled = false;
        button.innerHTML = '🔮 Generate Forecast';
        
        if (statusElement) {
            statusElement.textContent = 'Analysis complete';
            statusElement.className = 'status-ready';
        }

        // Show success message
        showNotification('Forecast updated successfully!', 'success');
    }, 3000);
}

function updateForecastMetrics() {
    // Generate realistic forecast values
    const gdpForecast = (2.5 + Math.random() * 0.8).toFixed(1);
    const inflationForecast = (2.8 + Math.random() * 0.6).toFixed(1);
    const accuracy = (92 + Math.random() * 6).toFixed(1);
    const confidenceInterval = `±${(0.3 + Math.random() * 0.4).toFixed(1)}%`;

    // Update DOM elements
    const gdpElement = document.getElementById('gdp-forecast');
    const inflationElement = document.getElementById('inflation-forecast');
    const accuracyElement = document.getElementById('model-accuracy');
    const confidenceElement = document.getElementById('confidence-interval');

    if (gdpElement) gdpElement.textContent = `+${gdpForecast}%`;
    if (inflationElement) inflationElement.textContent = `${inflationForecast}%`;
    if (accuracyElement) accuracyElement.textContent = `${accuracy}%`;
    if (confidenceElement) confidenceElement.textContent = confidenceInterval;
}

function updateForecastChart() {
    if (!forecastChart) return;

    // Generate new forecast data
    const newGdpData = economicData.gdp.map(val => val + (Math.random() - 0.5) * 0.5);
    const newInflationData = economicData.inflation.map(val => val + (Math.random() - 0.5) * 0.3);

    // Update chart data
    forecastChart.data.datasets[0].data = newGdpData;
    forecastChart.data.datasets[1].data = newInflationData;
    forecastChart.update('active');
}

function updateForecastTimeframe() {
    const timeframe = document.getElementById('forecast-timeframe').value;
    let newLabels, newData;

    switch(timeframe) {
        case '1':
            newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            newData = [2.8, 2.9, 3.1, 3.0];
            break;
        case '3':
            newLabels = ['Month 1', 'Month 2', 'Month 3'];
            newData = [2.8, 3.1, 2.9];
            break;
        case '6':
            newLabels = ['Q1', 'Q2'];
            newData = [2.9, 3.0];
            break;
        case '12':
            newLabels = ['2025'];
            newData = [2.8];
            break;
    }

    if (forecastChart) {
        forecastChart.data.labels = newLabels;
        forecastChart.data.datasets[0].data = newData;
        forecastChart.update();
    }
}

/* ===== 2. AUTOMATED POLICY ANALYSIS WIDGET ===== */
function initializePolicyWidget() {
    const analyzeButton = document.getElementById('analyze-policy');
    const policySlider = document.getElementById('policy-magnitude');
    const policyTypeSelect = document.getElementById('policy-type');

    if (analyzeButton) {
        analyzeButton.addEventListener('click', runPolicyAnalysis);
    }

    if (policySlider) {
        policySlider.addEventListener('input', updatePolicyPreview);
        // Initialize slider display
        const sliderValue = document.getElementById('slider-value');
        if (sliderValue) {
            sliderValue.textContent = policySlider.value + '%';
        }
        
        policySlider.addEventListener('input', (e) => {
            if (sliderValue) sliderValue.textContent = e.target.value + '%';
        });
    }

    if (policyTypeSelect) {
        policyTypeSelect.addEventListener('change', updatePolicyType);
    }

    // Initialize policy chart
    createPolicyChart();
}

function createPolicyChart() {
    const ctx = document.getElementById('policy-impact-chart');
    if (!ctx) return;

    policyChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['GDP Growth', 'Employment', 'Inflation', 'Investment', 'Consumer Confidence', 'Trade Balance'],
            datasets: [{
                label: 'Policy Impact',
                data: [65, 59, 90, 81, 56, 55],
                backgroundColor: 'rgba(31, 184, 205, 0.2)',
                borderColor: '#1fb8cd',
                borderWidth: 2,
                pointBackgroundColor: '#1fb8cd',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function runPolicyAnalysis() {
    const button = document.getElementById('analyze-policy');
    const progressBar = document.getElementById('policy-progress');
    const statusText = document.getElementById('policy-status');

    if (!button || !progressBar || !statusText) return;

    // Start analysis
    button.disabled = true;
    button.innerHTML = '⚡ Analyzing...';
    statusText.textContent = 'Initializing policy simulation...';

    // Simulate analysis progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;

        progressBar.style.width = progress + '%';

        if (progress < 30) {
            statusText.textContent = 'Loading economic models...';
        } else if (progress < 60) {
            statusText.textContent = 'Running simulations...';
        } else if (progress < 90) {
            statusText.textContent = 'Calculating impacts...';
        } else if (progress >= 100) {
            statusText.textContent = 'Analysis complete!';
            clearInterval(interval);

            // Update policy impacts
            updatePolicyImpacts();
            updatePolicyChart();

            // Reset button
            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = '📊 Analyze Policy Impact';
                statusText.textContent = 'Ready for new analysis';
                progressBar.style.width = '0%';
            }, 2000);
        }
    }, 200);
}

function updatePolicyPreview() {
    const magnitude = document.getElementById('policy-magnitude').value;
    const policyType = document.getElementById('policy-type').value;

    // Calculate preview impacts based on slider value
    const baseImpact = magnitude / 100;
    let gdpImpact, employmentImpact, inflationImpact;

    switch(policyType) {
        case 'fiscal':
            gdpImpact = (baseImpact * 1.5).toFixed(1);
            employmentImpact = (baseImpact * 1.2).toFixed(1);
            inflationImpact = (baseImpact * 0.8).toFixed(1);
            break;
        case 'monetary':
            gdpImpact = (baseImpact * 1.0).toFixed(1);
            employmentImpact = (baseImpact * 0.8).toFixed(1);
            inflationImpact = (baseImpact * 1.5).toFixed(1);
            break;
        case 'trade':
            gdpImpact = (baseImpact * 1.3).toFixed(1);
            employmentImpact = (baseImpact * 1.1).toFixed(1);
            inflationImpact = (baseImpact * 0.6).toFixed(1);
            break;
        default:
            gdpImpact = (baseImpact * 1.0).toFixed(1);
            employmentImpact = (baseImpact * 0.9).toFixed(1);
            inflationImpact = (baseImpact * 0.7).toFixed(1);
    }

    // Store preview values for later use
    window.previewImpacts = { gdpImpact, employmentImpact, inflationImpact };
}

function updatePolicyImpacts() {
    const impacts = window.previewImpacts || {
        gdpImpact: '1.2',
        employmentImpact: '0.8',
        inflationImpact: '0.3'
    };

    // Update DOM with calculated impacts
    const gdpElement = document.getElementById('gdp-impact');
    const employmentElement = document.getElementById('employment-impact');
    const inflationElement = document.getElementById('inflation-impact');

    if (gdpElement) {
        gdpElement.textContent = `+${impacts.gdpImpact}%`;
        gdpElement.className = 'impact-value ' + (parseFloat(impacts.gdpImpact) > 0 ? 'positive' : 'negative');
    }

    if (employmentElement) {
        employmentElement.textContent = `+${impacts.employmentImpact}%`;
        employmentElement.className = 'impact-value ' + (parseFloat(impacts.employmentImpact) > 0 ? 'positive' : 'negative');
    }

    if (inflationElement) {
        inflationElement.textContent = `+${impacts.inflationImpact}%`;
        inflationElement.className = 'impact-value ' + (parseFloat(impacts.inflationImpact) < 0.5 ? 'neutral' : 'negative');
    }
}

function updatePolicyChart() {
    if (!policyChart) return;

    const newData = [
        65 + Math.random() * 20,
        59 + Math.random() * 25,
        90 - Math.random() * 15,
        81 + Math.random() * 15,
        56 + Math.random() * 30,
        55 + Math.random() * 20
    ];

    policyChart.data.datasets[0].data = newData;
    policyChart.update();
}

function updatePolicyType() {
    const policyType = document.getElementById('policy-type').value;
    const statusText = document.getElementById('policy-status');

    if (statusText) {
        statusText.textContent = `Ready to analyze ${policyType} policy`;
    }

    updatePolicyPreview();
}

/* ===== 3. NATURAL LANGUAGE PROCESSING WIDGET ===== */
function initializeNLPWidget() {
    const analyzeButton = document.getElementById('analyze-text');
    const textInput = document.getElementById('economic-text-input');
    const fileInput = document.getElementById('text-file-input');

    if (analyzeButton) {
        analyzeButton.addEventListener('click', analyzeEconomicText);
    }

    if (textInput) {
        textInput.addEventListener('input', debounce(previewTextAnalysis, 1000));
    }

    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }

    // Initialize sample text
    initializeSampleText();
}

function initializeSampleText() {
    const textInput = document.getElementById('economic-text-input');
    if (textInput && !textInput.value) {
        textInput.value = "The Canadian economy shows resilience with GDP growth reaching 2.8% in Q3, supported by strong consumer spending and business investment. However, inflationary pressures remain elevated at 3.1%, prompting discussions about potential monetary policy adjustments by the Bank of Canada.";
        previewTextAnalysis();
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const textInput = document.getElementById('economic-text-input');
        if (textInput) {
            textInput.value = e.target.result;
            previewTextAnalysis();
        }
    };
    reader.readAsText(file);
}

function analyzeEconomicText() {
    const button = document.getElementById('analyze-text');
    const textInput = document.getElementById('economic-text-input');
    const processingDiv = document.getElementById('nlp-processing');

    if (!button || !textInput) return;

    const text = textInput.value.trim();
    if (!text) {
        showNotification('Please enter some text to analyze', 'warning');
        return;
    }

    // Start processing
    button.disabled = true;
    button.innerHTML = '🤖 Processing...';
    if (processingDiv) processingDiv.classList.remove('hidden');

    // Simulate NLP processing
    setTimeout(() => {
        // Perform text analysis
        const analysis = performTextAnalysis(text);

        // Update UI with results
        updateSentimentAnalysis(analysis.sentiment);
        updateKeyInsights(analysis.insights);
        updateEconomicKeywords(analysis.keywords);
        updateTopicModeling(analysis.topics);
        updateEntityRecognition(analysis.entities);

        // Hide processing and reset button
        if (processingDiv) processingDiv.classList.add('hidden');
        button.disabled = false;
        button.innerHTML = '🔍 Analyze Economic Text';

        showNotification('Text analysis complete!', 'success');
    }, 4000);
}

function performTextAnalysis(text) {
    // Simulate advanced NLP analysis
    const economicTerms = [
        'GDP', 'inflation', 'unemployment', 'growth', 'recession', 'market', 'economy',
        'fiscal', 'monetary', 'policy', 'investment', 'trade', 'deficit', 'surplus',
        'interest', 'rate', 'bank', 'federal', 'consumer', 'business', 'economic'
    ];

    const positiveWords = ['growth', 'increase', 'rise', 'positive', 'improvement', 'expansion', 'boom', 'surge'];
    const negativeWords = ['decline', 'decrease', 'fall', 'negative', 'recession', 'contraction', 'drop', 'crisis'];

    // Extract keywords
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const foundKeywords = words.filter(word => 
        economicTerms.some(term => 
            term.toLowerCase().includes(word) || word.includes(term.toLowerCase())
        )
    );
    const uniqueKeywords = [...new Set(foundKeywords)].slice(0, 8);

    // Calculate sentiment
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    const sentimentScore = Math.max(10, Math.min(90, 50 + (positiveCount - negativeCount) * 10 + Math.random() * 20));

    // Generate insights
    const insights = generateEconomicInsights(text, uniqueKeywords, sentimentScore);

    // Generate topic modeling
    const topics = generateTopics(uniqueKeywords);

    // Generate entity recognition
    const entities = generateEntities(text);

    return {
        sentiment: sentimentScore,
        insights: insights,
        keywords: uniqueKeywords,
        topics: topics,
        entities: entities
    };
}

function generateEconomicInsights(text, keywords, sentiment) {
    const insights = [];

    if (sentiment > 70) {
        insights.push('Overall positive economic sentiment detected');
    } else if (sentiment < 40) {
        insights.push('Bearish economic outlook identified');
    } else {
        insights.push('Neutral economic sentiment with mixed indicators');
    }

    if (keywords.includes('inflation') || keywords.includes('price')) {
        insights.push('Inflationary concerns mentioned in text');
    }

    if (keywords.includes('growth') || keywords.includes('gdp')) {
        insights.push('Economic growth factors discussed');
    }

    if (keywords.includes('unemployment') || keywords.includes('job')) {
        insights.push('Labor market conditions referenced');
    }

    if (keywords.includes('policy') || keywords.includes('federal')) {
        insights.push('Government policy implications noted');
    }

    // Add word count insight
    const wordCount = text.split(/\s+/).length;
    insights.push(`Document contains ${wordCount} words with ${keywords.length} economic terms`);

    return insights.slice(0, 5); // Limit to 5 insights
}

function generateTopics(keywords) {
    const topics = [
        { name: 'Monetary Policy', weight: 0.35, keywords: ['interest', 'rate', 'bank', 'monetary'] },
        { name: 'Economic Growth', weight: 0.28, keywords: ['GDP', 'growth', 'expansion'] },
        { name: 'Market Dynamics', weight: 0.22, keywords: ['market', 'trade', 'investment'] },
        { name: 'Inflation Trends', weight: 0.15, keywords: ['inflation', 'price', 'consumer'] }
    ];

    // Adjust weights based on keywords found
    topics.forEach(topic => {
        const relevantKeywords = topic.keywords.filter(k => keywords.includes(k));
        if (relevantKeywords.length > 0) {
            topic.weight = Math.min(0.95, topic.weight + relevantKeywords.length * 0.1);
        }
    });

    return topics.sort((a, b) => b.weight - a.weight);
}

function generateEntities(text) {
    const entities = {
        organizations: ['Bank of Canada', 'Federal Reserve', 'IMF', 'World Bank'],
        indicators: ['GDP', 'CPI', 'Unemployment Rate', 'Interest Rate'],
        locations: ['Canada', 'United States', 'North America', 'Global']
    };

    // Filter entities that appear in text
    Object.keys(entities).forEach(category => {
        entities[category] = entities[category].filter(entity =>
            text.toLowerCase().includes(entity.toLowerCase())
        );
    });

    return entities;
}

function updateSentimentAnalysis(sentimentScore) {
    const sentimentFill = document.getElementById('sentiment-fill');
    const sentimentScoreElement = document.getElementById('sentiment-score');
    const sentimentGauge = document.getElementById('sentiment-gauge');

    if (sentimentFill) {
        sentimentFill.style.width = sentimentScore + '%';
    }

    if (sentimentGauge) {
        const rotation = (sentimentScore - 50) * 1.8; // Convert to degrees
        sentimentGauge.style.transform = `rotate(${rotation}deg)`;
    }

    if (sentimentScoreElement) {
        const label = sentimentScore > 60 ? 'Bullish' : sentimentScore < 40 ? 'Bearish' : 'Neutral';
        sentimentScoreElement.textContent = `${Math.round(sentimentScore)}% ${label}`;
        
        // Update color
        if (sentimentScore > 60) sentimentScoreElement.style.color = '#28a745';
        else if (sentimentScore < 40) sentimentScoreElement.style.color = '#dc3545';
        else sentimentScoreElement.style.color = '#ffc107';
    }
}

function updateKeyInsights(insights) {
    const insightsList = document.getElementById('nlp-insights');
    if (!insightsList) return;

    insightsList.innerHTML = '';
    insights.forEach((insight, index) => {
        const insightElement = document.createElement('div');
        insightElement.className = 'insight-item fade-in';
        insightElement.style.animationDelay = `${index * 0.1}s`;
        insightElement.innerHTML = `
            <i class="insight-icon">💡</i>
            <span>${insight}</span>
        `;
        insightsList.appendChild(insightElement);
    });
}

function updateEconomicKeywords(keywords) {
    const keywordsContainer = document.getElementById('economic-keywords');
    if (!keywordsContainer) return;

    keywordsContainer.innerHTML = '';
    keywords.forEach((keyword, index) => {
        const keywordElement = document.createElement('span');
        keywordElement.className = 'keyword-tag fade-in';
        keywordElement.style.animationDelay = `${index * 0.1}s`;
        keywordElement.textContent = keyword;
        keywordsContainer.appendChild(keywordElement);
    });
}

function updateTopicModeling(topics) {
    const topicsContainer = document.getElementById('topic-modeling');
    if (!topicsContainer) return;

    topicsContainer.innerHTML = '';
    topics.forEach((topic, index) => {
        const topicElement = document.createElement('div');
        topicElement.className = 'topic-item fade-in';
        topicElement.style.animationDelay = `${index * 0.1}s`;
        topicElement.innerHTML = `
            <div class="topic-label">${topic.name}</div>
            <div class="topic-bar">
                <div class="topic-fill" style="width: ${topic.weight * 100}%"></div>
            </div>
            <div class="topic-weight">${Math.round(topic.weight * 100)}%</div>
        `;
        topicsContainer.appendChild(topicElement);
    });
}

function updateEntityRecognition(entities) {
    const entitiesContainer = document.getElementById('entity-recognition');
    if (!entitiesContainer) return;

    entitiesContainer.innerHTML = '';
    Object.keys(entities).forEach(category => {
        if (entities[category].length > 0) {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'entity-category';
            categoryElement.innerHTML = `
                <div class="category-title">${category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                <div class="entity-list">
                    ${entities[category].map(entity => `<span class="entity-tag ${category.slice(0, -1)}">${entity}</span>`).join('')}
                </div>
            `;
            entitiesContainer.appendChild(categoryElement);
        }
    });
}

function previewTextAnalysis() {
    const text = document.getElementById('economic-text-input').value;
    if (text.length > 50) {
        // Show quick preview of keyword extraction
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const economicWords = words.filter(word =>
            ['gdp', 'inflation', 'economy', 'market', 'growth', 'policy'].includes(word)
        );

        if (economicWords.length > 0) {
            updateEconomicKeywords([...new Set(economicWords)].slice(0, 4));
        }
    }
}

/* ===== UTILITY FUNCTIONS ===== */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `research-notification ${type}`;
    notification.innerHTML = `
        <i class="icon">${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</i>
        <span>${message}</span>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

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

/* ===== EXPORT FUNCTIONALITY ===== */
function exportAnalysisResults() {
    const results = {
        timestamp: new Date().toISOString(),
        forecast: {
            gdp: document.getElementById('gdp-forecast')?.textContent,
            inflation: document.getElementById('inflation-forecast')?.textContent,
            accuracy: document.getElementById('model-accuracy')?.textContent
        },
        policy: {
            gdp_impact: document.getElementById('gdp-impact')?.textContent,
            employment_impact: document.getElementById('employment-impact')?.textContent,
            inflation_impact: document.getElementById('inflation-impact')?.textContent
        },
        nlp: {
            sentiment: document.getElementById('sentiment-score')?.textContent,
            keywords: Array.from(document.querySelectorAll('.keyword-tag')).map(el => el.textContent),
            insights: Array.from(document.querySelectorAll('.insight-item span')).map(el => el.textContent)
        }
    };

    // Download as JSON
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `research_analysis_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('Analysis results exported successfully!', 'success');
}

/* ===== ADVANCED FEATURES ===== */
function compareScenarios() {
    // Advanced scenario comparison functionality
    const scenarios = ['baseline', 'optimistic', 'pessimistic'];
    
    scenarios.forEach(scenario => {
        // Generate comparison data
        const gdpVariation = scenario === 'optimistic' ? 1.2 : scenario === 'pessimistic' ? 0.8 : 1.0;
        const inflationVariation = scenario === 'optimistic' ? 0.9 : scenario === 'pessimistic' ? 1.3 : 1.0;
        
        // Update scenario-specific elements
        const scenarioElement = document.getElementById(`${scenario}-scenario`);
        if (scenarioElement) {
            scenarioElement.innerHTML = `
                <h4>${scenario.charAt(0).toUpperCase() + scenario.slice(1)} Scenario</h4>
                <div class="scenario-metrics">
                    <div class="metric">
                        <span class="metric-label">GDP Growth</span>
                        <span class="metric-value">${(economicData.gdp[0] * gdpVariation).toFixed(1)}%</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Inflation</span>
                        <span class="metric-value">${(economicData.inflation[0] * inflationVariation).toFixed(1)}%</span>
                    </div>
                </div>
            `;
        }
    });
    
    showNotification('Scenario comparison updated', 'success');
}

// Make functions available globally
window.exportAnalysisResults = exportAnalysisResults;
window.compareScenarios = compareScenarios;

/* ===== CLEANUP ===== */
function destroyCharts() {
    if (forecastChart) {
        forecastChart.destroy();
        forecastChart = null;
    }
    if (policyChart) {
        policyChart.destroy();
        policyChart = null;
    }
    if (sentimentChart) {
        sentimentChart.destroy();
        sentimentChart = null;
    }
}

// Cleanup when page unloads
window.addEventListener('beforeunload', destroyCharts);