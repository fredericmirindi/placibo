// Data
const researchPapers = [
  {
    title: "Machine Learning Applications in Economic Forecasting",
    authors: "Author Name, Co-Author Name",
    venue: "Journal of Economic Research",
    year: 2024,
    abstract: "This paper explores novel applications of deep learning models in macroeconomic forecasting, demonstrating improved accuracy over traditional econometric methods.",
    keywords: ["Machine Learning", "Economics", "Forecasting"]
  },
  {
    title: "AI-Driven Policy Analysis: A Computational Approach",
    authors: "Author Name, et al.",
    venue: "International Conference on AI and Economics",
    year: 2023,
    abstract: "We present a computational framework for analyzing economic policy impacts using reinforcement learning and agent-based modeling.",
    keywords: ["AI", "Policy Analysis", "Agent-Based Modeling"]
  },
  {
    title: "Deep Learning for Time Series Analysis in Finance",
    authors: "Author Name, Collaborator Name",
    venue: "Finance & AI Journal",
    year: 2023,
    abstract: "Novel LSTM architectures for predicting financial market trends with applications to risk management and portfolio optimization.",
    keywords: ["Deep Learning", "Finance", "Time Series"]
  }
];

const conferences = [
  {
    location: "Athens, Greece",
    role: "Speaker",
    title: "AI Applications in Economic Policy",
    date: "June 2024",
    event: "International Economics Conference",
    details: "Presented groundbreaking research on using artificial intelligence to model and predict economic policy outcomes. The talk covered machine learning methodologies and their applications in policy analysis."
  },
  {
    location: "Montreal, Canada",
    role: "Presenter",
    title: "Machine Learning for Macroeconomic Forecasting",
    date: "March 2024",
    event: "Canadian Economic Association Meeting",
    details: "Demonstrated novel approaches to macroeconomic forecasting using ensemble learning methods and deep neural networks."
  },
  {
    location: "London, UK",
    role: "Panelist",
    title: "The Future of AI in Economics Research",
    date: "October 2023",
    event: "AI & Economics Symposium",
    details: "Participated in panel discussion on emerging trends in AI applications for economic research, discussing ethical considerations and future directions."
  }
];

// State management
let currentPage = 'home';
let currentTheme = 'light';
let currentFontSize = 'medium';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDarkMode();
  initFontSize();
  initHomePage();
  initResearchPage();
  initConferencesPage();
  initAboutPage();
  initContactPage();
  initChatbot();
});

// Navigation
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  
  // Add click handlers to all navigation links
  document.querySelectorAll('[data-page]').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const page = element.getAttribute('data-page');
      navigateToPage(page);
    });
  });

  // Hamburger menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
    });
  }
}

function navigateToPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show selected page
  const targetPage = document.getElementById(`${pageName}-page`);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = pageName;
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === pageName) {
        link.classList.add('active');
      }
    });

    // Close mobile menu
    document.querySelector('.nav-links').classList.remove('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger page-specific animations
    if (pageName === 'home') {
      animateStats();
    }
  }
}

// Dark Mode
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  darkModeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
  });
}

// Font Size
function initFontSize() {
  const fontSizeBtn = document.getElementById('fontSizeBtn');
  const fontModal = document.getElementById('fontModal');
  const closeFontModal = document.getElementById('closeFontModal');
  const fontSizeOptions = document.querySelectorAll('[data-size]');

  fontSizeBtn.addEventListener('click', () => {
    fontModal.classList.add('open');
  });

  closeFontModal.addEventListener('click', () => {
    fontModal.classList.remove('open');
  });

  fontSizeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const size = option.getAttribute('data-size');
      document.body.className = document.body.className.replace(/font-\w+/g, '');
      if (size !== 'medium') {
        document.body.classList.add(`font-${size}`);
      }
      currentFontSize = size;
    });
  });
}

// Home Page
function initHomePage() {
  animateStats();
}

function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target + '+';
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current) + '+';
      }
    }, 30);
  });
}

// Research Page
function initResearchPage() {
  renderResearchPapers();
  initResearchFilters();
  initAIResearchTools();
}

function renderResearchPapers(filter = {}) {
  const grid = document.getElementById('researchGrid');
  let papers = researchPapers;

  // Apply filters
  if (filter.year) {
    papers = papers.filter(p => p.year === parseInt(filter.year));
  }
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    papers = papers.filter(p => 
      p.title.toLowerCase().includes(searchLower) ||
      p.abstract.toLowerCase().includes(searchLower) ||
      p.keywords.some(k => k.toLowerCase().includes(searchLower))
    );
  }

  grid.innerHTML = papers.map((paper, index) => `
    <div class="research-card">
      <h3>${paper.title}</h3>
      <div class="research-meta">
        ${paper.authors} • ${paper.venue} • ${paper.year}
      </div>
      <div class="research-abstract collapsed" id="abstract-${index}">
        ${paper.abstract}
      </div>
      <button class="expand-btn" onclick="toggleAbstract(${index})">
        Show more
      </button>
      <div class="research-keywords">
        ${paper.keywords.map(k => `<span class="tag">${k}</span>`).join('')}
      </div>
      <div class="research-links">
        <a href="#" class="link-btn">PDF</a>
        <a href="#" class="link-btn">DOI</a>
        <a href="#" class="link-btn">Cite</a>
      </div>
    </div>
  `).join('');
}

function toggleAbstract(index) {
  const abstract = document.getElementById(`abstract-${index}`);
  const btn = abstract.nextElementSibling;
  
  if (abstract.classList.contains('collapsed')) {
    abstract.classList.remove('collapsed');
    btn.textContent = 'Show less';
  } else {
    abstract.classList.add('collapsed');
    btn.textContent = 'Show more';
  }
}

function initResearchFilters() {
  const searchInput = document.getElementById('researchSearch');
  const yearFilter = document.getElementById('yearFilter');

  searchInput.addEventListener('input', (e) => {
    renderResearchPapers({
      search: e.target.value,
      year: yearFilter.value
    });
  });

  yearFilter.addEventListener('change', (e) => {
    renderResearchPapers({
      search: searchInput.value,
      year: e.target.value
    });
  });
}

function initAIResearchTools() {
  // Summarizer
  document.getElementById('summarizeBtn').addEventListener('click', async () => {
    const text = document.getElementById('paperText').value;
    const result = document.getElementById('summaryResult');
    
    if (!text.trim()) {
      result.textContent = 'Please enter text to summarize.';
      result.classList.add('show');
      return;
    }

    result.innerHTML = '<div class="loading"></div> Processing...';
    result.classList.add('show');

    await simulateAIDelay();
    
    result.innerHTML = `
      <strong>AI Summary:</strong><br><br>
      This research explores innovative applications of machine learning in economic analysis. 
      The study demonstrates significant improvements in prediction accuracy and provides practical 
      frameworks for implementation. Key findings suggest strong potential for real-world applications.
      <br><br>
      <em>Note: This is a demonstration summary.</em>
    `;
  });

  // Citation Generator
  document.getElementById('generateCitation').addEventListener('click', async () => {
    const style = document.getElementById('citationStyle').value;
    const paperIndex = document.getElementById('paperSelect').value;
    const result = document.getElementById('citationResult');
    const paper = researchPapers[paperIndex];

    result.innerHTML = '<div class="loading"></div> Generating...';
    result.classList.add('show');

    await simulateAIDelay();

    const citations = {
      apa: `${paper.authors.split(',')[0]} (${paper.year}). ${paper.title}. <em>${paper.venue}</em>.`,
      mla: `${paper.authors.split(',')[0]}. "${paper.title}." <em>${paper.venue}</em>, ${paper.year}.`,
      chicago: `${paper.authors.split(',')[0]}. "${paper.title}." <em>${paper.venue}</em> (${paper.year}).`
    };

    result.innerHTML = `<strong>${style.toUpperCase()} Citation:</strong><br><br>${citations[style]}`;
  });

  // Keyword Extractor
  document.getElementById('extractKeywords').addEventListener('click', async () => {
    const text = document.getElementById('abstractText').value;
    const result = document.getElementById('keywordsResult');

    if (!text.trim()) {
      result.textContent = 'Please enter abstract text.';
      result.classList.add('show');
      return;
    }

    result.innerHTML = '<div class="loading"></div> Extracting keywords...';
    result.classList.add('show');

    await simulateAIDelay();

    const keywords = ['Machine Learning', 'Deep Learning', 'Economic Forecasting', 'Data Analysis', 'Neural Networks'];
    result.innerHTML = `
      <strong>Extracted Keywords:</strong><br><br>
      ${keywords.map(k => `<span class="tag">${k}</span>`).join(' ')}
      <br><br>
      <em>AI-powered keyword extraction (demo)</em>
    `;
  });
}

// Conferences Page
function initConferencesPage() {
  renderConferences();
  initConferenceFilters();
  initConferenceRecommender();
}

function renderConferences(filterYear = '') {
  const timeline = document.getElementById('conferenceTimeline');
  let confs = conferences;

  if (filterYear) {
    confs = confs.filter(c => c.date.includes(filterYear));
  }

  timeline.innerHTML = confs.map((conf, index) => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="conference-card">
        <div class="conf-header">
          <div>
            <h3 class="conf-title">${conf.title}</h3>
            <div class="conf-meta">
              📍 ${conf.location} • 📅 ${conf.date}<br>
              🎤 ${conf.event}
            </div>
          </div>
          <span class="conf-role">${conf.role}</span>
        </div>
        <button class="conf-expand" onclick="toggleConfDetails(${index})">
          View Details ▼
        </button>
        <div class="conf-details" id="conf-details-${index}">
          <p>${conf.details}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleConfDetails(index) {
  const details = document.getElementById(`conf-details-${index}`);
  details.classList.toggle('show');
}

function initConferenceFilters() {
  const yearFilter = document.getElementById('confYearFilter');
  yearFilter.addEventListener('change', (e) => {
    renderConferences(e.target.value);
  });
}

function initConferenceRecommender() {
  document.getElementById('recommendConf').addEventListener('click', async () => {
    const interests = document.getElementById('researchInterests').value;
    const result = document.getElementById('confRecommendations');

    if (!interests.trim()) {
      result.innerHTML = 'Please enter your research interests.';
      result.classList.add('show');
      return;
    }

    result.innerHTML = '<div class="loading"></div> Analyzing your interests...';
    result.classList.add('show');

    await simulateAIDelay(1000);

    result.innerHTML = `
      <strong>Recommended Conferences:</strong><br><br>
      📅 <strong>International AI Conference 2025</strong><br>
      Vienna, Austria • March 2025<br>
      Match: 95%<br><br>
      
      📅 <strong>Economics & Machine Learning Summit</strong><br>
      San Francisco, USA • May 2025<br>
      Match: 92%<br><br>
      
      📅 <strong>Computational Economics Forum</strong><br>
      Tokyo, Japan • September 2025<br>
      Match: 88%<br><br>
      
      <em>AI-powered recommendations based on your interests</em>
    `;
  });
}

// About Page
function initAboutPage() {
  initNetworkGraph();
}

function initNetworkGraph() {
  const svg = document.getElementById('networkGraph');
  const width = svg.clientWidth || 600;
  const height = 400;
  
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  // Create network nodes
  const nodes = [
    { x: width / 2, y: height / 2, r: 30, label: 'You', color: 'var(--color-primary)' },
    { x: width / 4, y: height / 3, r: 20, label: 'Co-Author 1', color: 'var(--color-teal-400)' },
    { x: 3 * width / 4, y: height / 3, r: 20, label: 'Co-Author 2', color: 'var(--color-teal-400)' },
    { x: width / 4, y: 2 * height / 3, r: 15, label: 'Collaborator 1', color: 'var(--color-teal-300)' },
    { x: 3 * width / 4, y: 2 * height / 3, r: 15, label: 'Collaborator 2', color: 'var(--color-teal-300)' },
    { x: width / 2, y: height / 6, r: 15, label: 'Mentor', color: 'var(--color-teal-300)' }
  ];

  // Draw connections
  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 3], [2, 4]
  ];

  connections.forEach(([i, j]) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', nodes[i].x);
    line.setAttribute('y1', nodes[i].y);
    line.setAttribute('x2', nodes[j].x);
    line.setAttribute('y2', nodes[j].y);
    line.setAttribute('stroke', 'var(--color-border)');
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);
  });

  // Draw nodes
  nodes.forEach(node => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', node.x);
    circle.setAttribute('cy', node.y);
    circle.setAttribute('r', node.r);
    circle.setAttribute('fill', node.color);
    circle.setAttribute('opacity', '0.8');
    svg.appendChild(circle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', node.x);
    text.setAttribute('y', node.y + node.r + 15);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'var(--color-text)');
    text.setAttribute('font-size', '12');
    text.textContent = node.label;
    svg.appendChild(text);
  });
}

// Contact Page
function initContactPage() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Simulate sending
    await simulateAIDelay(500);
    
    form.style.display = 'none';
    successMessage.style.display = 'flex';

    // Reset after 3 seconds
    setTimeout(() => {
      form.reset();
      form.style.display = 'block';
      successMessage.style.display = 'none';
    }, 3000);
  });

  // Email template generator
  document.getElementById('generateEmail').addEventListener('click', async () => {
    const purpose = document.getElementById('emailPurpose').value;
    const result = document.getElementById('emailTemplate');

    result.innerHTML = '<div class="loading"></div> Generating template...';
    result.classList.add('show');

    await simulateAIDelay();

    const templates = {
      collaboration: `
        <strong>Subject:</strong> Research Collaboration Opportunity<br><br>
        Dear [Name],<br><br>
        I hope this message finds you well. I am reaching out regarding a potential research collaboration 
        in the field of [field]. Your work on [topic] aligns closely with my current research interests.<br><br>
        I would be delighted to discuss possible synergies between our research programs.<br><br>
        Best regards,<br>
        [Your Name]
      `,
      media: `
        <strong>Subject:</strong> Media Inquiry Response<br><br>
        Dear [Name],<br><br>
        Thank you for your interest in my research. I would be happy to provide insights on [topic] 
        for your publication.<br><br>
        I am available for an interview at your convenience.<br><br>
        Best regards,<br>
        [Your Name]
      `,
      student: `
        <strong>Subject:</strong> Response to Student Inquiry<br><br>
        Dear [Student Name],<br><br>
        Thank you for your interest in my research. I appreciate your enthusiasm for [topic].<br><br>
        Please feel free to stop by during my office hours or schedule a meeting to discuss further.<br><br>
        Best regards,<br>
        [Your Name]
      `
    };

    result.innerHTML = templates[purpose] + '<br><em>AI-generated template (customize as needed)</em>';
  });
}

// Chatbot
function initChatbot() {
  const chatbot = document.getElementById('chatbot');
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatBody = document.getElementById('chatbotBody');

  chatbotToggle.addEventListener('click', () => {
    chatbot.classList.add('open');
    chatbotToggle.classList.add('hidden');
  });

  chatbotClose.addEventListener('click', () => {
    chatbot.classList.remove('open');
    chatbotToggle.classList.remove('hidden');
  });

  const sendMessage = async () => {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user-message';
    userMsg.innerHTML = `<p>${message}</p>`;
    chatBody.appendChild(userMsg);
    chatInput.value = '';

    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate AI response
    await simulateAIDelay(800);

    const botMsg = document.createElement('div');
    botMsg.className = 'chat-message bot-message';
    botMsg.innerHTML = `<p>${getBotResponse(message)}</p>`;
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

function getBotResponse(message) {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('research') || lowerMsg.includes('paper')) {
    return 'I have published research in machine learning, economic forecasting, and policy analysis. Check out the Research page for details!';
  } else if (lowerMsg.includes('conference') || lowerMsg.includes('speaking')) {
    return 'I regularly present at international conferences. Visit the Conferences page to see my recent speaking engagements.';
  } else if (lowerMsg.includes('contact') || lowerMsg.includes('email')) {
    return 'You can reach me at your.email@university.edu or use the Contact page to send a message directly.';
  } else if (lowerMsg.includes('teaching') || lowerMsg.includes('course')) {
    return 'I teach courses in Econometrics and Machine Learning for Economics. More details are on the About page.';
  } else {
    return 'Thanks for your question! This is a demonstration chatbot. Feel free to explore the different pages of this portfolio to learn more.';
  }
}

// Utility Functions
function simulateAIDelay(ms = 700) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Make functions global for onclick handlers
window.toggleAbstract = toggleAbstract;
window.toggleConfDetails = toggleConfDetails;