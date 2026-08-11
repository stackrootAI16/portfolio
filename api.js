// api.js - API Client for Frontend

const API_BASE_URL = window.API_BASE_URL || '/api';

// ============ PROJECTS API ============
async function fetchProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function createProject(projectData) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    });
    if (!response.ok) throw new Error('Failed to create project');
    return await response.json();
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
}

// ============ SKILLS API ============
async function fetchSkills() {
  try {
    const response = await fetch(`${API_BASE_URL}/skills`);
    if (!response.ok) throw new Error('Failed to fetch skills');
    return await response.json();
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

async function createSkill(skillData) {
  try {
    const response = await fetch(`${API_BASE_URL}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skillData)
    });
    if (!response.ok) throw new Error('Failed to create skill');
    return await response.json();
  } catch (error) {
    console.error('Error creating skill:', error);
    return null;
  }
}

// ============ CONTACT API ============
async function sendContactMessage(contactData) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    if (!response.ok) throw new Error('Failed to send message');
    return await response.json();
  } catch (error) {
    console.error('Error sending contact message:', error);
    return null;
  }
}

// ============ HELPER FUNCTION ============
function isServerRunning() {
  return fetch(`${API_BASE_URL.replace('/api', '')}/api/health`)
    .then(res => res.ok)
    .catch(() => false);
}
