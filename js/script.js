
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-button').forEach(button => {
    button.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('.faq-icon');
        
        content.classList.toggle('active');
        icon.classList.toggle('active');
        
        document.querySelectorAll('.faq-content').forEach(otherContent => {
            if (otherContent !== content) {
                otherContent.classList.remove('active');
                otherContent.previousElementSibling.querySelector('.faq-icon').classList.remove('active');
            }
        });
    });
});

// Floor selector
function selectFloor(floor, button) {
    document.querySelectorAll('.floor-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.classList.add('bg-gray-200', 'text-gray-700');
    });
    button.classList.add('active');
    button.classList.remove('bg-gray-200', 'text-gray-700');
    console.log('Selected floor:', floor);
}

// Store search filter
function filterStores(query) {
    const storeItems = document.querySelectorAll('.store-item');
    let visibleCount = 0;
    
    storeItems.forEach(item => {
        const storeName = item.querySelector('h4').textContent.toLowerCase();
        const storeLocation = item.querySelector('p').textContent.toLowerCase();
        
        if (storeName.includes(query.toLowerCase()) || storeLocation.includes(query.toLowerCase())) {
            item.style.display = 'flex';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    document.getElementById('storeCount').textContent = visibleCount;
}

// Navbar scroll effect
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});