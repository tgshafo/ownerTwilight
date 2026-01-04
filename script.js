document.addEventListener('DOMContentLoaded', function() {
    console.log('🩸 Киберпанк Смертников активирован');
    
    initBloodEffects();
    initAvatarAnimation();
    initAudioEffects();
    initBloodCursor();
    updateBloodTime();
});

function initBloodEffects() {
    const buttons = document.querySelectorAll('.blood-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('active');
            createBloodParticles(this);
            playBloodSound();
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
        
        button.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            logBloodClick(this.href);
        });
    });
}

function initAvatarAnimation() {
    const avatar = document.getElementById('avatar');
    if (!avatar) return;
    
    avatar.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        this.style.transform = 'rotate(5deg) scale(1.05)';
    });
    
    avatar.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg) scale(1)';
    });
    
    setInterval(() => {
        const glow = document.querySelector('.avatar-blood');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%, 
                transparent 40%, 
                rgba(255, 0, 0, ${0.2 + Math.random() * 0.3}) 70%)`;
        }
    }, 3000);
}

function createBloodParticles(element) {
    const rect = element.getBoundingClientRect();
    const particles = 12;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'blood-particle';
        
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = '#ff002b';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.boxShadow = '0 0 10px #ff002b';
        
        const angle = (Math.PI * 2 / particles) * i;
        const speed = 1.5 + Math.random() * 2;
        const distance = 40 + Math.random() * 50;
        
        particle.animate([
            {
                transform: `translate(0, 0) scale(1)`,
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800 + Math.random() * 600,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1500);
    }
}

function initAudioEffects() {
    try {
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            window.audioContext = new (AudioContext || webkitAudioContext)();
        }
    } catch (e) {
        console.log('Аудио не поддерживается');
    }
}

function playBloodSound() {
    const audio = document.getElementById('hover-sound');
    if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.2;
        audio.play().catch(e => console.log('Автовоспроизведение заблокировано'));
    }
}

function initBloodCursor() {
    const cursor = document.createElement('div');
    cursor.id = 'blood-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '24px';
    cursor.style.height = '24px';
    cursor.style.border = '2px solid #ff002b';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'width 0.2s, height 0.2s, border-color 0.2s';
    cursor.style.boxShadow = '0 0 15px #ff002b';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.id = 'cursor-blood';
    cursorDot.style.position = 'fixed';
    cursorDot.style.width = '8px';
    cursorDot.style.height = '8px';
    cursorDot.style.background = '#ff002b';
    cursorDot.style.borderRadius = '50%';
    cursorDot.style.pointerEvents = 'none';
    cursorDot.style.zIndex = '10000';
    cursorDot.style.transform = 'translate(-50%, -50%)';
    cursorDot.style.boxShadow = '0 0 10px #ff002b';
    document.body.appendChild(cursorDot);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    document.querySelectorAll('a, button, .blood-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = '#ffffff';
            cursor.style.boxShadow = '0 0 25px #ff002b';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '24px';
            cursor.style.height = '24px';
            cursor.style.borderColor = '#ff002b';
            cursor.style.boxShadow = '0 0 15px #ff002b';
        });
    });
}

function logBloodClick(url) {
    console.log(`🩸 Кровавый клик: ${url}`);
    
    const clickEffect = document.createElement('div');
    clickEffect.style.position = 'fixed';
    clickEffect.style.top = '50%';
    clickEffect.style.left = '50%';
    clickEffect.style.transform = 'translate(-50%, -50%)';
    clickEffect.style.color = '#ff002b';
    clickEffect.style.fontSize = '3rem';
    clickEffect.style.fontWeight = 'bold';
    clickEffect.style.zIndex = '10000';
    clickEffect.style.pointerEvents = 'none';
    clickEffect.textContent = 'BLOOD';
    document.body.appendChild(clickEffect);
    
    clickEffect.animate([
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        { opacity: 0, transform: 'translate(-50%, -50%) scale(2)' }
    ], {
        duration: 800,
        easing: 'ease-out'
    });
    
    setTimeout(() => {
        if (clickEffect.parentNode) {
            clickEffect.parentNode.removeChild(clickEffect);
        }
    }, 1000);
}

function updateBloodTime() {
    const timeElement = document.createElement('div');
    timeElement.id = 'blood-time';
    timeElement.style.position = 'fixed';
    timeElement.style.bottom = '20px';
    timeElement.style.right = '20px';
    timeElement.style.color = '#ff002b';
    timeElement.style.fontSize = '1rem';
    timeElement.style.fontFamily = 'Courier New, monospace';
    timeElement.style.zIndex = '100';
    timeElement.style.textShadow = '0 0 10px #ff002b';
    document.body.appendChild(timeElement);
    
    function update() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        timeElement.textContent = `🩸 ${timeString} | СМЕРТНИКОВ`;
    }
    
    update();
    setInterval(update, 1000);
}

const style = document.createElement('style');
style.textContent = `
    .blood-particle {
        position: fixed;
        pointer-events: none;
        z-index: 1000;
    }
    
    #blood-cursor,
    #cursor-blood {
        transition: opacity 0.3s;
    }
    
    @media (max-width: 768px) {
        #blood-cursor,
        #cursor-blood {
            display: none;
        }
    }
    
    body {
        cursor: none;
    }
    
    a, button {
        cursor: none;
    }
`;
document.head.appendChild(style);

// Кровавый дождь
function createBloodRain() {
    setInterval(() => {
        const drop = document.createElement('div');
        drop.style.position = 'fixed';
        drop.style.top = '-10px';
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.width = '2px';
        drop.style.height = '20px';
        drop.style.background = 'linear-gradient(to bottom, #ff002b, transparent)';
        drop.style.pointerEvents = 'none';
        drop.style.zIndex = '3';
        document.body.appendChild(drop);
        
        drop.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px)`, opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 2000,
            easing: 'linear'
        });
        
        setTimeout(() => {
            if (drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
        }, 4000);
    }, 100);
}

createBloodRain();