// VT Portfolio JavaScript — Clean Version

// =====================
// MOBILE MENU
// =====================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// =====================
// SMOOTH SCROLLING
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// =====================
// HEADER SCROLL EFFECT
// =====================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// =====================
// ACTIVE NAV HIGHLIGHT
// =====================
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    let currentSection = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveMenuItem);
window.addEventListener('load', updateActiveMenuItem);

// =====================
// PARALLAX SHAPES
// =====================
window.addEventListener('scroll', () => {
    const shapes = document.querySelectorAll('.shape');
    const scrolled = window.pageYOffset;
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// =====================
// NEURAL LINES PULSE
// =====================
const neuralLines = document.querySelectorAll('.neural-line');
setInterval(() => {
    neuralLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'scaleX(1.2)';
            setTimeout(() => {
                line.style.opacity = '0.2';
                line.style.transform = 'scaleX(0.5)';
            }, 200);
        }, index * 300);
    });
}, 2000);

// =====================
// QUANTUM PARTICLES
// =====================
function createQuantumParticle() {
    const particle = document.createElement('div');
    const colors = ['#00ffff', '#ff0080', '#8000ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 4 + 1 + 'px';

    particle.style.cssText = `
        position: fixed;
        width: ${size};
        height: ${size};
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: 100vh;
        pointer-events: none;
        z-index: -1;
        box-shadow: 0 0 10px ${color};
    `;

    document.body.appendChild(particle);

    const duration = Math.random() * 3000 + 2000;
    const drift = (Math.random() - 0.5) * 200;

    particle.animate([
        { transform: 'translateY(0px) translateX(0px)', opacity: 0 },
        { transform: `translateY(-100vh) translateX(${drift}px)`, opacity: 1 }
    ], {
        duration,
        easing: 'ease-out'
    }).onfinish = () => particle.remove();
}

setInterval(createQuantumParticle, 1500);

// =====================
// SCROLL ANIMATIONS
// =====================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.timeline-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// =====================
// IMAGE VIEWER
// =====================
const viewer = document.getElementById('imageViewer');
const viewerImg = document.getElementById('viewerImage');

document.querySelectorAll('.image-container img').forEach(img => {
    img.addEventListener('click', () => {
        viewerImg.src = img.src;
        viewer.classList.add('active');
    });
});

function closeViewer() {
    viewer.classList.remove('active');
}

// Close viewer on background click
viewer.addEventListener('click', (e) => {
    if (e.target === viewer) closeViewer();
});

// Close viewer on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeViewer();
});

// =====================
// WEB3FORMS CONTACT
// =====================
const contactForm = document.getElementById('contact-form');
const submitBtn = contactForm.querySelector('.submit-btn');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'TRANSMITTING...';
    submitBtn.disabled = true;
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
        const formData = new FormData(contactForm);

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            formStatus.textContent = '✓ Message sent! I will get back to you soon.';
            formStatus.className = 'form-status success';
            contactForm.reset();
        } else {
            formStatus.textContent = '✗ Error: ' + (data.message || 'Something went wrong.');
            formStatus.className = 'form-status error';
        }
    } catch (error) {
        formStatus.textContent = '✗ Network error. Please try again.';
        formStatus.className = 'form-status error';
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});