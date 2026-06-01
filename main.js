const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const skillGroups = ref([
            {
                name: 'Languages',
                skills: [
                    { name: 'Java', icon: 'java.png' },
                    { name: 'JavaScript', icon: 'javascript' },
                    { name: 'PHP', icon: 'php' }
                ]
            },
            {
                name: 'Frontend',
                skills: [
                    { name: 'React', icon: 'react' },
                    { name: 'Vue.js', icon: 'vuedotjs' },
                    { name: 'Bootstrap', icon: 'bootstrap' },
                    { name: 'Tailwind CSS', icon: 'tailwindcss' }
                ]
            },
            {
                name: 'Backend & DB',
                skills: [
                    { name: 'Laravel', icon: 'laravel' },
                    { name: 'Node.js', icon: 'nodedotjs' },
                    { name: 'Spring', icon: 'spring' },
                    { name: 'MySQL', icon: 'mysql' }
                ]
            },
            {
                name: 'Tools & Design',
                skills: [
                    { name: 'Git', icon: 'git' },
                    { name: 'Figma', icon: 'figma' },
                    { name: 'VS Code', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg' },
                    { name: 'Postman', icon: 'postman' }
                ]
            }
        ]);

        const interests = ref([
            { name: 'Programming', icon: 'github/white' },
            { name: 'Guitar', icon: 'fa-solid fa-guitar' },
            { name: 'Gaming', icon: 'fa-solid fa-gamepad' },
            { name: 'Music', icon: 'spotify' },
            { name: 'Travel', icon: 'googlemaps' },
            { name: 'Movies', icon: 'imdb' }
        ]);

        const featuredProjects = ref([
            {
                title: 'Inventory System',
                description: 'A comprehensive system for tracking and managing inventory efficiently using Java.',
                image: 'img/Screenshot 2025-04-28 191015.png',
                tags: ['Java', 'Swing'],
                liveLink: '#',
                codeLink: 'https://github.com/TipTopMaestro'
            },
            {
                title: 'Creative Film',
                description: 'Official Entry for Multimedia Arts Festival 2024. A creative film project showcasing storytelling.',
                image: 'img/DESISYON_Eclipse Creatives_BSIT-1B.jpg',
                tags: ['Multimedia', 'Film'],
                liveLink: '#',
                codeLink: 'https://github.com/TipTopMaestro'
            }
        ]);

        const githubRepos = ref([
            {
                title: 'AMBULANCE ROUTING APPLICATION USING BELLMANFORD ALGORITHM',
                description: 'An application to calculate shortest path using bellmanford algorithm for emergency services.',
                url: 'https://github.com/TipTopMaestro/ARA-Ambulance_Routing_Application',
                image: 'img/ARA.png'
            },
            {
                title: 'IC LSG VOTING SYSTEM DATABASE OPTIMIZATION',
                description: 'Database optimization using advance database techniques.',
                url: 'https://github.com/TipTopMaestro/icsa-online-voting-system',
                image: 'img/ICVOTING.png'
                
            },
            {
                title: 'SMART CAMPUS ENERGY SYSTEM',
                description: 'An application for managing and appliance automation for energy management.',
                url: 'https://github.com/TipTopMaestro/Smart-Campus-Energy-System',
                image: 'img/SCES.png'
                
            },
            {
                title: 'BELLMAN FORD ALGORITHM VISUALIZER',
                description: 'A web app for bellmanford algorithm visualization.',
                url: 'https://github.com/TipTopMaestro/Bellman-Ford-Visualizer',
                image: 'img/BFA.png'
                
            }
        ]);

        const contactLinks = ref([
            { label: 'Email', url: 'mailto:quinesmonch@gmail.com', icon: 'fa-solid fa-envelope' },
            { label: 'Mobile', url: 'tel:09705593851', icon: 'fa-solid fa-phone' },
            { label: 'GitHub', url: 'https://github.com/TipTopMaestro', icon: 'github' }
        ]);

        // Typing Animation Logic
        const roles = ['Web App Developer', 'UI/UX Designer', 'BSIT Student'];
        const currentRole = ref('');
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const type = () => {
            const current = roles[roleIndex];
            
            if (isDeleting) {
                currentRole.value = current.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                currentRole.value = current.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === current.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before next role
            }

            setTimeout(type, typeSpeed);
        };

        onMounted(() => {
            type();
            
            // Initialize Lenis Smooth Scroll
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            });

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);

            // Handle anchor link smooth scrolling via Lenis
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        lenis.scrollTo(target);
                    }
                });
            });

            // Custom Cursor Logic
            const cursor = document.querySelector('.custom-cursor');
            
            window.addEventListener('mousemove', (e) => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
                cursor.style.opacity = 1;
            });
            
            // Scroll Reveal Logic
            const reveals = document.querySelectorAll('.reveal');
            const revealOnScroll = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.1 });
            reveals.forEach(el => revealOnScroll.observe(el));

            // Card Spotlight Effect
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                });
            });

            // Hover effects for cursor
            const interactiveElements = document.querySelectorAll('a, button, .card, .skill-tag, .cta-button');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
            });

            // Mouse tracking for background blobs
            document.addEventListener('mousemove', (e) => {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                const wrappers = document.querySelectorAll('.blob-wrapper');
                wrappers.forEach((wrapper, index) => {
                    const speed = (index + 1) * 30;
                    const xOffset = (x - 0.5) * speed;
                    const yOffset = (y - 0.5) * speed;
                    wrapper.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                });
            });
        });

        return {
            skillGroups,
            interests,
            featuredProjects,
            githubRepos,
            contactLinks,
            currentRole
        };
    }
}).mount('#app');
