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
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(`page${pageNumber}`);
    if (!target) return; // 🔧 prevents crash

    target.classList.add('active');
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
    if (!name) {
        alert('Please enter your name!');
        return;
    }
    showPage(2);
}

// ===== PAGE 2 =====
function goToPage3() {
    const year = document.getElementById('yearInput').value.trim();
    if (!year) {
        alert('Please enter your birth year!');
        return;
    }
    showPage(3);
}

// ===== PAGE 4 =====
function pickNumber(num) {
    if (num === 7) treatCount = 7;
    if (num === 17) treatCount = 8;
    if (num === 23) treatCount = 5;

    const el = document.getElementById('treatCount');
    if (el) el.innerText = treatCount;

    showPage(5);
}

// ===== PAGE 14 - Balloons =====
function initBalloons() {
    const grid = document.getElementById('balloonGrid');
    const msg = document.getElementById('balloonMessage');
    const counter = document.getElementById('poppedCount');

    if (!grid || !msg || !counter) return; // 🔧 prevents crash

    grid.innerHTML = '';
    poppedCount = 0;
    counter.innerText = '0';
    msg.innerHTML = '';

    complimentIndices = [];
    while (complimentIndices.length < 7) {
        let r = Math.floor(Math.random() * 19);
        if (!complimentIndices.includes(r) && r !== 18) {
            complimentIndices.push(r);
        }
    }

    const faces = ['🎈', '🎂', '🎁', '✨', '💕'];

    for (let i = 0; i < 19; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.dataset.index = i;
        balloon.innerText = faces[Math.floor(Math.random() * faces.length)];

        balloon.onclick = function () {
            if (balloon.classList.contains('popped')) return;

            balloon.classList.add('popped');
            poppedCount++;
            counter.innerText = poppedCount;

            const idx = parseInt(balloon.dataset.index);
            let text = '';

            if (idx === 18) text = specialBalloon;
            else if (complimentIndices.includes(idx)) {
                text = compliments[complimentIndices.indexOf(idx)];
            } else {
                text = funBalloon;
            }

            msg.innerHTML = text;

            if (poppedCount === 19) {
                setTimeout(() => showPage(15), 1500);
            }
        };

        grid.appendChild(balloon);
    }
}

// ===== PAGE 19 =====
function startCakeFalling() {
    const sky = document.getElementById('sky');
    const finalMsg = document.getElementById('finalMessage');

    if (!sky || !finalMsg) return; // 🔧 prevents crash

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

    setTimeout(() => finalMsg.style.display = 'block', 3000);
}

// ===== START AFTER PAGE LOAD =====
document.addEventListener("DOMContentLoaded", () => {
    showPage(1);
});
