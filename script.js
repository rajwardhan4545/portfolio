/* ============================================
   RAJWARDHAN PATIL — ENERGETIC PORTFOLIO SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. TYPING ANIMATION (Software Developer focus)
    // ============================================
    const roles = [
        'Software Developer',
        'Full-Stack Engineer',
        'SDUI & Kotlin Builder',
        'Backend & Systems Architect',
        'Problem Solver & Creator',
    ];

    const typedTextEl = document.getElementById('typedText');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function typeRole() {
        if (!typedTextEl) return;
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 35;
        } else {
            typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 70;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400;
        }

        setTimeout(typeRole, typingSpeed);
    }

    typeRole();


    // ============================================
    // 2. INTERACTIVE HERO CANVAS (Energy Particle Network)
    // ============================================
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        function resizeCanvas() {
            const hero = document.getElementById('hero');
            width = canvas.width = hero ? hero.offsetWidth : window.innerWidth;
            height = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
            initParticles();
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.8;
                const hues = [185, 215, 275, 310]; // Cyan, Blue, Purple, Pink Aurora spectrum
                this.hue = hues[Math.floor(Math.random() * hues.length)];
                this.alpha = Math.random() * 0.6 + 0.3;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > width || this.x < 0) this.speedX *= -1;
                if (this.y > height || this.y < 0) this.speedY *= -1;

                // Mouse interaction
                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= (dx / dist) * force * 3;
                        this.y -= (dy / dist) * force * 3;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${this.alpha})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = `hsla(${this.hue}, 90%, 60%, 0.6)`;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        function initParticles() {
            particles = [];
            const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            const maxDistance = 120;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.25;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.clientY <= rect.bottom && e.clientY >= rect.top) {
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            } else {
                mouse.x = null;
                mouse.y = null;
            }
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        resizeCanvas();
        animateParticles();
    }


    // ============================================
    // 3. CURSOR GLOW SPOTLIGHT
    // ============================================
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.style.opacity = '1';
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });

        function renderGlow() {
            glowX += (mouseX - glowX) * 0.12;
            glowY += (mouseY - glowY) * 0.12;
            cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
            requestAnimationFrame(renderGlow);
        }
        renderGlow();
    }


    // ============================================
    // 3b. GLOBAL BACKGROUND CANVAS (Full-page animated star dust)
    // ============================================
    const bgCanvas = document.getElementById('bgCanvas');
    if (bgCanvas) {
        const bgCtx = bgCanvas.getContext('2d');
        let bgW, bgH;
        let bgParticles = [];
        let bgRaf;

        function resizeBg() {
            bgW = bgCanvas.width = window.innerWidth;
            bgH = bgCanvas.height = window.innerHeight;
        }

        class BgDust {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * bgW;
                this.y = Math.random() * bgH;
                this.size = Math.random() * 1.8 + 0.3;
                this.speedX = (Math.random() - 0.5) * 0.25;
                this.speedY = (Math.random() - 0.5) * 0.18;
                const hues = [185, 200, 270, 310, 145];
                this.hue = hues[Math.floor(Math.random() * hues.length)];
                this.alpha = Math.random() * 0.55 + 0.1;
                this.twinkleSpeed = Math.random() * 0.02 + 0.005;
                this.twinklePhase = Math.random() * Math.PI * 2;
            }
            update(t) {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < -5) this.x = bgW + 5;
                if (this.x > bgW + 5) this.x = -5;
                if (this.y < -5) this.y = bgH + 5;
                if (this.y > bgH + 5) this.y = -5;
                this.twinklePhase += this.twinkleSpeed;
            }
            draw(t) {
                const twinkle = 0.5 + 0.5 * Math.sin(this.twinklePhase);
                const a = this.alpha * twinkle;
                bgCtx.beginPath();
                bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                bgCtx.fillStyle = `hsla(${this.hue}, 90%, 75%, ${a})`;
                bgCtx.shadowBlur = this.size * 5;
                bgCtx.shadowColor = `hsla(${this.hue}, 90%, 65%, 0.5)`;
                bgCtx.fill();
                bgCtx.shadowBlur = 0;
            }
        }

        function initBg() {
            bgParticles = [];
            const count = Math.min(Math.floor((bgW * bgH) / 8000), 160);
            for (let i = 0; i < count; i++) bgParticles.push(new BgDust());
        }

        let bgT = 0;
        function animateBg() {
            bgCtx.clearRect(0, 0, bgW, bgH);
            bgT++;
            bgParticles.forEach(p => {
                p.update(bgT);
                p.draw(bgT);
            });
            bgRaf = requestAnimationFrame(animateBg);
        }

        resizeBg();
        initBg();
        animateBg();

        window.addEventListener('resize', () => {
            resizeBg();
            initBg();
        }, { passive: true });
    }


    // ============================================
    // 4. SCROLL PROGRESS BAR & NAVBAR SCROLL
    // ============================================
    const scrollProgress = document.getElementById('scrollProgress');
    const nav = document.getElementById('nav');

    function handleScrollUpdates() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (scrollProgress && scrollHeight > 0) {
            const progress = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        if (nav) {
            if (scrollTop > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleScrollUpdates, { passive: true });
    handleScrollUpdates();


    // ============================================
    // 4b. ANIMATED STAT COUNTERS (Adrian-style)
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(easeOut(progress) * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                statNumbers.forEach(el => animateCounter(el));
            }
        });
    }, { threshold: 0.4 });

    const statsStrip = document.querySelector('.stats-strip');
    if (statsStrip) statsObserver.observe(statsStrip);


    // ============================================
    // 5. MOBILE NAV TOGGLE
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }


    // ============================================
    // 6. INTERACTIVE PROJECT FILTERING
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const allCards = document.querySelectorAll('.project-card');

            allCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filterValue === 'all' || category === filterValue;

                if (shouldShow) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, index * 40);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.96)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    function updateProjectFilterCount() {
        const total = document.querySelectorAll('.project-card').length;
        const countEl = document.querySelector('.filter-count');
        if (countEl) countEl.textContent = total;
    }


    // ============================================
    // 7. SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.12,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });


    // ============================================
    // 8. NUMBER COUNTER ANIMATION
    // ============================================
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 1600;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const ease = 1 - Math.pow(1 - progress, 3);
                        counter.textContent = Math.floor(ease * target);

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    }

                    requestAnimationFrame(updateCounter);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }


    // ============================================
    // 9. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = nav ? nav.offsetHeight : 70;
                const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 15;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });


    // ============================================
    // 10. ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY + (nav ? nav.offsetHeight : 70) + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLink.classList.add('nav-active');
                } else {
                    navLink.classList.remove('nav-active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink, { passive: true });


    // ============================================
    // 11. 3D TILT EFFECT ON CARDS
    // ============================================
    function addTiltEffect(card) {
        if (!window.matchMedia('(pointer: fine)').matches) return;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    }

    const tiltCards = document.querySelectorAll('.project-card, .highlight-card, .skill-category, .edu-card');
    tiltCards.forEach(card => addTiltEffect(card));


    // ============================================
    // 12. CONTACT FORM HANDLER
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = document.getElementById('formSubmitBtn');
            const statusEl = document.getElementById('formStatus');
            const originalHTML = btn.innerHTML;

            // Loading state
            btn.disabled = true;
            btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    statusEl.className = 'form-status success';
                    statusEl.textContent = '✅ Message sent! I\'ll get back to you soon.';
                    statusEl.style.display = 'block';
                    contactForm.reset();
                    btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
                    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.style.background = '';
                        btn.disabled = false;
                        setTimeout(() => { statusEl.style.display = 'none'; }, 500);
                    }, 4000);
                } else {
                    throw new Error('Server error');
                }
            } catch (err) {
                statusEl.className = 'form-status error';
                statusEl.textContent = '❌ Oops! Something went wrong. Try emailing me directly.';
                statusEl.style.display = 'block';
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }
        });
    }

    // ============================================
    // 13. INTERACTIVE CODE BLUEPRINT TABS & COPY
    // ============================================
    const editorTabs = document.querySelectorAll('.editor-tab');
    const codePanes = document.querySelectorAll('.code-pane');
    const activeLangName = document.getElementById('activeLangName');
    const copyCodeBtn = document.getElementById('copyCodeBtn');

    const langNames = {
        'config': 'Developer.ts',
        'terminal': 'Interactive_CLI.sh',
        'sdui': 'DailyLoop.kt',
        'mindset': 'Mindset.java'
    };

    editorTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            editorTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            codePanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `pane-${targetTab}`) {
                    pane.classList.add('active');
                }
            });

            if (activeLangName && langNames[targetTab]) {
                activeLangName.textContent = langNames[targetTab];
            }
        });
    });

    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const activePane = document.querySelector('.code-pane.active code');
            if (activePane) {
                navigator.clipboard.writeText(activePane.textContent).then(() => {
                    const originalHTML = copyCodeBtn.innerHTML;
                    copyCodeBtn.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
                    copyCodeBtn.style.background = '#10b981';
                    copyCodeBtn.style.color = '#fff';

                    setTimeout(() => {
                        copyCodeBtn.innerHTML = originalHTML;
                        copyCodeBtn.style.background = '';
                        copyCodeBtn.style.color = '';
                    }, 2000);
                });
            }
        });
    }


    // ============================================
    // 14. INTERACTIVE CLI TERMINAL EMULATOR
    // ============================================
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    const cliButtons = document.querySelectorAll('.cli-cmd-btn');

    const cliResponses = {
        'whoami': `<div class="terminal-line"><span class="t-accent">Name:</span> Rajwardhan Patil</div>
                   <div class="terminal-line"><span class="t-accent">Role:</span> Software Developer @ Raja Software Labs</div>
                   <div class="terminal-line"><span class="t-accent">Alumnus:</span> NIT Karnataka, Surathkal (ECE)</div>
                   <div class="terminal-line"><span class="t-accent">Specialization:</span> Server-Driven UI (SDUI), Full-Stack Systems, Clean Architecture</div>`,
        'skills': `<div class="terminal-line"><span class="t-accent">Languages:</span> Java, Kotlin, C++, C#, Python, SQL, JavaScript</div>
                   <div class="terminal-line"><span class="t-accent">Frontend:</span> React.js, Tailwind CSS, HTML5, CSS3</div>
                   <div class="terminal-line"><span class="t-accent">Backend:</span> Spring Boot, .NET Core, REST APIs, JWT, MySQL</div>
                   <div class="terminal-line"><span class="t-accent">Tools & OS:</span> Git, GitHub, Docker, Linux, Android Native</div>`,
        'experience': `<div class="terminal-line"><span class="t-accent">Current (2026-Present):</span> Software Engineer @ Raja Software Labs</div>
                       <div class="terminal-line"><span class="t-res">▹ Developing Server-Driven UI (SDUI) components in Kotlin for profile modules.</span></div>
                       <div class="terminal-line"><span class="t-res">▹ Multi-platform deployment across Web, Android, and iOS ecosystems.</span></div>
                       <div class="terminal-line"><span class="t-accent">Internship (2024):</span> IoT & Embedded Systems Intern @ Earth LogicWare</div>`,
        'contact': `<div class="terminal-line"><span class="t-accent">Email:</span> rajwardhanpatil2003@gmail.com</div>
                    <div class="terminal-line"><span class="t-accent">Phone:</span> +91-9673454532</div>
                    <div class="terminal-line"><span class="t-accent">GitHub:</span> https://github.com/rajwardhan4545</div>
                    <div class="terminal-line"><span class="t-accent">LinkedIn:</span> https://linkedin.com/in/rajwardhan4545</div>`,
        'coffee': `<div class="terminal-line" style="color: #fbbf24;">
       (  )   (   )  )
        ) (   )  (  (
        ( )  (    ) )
        _____________
       <_____________> ___
       |             |/ _ \\
       |   COFFEE    | | | |
       |  POWERED!   |_\\_/ |
       |             |____/
       \\_____________/
</div>
<div class="terminal-line"><span class="t-welcome">☕ Fresh brew ready! 100% focused on engineering clean solutions.</span></div>`,
        'help': `<div class="terminal-line"><span class="t-comment">Available commands:</span></div>
                 <div class="terminal-line"><span class="t-accent">whoami</span> — Display developer profile summary</div>
                 <div class="terminal-line"><span class="t-accent">skills</span> — View core tech stack &amp; tools</div>
                 <div class="terminal-line"><span class="t-accent">experience</span> — View engineering journey &amp; roles</div>
                 <div class="terminal-line"><span class="t-accent">contact</span> — Get direct contact links</div>
                 <div class="terminal-line"><span class="t-accent">coffee</span> — Developer fuel easter egg ☕</div>
                 <div class="terminal-line"><span class="t-accent">clear</span> — Clear terminal output</div>`
    };

    function executeCommand(cmd) {
        if (!terminalOutput) return;
        const cleanCmd = cmd.trim().toLowerCase();

        if (cleanCmd === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        }

        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-line';
        inputLine.innerHTML = `<span class="t-prompt">guest@rajwardhan-dev:~$</span> <span class="t-cmd">${cleanCmd}</span>`;
        terminalOutput.appendChild(inputLine);

        const responseDiv = document.createElement('div');
        if (cliResponses[cleanCmd]) {
            responseDiv.innerHTML = cliResponses[cleanCmd];
        } else if (cleanCmd !== '') {
            responseDiv.innerHTML = `<div class="terminal-line t-err">command not found: "${cleanCmd}". Type <span class="t-accent">'help'</span> for a list of available commands.</div>`;
        }
        terminalOutput.appendChild(responseDiv);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                executeCommand(terminalInput.value);
                terminalInput.value = '';
            }
        });
    }

    cliButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            executeCommand(cmd);
        });
    });

    // ============================================
    // 15. INTERACTIVE CLICK RIPPLE EFFECT
    // ============================================
    document.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.btn, .nav-cta, .filter-btn, .cli-cmd-btn, .copy-code-btn, .editor-tab');
        if (targetBtn) {
            const circle = document.createElement('span');
            const diameter = Math.max(targetBtn.clientWidth, targetBtn.clientHeight);
            const radius = diameter / 2;

            const rect = targetBtn.getBoundingClientRect();
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('click-ripple');

            const ripple = targetBtn.querySelector('.click-ripple');
            if (ripple) {
                ripple.remove();
            }

            targetBtn.appendChild(circle);
            setTimeout(() => circle.remove(), 600);
        }
    });

    // ============================================
    // 16. DYNAMIC GITHUB PROJECTS INTEGRATION (Post-ETOUR)
    // ============================================
    const GITHUB_USERNAME = 'rajwardhan4545';
    const ETOUR_CREATED_AT = '2026-08-01T13:45:46Z';
    const CACHE_KEY = 'portfolio_github_projects_cache_v2';
    const CACHE_EXPIRY = 15 * 60 * 1000; // 15 mins

    // Repos already hardcoded in index.html to avoid duplicates
    const EXISTING_REPOS = [
        'etour-virtuego',
        'newsmela',
        'recipe-website',
        'jarvis_ai_bot',
        '-gold-graphene-coated-pcf-spr-sensor',
        'portfolio'
    ];

    // Fallback data if GitHub API is offline or rate limited
    const FALLBACK_POST_ETOUR_REPOS = [
        {
            name: 'order-inventory-system',
            description: 'Production-ready Event-Driven Order & Inventory Management Microservices system built with Spring Boot 3.3, Apache Kafka, Netflix Eureka, Spring Cloud Gateway, MySQL, Docker, and Kubernetes implementing the Saga pattern.',
            language: 'Java',
            html_url: 'https://github.com/rajwardhan4545/order-inventory-system',
            created_at: '2026-08-31T17:38:22Z'
        },
        {
            name: 'ai-job-hunter',
            description: 'AI-assisted job discovery, web scraping, and application tracking automation tool engineered in TypeScript to streamline tech job searches.',
            language: 'TypeScript',
            html_url: 'https://github.com/rajwardhan4545/ai-job-hunter',
            created_at: '2026-09-15T04:31:17Z'
        }
    ];

    function formatTitle(name) {
        if (name.toLowerCase() === 'order-inventory-system') {
            return 'Order & Inventory Microservices';
        }
        if (name.toLowerCase() === 'ai-job-hunter') {
            return 'AI Job Hunter & Scraper';
        }
        return name
            .replace(/[-_]+/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
            .replace(/\bAi\b/i, 'AI')
            .replace(/\bApi\b/i, 'API')
            .replace(/\bSdui\b/i, 'SDUI');
    }

    function determineCategory(name, desc) {
        const text = (name + ' ' + (desc || '')).toLowerCase();
        if (text.includes('ai') || text.includes('bot') || text.includes('gpt') || text.includes('hunter') || text.includes('nlp') || text.includes('scrape')) {
            return 'ai';
        }
        if (text.includes('sensor') || text.includes('iot') || text.includes('hardware') || text.includes('research') || text.includes('matlab')) {
            return 'research';
        }
        return 'fullstack';
    }

    function determineImage(category, name) {
        if (category === 'ai') return 'assets/images/dev-coding.jpg';
        if (name.includes('order') || name.includes('microservice')) return 'assets/images/bg-code-dark.jpg';
        return 'assets/images/dev-workspace.jpg';
    }

    function getTechTags(repo) {
        const text = (repo.name + ' ' + (repo.description || '') + ' ' + (repo.language || '')).toLowerCase();
        let tags = [];

        if (text.includes('java')) tags.push('<span><img src="assets/logos/java.svg" alt="Java" class="tech-tag-icon"> Java</span>');
        if (text.includes('spring')) tags.push('<span><img src="assets/logos/spring.svg" alt="Spring" class="tech-tag-icon"> Spring Boot</span>');
        if (text.includes('kafka')) tags.push('<span>Apache Kafka</span>');
        if (text.includes('docker')) tags.push('<span><img src="assets/logos/docker.svg" alt="Docker" class="tech-tag-icon"> Docker</span>');
        if (text.includes('kubernetes')) tags.push('<span>Kubernetes</span>');
        if (text.includes('mysql')) tags.push('<span><img src="assets/logos/mysql.svg" alt="MySQL" class="tech-tag-icon"> MySQL</span>');
        if (text.includes('typescript')) tags.push('<span>TypeScript</span>');
        if (text.includes('react')) tags.push('<span><img src="assets/logos/react.svg" alt="React" class="tech-tag-icon"> React.js</span>');
        if (text.includes('python')) tags.push('<span><img src="assets/logos/python.svg" alt="Python" class="tech-tag-icon"> Python</span>');
        if (text.includes('node')) tags.push('<span><img src="assets/logos/nodejs.svg" alt="Node" class="tech-tag-icon"> Node.js</span>');
        
        if (tags.length === 0 && repo.language) {
            tags.push(`<span>${repo.language}</span>`);
        }
        tags.push('<span><img src="assets/logos/github.svg" alt="GitHub" class="tech-tag-icon"> GitHub</span>');
        return tags.join(' ');
    }

    async function loadGitHubProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        let repos = [];

        try {
            const cached = localStorage.getItem(CACHE_KEY);
            const cachedTime = localStorage.getItem(CACHE_KEY + '_time');

            if (cached && cachedTime && (Date.now() - Number(cachedTime) < CACHE_EXPIRY)) {
                repos = JSON.parse(cached);
            } else {
                const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=created&direction=asc&per_page=100`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                repos = await res.json();
                localStorage.setItem(CACHE_KEY, JSON.stringify(repos));
                localStorage.setItem(CACHE_KEY + '_time', Date.now().toString());
            }

            const etourTime = new Date(ETOUR_CREATED_AT).getTime();

            // Filter for projects created >= ETOUR, not forks, not portfolio, and not already in HTML
            repos = repos.filter(r => {
                const isAfter = new Date(r.created_at).getTime() >= etourTime;
                const isNotExisting = !EXISTING_REPOS.includes(r.name.toLowerCase());
                return isAfter && !r.fork && isNotExisting;
            });
        } catch (err) {
            console.warn('GitHub API offline / rate limited, using verified post-ETOUR projects:', err);
            repos = FALLBACK_POST_ETOUR_REPOS;
        }

        repos.forEach(repo => {
            const category = determineCategory(repo.name, repo.description);
            const title = formatTitle(repo.name);
            const image = determineImage(category, repo.name);
            const desc = repo.description || 'Open-source software project built by Rajwardhan. Check GitHub for source code and architecture documentation.';
            const dateStr = new Date(repo.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            const techHtml = getTechTags(repo);

            const card = document.createElement('div');
            card.className = 'project-card animate-on-scroll visible';
            card.setAttribute('data-category', category);
            card.innerHTML = `
                <div class="project-image">
                    <img src="${image}" alt="${title}" loading="lazy">
                    <div class="project-overlay">
                        <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link" aria-label="${title} GitHub Repo">
                            <i class="fab fa-github"></i>
                        </a>
                        ${repo.homepage ? `
                        <a href="${repo.homepage}" target="_blank" rel="noopener" class="project-link" aria-label="${title} Live Demo" style="margin-left: 0.5rem;">
                            <i class="fas fa-external-link-alt"></i>
                        </a>` : ''}
                    </div>
                </div>
                <div class="project-body">
                    <div class="project-meta">
                        <span class="project-date">${dateStr}</span>
                    </div>
                    <h3 class="project-title">${title}</h3>
                    <p class="project-desc">${desc}</p>
                    <div class="project-tech">
                        ${techHtml}
                    </div>
                </div>
            `;

            grid.appendChild(card);
            if (typeof observer !== 'undefined' && observer && observer.observe) {
                observer.observe(card);
            }
            addTiltEffect(card);
        });

        updateProjectFilterCount();
    }

    loadGitHubProjects();

});
