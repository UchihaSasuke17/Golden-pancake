// ===== GLOBAL VARIABLES =====
let currentPage = 1;
let treatCount = 0;
let poppedCount = 0;
let complimentIndices = [];
let audioCtx = null;
let isMusicPlaying = false;

const compliments = [
    "Beautiful 💕",
    "Lovely 🌸",
    "Unique 💞",
    "Genuine 💖",
    "Sweet 🍭",
    "Precious 💎",
    "Loyal 🤝"
];
const specialBalloon = "You 🎂";
const funBalloon = "Try again 😜";

// ===== HAPPY BIRTHDAY MUSIC =====
function playHappyBirthday() {
    if (isMusicPlaying) return;
    isMusicPlaying = true;

    try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioCtx.currentTime;

        // Simple Happy Birthday melody (C4, C4, D4, C4, F4, E4, C4, C4, D4, C4, G4, F4)
        const notes = [261.63, 261.63, 293.66, 261.63, 349.23, 329.63, 261.63, 261.63, 293.66, 261.63, 392.00, 349.23];
        let time = now;

        for (let i = 0; i < notes.length; i++) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.value = notes[i];
            gain.gain.setValueAtTime(0.2, time + i * 0.4);
            gain.gain.exponentialRampToValueAtTime(0.01, time + i * 0.4 + 0.35);
            osc.start(time + i * 0.4);
            osc.stop(time + i * 0.4 + 0.35);
        }

        // Loop every 5 seconds
        setTimeout(() => {
            if (audioCtx) playHappyBirthday();
        }, 5000);
    } catch (e) {
        console.log("Audio error", e);
    }
}

// ===== PAGE NAVIGATION =====
function showPage(pageNumber) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page${pageNumber}`).classList.add('active');
    currentPage = pageNumber;

    if (pageNumber === 14) initBalloons();
    if (pageNumber === 19) startCakeFalling();
}

function nextPage(fromPage) {
    if (fromPage < 19) showPage(fromPage + 1);
}

// ===== PAGE 1 =====
function goToPage2() {
    const name = document.getElementById('nameInput').value.trim();
    if (name === '') {
        alert('Please enter your name!');
        return;
    }
    playHappyBirthday();   // start music on first answer
    showPage(2);
}

// ===== PAGE 2 =====
function goToPage3() {
    const year = document.getElementById('yearInput').value.trim();
    if (year === '') {
        alert('Please enter your birth year!');
        return;
    }
    showPage(3);
}

// ===== PAGE 4 - Airplanes with fly-away =====
let planeSelected = false;

function flyAway(num, element) {
    if (planeSelected) return;
    planeSelected = true;

    // store treat count
    if (num === 7) treatCount = 7;
    else if (num === 17) treatCount = 8;
    else if (num === 23) treatCount = 5;

    // add fly-away class to clicked plane
    element.classList.add('fly-away');

    // disable other planes
    document.querySelectorAll('.airplane').forEach(plane => {
        if (plane !== element) {
            plane.style.pointerEvents = 'none';
            plane.style.opacity = '0.3';
        }
    });

    // after animation, go to page 5
    setTimeout(() => {
        document.getElementById('treatCount').innerText = treatCount;
        showPage(5);
    }, 1000);
}

// ===== PAGE 14 - Random Balloons =====
function initBalloons() {
    const container = document.getElementById('balloonContainer');
    container.innerHTML = '';
    poppedCount = 0;
    document.getElementById('poppedCount').innerText = '0';
    document.getElementById('balloonMessage').innerHTML = '';

    // pick 7 random indices for compliments (0-18, exclude 18)
    complimentIndices = [];
    while (complimentIndices.length < 7) {
        let r = Math.floor(Math.random() * 19);
        if (!complimentIndices.includes(r) && r !== 18) complimentIndices.push(r);
    }

    for (let i = 0; i < 19; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.dataset.index = i;

        // random emoji
        const faces = ['🎈', '🎂', '🎁', '✨', '💕'];
        balloon.innerText = faces[Math.floor(Math.random() * faces.length)];

        // random position (within container)
        const left = Math.random() * 80 + 5; // 5% to 85%
        const top = Math.random() * 60 + 5;  // 5% to 65%
        balloon.style.left = left + '%';
        balloon.style.top = top + '%';

        // random float delay
        const delay = Math.random() * 2;
        balloon.style.animationDelay = delay + 's';

        balloon.onclick = function () {
            if (balloon.classList.contains('popped')) return;
            balloon.classList.add('popped');
            poppedCount++;
            document.getElementById('poppedCount').innerText = poppedCount;

            const idx = parseInt(balloon.dataset.index);
            let msg = '';
            if (idx === 18) msg = specialBalloon;
            else if (complimentIndices.includes(idx)) {
                const pos = complimentIndices.indexOf(idx);
                msg = compliments[pos];
            } else {
                msg = funBalloon;
            }
            document.getElementById('balloonMessage').innerHTML = msg;

            if (poppedCount === 19) {
                setTimeout(() => showPage(15), 1500);
            }
        };
        container.appendChild(balloon);
    }
}

// ===== PAGE 19 - Single 3‑layer chocolate cake =====
function startCakeFalling() {
    const sky = document.getElementById('sky');
    const finalMsg = document.getElementById('finalMessage');
    sky.innerHTML = '';

    // create one cake
    const cake = document.createElement('div');
    cake.className = 'falling-cake';

    // three layers
    const layer1 = document.createElement('div');
    layer1.className = 'cake-layer layer1';
    const layer2 = document.createElement('div');
    layer2.className = 'cake-layer layer2';
    const layer3 = document.createElement('div');
    layer3.className = 'cake-layer layer3';

    // candle
    const candle = document.createElement('div');
    candle.className = 'candle';
    const flame = document.createElement('div');
    flame.className = 'flame';
    candle.appendChild(flame);

    cake.appendChild(layer1);
    cake.appendChild(layer2);
    cake.appendChild(layer3);
    cake.appendChild(candle);

    // random left position
    cake.style.left = Math.random() * 70 + 15 + '%'; // 15% to 85%
    cake.style.animationDuration = '4s'; // fixed fall duration

    sky.appendChild(cake);

    // show message after cake falls
    setTimeout(() => {
        finalMsg.style.display = 'block';
    }, 4000);
}

// ===== START =====
showPage(1);
