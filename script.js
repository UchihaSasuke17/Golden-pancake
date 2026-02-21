
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

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page${page}`).classList.add('active');
    currentPage = page;
    
    if (page === 14) {
        initBalloons();
    }
}

function nextPage(fromPage) {
    if (fromPage === 1) {
        let name = document.getElementById('nameInput').value;
        if (!name.trim()) {
            alert('Please enter your name!');
            return;
        }
    }
    
    if (fromPage === 2) {
        let year = document.getElementById('yearInput').value;
        if (!year.trim()) {
            alert('Please enter your birth year!');
            return;
        }
    }
    
    showPage(currentPage + 1);
}

// Page 4 - Airplane selection
function selectNumber(num) {
    if (num === 7) treatNumber = 7;
    else if (num === 17) treatNumber = 8;
    else if (num === 23) treatNumber = 5;
    
    document.getElementById('treatMessage').innerHTML = `I will give you treat ${treatNumber} times!`;
    showPage(5);
}

// Pages 6-13 - Option selection
function selectOption(page) {
    showPage(page + 1);
}

// Page 14 - Balloons
function initBalloons() {
    const grid = document.getElementById('balloons');
    grid.innerHTML = '';
    poppedCount = 0;
    document.getElementById('popped').textContent = '0';
    document.getElementById('balloonMsg').innerHTML = '';
    
    // Randomly select 7 indices for compliments
    complimentIndices = [];
    while (complimentIndices.length < 7) {
        let idx = Math.floor(Math.random() * 19);
        if (!complimentIndices.includes(idx) && idx !== 18) {
            complimentIndices.push(idx);
        }
    }
    
    // Create 19 balloons
    for (let i = 0; i < 19; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.dataset.index = i;
        
        // Random emoji
        const emojis = ['🎈', '🎂', '🎁', '✨', '💕'];
        balloon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        balloon.onclick = function() {
            if (balloon.classList.contains('popped')) return;
            
            balloon.classList.add('popped');
            poppedCount++;
            document.getElementById('popped').textContent = poppedCount;
            
            const index = parseInt(balloon.dataset.index);
            let message = '';
            
            if (index === 18) {
                message = 'You 🎂';
            } else if (complimentIndices.includes(index)) {
                const complimentIndex = complimentIndices.indexOf(index);
                message = compliments[complimentIndex];
            } else {
                message = 'Try again 😜';
            }
            
            document.getElementById('balloonMsg').innerHTML = message;
            
            if (poppedCount === 19) {
                setTimeout(() => {
                    showPage(15);
                }, 1500);
            }
        };
        
        grid.appendChild(balloon);
    }
}

// Start
showPage(1);
