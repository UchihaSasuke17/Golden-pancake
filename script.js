* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
}

body {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    overflow: hidden;
}

.book-container {
    width: 100%;
    max-width: 600px;
    height: 80vh;
    perspective: 2000px;
}

.book {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    animation: openBook 1.5s ease-out forwards;
}

@keyframes openBook {
    0% { transform: rotateY(30deg); opacity: 0; }
    100% { transform: rotateY(0deg); opacity: 1; }
}

.book-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #ff7ee6, #a07cff);
    border-radius: 15px 5px 5px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    transform-origin: left;
    animation: removeCover 0.5s 1.5s forwards;
    z-index: 10;
}

@keyframes removeCover {
    to { transform: rotateY(-180deg); }
}

.cover-content {
    text-align: center;
    color: white;
    padding: 20px;
}

.cover-content h1 {
    font-size: 2rem;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.open-book {
    font-size: 4rem;
    margin-top: 30px;
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.pages {
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    overflow: hidden;
}

.page {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 30px;
    background: #fff9f9;
    transform-origin: left;
    transition: transform 0.8s ease;
    overflow-y: auto;
    display: none;
}

.page.active {
    display: block;
    animation: pageTurn 0.8s ease-out;
}

@keyframes pageTurn {
    0% { transform: rotateY(30deg); opacity: 0.5; }
    100% { transform: rotateY(0deg); opacity: 1; }
}

.page-number {
    color: #a07cff;
    font-size: 0.9rem;
    margin-bottom: 20px;
    font-weight: 600;
}

.question {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
}

.romantic-input {
    width: 100%;
    padding: 15px;
    border: 2px solid #ffb6c1;
    border-radius: 25px;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s;
    background: rgba(255,182,193,0.1);
}

.romantic-input:focus {
    border-color: #ff69b4;
    box-shadow: 0 0 20px rgba(255,105,180,0.3);
}

.next-page-btn {
    background: linear-gradient(45deg, #ff7ee6, #a07cff);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 20px;
    transition: all 0.3s;
    float: right;
}

.next-page-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(160,124,255,0.3);
}

.progress-container {
    position: absolute;
    bottom: 20px;
    left: 30px;
    right: 30px;
}

.progress-text {
    color: #a07cff;
    margin-bottom: 5px;
}

.progress-bar {
    height: 6px;
    background: #f0f0f0;
    border-radius: 3px;
    overflow: hidden;
}

.progress {
    height: 100%;
    background: linear-gradient(to right, #ff7ee6, #a07cff);
    transition: width 0.5s;
}

.quote-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    padding: 20px;
}

.quote-text {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #555;
    font-style: italic;
    text-align: center;
}

.airplanes-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 250px;
    margin: 30px 0;
}

.airplane {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    animation: float 3s ease-in-out infinite;
    transition: all 0.3s;
}

.airplane:hover {
    transform: scale(1.1);
}

.plane {
    font-size: 3rem;
    transform: rotate(-15deg);
    filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));
}

.number {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ff69b4;
    margin-top: 10px;
}

@keyframes float {
    0%,100% { transform: translateY(0px) rotate(-15deg); }
    50% { transform: translateY(-15px) rotate(-15deg); }
}

.airplane.fly-away {
    animation: flyAway 1s forwards;
}

@keyframes flyAway {
    0% { transform: translate(0,0) rotate(-15deg); opacity: 1; }
    100% { transform: translate(200px,-200px) rotate(45deg); opacity: 0; }
}

.treat-message {
    text-align: center;
    font-size: 2rem;
    color: #ff69b4;
    margin: 50px 0;
}

.treat-message span {
    font-size: 3rem;
    font-weight: bold;
    color: #a07cff;
    animation: pulse 1s infinite;
}

.heart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 250px;
}

.heart-button {
    width: 150px;
    height: 150px;
    background: linear-gradient(45deg, #ff4d6d, #ff1e4d);
    transform: rotate(45deg);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 0 50px rgba(255,77,109,0.5);
    transition: all 0.3s;
    animation: heartbeat 1.5s infinite;
}

.heart-button span {
    transform: rotate(-45deg);
    color: white;
    font-size: 2rem;
    font-weight: bold;
}

@keyframes heartbeat {
    0%,100% { transform: rotate(45deg) scale(1); }
    25% { transform: rotate(45deg) scale(1.1); }
    50% { transform: rotate(45deg) scale(1); }
    75% { transform: rotate(45deg) scale(1.1); }
}

.cake-container {
    display: flex;
    justify-content: center;
    margin: 30px 0;
}

.cake {
    position: relative;
    width: 250px;
    height: 180px;
}

.cake-layer {
    position: absolute;
    border-radius: 10px 10px 5px 5px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    animation: layerAppear 1s forwards;
}

.cake-base {
    width: 200px;
    height: 50px;
    background: #8B4513;
    bottom: 0;
    animation-delay: 0.5s;
}

.cake-middle {
    width: 170px;
    height: 45px;
    background: #A0522D;
    bottom: 50px;
    animation-delay: 1.5s;
}

.cake-top {
    width: 140px;
    height: 40px;
    background: #D2691E;
    bottom: 95px;
    animation-delay: 2.5s;
}

.cake-frosting {
    width: 150px;
    height: 15px;
    background: #FFB6C1;
    border-radius: 50% 50% 0 0;
    bottom: 135px;
    animation-delay: 3.5s;
}

.candle {
    position: absolute;
    width: 10px;
    height: 45px;
    background: #FFD700;
    border-radius: 5px;
    bottom: 150px;
    opacity: 0;
    animation: candleAppear 0.8s forwards;
}

.candle-1 { left: 30%; animation-delay: 4.5s; }
.candle-2 { left: 50%; transform: translateX(-50%); animation-delay: 5s; }
.candle-3 { right: 30%; animation-delay: 5.5s; }

.flame {
    position: absolute;
    width: 15px;
    height: 25px;
    background: radial-gradient(#FFD700, #FF4500);
    border-radius: 50% 50% 20% 20%;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    animation: flameAppear 0.5s forwards, flameFlicker 0.3s infinite alternate;
}

.final-message {
    margin-top: 30px;
    padding: 20px;
    background: rgba(255,182,193,0.2);
    border-radius: 15px;
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
    text-align: center;
    font-style: italic;
}

@keyframes layerAppear {
    from { opacity: 0; transform: translateX(-50%) translateY(30px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

@keyframes candleAppear {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes flameAppear {
    from { opacity: 0; transform: translateX(-50%) scale(0.5); }
    to { opacity: 1; transform: translateX(-50%) scale(1); }
}

@keyframes flameFlicker {
    from { transform: translateX(-50%) scale(1); }
    to { transform: translateX(-50%) scale(1.1); }
}

@media (max-width: 600px) {
    .question { font-size: 1.5rem; }
    .airplanes-container { flex-direction: column; gap: 30px; }
    .heart-button { width: 120px; height: 120px; }
    .heart-button span { font-size: 1.5rem; }
        }
