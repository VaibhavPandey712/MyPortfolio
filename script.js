// Wait for DOM to be fully loaded


document.addEventListener('DOMContentLoaded', function() {
    
    // Typing animation
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        'Full Stack Developer',
        'Java Programmer',
        'Problem Solver',
        'Tech Enthusiast'
    ];
    
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    function typeText() {
        const phrase = phrases[currentPhrase];
        
        if (isDeleting) {
            typingText.textContent = phrase.substring(0, currentChar - 1);
            currentChar--;
        } else {
            typingText.textContent = phrase.substring(0, currentChar + 1);
            currentChar++;
        }
        
        let typingSpeed = 150;
        
        if (isDeleting) {
            typingSpeed = 75;
        }
        
        if (!isDeleting && currentChar === phrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typingSpeed = 500; // Pause before starting new phrase
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing animation
    typeText();
    
    // Smooth scrolling navigation
    // const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Skill bars animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const skillLevel = bar.getAttribute('data-skill');
            bar.style.setProperty('--skill-width', skillLevel + '%');
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('qualities-section')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Competitive Programming Modal
   const competitiveProgrammingCard = document.querySelector('.competitive-programming');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close');
    
    // Competitive programming platforms data
    const platforms = {
        leetcode: {
            name: 'LeetCode',
            url: 'https://leetcode.com/yourusername', // Replace with your actual profile
            icon: 'fas fa-code',
            description: 'Solve coding problems and prepare for technical interviews',
            color: '#FFA500'
        },
        codeforces: {
            name: 'Codeforces',
            url: 'https://codeforces.com/profile/yourusername', // Replace with your actual profile
            icon: 'fas fa-trophy',
            description: 'Competitive programming contests and problem solving',
            color: '#1F8ACB'
        },
        codechef: {
            name: 'CodeChef',
            url: 'https://www.codechef.com/users/yourusername', // Replace with your actual profile
            icon: 'fas fa-utensils',
            description: 'Programming contests and coding challenges',
            color: '#5B4638'
        },
        hackerrank: {
            name: 'HackerRank',
            url: 'https://www.hackerrank.com/yourusername', // Replace with your actual profile
            icon: 'fas fa-laptop-code',
            description: 'Coding challenges and skill assessments',
            color: '#00EA64'
        }
    };
    
    // Add click event to competitive programming card
    if (competitiveProgrammingCard) {
        competitiveProgrammingCard.addEventListener('click', function() {
            showCompetitiveProgrammingModal();
        });
        
        // Add hover effect
        competitiveProgrammingCard.style.cursor = 'pointer';
    }
    
    function showCompetitiveProgrammingModal() {
        const modalContent = `
            <h2 style="color: #fff; text-align: center; margin-bottom: 2rem; font-size: 2rem;">
                Choose a Platform
            </h2>
            <div class="platforms-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                ${Object.entries(platforms).map(([key, platform]) => `
                    <div class="platform-card" data-platform="${key}" style="
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(10px);
                        padding: 1.5rem;
                        border-radius: 15px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        border: 2px solid transparent;
                    ">
                        <div class="platform-icon" style="
                            width: 60px;
                            height: 60px;
                            background: ${platform.color};
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 1rem;
                            transition: transform 0.3s ease;
                        ">
                            <i class="${platform.icon}" style="color: white; font-size: 1.5rem;"></i>
                        </div>
                        <h3 style="color: #fff; margin-bottom: 0.5rem; font-size: 1.2rem;">${platform.name}</h3>
                        <p style="color: #f0f0f0; font-size: 0.9rem; line-height: 1.4;">${platform.description}</p>
                    </div>
                `).join('')}
            </div>
            <div style="text-align: center; margin-top: 2rem;">
                <p style="color: #f0f0f0; font-size: 0.9rem;">Click on any platform to visit my profile</p>
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        modal.style.display = 'block';
        
        // Add click events to platform cards
        const platformCards = document.querySelectorAll('.platform-card');
        platformCards.forEach(card => {
            // Add hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
                this.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                
                const icon = this.querySelector('.platform-icon');
                icon.style.transform = 'scale(1.1) rotateY(180deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
                this.style.border = '2px solid transparent';
                
                const icon = this.querySelector('.platform-icon');
                icon.style.transform = 'scale(1) rotateY(0deg)';
            });
            
            // Add click event to redirect
            card.addEventListener('click', function() {
                const platformKey = this.getAttribute('data-platform');
                const platform = platforms[platformKey];
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    window.open(platform.url, '_blank');
                    modal.style.display = 'none';
                }, 150);
            });
        });
    }
    
    // Close modal events
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Project cards functionality
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            showProjectModal(projectId);
        });
    });
    
    function showProjectModal(projectId) {
        const projects = {
            '1': {
                title: 'E-Commerce Platform',
                description: 'A comprehensive full-stack e-commerce solution built with modern web technologies. Features include user authentication, shopping cart, payment processing, order management, and admin dashboard.',
                technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
                features: [
                    'User registration and authentication',
                    'Product catalog with search and filters',
                    'Shopping cart and wishlist',
                    'Secure payment processing',
                    'Order tracking and history',
                    'Admin dashboard for inventory management'
                ],
                github: '#', // Replace with actual GitHub link
                demo: '#'    // Replace with actual demo link
            },
            '2': {
                title: 'Task Management App',
                description: 'A collaborative project management application with real-time updates and team collaboration features. Built with Vue.js and Firebase for seamless user experience.',
                technologies: ['Vue.js', 'Firebase', 'CSS3', 'JavaScript'],
                features: [
                    'Real-time task updates',
                    'Drag and drop functionality',
                    'Team collaboration tools',
                    'Progress tracking',
                    'File attachments',
                    'Deadline notifications'
                ],
                github: '#', // Replace with actual GitHub link
                demo: '#'    // Replace with actual demo link
            },
            '3': {
                title: 'Data Visualization Dashboard',
                description: 'An interactive dashboard for data analysis and visualization. Features multiple chart types, real-time data processing, and export capabilities.',
                technologies: ['D3.js', 'Python', 'Flask', 'PostgreSQL'],
                features: [
                    'Interactive charts and graphs',
                    'Real-time data processing',
                    'Multiple visualization types',
                    'Data export functionality',
                    'Responsive design',
                    'Custom filtering options'
                ],
                github: '#', // Replace with actual GitHub link
                demo: '#'    // Replace with actual demo link
            }
        };
        
        const project = projects[projectId];
        if (!project) return;
        
        const modalContent = `
            <h2 style="color: #fff; margin-bottom: 1.5rem; font-size: 2rem;">${project.title}</h2>
            <p style="color: #f0f0f0; margin-bottom: 1.5rem; line-height: 1.6; font-size: 1.1rem;">${project.description}</p>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #fff; margin-bottom: 1rem;">Technologies Used:</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${project.technologies.map(tech => `
                        <span style="background: rgba(255, 255, 255, 0.2); color: #fff; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem;">${tech}</span>
                    `).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="color: #fff; margin-bottom: 1rem;">Key Features:</h3>
                <ul style="color: #f0f0f0; line-height: 1.8; margin-left: 1.5rem;">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <a href="${project.github}" target="_blank" style="
                    background: #333;
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border-radius: 25px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                ">
                    <i class="fab fa-github"></i> View Code
                </a>
                <a href="${project.demo}" target="_blank" style="
                    background: #667eea;
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border-radius: 25px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                ">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        modal.style.display = 'block';
    }
    
    // Email functionality
    const emailElement = document.querySelector('.contact-item span');
    if (emailElement) {
        emailElement.addEventListener('click', function() {
            const email = this.textContent;
            window.location.href = `mailto:${email}`;
        });
        emailElement.style.cursor = 'pointer';
    }
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Change navbar background on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.profile-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add smooth hover effects to buttons
    const buttons = document.querySelectorAll('.btn, .social-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
    
    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Console log for developers
    console.log('%c🚀 Welcome to my portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cThanks for checking out the code!', 'color: #764ba2; font-size: 14px;');
    console.log('%cFeel free to reach out if you have any questions.', 'color: #333; font-size: 12px;');

});
window.onclick = function(event) {
  const modal = document.getElementById("projectModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
