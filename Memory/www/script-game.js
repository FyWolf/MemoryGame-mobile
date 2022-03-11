let emojis = ["😀","😀","😂","😂","🤣","🤣","❤️","❤️","😍","😍","😒","😒","👌","👌","😘","😘","💕","💕","😁","😁","👍","👍","🙌","🙌","🤦‍♀️","🤦‍♀️","🤦‍♂️","🤦‍♂️","🤷‍♀️","🤷‍♀️","🤷‍♂️","🤷‍♂️","✌️","✌️","🤞","🤞"];
const countdown = document.getElementById("time");
const div = document.querySelector(".div-blocks");
let started = false;
let time = "0";
let timerInter;
let selection1 = null;
let selection2 = null;
let child1 = null;
let child2 = null;
let timeout = false;
let score = 0;

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

shuffle(emojis);

function createblocks() {
    emojis.forEach((result, id) => {
        let target = document.querySelector(`#b-${id}`);
        let content = `
            <p class="bloc bloc--front"></p>
            <p class="bloc bloc--back" id="content">${result}</p>
        `;
        target.innerHTML = content;
    })
}

function createtimer() {
    const start = document.getElementById("start")
    const reset = document.getElementById("reset")
    start.onclick = function () {
        startTimer();
    }
    reset.onclick = function () {
        resetTimer();
    }
}

function startTimer() {
    if(!timerInter) {
        time = 100;
        started = true;
        timerInter = setInterval(timer, 1000)
    }
}

function resetTimer() {
    clearInterval(timerInter);
    timerInter = null;
    started = false;
    time = "0";
    countdown.innerText = time;
    for(let i = 0; i < 36; i++) {
        let target = document.querySelector(`#b-${i}`);
        target.classList.remove("win");
    }
    hideBlocks();
    //uploadscore();
    resetscore();
    shuffle(emojis);
    div.classList.remove("div-blocks_border")
    setTimeout(() => {createblocks()}, 1000);
}

function hideBlocks() {
    for(let i = 0; i < 36; i++) {
        let target = document.querySelector(`#b-${i}`);
        if(!target.classList.contains("win")){
            target.classList.remove("blocFlip")
        }
    }
    timeout = false;
}

function timer () {
    if(time > 0){
        countdown.innerText = time;
        time = time - 1;
        countdown.innerText = time;
        if(div.classList.contains("div-blocks_border")){
            div.classList.remove("div-blocks_border")
        }
        else {
            div.classList.add("div-blocks_border")
        }
    }
    else {
        resetTimer();
    }
}

function blockClick() {
    for(let i = 0; i < 36; i++) {
        let target = document.querySelector(`#b-${i}`);
        target.onclick = function () {
            if (started == true){
                let child = document.querySelector(`#b-${i} > #content`);
                if( timeout == false){
                    if(!target.classList.contains("blocFlip")){
                        target.classList.add("blocFlip")
                        select(child.innerHTML, target)
                    }
                }
            }
        }
    }
}

function select(selection, child) {
    let test
    if(!selection1) {
        selection1 = selection;
        child1 = child;
    }
    else if(!selection2) {
        selection2 = selection;
        child2 = child;
    }
    if(selection1 && selection2) {
        if(selection1 == selection2) {
            child1.classList.add("win");
            child2.classList.add("win");
            selection1 = null;
            selection2 = null;
            child1 = null;
            child2 = null;
            hideBlocks();
            updateScore();
            navigator.vibrate([100])
        }
        else {
            selection1 = null;
            selection2 = null;
            timeout = true;
            test = window.setTimeout(hideBlocks, 1000);
        }
    }
}

function updateScore() {
    let target = document.getElementById("score");
    score = score + 1;
    target.innerText = score;
}

function resetscore() {
    let target = document.getElementById("score");
    score = 0;
    target.innerText = score;
}

//function uploadscore() {
//    for(let i = 0; i < 10; i++){
//        let target = document.getElementById(`sc-${i}`);
//        if(parseInt(target.innerText) == 0) {
//            target.innerText = score;
//            break;
//        }
//    }
//}

createtimer();
createblocks();
blockClick();
