     // Initialize AOS (Animate On Scroll Library)
     AOS.init({
         duration: 800,
         once: true,
         offset: 100
     });

     // Dark Mode Toggle
     const darkModeToggle = document.getElementById('darkModeToggle');
     const body = document.body;

     // Load saved theme from localStorage
     const currentTheme = localStorage.getItem('theme');
     if (currentTheme === 'dark') {
         body.setAttribute('data-theme', 'dark');
         darkModeToggle.textContent = '☀️'; // Sun for dark mode
     }

     darkModeToggle.addEventListener('click', () => {
         if (body.getAttribute('data-theme') === 'dark') {
             body.removeAttribute('data-theme');
             darkModeToggle.textContent = '🌙'; // Moon for light mode
             localStorage.setItem('theme', 'light');
         } else {
             body.setAttribute('data-theme', 'dark');
             darkModeToggle.textContent = '☀️';
             localStorage.setItem('theme', 'dark');
         }
     });

     // Scroll Progress Bar
     window.addEventListener('scroll', () => {
         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
         const docHeight = document.documentElement.scrollHeight - window.innerHeight;
         const scrollPercent = (scrollTop / docHeight) * 100;
         document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
     });

     // Custom Cursor (Simple following dot)
     const cursorDot = document.createElement('div');
     cursorDot.style.cssText = `
         position: fixed;
         width: 20px;
         height: 20px;
         background: var(--accent);
         border-radius: 50%;
         pointer-events: none;
         z-index: 9999;
         transition: transform 0.1s ease;
         opacity: 0.7;
         mix-blend-mode: difference;
         left: 0;
         top: 0;
     `;
     document.body.appendChild(cursorDot);
     body.style.cursor = 'none'; // Hide default cursor

     document.addEventListener('mousemove', (e) => {
         cursorDot.style.left = (e.clientX - 10) + 'px'; // Center the dot
         cursorDot.style.top = (e.clientY - 10) + 'px';
     });

     // Hover effects for cursor (enlarge on interactive elements)
     const hoverables = document.querySelectorAll('a, button, .project-card, .ai-card');
     hoverables.forEach(el => {
         el.addEventListener('mouseenter', () => cursorDot.style.transform = 'scale(1.5)');
         el.addEventListener('mouseleave', () => cursorDot.style.transform = 'scale(1)');
     });

     // Project and AI Modals
     const modal = document.getElementById('modal');
     const modalBody = document.getElementById('modal-body');
     const closeBtn = document.querySelector('.close');

     // Sample Project Data (Customize titles, descriptions, tools, and links)
     const projects = {
         1: {
             title: 'E-Commerce UI Kit',
             description: 'A responsive UI kit for modern e-commerce platforms, focusing on user-friendly navigation and checkout flows. This project streamlined the shopping experience for a retail client.',
             tools: 'Figma, Adobe XD, Responsive Design',
             link: 'https://dribbble.com/shots/example-ecommerce' // Replace with real link
         },
         2: {
             title: 'Brand Identity for Startup',
             description: 'Full branding suite including logo, color palette, and motion graphics for a tech startup launch.',
             tools: 'Illustrator, Photoshop, After Effects',
             link: 'https://behance.net/gallery/example-branding'
         },
         3: {
             title: 'AI Analytics Dashboard',
             description: 'Interactive dashboard prototype integrating AI insights for real-time data visualization and user analytics.',
             tools: 'Figma, ChatGPT for prompts, JavaScript',
             link: 'https://figma.com/file/example-dashboard'
         },
         4: {
             title: 'Fitness Tracker App',
             description: 'Complete UX flows and wireframes for a mobile health tech app, emphasizing intuitive tracking features.',
             tools: 'Adobe XD, User Research',
             link: 'https://dribbble.com/shots/example-fitness'
         },
         5: {
             title: 'Tech Logo Series',
             description: 'A collection of minimalist logos for tech companies, designed with scalability in mind.',
             tools: 'Illustrator, Vector Graphics',
             link: 'https://behance.net/gallery/example-logos'
         },
         6: {
             title: 'Social Media Automator',
             description: 'Automated workflow using n8n to schedule and optimize social media content across platforms.',
             tools: 'n8n, ChatGPT, API Integration',
             link: 'https://github.com/example/automator'
         }
     };

     // Sample AI Creations Data
     const aiCreations = {
         1: {
             title: 'Futuristic Cityscape',
             description: 'Generated using Midjourney with a custom prompt strategy for cyberpunk-inspired branding visuals.',
             tools: 'Midjourney, Prompt Engineering',
             link: 'https://midjourney.com/example'
         },
         2: {
             title: 'Abstract UI Patterns',
             description: 'Iterative AI generation of seamless patterns for web backgrounds, refined via ChatGPT feedback loops.',
             tools: 'ChatGPT, Midjourney',
             link: 'https://dribbble.com/shots/example-patterns'
         },
         3: {
             title: 'Email Workflow Diagram',
             description: 'AI-assisted creation of automated diagrams for n8n-based email marketing workflows.',
             tools: 'n8n, ChatGPT',
             link: 'https://github.com/example/workflow'
         }
     };

     // Open Project Modal
     document.querySelectorAll('.project-card').forEach(card => {
         card.addEventListener('click', () => {
             const id = card.getAttribute('data-project');
             const project = projects[id];
             modalBody.innerHTML = `
                 <h3>${project.title}</h3>
                 <p>${project.description}</p>
                 <p class="tools">Tools Used: ${project.tools}</p>
                 <a href="${project.link}" target="_blank">View Project</a>
             `;
             modal.style.display = 'block';
         });
     });

     // Open AI Creation Modal
     document.querySelectorAll('.ai-card').forEach(card => {
         card.addEventListener('click', () => {
             const id = card.getAttribute('data-ai');
             const ai = aiCreations[id];
             modalBody.innerHTML = `
                 <h3>${ai.title}</h3>
                 <p>${ai.description}</p>
                 <p class="tools">Tools Used: ${ai.tools}</p>
                 <a href="${ai.link}" target="_blank">View Creation</a>
             `;
             modal.style.display = 'block';
         });
     });

     // Close Modal
     closeBtn.addEventListener('click', () => {
         modal.style.display = 'none';
     });

     window.addEventListener('click', (e) => {
         if (e.target === modal) {
             modal.style.display = 'none';
         }
     });

     // Contact Form Submission (Basic feedback; Formspree handles the rest)
     const form = document.querySelector('.contact-form');
     form.addEventListener('submit', (e) => {
         // Optional: Add loading state
         const btn = form.querySelector('button');
         btn.textContent = 'Sending...';
         btn.disabled = true;

         // Formspree will handle POST; this is just UI feedback
         setTimeout(() => {
             alert('Message sent! Thank you for reaching out. (In production, check your email.)');
             form.reset();
             btn.textContent = 'Send Message';
             btn.disabled = false;
         }, 2000);
     });

     // Smooth Scrolling for Nav Links
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function (e) {
             e.preventDefault();
             const target = document.querySelector(this.getAttribute('href'));
             if (target) {
                 target.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }
         });
     });
     