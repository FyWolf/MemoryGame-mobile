let vibration = JSON.parse(localStorage.getItem("vibration"));
let coin = JSON.parse(localStorage.getItem("coin"));
let level = JSON.parse(localStorage.getItem("level"));
let experience = JSON.parse(localStorage.getItem("exp"));
let inventory = [0];
let levelStep = 0;
let usedDeck = 0;

if(localStorage.getItem("deck") == null) {
    localStorage.setItem("deck", usedDeck);
}
else {
    usedDeck = JSON.parse(localStorage.getItem("deck"));
}

if(localStorage.getItem("inv") == null) {
    localStorage.setItem("inv", JSON.stringify(inventory));
}
else {
    inventory = JSON.parse(localStorage.getItem("inv"));
    inventory.sort();
}

function updateCoin(ammount){
    coin = coin + parseInt(ammount);
    localStorage.setItem("coin", JSON.stringify(coin));
}

function updateLevel(ammount){
    experience = experience + parseInt(ammount);
    if((experience + 1) > levelStep) {
        level = level + 1;
        experience = 0;
        localStorage.setItem("level", JSON.stringify(level));
        localStorage.setItem("exp", JSON.stringify(experience));
        nextLevel();
    }
    else {
        localStorage.setItem("exp", JSON.stringify(experience));
    }
}

function updateInventory(id) {
    inventory.push(id);
    inventory.sort();
    console.log(inventory);
    localStorage.setItem("inv", JSON.stringify(inventory))
}

function nextLevel() {
    levelStep = level * 18;
}

setTimeout(function() {navigator.splashscreen.hide();}, 500);
screen.orientation.lock('portrait');
nextLevel();