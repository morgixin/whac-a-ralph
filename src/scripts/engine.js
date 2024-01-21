
const state = {
    view: {
        // variaveis que alteram coisas visuais
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        // variáveis que alteram coisas não visuais
        timerId: null,
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 15,
        countDownTimerId: null,
    },
}

function beginCountDown() {
    state.values.countDownTimerId = setInterval(countDown, 1000);
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        enableResetButton();
        if (state.values.result < 5) {
            playSound("lost.mp3", 0.5);
            alert(`Game over! Você obteve ${state.values.result} pontos! Mais sorte na próxima`);
        } else if (state.values.result >= 10){
            playSound("level-win.mp3", 0.5);
            alert(`Game over! Você obteve ${state.values.result} pontos! Parabéns!`);
        } else {
            alert(`Game over! Você obteve ${state.values.result} pontos!`);
        }
    }
}

function playSound(audioName, volume) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = volume;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity); 
    // troca o quadrado a cada 1 segundo
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a", 0.3);
            }
        });
    });
}

function enableResetButton() {
    let resetButton = document.getElementById("game-reset");
    resetButton.style.display = "block";
}

function disablePlayButton() {
    let playButton = document.getElementById("game-start");
    playButton.style.display = "none";
}

function initialize() { // inicializa
}

function play() {
    beginCountDown();
    moveEnemy();
    disablePlayButton();
    addListenerHitBox();
}

initialize();