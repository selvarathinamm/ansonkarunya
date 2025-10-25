// Wedding Particle System
class WeddingParticleSystem {
    constructor() {
        this.particles = [];
        this.particleContainer = document.getElementById('particles');
        this.maxParticles = 30;
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        
        // Create heart particles or regular particles
        const isHeart = Math.random() < 0.3;
        
        if (isHeart) {
            particle.innerHTML = ['💖', '💕', '💗', '🤍', '💝'][Math.floor(Math.random() * 5)];
            particle.style.fontSize = (Math.random() * 8 + 8) + 'px';
            particle.className = 'heart-particle';
        } else {
            particle.className = 'particle';
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
        }
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 8 + 6; // 6-14 seconds
        const delay = Math.random() * 5; // 0-5 seconds delay
        
        particle.style.left = startX + 'px';
        particle.style.position = 'absolute';
        particle.style.pointerEvents = 'none';
        particle.style.animationDuration = animationDuration + 's';
        particle.style.animationDelay = delay + 's';
        
        if (!isHeart) {
            // Random romantic colors
            const colors = [
                'rgba(255, 182, 193, 0.8)',
                'rgba(255, 192, 203, 0.8)',
                'rgba(255, 107, 157, 0.8)',
                'rgba(248, 181, 0, 0.8)',
                'rgba(255, 255, 255, 0.8)'
            ];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
        }
        
        particle.style.animation = `particleFloat ${animationDuration}s linear infinite`;
        
        this.particleContainer.appendChild(particle);
        this.particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                const index = this.particles.indexOf(particle);
                if (index > -1) {
                    this.particles.splice(index, 1);
                }
                // Create a new particle to maintain count
                this.createParticle();
            }
        }, (animationDuration + delay) * 1000);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
    }
}

// Wedding Mouse interaction effects
class WeddingMouseInteraction {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateFloatingElements();
            this.createMouseTrail();
        });
    }

    updateFloatingElements() {
        const hearts = document.querySelectorAll('.floating-heart');
        const shapes = document.querySelectorAll('.floating-shape');
        
        [...hearts, ...shapes].forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = this.mouseX - centerX;
            const deltaY = this.mouseY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                const moveX = (deltaX / distance) * force * 15;
                const moveY = (deltaY / distance) * force * 15;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
            } else {
                element.style.transform = 'translate(0, 0) scale(1)';
            }
        });
    }

    createMouseTrail() {
        const trail = document.createElement('div');
        trail.innerHTML = '💕';
        trail.style.cssText = `
            position: fixed;
            left: ${this.mouseX - 10}px;
            top: ${this.mouseY - 10}px;
            font-size: 16px;
            pointer-events: none;
            z-index: 1000;
            animation: fadeOut 1s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1000);
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Magnetic button effect
class MagneticButtons {
    constructor() {
        this.init();
    }

    init() {
        const buttons = document.querySelectorAll('.cta-button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.addMagneticEffect(e.target);
            });
            
            button.addEventListener('mouseleave', (e) => {
                this.removeMagneticEffect(e.target);
            });
        });
    }

    addMagneticEffect(button) {
        button.addEventListener('mousemove', this.handleMouseMove);
    }

    removeMagneticEffect(button) {
        button.removeEventListener('mousemove', this.handleMouseMove);
        button.style.transform = '';
    }

    handleMouseMove(e) {
        const rect = e.target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        const moveX = deltaX * 0.3;
        const moveY = deltaY * 0.3;
        
        e.target.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
}

// Wedding Heart Animation
class WeddingHeartAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.addPhotoInteractions();
        this.addHeartClickEffect();
        this.createRandomHeartBursts();
    }

    addPhotoInteractions() {
        const photos = document.querySelectorAll('.photo-frame');
        photos.forEach(photo => {
            photo.addEventListener('click', () => {
                this.createHeartExplosion(photo);
            });
            
            photo.addEventListener('mouseenter', () => {
                this.createGentleHearts(photo);
            });
        });
    }

    addHeartClickEffect() {
        const beatingHeart = document.querySelector('.beating-heart');
        if (beatingHeart) {
            beatingHeart.addEventListener('click', () => {
                this.triggerLoveExplosion();
            });
        }
    }

    createHeartExplosion(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 20px;
                pointer-events: none;
                z-index: 1000;
                animation: heartExplode ${1 + Math.random()}s ease-out forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 1500);
        }
    }

    createGentleHearts(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '🤍';
                heart.style.cssText = `
                    position: fixed;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.top + rect.height}px;
                    font-size: 14px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: gentleRise 2s ease-out forwards;
                `;
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 2000);
            }, i * 200);
        }
    }

    triggerLoveExplosion() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            const hearts = ['💖', '💕', '💗', '💓', '💝', '💘'];
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: ${15 + Math.random() * 15}px;
                pointer-events: none;
                z-index: 1000;
                animation: loveExplosion ${2 + Math.random()}s ease-out forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 3000);
        }
    }

    createRandomHeartBursts() {
        setInterval(() => {
            if (Math.random() < 0.3) {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    font-size: 24px;
                    pointer-events: none;
                    z-index: 100;
                    animation: randomHeartPulse 3s ease-in-out forwards;
                `;
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 3000);
            }
        }, 5000);
    }
}

// Smooth scrolling for navigation
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeAnimations();
        this.handleVisibilityChange();
    }

    optimizeAnimations() {
        // Reduce animations on low-performance devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.classList.add('low-performance');
        }
    }

    handleVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause heavy animations when tab is not visible
                document.body.classList.add('paused');
            } else {
                document.body.classList.remove('paused');
            }
        });
    }
}

// Touch interactions for mobile
class TouchInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.addTouchEffects();
    }

    addTouchEffects() {
        const cards = document.querySelectorAll('.detail-card, .feature-card');
        
        cards.forEach(card => {
            card.addEventListener('touchstart', (e) => {
                card.style.transform = 'scale(0.95)';
            });
            
            card.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
        });
    }
}

// Loading animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            this.staggerAnimations();
        });
    }

    staggerAnimations() {
        const elements = document.querySelectorAll('.hero-content > *, .hero-visual');
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
        });
    }
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all wedding interactive systems
    new WeddingParticleSystem();
    new WeddingMouseInteraction();
    new ScrollAnimations();
    new MagneticButtons();
    new WeddingHeartAnimation();
    new SmoothScroll();
    new PerformanceOptimizer();
    new TouchInteractions();
    new LoadingAnimation();
    
    // Add custom cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.3);
        border: 2px solid rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Hide cursor on mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
    }
    
    console.log('💕 Wedding Invitation loaded with love! 💕');
});

// Additional CSS for wedding animations and performance optimization
const style = document.createElement('style');
style.textContent = `
    .low-performance .floating-heart,
    .low-performance .floating-shape,
    .low-performance .particle {
        animation-duration: 10s !important;
    }
    
    .paused .floating-heart,
    .paused .floating-shape,
    .paused .particle,
    .paused .beating-heart,
    .paused .wedding-rings {
        animation-play-state: paused !important;
    }
    
    .loaded .hero-content > *,
    .loaded .hero-visual {
        animation-fill-mode: both;
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.5); }
    }
    
    @keyframes heartExplode {
        0% { 
            transform: scale(1) translate(0, 0);
            opacity: 1;
        }
        100% { 
            transform: scale(0.5) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
    
    @keyframes gentleRise {
        0% { 
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% { 
            transform: translateY(-50px) scale(0.8);
            opacity: 0;
        }
    }
    
    @keyframes loveExplosion {
        0% { 
            transform: scale(1) translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% { 
            transform: scale(0.3) translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes randomHeartPulse {
        0% { 
            transform: scale(0);
            opacity: 0;
        }
        50% { 
            transform: scale(1.2);
            opacity: 1;
        }
        100% { 
            transform: scale(0);
            opacity: 0;
        }
    }
    
    .heart-particle {
        animation: particleFloat 8s linear infinite !important;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);