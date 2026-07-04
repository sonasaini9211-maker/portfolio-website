document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Loading Screen Preloader Timeout
    // ==========================================
    const loader = document.getElementById('loader');
    
    // Minimum load time of 1.5 seconds for visual quality
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Trigger statistics count-up initial check when preloader clears
        setTimeout(() => {
            triggerStatsCheck();
        }, 300);
    }, 1500);

    // ==========================================
    // 2. Custom Cursor Outer and Inner Glow
    // ==========================================
    const cursorOuter = document.getElementById('cursor-glow-outer');
    const cursorInner = document.getElementById('cursor-glow-inner');
    const cursorContainer = document.querySelector('.cursor-glow-container');

    document.addEventListener('mousemove', (e) => {
        // Position elements
        cursorOuter.style.left = `${e.clientX}px`;
        cursorOuter.style.top = `${e.clientY}px`;
        
        // Inner cursor has a slight delay for smooth aesthetic trail
        cursorInner.style.transform = `translate(-50%, -50%) translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });

    // Expand cursor on hover
    const hoverables = document.querySelectorAll('a, button, .glass-panel, .form-input, .mobile-nav-toggle');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorContainer.classList.add('cursor-active');
        });
        item.addEventListener('mouseleave', () => {
            cursorContainer.classList.remove('cursor-active');
        });
    });

    // Hide custom cursor when mouse leaves the window bounds
    document.addEventListener('mouseleave', () => {
        cursorOuter.style.opacity = '0';
        cursorInner.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorOuter.style.opacity = '1';
        cursorInner.style.opacity = '1';
    });

    // ==========================================
    // 3. Scroll Progress Indicator
    // ==========================================
    const scrollBar = document.getElementById('scroll-bar');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            scrollBar.style.width = `${progress}%`;
        }
    });

    // ==========================================
    // 4. Sticky Glass Navbar & Active Highlights
    // ==========================================
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section[id]');

    const handleScroll = () => {
        // Toggle sticky background
        if (window.scrollY > 40) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // Active link tracking
        let currentSectionId = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ==========================================
    // 5. Mobile Navbar Overlay Menu
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-active');
        mobileToggle.classList.toggle('active');
        const spans = mobileToggle.querySelectorAll('span');
        if (mobileToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-active');
            mobileToggle.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ==========================================
    // 6. Dynamic Typewriter Animation
    // ==========================================
    const typewriterElement = document.getElementById('typewriter');
    const roles = [
        'AI/ML Enthusiast',
        'Computer Science Engineering Student',
        'Generative AI Learner',
        'Aspiring AI Engineer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    const typeEffect = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2200; // Pause at typed word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Pause before typing new word
        }

        setTimeout(typeEffect, typingSpeed);
    };

    setTimeout(typeEffect, 1800); // Trigger after page fades in

    // ==========================================
    // 7. Interactive Canvas Neural Network
    // ==========================================
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        initParticles();
    };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.radius = Math.random() * 2 + 1;
            
            const colors = ['#8b5cf6', '#3b82f6', '#ec4899'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    const initParticles = () => {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 12000) + 12;
        const maxCount = Math.min(particleCount, 55); // Performance cap
        for (let i = 0; i < maxCount; i++) {
            particles.push(new Particle());
        }
    };

    let mouse = { x: null, y: null, radius: 100 };
    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                if (dist < 85) {
                    const alpha = (1 - dist / 85) * 0.15;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            if (mouse.x !== null && mouse.y !== null) {
                const mouseDist = Math.hypot(particles[i].x - mouse.x, particles[i].y - mouse.y);
                if (mouseDist < mouse.radius) {
                    const alpha = (1 - mouseDist / mouse.radius) * 0.28;
                    ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
                    ctx.lineWidth = 0.9;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();

    // ==========================================
    // 8. Card Mouse Spotlight glow positioning
    // ==========================================
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ==========================================
    // 9. Card 3D Tilt rotations on mouse move
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    // Disable tilts on touch devices for accessibility
    if (window.matchMedia('(min-width: 1024px)').matches) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;  
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((centerY - y) / centerY) * 4;
                const rotateY = ((x - centerX) / centerX) * 4;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            });
            
            card.style.transition = 'transform 0.2s ease-out';
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    // ==========================================
    // 10. Holographic Parallax (Mouse movement sways widgets)
    // ==========================================
    const hologramViewport = document.querySelector('.hologram-viewport');
    if (hologramViewport && window.matchMedia('(min-width: 1024px)').matches) {
        hologramViewport.addEventListener('mousemove', (e) => {
            const rect = hologramViewport.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const offsetX = (x - centerX) / centerX;
            const offsetY = (y - centerY) / centerY;
            
            const profile = hologramViewport.querySelector('.hologram-profile-container');
            const widgetCode = hologramViewport.querySelector('.widget-code');
            const widgetStatus = hologramViewport.querySelector('.widget-status');
            const widgetNet = hologramViewport.querySelector('.widget-net');
            const widgetChart = hologramViewport.querySelector('.widget-chart');
            
            if (profile) profile.style.transform = `translate(${offsetX * 8}px, ${offsetY * 8}px)`;
            if (widgetCode) widgetCode.style.transform = `translate(${offsetX * -14}px, ${offsetY * -14}px) rotate(${offsetX * -1}deg)`;
            if (widgetStatus) widgetStatus.style.transform = `translate(${offsetX * -18}px, ${offsetY * -18}px) rotate(${offsetX * 1}deg)`;
            if (widgetNet) widgetNet.style.transform = `translate(${offsetX * -12}px, ${offsetY * -12}px)`;
            if (widgetChart) widgetChart.style.transform = `translate(${offsetX * -20}px, ${offsetY * -20}px)`;
        });
        
        hologramViewport.addEventListener('mouseleave', () => {
            const elements = hologramViewport.querySelectorAll('.hologram-profile-container, .hologram-widget');
            elements.forEach(el => {
                el.style.transform = 'none';
                el.style.transition = 'transform 0.5s ease-out';
            });
            setTimeout(() => {
                elements.forEach(el => el.style.transition = '');
            }, 500);
        });
    }

    // ==========================================
    // 11. Statistics Counter Engine (Count-Up)
    // ==========================================
    const counterElements = document.querySelectorAll('.counter-value');
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1200; // Count over 1.2s
        const startTime = performance.now();

        const updateValue = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease-out cubic calculation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeProgress * target);
            
            el.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateValue);
            } else {
                el.textContent = target; // Ensure exact final value
            }
        };

        requestAnimationFrame(updateValue);
    };

    // Observer to launch counters when scrolled into view
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counterElements.forEach(el => {
        statsObserver.observe(el);
    });

    const triggerStatsCheck = () => {
        counterElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // If metric elements are already visible on load
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                animateCounter(el);
                statsObserver.unobserve(el);
            }
        });
    };

    // ==========================================
    // 12. Staggered Scroll Reveals (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Handle staggered animations for inner reveal items
                const revealItems = entry.target.querySelectorAll('.reveal-item');
                revealItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 100}ms`;
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // 13. Contact Form Submission (EmailJS Integration)
    // ==========================================
    
    // ==========================================
    // 13. Contact Form Submission (FormSubmit Integration)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const btnText = submitBtn.querySelector('span');
    const spinner = document.getElementById('form-spinner');
    const statusMsg = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const nameVal = document.getElementById('form-name').value.trim();
        const emailVal = document.getElementById('form-email').value.trim();
        const messageVal = document.getElementById('form-message').value.trim();

        // Frontend validation
        if (!nameVal || !emailVal || !messageVal) {
            statusMsg.className = 'form-status error';
            statusMsg.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Please fill in all fields before submitting.';
            statusMsg.style.display = 'flex';
            return;
        }

        // Lock form submit controls to prevent duplicate submissions
        submitBtn.disabled = true;
        btnText.style.opacity = '0.5';
        spinner.style.display = 'block';
        statusMsg.className = 'form-status';
        statusMsg.style.display = 'none';

        // Prepare the payload for FormSubmit AJAX
        const payload = {
            Name: nameVal,
            Email: emailVal,
            Message: messageVal,
            "Submission Time": new Date().toLocaleString("en-US", { timeZoneName: "short" }),
            _subject: `New Portfolio Message from ${nameVal}`,
            _captcha: "false" // Disable captcha redirect for AJAX request
        };

        // Submit form data using fetch
        fetch("https://formsubmit.co/ajax/soniyasaini2209@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Server responded with an error status: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Restore button and hide spinner
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            spinner.style.display = 'none';

            // Show real success notification
            statusMsg.classList.add('success');
            statusMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent successfully. Thank you for connecting!';
            statusMsg.style.display = 'flex';

            // Reset form fields
            contactForm.reset();

            // Retain success banner for 4.5s
            setTimeout(() => {
                statusMsg.style.opacity = '0';
                setTimeout(() => {
                    statusMsg.style.display = 'none';
                    statusMsg.style.opacity = '1';
                }, 300);
            }, 4500);
        })
        .catch(error => {
            // Restore button and hide spinner
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            spinner.style.display = 'none';

            // Show real error notification
            statusMsg.classList.add('error');
            statusMsg.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Failed to send message. Please try again or email directly.';
            statusMsg.style.display = 'flex';
            console.error("FormSubmit AJAX Error:", error);
        });
    });
});