let currentPage = 1;
let treatNumber = 0;
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

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page${page}`).classList.add('active');
    currentPage = page;
    
    if (page === 14) {
        initBalloons();
    }
    if (page === 19) {
        startCakeFalling();
    }
}

function nextPage(fromPage) {
    if (fromPage < 19) {
        showPage(fromPage + 1);
    }
}

function checkPage1() {
    const name = document.getElementById('nameInput').value;
    if (name.trim()) {
        showPage(2);
    } else {
        alert('Please enter your name!');
    }
}

function checkPage2() {
    const year = document.getElementById('yearInput').value;
    if (year.trim()) {
        showPage(3);
    } else {
        alert('Please enter your birth year!');
    }
}

// Page 4 - Airplane selection
function selectNumber(num) {
    if (num === 7) treatNumber = 7;
    else if (num === 17) treatNumber = 8;
    else if (num === 23) treatNumber = 5;
    
    document.getElementById('treatNumber').textContent = treatNumber;
    showPage(5);
}

// Pages 6-13 - Option selection
function selectOption(page) {
    showPage(page + 1);
}

// Page 14 - Balloons
function initBalloons() {
    const grid = document.getElementById('balloonsGrid');
    grid.innerHTML = '';
    poppedCount = 0;
    document.getElementById('poppedCount').textContent = '0';
    document.getElementById('balloonMessage').innerHTML = '';
    
    complimentIndices = [];
    while (complimentIndices.length < 7) {
        let idx = Math.floor(Math.random() * 19);
        if (!complimentIndices.includes(idx) && idx !== 18) {
            complimentIndices.push(idx);
        }
    }
    
    for (let i = 0; i < 19; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.dataset.index = i;
        
        const emojis = ['🎈', '🎂', '🎁', '✨', '💕'];
        balloon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        balloon.onclick = function() {
            if (balloon.classList.contains('popped')) return;
            
            balloon.classList.add('popped');
            poppedCount++;
            document.getElementById('poppedCount').textContent = poppedCount;
            
            const index = parseInt(balloon.dataset.index);
            let message = '';
            
            if (index === 18) {
                message = specialBalloon;
            } else if (complimentIndices.includes(index)) {
                const complimentIndex = complimentIndices.indexOf(index);
                message = compliments[complimentIndex];
            } else {
                message = funBalloon;
            }
            
            document.getElementById('balloonMessage').innerHTML = message;
            
            if (poppedCount === 19) {
                setTimeout(() => {
                    showPage(15);
                }, 1500);
            }
        };
        
        grid.appendChild(balloon);
    }
}

// Page 19 - Cake falling
function startCakeFalling() {
    const sky = document.getElementById('skyContainer');
    const finalMsg = document.getElementById('finalMessageContainer');
    
    sky.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const cake = document.createElement('div');
            cake.className = 'falling-cake';
            cake.textContent = '🍫🎂';
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

// Start
showPage(1);
