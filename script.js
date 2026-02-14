// Valentine Question Interactive
function setupValentineQuestion() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const questionContainer = document.getElementById('questionContainer');
    const successMessage = document.getElementById('successMessage');

    if (!yesBtn || !noBtn) return;

    let evasionRadius = 150; // Increased radius for harder clicking

    // Yes button click
    yesBtn.addEventListener('click', function () {
        questionContainer.classList.add('hidden');
        successMessage.classList.add('show');
        createMassiveConfetti();

        // Play celebration sound effect (optional)
        setTimeout(() => {
            createMassiveConfetti();
        }, 500);
    });

    // No button hover - make it run away
    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('touchstart', function (e) {
        e.preventDefault();
        moveNoButton();
    });

    // Also move on mouse getting close
    document.addEventListener('mousemove', function (e) {
        if (!noBtn) return;

        const rect = noBtn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
            Math.pow(e.clientX - btnCenterX, 2) +
            Math.pow(e.clientY - btnCenterY, 2)
        );

        if (distance < evasionRadius) {
            moveNoButton();
        }
    });

    function moveNoButton() {
        const container = document.querySelector('.buttons-container');
        const containerRect = container.getBoundingClientRect();

        // Calculate safe boundaries
        const maxX = containerRect.width - 150;
        const maxY = 100;

        // Generate random position
        const randomX = Math.random() * maxX - maxX / 2;
        const randomY = Math.random() * maxY - maxY / 2;

        // Add warning emojis around the button
        noBtn.textContent = '⚠️ No ⚠️';

        // Move the button
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

        // Increase evasion radius to make it harder
        evasionRadius = Math.min(evasionRadius + 10, 250);
    }
}

// Massive confetti for Yes button
function createMassiveConfetti() {
    const colors = ['#ff6b9d', '#ffc2d1', '#c44569', '#667eea', '#764ba2', '#f093fb', '#f5576c'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 15 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.opacity = '1';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';

            document.body.appendChild(confetti);

            const fallDuration = Math.random() * 3 + 2;
            const fallDistance = Math.random() * 120 + 100;
            const sway = (Math.random() - 0.5) * 200;

            confetti.animate([
                {
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translateY(${fallDistance}vh) translateX(${sway}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            setTimeout(() => {
                confetti.remove();
            }, fallDuration * 1000);
        }, i * 20);
    }
}

// Calculate days together
function calculateDaysTogether() {
    const startDate = new Date('2023-01-11');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const counter = document.getElementById('daysCounter');
    if (counter) {
        counter.textContent = `${diffDays} Days`;
    }
}

// Create floating hearts
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘'];

    function addHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    // Create hearts periodically
    setInterval(addHeart, 300);

    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(addHeart, i * 200);
    }
}

// Reveal hidden message
function setupRevealButton() {
    const revealBtn = document.getElementById('revealBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');

    if (revealBtn && hiddenMessage) {
        revealBtn.addEventListener('click', function () {
            if (hiddenMessage.classList.contains('show')) {
                hiddenMessage.classList.remove('show');
                revealBtn.textContent = 'Click to Reveal 💌';
            } else {
                hiddenMessage.classList.add('show');
                revealBtn.textContent = 'Hide Message 💝';

                // Add confetti effect
                createConfetti();
            }
        });
    }
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#ffc2d1', '#c44569', '#667eea', '#764ba2'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';

        document.body.appendChild(confetti);

        const fallDuration = Math.random() * 3 + 2;
        const fallDistance = Math.random() * 100 + 100;
        const sway = (Math.random() - 0.5) * 100;

        confetti.animate([
            {
                transform: 'translateY(0) translateX(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translateY(${fallDistance}vh) translateX(${sway}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: fallDuration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        setTimeout(() => {
            confetti.remove();
        }, fallDuration * 1000);
    }
}

// Add hover effects to cards
function setupCardAnimations() {
    const cards = document.querySelectorAll('.story-card, .reason-card, .photo-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth scroll animation for sections
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add sparkle effect on cursor movement
function setupSparkleEffect() {
    let lastSparkleTime = 0;
    const sparkleInterval = 100; // milliseconds

    document.addEventListener('mousemove', function (e) {
        const currentTime = Date.now();

        if (currentTime - lastSparkleTime > sparkleInterval) {
            createSparkle(e.clientX, e.clientY);
            lastSparkleTime = currentTime;
        }
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '20px';
    sparkle.style.zIndex = '9999';
    sparkle.style.opacity = '1';

    document.body.appendChild(sparkle);

    sparkle.animate([
        {
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: 1
        },
        {
            transform: 'translate(-50%, -100px) scale(1)',
            opacity: 0
        }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    setupValentineQuestion();
    calculateDaysTogether();
    createFloatingHearts();
    setupRevealButton();
    setupCardAnimations();
    setupScrollAnimations();
    setupSparkleEffect();

    // Add a special welcome animation
    setTimeout(() => {
        createConfetti();
    }, 500);
});

// Update days counter every hour
setInterval(calculateDaysTogether, 3600000);
