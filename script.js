// Navigation Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuIcon = document.querySelector('#menu-icon')
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark');
});

// Progress Line
const progressLine = document.createElement('div');
progressLine.className = 'progress-line';
document.body.appendChild(progressLine);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressLine.style.width = `${scrolled}%`;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active'); // Close mobile menu when clicking a link
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing Animation with smoother transitions
const texts = ['Full Stack Developer', 'Student', 'Web Developer'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';
let isDeleting = false;
let typingSpeed = 100;

function type() {
    currentText = texts[count];
    
    if (isDeleting) {
        letter = currentText.substring(0, index--);
        typingSpeed = 50;
    } else {
        letter = currentText.substring(0, ++index);
        typingSpeed = 100;
    }

    document.querySelector('.typed-text').textContent = letter;

    if (!isDeleting && index === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at the end
    } else if (isDeleting && index === 0) {
        isDeleting = false;
        count = (count + 1) % texts.length;
    }

    setTimeout(type, typingSpeed);
}

// Scroll Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            // Add staggered animation for skill cards
            if (entry.target.classList.contains('skills')) {
                entry.target.querySelectorAll('.skill-card').forEach((card, index) => {
                    card.style.transitionDelay = `${index * 0.1}s`;
                });
            }
            
            // Add staggered animation for project cards
            if (entry.target.classList.contains('projects')) {
                entry.target.querySelectorAll('.project-card').forEach((card, index) => {
                    card.style.transitionDelay = `${index * 0.1}s`;
                });
            }
        }
    });
}, { threshold: 0.2 });

// Observe all sections
document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Handle navigation background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Form Submission with animation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = contactForm.querySelector('button');
    const originalText = button.textContent;
    // Animation for button
    button.textContent = 'Sending...';
    button.style.opacity = '0.7';
    
    try {
        // Simulate sending (replace with actual form submission)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Success animation
        button.textContent = 'Sent Successfully!';
        button.style.backgroundColor = '#059669';
        contactForm.reset();
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.opacity = '1';
            button.style.backgroundColor = '';
        }, 2000);
        
    } catch (error) {
        // Error animation
        button.textContent = 'Error! Try Again';
        button.style.backgroundColor = '#dc2626';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.opacity = '1';
            button.style.backgroundColor = '';
        }, 2000);
    }
});

// Skills Animation
function initializeSkills() {
    const skills = {
        'HTML5': 90,
        'CSS3': 85,
        'JavaScript': 80,
        'React.js': 75,
        'Django': 70,
        'PHP': 75,
        'SQL': 65,
        'Git': 80,
        'RESTful APIs': 75,
        'FastAPI':70,
    };

    const skillsContainer = document.querySelector('.skills-grid');
    skillsContainer.innerHTML = '';

    // Frontend Skills
    const frontendSkills = {
        'HTML5': 90,
        'CSS3': 85,
        'JavaScript': 60,
        'React.js': 40,
        'Responsive Design': 75,
    };

    const frontendCard = createSkillCard('Frontend', 'code', frontendSkills);
    skillsContainer.appendChild(frontendCard);

    // Backend Skills
    const backendSkills = {
        'Django': 70,
        'PHP': 50,
        'SQL': 65,
        'RESTful APIs': 50,
        'FastAPI': 50

    };

    const backendCard = createSkillCard('Backend', 'server', backendSkills);
    skillsContainer.appendChild(backendCard);

    // Tools
    const toolSkills = {
        'Git': 70,
        'GitHub': 75,
        'VS Code': 80,
        'Vercel':50,
        'Command Line': 50
    };

    const toolsCard = createSkillCard('Tools', 'tools', toolSkills);
    skillsContainer.appendChild(toolsCard);
}

function createSkillCard(title, icon, skills) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    
    const header = document.createElement('h3');
    header.innerHTML = `<i class="fas fa-${icon}"></i>${title}`;
    card.appendChild(header);

    Object.entries(skills).forEach(([skill, percentage]) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        skillItem.innerHTML = `
            <div class="skill-info">
                <span class="skill-name">${skill}</span>
                <span class="skill-percentage">${percentage}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress" style="transform: scaleX(${percentage / 100})"></div>
            </div>
        `;
        
        card.appendChild(skillItem);
    });

    return card;
}

// Projects Modal
const projects = [
    {
        title: 'CodeHub',
        description: 'A scalable multi-coding contest platform with real-time submissions and result tracking.',
        longDescription: 'CodeHub is a scalable multi-coding contest platform designed for competitive programming, offering real-time submission tracking and automated result evaluation. Built with Django and FastAPI, it ensures high performance and seamless contest management. The platform features a user-friendly interface, secure execution, and plagiarism detection to maintain fairness. Locust is used for performance testing, ensuring it can handle high user loads. CodeHub provides an optimized and efficient environment for both participants and contest organizers. ',
        tools: ['Django', 'HTML', 'CSS', 'JavaScript', 'FastAPI'],
        timeline: 'December 2024 - Present',
        challenges: 'Developing CodeHub came with several challenges, including ensuring real-time submission processing for fast and accurate evaluations and scalability to handle high participant loads efficiently. Security was a major concern, requiring plagiarism detection and protection against unauthorized access. Optimizing the database for handling large datasets of submissions and rankings was crucial for performance. Additionally, load testing with Locust was essential to simulate high traffic and fine-tune server response times for a smooth user experience.',
        liveDemo: 'https://code-hub-seven.vercel.app',
        code: 'https://github.com/GNANESWARARAO-POLAKI/CodeHub',
        image:'assets/project-images/CodeHub.png',
    },
    {
        title: 'GMRIT-NOTES',
        description: 'A full-stack web application with a responsive design, enabling seamless notes sharing and optimized search visibility.',
        longDescription: 'GMRIT Notes is a comprehensive notes-sharing platform designed to help students access and share study materials easily. Built with HTML, CSS, JavaScript, and PHP, it provides an organized and user-friendly interface for seamless navigation. The platform is SEO-optimized, ensuring better visibility in search engines for relevant academic resources. It allows users to upload, download, and manage notes efficiently, enhancing the learning experience. ',
        tools: ['PHP', 'HTML', 'CSS', 'JS', 'SQL'],
        timeline: 'December 2022 - March 2023',
        challenges: 'Developing GMRIT Notes came with several challenges, including creating a user-friendly and responsive UI for seamless navigation and access to study materials. Efficient file management was crucial to handle uploads, downloads, and storage while keeping content organized. Ensuring SEO optimization was a priority to improve search engine visibility for academic resources. Security concerns such as access control and preventing unauthorized uploads had to be addressed. Additionally, the platform needed to be scalable to accommodate a growing database of notes without compromising performance. ',
        liveDemo: 'http://gmrit-notes.great-site.net/',
        image:'assets/project-images/GMRIT-NOTES.png',
    },
    {
        title: 'LeafCare AI',
        description: 'An AI-powered web application for detecting leaf diseases using machine learning models and intraction with AI to get solutions fot the Disease.',
        longDescription: 'LeafCare AI is an AI-powered web application designed to detect leaf diseases using advanced machine learning models. Built with Django and integrated with Gemini AI, it enables users to upload images of leaves and receive accurate disease diagnoses in real-time. The platform provides detailed insights, including possible causes and treatment suggestions, to help farmers and researchers take preventive measures. With a user-friendly interface and high-accuracy AI models, LeafCare AI aims to improve agricultural productivity by enabling early disease detection. ',
        tools: ['React', 'Django', 'PostgreSQL','Python'],
        timeline: 'Febraury 2024- April 2024',
        challenges: 'Developing LeafCare AI presented several challenges, including ensuring high-accuracy disease detection by training machine learning models on diverse datasets. Handling image processing efficiently was crucial for accurate predictions while maintaining fast response times. Integration with Gemini AI required optimizing model inference to work seamlessly within a web-based environment. Ensuring a user-friendly interface for farmers and researchers while providing detailed insights on diseases was another challenge. Additionally, maintaining scalability to handle large numbers of image uploads and predictions without performance issues was a key concern. ',
        liveDemo: 'https://leafai-five.vercel.app',
        code: 'https://github.com/GNANESWARARAO-POLAKI/LeafCareAI',
        image:'assets/project-images/LeafCareAI.png',
    }
];

function createProjectModal() {
    
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-close"><i class="fas fa-times"></i></div>
            <div class="modal-header">
                <h3></h3>
            </div>
            <div class="project-details">
                <div class="detail-section">
                    <h4>Description</h4>
                    <p class="project-description"></p>
                </div>
                <div class="detail-section">
                    <h4>Tools Used</h4>
                    <div class="tools-list"></div>
                </div>
                <div class="detail-section">
                    <h4>Timeline</h4>
                    <div class="project-timeline">
                        <i class="fas fa-calendar-alt"></i>
                        <span></span>
                    </div>
                </div>
                <div class="detail-section">
                    <h4>Challenges & Solutions</h4>
                    <p class="project-challenges"></p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}


function initializeProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const modal = createProjectModal();

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image" style="background-image: url('${project.image}');"></div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
                <a href="${project.liveDemo}" target="_blank">Live Demo</a>
                <a href="${project.code}" target="_blank">Code</a>
                <a>Details</a>                                                         
            </div>
        `;

        projectCard.addEventListener('click', (e) => {
            const detailsLink = e.target.closest('a');
        
           
            if (detailsLink && detailsLink.textContent.trim() === 'Details') {
                e.preventDefault(); 
                showProjectDetails(project, modal); 
            } else if (!detailsLink) {
                showProjectDetails(project, modal);
            }
        });

        projectsGrid.appendChild(projectCard);
    });

    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function showProjectDetails(project, modal) {
    modal.querySelector('.modal-header h3').textContent = project.title;
    modal.querySelector('.project-description').textContent = project.longDescription;
    
    const toolsList = modal.querySelector('.tools-list');
    toolsList.innerHTML = project.tools
        .map(tool => `<span class="tool-tag">${tool}</span>`)
        .join('');
    
    modal.querySelector('.project-timeline span').textContent = project.timeline;
    modal.querySelector('.project-challenges').textContent = project.challenges;
    
    modal.classList.add('active');
}
function animateSkils(){
    const skillsec=document.getElementById('experience');
    const symbols = '?{}[]()<>!@#$%^&*+=_|';
    const count = 500;
    for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.className = 'symbol';
        span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        span.style.left = `${Math.random() * 100}vw`;
        span.style.top = `${Math.random() * 100}vh`;
        const angle = `${Math.random() * 360}deg`;
        span.style.setProperty('--angle', angle);
        const dx = `${(Math.random() - 0.5) * 100}px`;
        const dy = `${(Math.random() - 0.5) * 100}px`;
        span.style.setProperty('--dx', dx);
        span.style.setProperty('--dy', dy);
        span.style.animationDelay = `${Math.random() * 5}s`;

        skillsec.appendChild(span);
    }
}

// Initialize skills and projects when the page loads
window.addEventListener('DOMContentLoaded', () => {
    initializeSkills();
    initializeProjects();
    animateSkils();
});

// Start typing animation when page loads
window.onload = () => {
    type();
};

