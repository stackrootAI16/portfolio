// portfolio.js - Main Frontend Logic

// ============ LOAD DATA ON PAGE START ============
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🔄 Loading portfolio data...');
  
  // Check if server is running
  const serverRunning = await isServerRunning();
  if (!serverRunning) {
    console.warn('⚠️ Backend server not running. Using static data.');
    loadStaticData();
    return;
  }

  // Load dynamic data from backend
  await loadProjects();
  await loadSkills();
  setupContactForm();
});

// ============ LOAD PROJECTS ============
async function loadProjects() {
  const projects = await fetchProjects();
  const projectGrid = document.querySelector('.project-grid');
  
  if (!projectGrid || projects.length === 0) return;

  projectGrid.innerHTML = '';
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <ul>
        ${project.details.map(detail => `<li>${detail}</li>`).join('')}
      </ul>
      <div style="margin-top: 0.8rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
        ${project.tags.map(tag => `<span style="background: rgba(56, 189, 248, 0.2); padding: 0.3rem 0.6rem; border-radius: 999px; font-size: 0.85rem;">${tag}</span>`).join('')}
      </div>
    `;
    projectGrid.appendChild(card);
  });
}

// ============ LOAD SKILLS ============
async function loadSkills() {
  const skills = await fetchSkills();
  const skillsContainer = document.querySelector('.skills');
  
  if (!skillsContainer || skills.length === 0) return;

  skillsContainer.innerHTML = '';
  skills.forEach(skill => {
    const span = document.createElement('span');
    span.textContent = skill.name;
    skillsContainer.appendChild(span);
  });
}

// ============ CONTACT FORM SETUP ============
function setupContactForm() {
  // Find or create contact form
  const contactSection = document.querySelector('#contact');
  if (!contactSection) return;

  // Check if form already exists
  if (contactSection.querySelector('form')) return;

  const form = document.createElement('form');
  form.innerHTML = `
    <div style="max-width: 500px; margin: 1.5rem auto;">
      <div style="margin-bottom: 1rem;">
        <input type="text" id="contactName" placeholder="Your Name" required 
          style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid #7dd3fc; background: rgba(15, 23, 42, 0.9); color: #f8fafc;">
      </div>
      <div style="margin-bottom: 1rem;">
        <input type="email" id="contactEmail" placeholder="Your Email" required 
          style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid #7dd3fc; background: rgba(15, 23, 42, 0.9); color: #f8fafc;">
      </div>
      <div style="margin-bottom: 1rem;">
        <textarea id="contactMessage" placeholder="Your Message" rows="5" required 
          style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid #7dd3fc; background: rgba(15, 23, 42, 0.9); color: #f8fafc;"></textarea>
      </div>
      <button type="submit" style="width: 100%; padding: 0.8rem; background: #38bdf8; color: #082f49; border: none; border-radius: 8px; font-weight: 700; cursor: pointer;">
        Send Message
      </button>
    </div>
  `;

  form.onsubmit = async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    const result = await sendContactMessage({ name, email, message });
    
    if (result) {
      alert('✅ Message sent successfully! Thank you for reaching out.');
      form.reset();
    } else {
      alert('❌ Failed to send message. Please try again.');
    }
  };

  contactSection.querySelector('.contact-card').style.display = 'none';
  contactSection.appendChild(form);
}

// ============ STATIC FALLBACK DATA ============
function loadStaticData() {
  const staticProjects = [
    {
      title: 'JARVIS Assistant (In Progress)',
      description: 'Local AI assistant using LLMs for offline tasks',
      details: [
        'Exploring local language models without cloud dependency',
        'Investigating edge technologies and lightweight deployment',
        'Designing workflows for automation, memory, and task handling'
      ],
      tags: ['Python', 'LLM', 'AI', 'Automation']
    },
    {
      title: 'Local AI Research',
      description: 'Tuning smaller efficient models for practical applications',
      details: [
        'Studying model behavior in offline environments',
        'Comparing local inference with cloud-connected AI',
        'Exploring adaptable AI for edge devices'
      ],
      tags: ['Research', 'AI', 'Machine Learning']
    },
    {
      title: 'Automation & Intelligent Workflows',
      description: 'Building systems to reduce repetitive work',
      details: [
        'Applying Python for automation and data tasks',
        'Exploring AI agents for structured workflows',
        'Connecting intelligent systems with business use cases'
      ],
      tags: ['Python', 'Automation', 'Workflow']
    }
  ];

  const projectGrid = document.querySelector('.project-grid');
  if (projectGrid) {
    projectGrid.innerHTML = '';
    staticProjects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <ul>
          ${project.details.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
      `;
      projectGrid.appendChild(card);
    });
  }
}
