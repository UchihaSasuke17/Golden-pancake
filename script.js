let currentPage = 1;
let musicStarted = false;
let selectedNumber = null;
let audioContext = null;
let musicGain = null;

// Carol of the Bells notes (simplified version)
const carolNotes = [
    659.25, 659.25, 659.25, 523.25, 783.99, 659.25, 523.25, 493.88,
    659.25, 659.25, 659.25, 523.25, 783.99, 659.25, 523.25, 493.88,
    659.25, 659.25, 659.25, 659.25, 783.99, 880.00, 987.77, 880.00,
    783.99, 659.25, 587.33, 493.88, 523.25
];

function startCarolMusic() {
    if (musicStarted) return;
    musicStarted = true;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        musicGain = audioContext.createGain();
        musicGain.connect(audioContext.destination);
        musicGain.gain.setValueAtTime(0.2, audioContext.currentTime);
        
        playCarolMelody();
        setInterval(playCarolMelody, 8000);
    } catch(e) {
        console.log("Audio not supported");
    }
}

function playCarolMelody() {
    if (!audioContext) return;
    
    let time = audioContext.currentTime;
    
    carolNotes.forEach((note, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(musicGain);
        
        osc.frequency.setValueAtTime(note, time + i * 0.15);
        osc.type = 'sawtooth';
        
        gain.gain.setValueAtTime(0.1, time + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, time + i * 0.15 + 0.1);
        
        osc.start(time + i * 0.15);
        osc.stop(time + i * 0.15 + 0.1);
    });
}

function playCrackersSound() {
    if (!audioContext) return;
    
    // Increase volume for finale
    if (musicGain) {
        musicGain.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 2);
    }
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.setValueAtTime(800 + Math.random() * 800, audioContext.currentTime);
            osc.type = 'sawtooth';
            
            gain.gain.setValueAtTime(0.3, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            
            osc.start();
            osc.stop(audioContext.currentTime + 0.15);
        }, i * 150);
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
        
        // Fly away animation
        this.classList.add('fly-away');
        
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
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showPage(1);
});
