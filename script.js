let currentScreen = 1;
let birthdayMusic = null;
let musicStarted = false;
let velocityX = 3, velocityY = 2;
let bounceInterval;

// Play continuous birthday music
function startBirthdayMusic() {
    if (musicStarted) return;
    
    musicStarted = true;
    
    try {
        // Create audio context for continuous music
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        birthdayMusic = {
            context: audioContext,
            oscillators: [],
            gainNodes: []
        };
        
        // Play happy birthday melody on loop
        playBirthdayMelody();
        
        // Loop the melody
        setInterval(playBirthdayMelody, 3000);
        
    } catch (e) {
        console.log("Audio not supported");
    }
}

// Play birthday melody
function playBirthdayMelody() {
    try {
        const audioContext = birthdayMusic?.context || new (window.AudioContext || window.webkitAudioContext)();
        
        // "Happy Birthday" melody notes
        const notes = [523.25, 523.25, 587.33, 523.25, 698.46, 659.25, 523.25];
        
        let time = audioContext.currentTime;
        
        for (let i = 0; i < notes.length; i++) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(notes[i], time + i * 0.2);
            oscillator.type = 'sine';
            
            // Softer volume for background music
            gainNode.gain.setValueAtTime(0.1, time + i * 0.2);
            gainNode.gain.exponentialRampToValueAtTime(0.01, time + i * 0.2 + 0.25);
            
            oscillator.start(time + i * 0.2);
            oscillator.stop(time + i * 0.2 + 0.25);
        }
    } catch (e) {
        // Silent fail
    }
}

// Play crackers sound (louder)
function playCrackersSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Multiple pops for cracker effect
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                // Random high pitch for cracker pop
                const freq = 800 + Math.random() * 800;
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                oscillator.type = 'sawtooth';
                
                // Louder volume for crackers
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
            }, i * 100);
        }
    } catch (e) {
        console.log("Cracker sound not supported");
    }
}

// Create moon dust particles
function createMoonDust(element) {
    for (let i = 0; i < 20; i++) {
        const dust = document.createElement('div');
        dust.className = 'moon-dust';
        
        const rect = element.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        dust.style.left = `${x}px`;
        dust.style.top = `${y}px`;
        
        const size = Math.random() * 6 + 3;
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        
        element.appendChild(dust);
        
        const colors = ['#ffffff', '#a07cff', '#ff7ee6', '#7ee5ff'];
        dust.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        dust.style.boxShadow = `0 0 ${size}px ${dust.style.backgroundColor}`;
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 60 + 30;
        
        dust.animate([
            { opacity: 0.9, transform: 'translate(0, 0) scale(1)' },
            { opacity: 0, transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.1)` }
        ], {
            duration: Math.random() * 800 + 500,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        setTimeout(() => {
            if (dust.parentNode) dust.parentNode.removeChild(dust);
        }, 1300);
    }
}

// Show specific screen
function showScreen(screenNum) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const screenId = screenNum === 'birthday' ? 'birthday-screen' : `screen-${screenNum}`;
    document.getElementById(screenId).classList.add('active');
    
    // Special setup for birthday screen
    if (screenNum === 'birthday') {
        startBirthdayAnimation();
    }
}

// Setup regular questions (1-5)
function setupRegularQuestions() {
    document.querySelectorAll('#screen-1 .moon-option, #screen-2 .moon-option, #screen-3 .moon-option, #screen-4 .moon-option, #screen-5 .moon-option').forEach(option => {
        option.addEventListener('click', function() {
            if (this.classList.contains('selected')) return;
            
            // Start music on first question answer
            if (!musicStarted) {
                startBirthdayMusic();
            }
            
            createMoonDust(this);
            this.classList.add('selected');
            
            const screenId = this.closest('.screen').id;
            const screenNum = parseInt(screenId.split('-')[1]);
            
            setTimeout(() => {
                if (screenNum < 5) {
                    showScreen(screenNum + 1);
                } else {
                    showScreen(6);
                }
            }, 800);
        });
    });
}

// Setup final question
function setupFinalQuestion() {
    const singleYes = document.getElementById('single-yes');
    
    singleYes.addEventListener('click', function() {
        createMoonDust(this);
        this.style.animation = 'none';
        this.style.transform = 'scale(1.3)';
        
        // Start timer
        document.getElementById('timer-container').style.display = 'block';
        let count = 5;
        const timer = setInterval(() => {
            document.getElementById('timer-count').textContent = count;
            count--;
            
            if (count < 0) {
                clearInterval(timer);
                document.getElementById('timer-container').style.display = 'none';
                showScreen('birthday');
            }
        }, 1000);
    });
}

// Birthday animation
function startBirthdayAnimation() {
    // Play louder crackers sound
    playCrackersSound();
    
    // Animate "Happy Birthday" text
    const text = "Happy Birthday!";
    const textDiv = document.getElementById('birthday-text');
    textDiv.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
        const letter = document.createElement('span');
        letter.className = 'letter';
        letter.textContent = text[i];
        letter.style.animationDelay = `${i * 0.1}s`;
        textDiv.appendChild(letter);
    }
    
    // Play crackers every few seconds
    setInterval(playCrackersSound, 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupRegularQuestions();
    setupFinalQuestion();
});
