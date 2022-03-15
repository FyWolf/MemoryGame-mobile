let vibration = JSON.parse(localStorage.getItem("vibration"));
let coin = JSON.parse(localStorage.getItem("coin"));
let level = JSON.parse(localStorage.getItem("level"));
let experience = JSON.parse(localStorage.getItem("exp"));
let levelStep = 0;

function updateCoin(ammount){
    coin = coin + parseInt(ammount);
    localStorage.setItem("coin", coin);
}

function updateLevel(ammount){
    experience = experience + parseInt(ammount);
    if((experience + 1) > levelStep) {
        level = level + 1;
        experience = 0;
        localStorage.setItem("level", level);
        localStorage.setItem("exp", experience);
        nextLevel();
    }
    else {
        localStorage.setItem("exp", experience);
    }
}

function nextLevel() {
    levelStep = level * 18;
}

setTimeout(function() {navigator.splashscreen.hide();}, 1000);
screen.orientation.lock('portrait');
nextLevel();