let currentPage = 1;
let musicStarted = false;
let selectedNumber = null;
let audioContext = null;
let musicGain = null;
let melodyInterval = null;

// REAL Carol of the Bells melody (full version)
const carolNotes = [
    // Opening - Ding dong ding dong
    659.25, 659.25, 659.25, 659.25, 659.25, 659.25, 659.25, 659.25,
    659.25, 659.25, 659.25, 659.25, 783.99, 783.99, 880.00, 880.00,
    
    // Main theme
    987.77, 987.77, 880.00, 880.00, 783.99, 783.99, 698.46, 698.46,
    659.25, 659.25, 587.33, 587.33, 523.25, 523.25, 493.88, 493.88,
    
    // Building up
    659.25, 659.25, 659.25, 659.25, 783.99, 783.99, 880.00, 880.00,
    987.77, 987.77, 1046.50, 1046.50, 1174.66, 1174.66, 1318.51, 1318.51,
    
    // Climax
    1396.91, 1396.91, 1318.51, 1318.51, 1174.66, 1174.66, 1046.50, 1046.50,
    987.77, 987.77, 880.00, 880.00, 783.99, 783.99, 698.46, 698.46,
    
    // Final phrase
    659.25, 659.25, 659.25, 659.25, 659.25, 659.25, 659.25, 659.25,
    783.99, 880.00, 987.77, 880.00, 783.99, 659.25, 587.33, 523.25,
    
    // Grand finale
    659.25, 783.99, 880.00, 987.77, 1046.50, 1174.66, 1318.51, 1396.91,
    1567.98, 1760.00, 1975.53, 2093.00, 1975.53, 1760.00, 1567.98, 1396.91
];

function startCarolMusic() {
    if (musicStarted) return;
    musicStarted = true;
    
    try {
        // Create audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Master gain control for volume
        musicGain = audioContext.createGain();
        musicGain.connect(audioContext.destination);
        musicGain.gain.setValueAtTime(0.2, audioContext.currentTime);
        
        // Start playing continuously
        playCarolContinuously();
        
        console.log("Carol of the Bells started! 🔔");
    } catch(e) {
        console.log("Audio not supported", e);
    }
}

function playCarolContinuously() {
    if (!audioContext) return;
    
    // Clear any existing interval
    if (melodyInterval) clearInterval(melodyInterval);
    
    // Play first melody immediately
    playCarolPhrase();
    
    // Repeat every 9 seconds (melody length + pause)
    melodyInterval = setInterval(playCarolPhrase, 9000);
}

function playCarolPhrase() {
    if (!audioContext || !musicGain) return;
    
    let time = audioContext.currentTime;
    
    // Create a reverb effect for bells
    const reverbGain = audioContext.createGain();
    reverbGain.gain.setValueAtTime(0.3, time);
    reverbGain.connect(musicGain);
    
    // Play each note with rich bell harmonics
    carolNotes.forEach((note, i) => {
        // Delay between notes (faster for more energy)
        const noteTime = time + i * 0.08;
        
        // Main bell oscillator
        const osc1 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        
        // Second harmonic for richness
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        
        // Third harmonic for brightness
        const osc3 = audioContext.createOscillator();
        const gain3 = audioContext.createGain();
        
        // Connect
        osc1.connect(gain1);
        osc2.connect(gain2);
        osc3.connect(gain3);
        
        gain1.connect(reverbGain);
        gain2.connect(reverbGain);
        gain3.connect(reverbGain);
        
        // Set frequencies
        osc1.frequency.setValueAtTime(note, noteTime);
        osc2.frequency.setValueAtTime(note * 1.5, noteTime); // Perfect fifth
        osc3.frequency.setValueAtTime(note * 2, noteTime);   // Octave
        
        // Bell-like waveform
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc3.type = 'sine';
        
        // Bell envelope - quick attack, medium decay
        const volume = 0.12;
        gain1.gain.setValueAtTime(volume, noteTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);
        
        gain2.gain.setValueAtTime(volume * 0.4, noteTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);
        
        gain3.gain.setValueAtTime(volume * 0.3, noteTime);
        gain3.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);
        
        // Start and stop
        osc1.start(noteTime);
        osc2.start(noteTime);
        osc3.start(noteTime);
        
        osc1.stop(noteTime + 0.4);
        osc2.stop(noteTime + 0.35);
        osc3.stop(noteTime + 0.3);
    });
    
    // Add random bell accents throughout
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            playRandomBellAccent();
        }, i * 1500);
    }
}

function playRandomBellAccent() {
    if (!audioContext || !musicGain) return;
    
    const time = audioContext.currentTime;
    const note = 1318.51 + Math.random() * 400; // Random high bell
    
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(musicGain);
    
    osc.frequency.setValueAtTime(note, time);
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0.05, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
    
    osc.start(time);
    osc.stop(time + 0.3);
}

function playCrackersSound() {
    if (!audioContext) return;
    
    console.log("Crackers sound! 🎉");
    
    // Increase volume for finale
    if (musicGain) {
        musicGain.gain.linearRampToValueAtTime(0.6, audioContext.currentTime + 2);
    }
    
    // Multiple cracker sounds
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const time = audioContext.currentTime;
            
            // Multiple oscillators for each pop
            for (let j = 0; j < 3; j++) {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                
                osc.connect(gain);
                gain.connect(audioContext.destination);
                
                const freq = 400 + Math.random() * 1200;
                osc.frequency.setValueAtTime(freq, time);
                osc.type = 'sawtooth';
                
                gain.gain.setValueAtTime(0.2, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
                
                osc.start(time);
                osc.stop(time + 0.1);
            }
        }, i * 120);
    }
    
    // Add festive bells on top
    setTimeout(() => {
        for (let k = 0; k < 8; k++) {
            setTimeout(() => {
                playRandomBellAccent();
            }, k * 200);
        }
    }, 500);
}

function showPage(pageNum) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page-${pageNum}`).classList.add('active');
}

function nextPage() {
    if (currentPage < 8) {
        currentPage++;
        showPage(currentPage);
    }
}

// Page 1 Next
document.getElementById('next-1').addEventListener('click', function() {
    const name = document.getElementById('name-input').value;
    if (name.trim()) {
        startCarolMusic();
        nextPage();
    } else {
        alert('Please enter your name!');
    }
});

// Page 2 Next
document.getElementById('next-2').addEventListener('click', function() {
    const year = document.getElementById('year-input').value;
    if (year.trim()) {
        nextPage();
    } else {
        alert('Please enter your birth year!');
    }
});

// Page 3 Next
document.getElementById('next-3').addEventListener('click', nextPage);

// Page 4 Next
document.getElementById('next-4').addEventListener('click', function() {
    const place = document.getElementById('place-input').value;
    if (place.trim()) {
        nextPage();
    } else {
        alert('Please enter your dream place!');
    }
});

// Page 5 - Paper Airplane Selection
document.querySelectorAll('.airplane').forEach(plane => {
    plane.addEventListener('click', function() {
        if (selectedNumber) return;
        
        selectedNumber = this.dataset.number;
        const number = parseInt(selectedNumber);
        let treatCount;
        
        if (number === 7) treatCount = 7;
        else if (number === 17) treatCount = 8;
        else if (number === 23) treatCount = 5;
        
        // Fly away animation
        this.classList.add('fly-away');
        
        // Play a little bell sound for selection
        if (audioContext) {
            const time = audioContext.currentTime;
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(musicGain || audioContext.destination);
            
            osc.frequency.setValueAtTime(1046.50, time);
            osc.type = 'sine';
            
            gain.gain.setValueAtTime(0.15, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
            
            osc.start(time);
            osc.stop(time + 0.3);
        }
        
        // Fade out other planes
        document.querySelectorAll('.airplane').forEach(p => {
            if (p !== this) {
                p.style.opacity = '0.3';
                p.style.pointerEvents = 'none';
            }
        });
        
        // Store treat count and go to next page
        setTimeout(() => {
            document.getElementById('treat-number').textContent = treatCount;
            nextPage();
        }, 1000);
    });
});

// Page 6 Next
document.getElementById('next-6').addEventListener('click', nextPage);

// Page 7 Heart Button
document.getElementById('heart-yes').addEventListener('click', function() {
    this.style.transform = 'rotate(45deg) scale(1.2)';
    
    // Play triumphant bell chord
    if (audioContext) {
        const time = audioContext.currentTime;
        const notes = [659.25, 783.99, 987.77, 1318.51];
        
        notes.forEach((note, i) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(musicGain);
            
            osc.frequency.setValueAtTime(note, time + i * 0.05);
            osc.type = 'sine';
            
            gain.gain.setValueAtTime(0.1, time + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, time + i * 0.05 + 0.6);
            
            osc.start(time + i * 0.05);
            osc.stop(time + i * 0.05 + 0.6);
        });
    }
    
    setTimeout(() => {
        showPage(8);
        startBirthdayAnimation();
    }, 500);
});

function startBirthdayAnimation() {
    playCrackersSound();
    
    // Animate final message
    const finalMsg = document.getElementById('final-message');
    finalMsg.style.opacity = '0';
    setTimeout(() => {
        finalMsg.style.transition = 'opacity 2s';
        finalMsg.style.opacity = '1';
    }, 1000);
    
    // Play extra festive bells
    if (audioContext) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                playRandomBellAccent();
            }, i * 800 + 2000);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showPage(1);
    
    // Pre-warm audio context on first touch (for mobile)
    document.body.addEventListener('touchstart', function() {
        if (!audioContext && !musicStarted) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }, { once: true });
});
