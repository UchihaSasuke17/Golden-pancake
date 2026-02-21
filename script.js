let currentPage = 1;
let musicStarted = false;
let selectedNumber = null;
let audioContext = null;
let musicGain = null;
let melodyInterval = null;

// Happy Birthday melody notes
const happyBirthdayNotes = [
    // "Happy birthday to you"
    523.25, 523.25, 587.33, 523.25, 698.46, 659.25,
    // "Happy birthday to you"  
    523.25, 523.25, 587.33, 523.25, 783.99, 698.46,
    // "Happy birthday dear [name]" 
    523.25, 523.25, 1046.50, 880.00, 698.46, 659.25, 587.33,
    // "Happy birthday to you!"
    1046.50, 1046.50, 880.00, 698.46, 783.99, 698.46
];

function startHappyBirthdayMusic() {
    if (musicStarted) return;
    musicStarted = true;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        musicGain = audioContext.createGain();
        musicGain.connect(audioContext.destination);
        musicGain.gain.setValueAtTime(0.25, audioContext.currentTime);
        
        // Start playing immediately
        playHappyBirthday();
        
        // Loop every 8 seconds
        melodyInterval = setInterval(playHappyBirthday, 8000);
        
        console.log("🎵 Happy Birthday music started!");
    } catch(e) {
        console.log("Audio error:", e);
    }
}

function playHappyBirthday() {
    if (!audioContext) return;
    
    let time = audioContext.currentTime;
    
    // Play each note
    happyBirthdayNotes.forEach((note, index) => {
        const noteTime = time + (index * 0.35); // Slower tempo for birthday song
        
        // Main melody oscillator
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(musicGain);
        
        osc.frequency.setValueAtTime(note, noteTime);
        osc.type = 'sine'; // Soft sine wave for gentle sound
        
        // Volume envelope
        gain.gain.setValueAtTime(0.2, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);
        
        osc.start(noteTime);
        osc.stop(noteTime + 0.3);
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
        startHappyBirthdayMusic();
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
// Page 4 - Paper Airplane Selection - FIXED
document.querySelectorAll('#page-4 .airplane').forEach(plane => {
    plane.addEventListener('click', function() {
        if (selectedNumber) return;
        
        selectedNumber = this.dataset.number;
        const number = parseInt(selectedNumber);
        let treatCount;
        
        if (number === 7) treatCount = 7;
        else if (number === 17) treatCount = 8;
        else if (number === 23) treatCount = 5;
        
        // Add fly away animation to clicked plane
        this.classList.add('fly-away');
        
        // Fade out other planes
        document.querySelectorAll('#page-4 .airplane').forEach(p => {
            if (p !== this) {
                p.style.opacity = '0.3';
                p.style.pointerEvents = 'none';
            }
        });
        // Page 5 Next - Make sure this exists
document.getElementById('next-5')?.addEventListener('click', function() {
    nextPage();
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
