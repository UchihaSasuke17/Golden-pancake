let currentPage = 1;
let musicStarted = false;
let selectedNumber = null;
let audioContext = null;
let musicGain = null;
let melodyInterval = null;

// REAL Carol of the Bells - The actual melody notes
const carolNotes = [
    // First phrase - "Hark how the bells"
    659.25, 659.25, 659.25, 523.25, 659.25, 783.99, 659.25, 587.33,
    523.25, 493.88, 523.25, 587.33, 659.25, 659.25, 659.25, 523.25,
    
    // Second phrase - "Sweet silver bells"
    659.25, 783.99, 659.25, 587.33, 523.25, 493.88, 523.25, 587.33,
    659.25, 659.25, 659.25, 783.99, 880.00, 987.77, 880.00, 783.99,
    
    // Third phrase - "All seem to say"
    659.25, 587.33, 523.25, 493.88, 523.25, 587.33, 659.25, 659.25,
    659.25, 783.99, 880.00, 987.77, 1046.50, 987.77, 880.00, 783.99,
    
    // Fourth phrase - "Throw cares away"
    659.25, 587.33, 523.25, 493.88, 523.25, 587.33, 659.25, 698.46,
    783.99, 880.00, 987.77, 1046.50, 987.77, 880.00, 783.99, 659.25
];

function startCarolMusic() {
    if (musicStarted) return;
    musicStarted = true;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        musicGain = audioContext.createGain();
        musicGain.connect(audioContext.destination);
        musicGain.gain.setValueAtTime(0.2, audioContext.currentTime);
        
        // Start playing immediately
        playCarolOfBells();
        
        // Loop every 12 seconds
        melodyInterval = setInterval(playCarolOfBells, 12000);
        
        console.log("🎵 Carol of the Bells started!");
    } catch(e) {
        console.log("Audio error:", e);
    }
}

function playCarolOfBells() {
    if (!audioContext) return;
    
    let time = audioContext.currentTime;
    
    // Play each note with proper bell sound
    carolNotes.forEach((note, index) => {
        const noteTime = time + (index * 0.15); // Fast tempo for bells
        
        // Create bell sound with harmonics
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const osc3 = audioContext.createOscillator();
        
        const gain1 = audioContext.createGain();
        const gain2 = audioContext.createGain();
        const gain3 = audioContext.createGain();
        
        osc1.connect(gain1);
        osc2.connect(gain2);
        osc3.connect(gain3);
        
        gain1.connect(musicGain);
        gain2.connect(musicGain);
        gain3.connect(musicGain);
        
        // Main bell tone
        osc1.frequency.setValueAtTime(note, noteTime);
        osc1.type = 'sine';
        
        // Harmonic (octave higher) for brightness
        osc2.frequency.setValueAtTime(note * 2, noteTime);
        osc2.type = 'sine';
        
        // Harmonic (fifth) for richness
        osc3.frequency.setValueAtTime(note * 1.5, noteTime);
        osc3.type = 'sine';
        
        // Bell envelope - quick attack, decay
        gain1.gain.setValueAtTime(0.15, noteTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);
        
        gain2.gain.setValueAtTime(0.08, noteTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);
        
        gain3.gain.setValueAtTime(0.05, noteTime);
        gain3.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.2);
        
        osc1.start(noteTime);
        osc2.start(noteTime);
        osc3.start(noteTime);
        
        osc1.stop(noteTime + 0.3);
        osc2.stop(noteTime + 0.25);
        osc3.stop(noteTime + 0.2);
    });
}

function playCrackersSound() {
    if (!audioContext) return;
    
    // Increase volume for finale
    musicGain.gain.linearRampToValueAtTime(0.6, audioContext.currentTime + 2);
    
    // Firework sounds
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const time = audioContext.currentTime;
            
            // Pop sound
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.setValueAtTime(200 + Math.random() * 1000, time);
            osc.type = 'sawtooth';
            
            gain.gain.setValueAtTime(0.2, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
            
            osc.start(time);
            osc.stop(time + 0.1);
        }, i * 100);
    }
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
        
        this.classList.add('fly-away');
        
        document.querySelectorAll('.airplane').forEach(p => {
            if (p !== this) {
                p.style.opacity = '0.3';
                p.style.pointerEvents = 'none';
            }
        });
        
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
    setTimeout(() => {
        showPage(8);
        startBirthdayAnimation();
    }, 500);
});

function startBirthdayAnimation() {
    playCrackersSound();
    
    const finalMsg = document.getElementById('final-message');
    finalMsg.style.opacity = '0';
    setTimeout(() => {
        finalMsg.style.transition = 'opacity 2s';
        finalMsg.style.opacity = '1';
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    showPage(1);
});
