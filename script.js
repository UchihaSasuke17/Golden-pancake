let currentPage = 1;
let selectedNumber = null;
let poppedCount = 0;
const totalBalloons = 19;

// Compliment balloons (7)
const compliments = [
    "Beautiful 💕",
    "Lovely 🌸",
    "Unique 💞",
    "Genuine 💖",
    "Sweet 🍭",
    "Precious 💎",
    "Loyal 🤝"
];

// Special 19th balloon
const specialBalloon = "You 🎂";

// Fun balloons (11) - all show "Try again 😜"
const funBalloon = "Try again 😜";

// Store which balloons have compliments (randomly assigned)
let complimentIndices = [];

function initBalloons() {
    const grid = document.getElementById('balloons-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    poppedCount = 0;
    document.getElementById('popped-count').textContent = poppedCount;
    document.getElementById('balloon-message').innerHTML = '';
    
    // Randomly select 7 indices for compliments (0-18)
    complimentIndices = [];
    while (complimentIndices.length < 7) {
        const randomIndex = Math.floor(Math.random() * totalBalloons);
        if (!complimentIndices.includes(randomIndex) && randomIndex !== 18) { // 18 is last balloon index
            complimentIndices.push(randomIndex);
        }
    }
    
    // Create 19 balloons
    for (let i = 0; i < totalBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.dataset.index = i;
        
        // Random emoji on balloon
        const emojis = ['🎈', '🎂', '🎁', '✨', '💕', '🌟', '🫰'];
        balloon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        balloon.addEventListener('click', function() {
            if (this.classList.contains('popped')) return;
            
            this.classList.add('popped');
            poppedCount++;
            document.getElementById('popped-count').textContent = poppedCount;
            
            const index = parseInt(this.dataset.index);
            let message = '';
            
            if (index === 18) {
                // 19th balloon special
                message = specialBalloon;
            } else if (complimentIndices.includes(index)) {
                // Compliment balloon
                const complimentIndex = complimentIndices.indexOf(index);
                message = compliments[complimentIndex];
            } else {
                // Fun balloon
                message = funBalloon;
            }
            
            document.getElementById('balloon-message').innerHTML = message;
            
            // Check if all balloons popped
            if (poppedCount === totalBalloons) {
                setTimeout(() => {
                    document.getElementById('balloon-message').innerHTML = "🎉 All balloons popped! 🎉";
                    setTimeout(() => {
                        nextPage();
                    }, 1500);
                }, 500);
            }
        });
        
        grid.appendChild(balloon);
    }
}

function showPage(pageNum) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page-${pageNum}`).classList.add('active');
    currentPage = pageNum;
    
    // Initialize balloons when page 14 is shown
    if (pageNum === 14) {
        initBalloons();
    }
    
    // Start cake falling animation when page 19 is shown
    if (pageNum === 19) {
        startCakeFalling();
    }
}

function nextPage() {
    if (currentPage < 19) {
        showPage(currentPage + 1);
    }
}

// Page 1 Next
document.getElementById('next-1')?.addEventListener('click', function() {
    const name = document.getElementById('name-input').value;
    if (name.trim()) {
        nextPage();
    } else {
        alert('Please enter your name!');
    }
});

// Page 2 Next
document.getElementById('next-2')?.addEventListener('click', function() {
    const year = document.getElementById('year-input').value;
    if (year.trim()) {
        nextPage();
    } else {
        alert('Please enter your birth year!');
    }
});

// Page 3 Next
document.getElementById('next-3')?.addEventListener('click', function() {
    nextPage();
});

// PAGE 4 - PAPER AIRPLANE NUMBERS (FIXED)
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
        
        // Store treat count and go to next page
        setTimeout(() => {
            document.getElementById('treat-number').textContent = treatCount;
            nextPage();
        }, 1000);
    });
});

// Page 5 Next
document.getElementById('next-5')?.addEventListener('click', function() {
    nextPage();
});

// PAGE 6 - Food Question
document.querySelectorAll('#page-6 .option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('#page-6 .option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        setTimeout(() => {
            nextPage();
        }, 500);
    });
});

// PAGE 7 - Chocolate Question
document.querySelectorAll('#page-7 .option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('#page-7 .option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        setTimeout(() => {
            nextPage();
        }, 500);
    });
});

// PAGE 8 - Drink Question
document.querySelectorAll('#page-8 .option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('#page-8 .option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        setTimeout(() => {
            nextPage();
        }, 500);
    });
});

// PAGE 9 - Preference Question
document.querySelectorAll('#page-9 .option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('#page-9 .option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        setTimeout(() => {
            nextPage();
        }, 500);
    });
});

// PAGE 10 - Adventure Question
document.querySelectorAll('#page-10 .option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('#page-10 .option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        setTimeout(() => {
            nextPage();
        }, 500);
    });
});

// PAGE 11 - House Location
document.querySelectorAll('#page-11 .option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('#page-11 .option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        setTimeout(() => {
            nextPage();
        }, 500);
    });
});

// PAGE 12 - Ice Cream Flavor
document.querySelectorAll('#page-12 .option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('#page-12 .option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        setTimeout(() => {
            nextPage();
        }, 500);
    });
});

// PAGE 13 - Foods as Humans
document.querySelectorAll('#page-13 .option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('#page-13 .option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        setTimeout(() => {
            nextPage();
        }, 500);
    });
});

// Page 15 Next
document.getElementById('next-15')?.addEventListener('click', function() {
    nextPage();
});

// Page 16 Yes option
document.getElementById('ready-yes')?.addEventListener('click', function() {
    this.style.transform = 'scale(1.1)';
    setTimeout(() => {
        nextPage();
    }, 500);
});

// Page 17 Here We Go option
document.getElementById('here-we-go')?.addEventListener('click', function() {
    this.style.transform = 'scale(1.1)';
    setTimeout(() => {
        nextPage();
    }, 500);
});

// Page 18 Heart Button
document.getElementById('heart-yes')?.addEventListener('click', function() {
    this.style.transform = 'rotate(45deg) scale(1.2)';
    setTimeout(() => {
        nextPage();
    }, 500);
});

// Page 19 - Cake falling animation
function startCakeFalling() {
    const skyContainer = document.getElementById('sky-container');
    const finalMessage = document.getElementById('final-message-container');
    
    // Clear any existing cakes
    skyContainer.innerHTML = '';
    
    // Create 30 falling cakes
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const cake = document.createElement('div');
            cake.className = 'falling-cake';
            cake.textContent = '🍫🎂';
            cake.style.left = Math.random() * 100 + '%';
            cake.style.fontSize = (Math.random() * 2 + 2) + 'rem';
            cake.style.animationDuration = (Math.random() * 3 + 3) + 's';
            cake.style.animationDelay = '0s';
            skyContainer.appendChild(cake);
            
            // Remove cake after animation
            setTimeout(() => {
                cake.remove();
            }, 6000);
        }, i * 150);
    }
    
    // Show final message after 3 seconds
    setTimeout(() => {
        finalMessage.style.display = 'block';
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showPage(1);
});
