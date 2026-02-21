// ===== GLOBAL VARIABLES =====
let currentPage = 1;
let treatCount = 0;
let poppedCount = 0;
let complimentIndices = [];

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

// ===== PAGE 4 - Airplane numbers =====
function pickNumber(num) {
    if (num === 7) treatCount = 7;
    else if (num === 17) treatCount = 8;
    else if (num === 23) treatCount = 5;

    document.getElementById('treatCount').innerText = treatCount;
    showPage(5);
}

// ===== PAGE 14 - Balloons =====
function initBalloons() {
    const grid = document.getElementById('balloonGrid');
    grid.innerHTML = '';
    poppedCount = 0;
    document.getElementById('poppedCount').innerText = '0';
    document.getElementById('balloonMessage').innerHTML = '';

    // Randomly select 7 indices for compliments (0-18), exclude index 18 (special)
    complimentIndices = [];
    while (complimentIndices.length < 7) {
        let r = Math.floor(Math.random() * 19);
        if (!complimentIndices.includes(r) && r !== 18) complimentIndices.push(r);
    }

    for (let i = 0; i < 19; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.dataset.index = i;

        // random face emoji
        const faces = ['🎈', '🎂', '🎁', '✨', '💕'];
        balloon.innerText = faces[Math.floor(Math.random() * faces.length)];

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
        grid.appendChild(balloon);
    }
}

// ===== PAGE 19 - Cake falling =====
function startCakeFalling() {
    const sky = document.getElementById('sky');
    const finalMsg = document.getElementById('finalMessage');
    sky.innerHTML = '';

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const cake = document.createElement('div');
            cake.className = 'falling-cake';
            cake.innerText = '🍫🎂';
            cake.style.left = Math.random() * 100 + '%';
            cake.style.fontSize = (Math.random() * 2 + 2) + 'rem';
            cake.style.animationDuration = (Math.random() * 3 + 3) + 's';
            sky.appendChild(cake);
            setTimeout(() => cake.remove(), 6000);
        }, i * 150);
    }

    setTimeout(() => {
        finalMsg.style.display = 'block';
    }, 3000);
}

// ===== START =====
showPage(1);
