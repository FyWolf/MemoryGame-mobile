let vibration = JSON.parse(localStorage.getItem("vibration"));
let vibrationSetting = document.querySelector("#switch-vibration")


function createButtons() {
    let play = document.querySelector("#playbtn");
    let playSection = document.querySelector("#play");
    let shop = document.querySelector("#shopbtn");
    let shopSection = document.querySelector("#shop");
    let inv = document.querySelector("#invbtn");
    let invSection = document.querySelector("#inv");
    let sett = document.querySelector("#settingbtn");
    let settingsSection = document.querySelector("#sett");

    play.onclick = function() {
        shopSection.classList.remove("show");
        shop.classList.remove("toggeled");
        invSection.classList.remove("show");
        inv.classList.remove("toggeled");
        settingsSection.classList.remove("show");
        sett.classList.remove("toggeled");
        setTimeout(() => {playSection.classList.add("show")}, 500);
        play.classList.add("toggeled");
    }

    shop.onclick = function() {
        playSection.classList.remove("show");
        play.classList.remove("toggeled");
        invSection.classList.remove("show");
        inv.classList.remove("toggeled");
        settingsSection.classList.remove("show");
        sett.classList.remove("toggeled");
        setTimeout(() => {shopSection.classList.add("show")}, 500);
        shop.classList.add("toggeled");
    }

    inv.onclick = function() {
        shopSection.classList.remove("show");
        shop.classList.remove("toggeled");
        playSection.classList.remove("show");
        play.classList.remove("toggeled");
        settingsSection.classList.remove("show");
        sett.classList.remove("toggeled");
        setTimeout(() => {invSection.classList.add("show")}, 500);
        inv.classList.add("toggeled");
    }

    sett.onclick = function() {
        playSection.classList.remove("show");
        play.classList.remove("toggeled");
        invSection.classList.remove("show");
        inv.classList.remove("toggeled");
        shopSection.classList.remove("show");
        shop.classList.remove("toggeled");
        setTimeout(() => {settingsSection.classList.add("show")}, 500);
        sett.classList.add("toggeled");
    }
}

function initializeSettings() {
    vibrationSetting.onclick = function() {
        if(vibration === true) {
            vibration = false;
            localStorage.setItem("vibration", JSON.stringify(vibration));
            vibrationSetting.checked = vibration;
        }
        else{
            vibration = true;
            localStorage.setItem("vibration", JSON.stringify(vibration));
            vibrationSetting.checked = vibration;
        }
    }
}

function initializeVar() {
    if(localStorage.getItem("vibration") === null) {
        localStorage.setItem("vibration", true)
        vibration = true
        vibrationSetting.checked = vibration;
    }
    else{
        vibrationSetting.checked = vibration;
    }
    if(localStorage.getItem("coin") === null) {
        localStorage.setItem("coin", 0);
        coin = 0
    }
    if(localStorage.getItem("level") === null || localStorage.getItem("level") == 0) {
        localStorage.setItem("level", 1);
        level = 1
    }
    if(localStorage.getItem("exp") === null) {
        localStorage.setItem("exp", 0);
        level = 0
    }
}

function updateCoin(ammount){
    coin = coin + parseInt(ammount);
    localStorage.setItem("coin", coin);
}

function displayCoin(ammount){
    const target = document.getElementById("coins");
    target.innerText = ammount;
}


function updateLevel(ammount){
    // level = level + parseInt(ammount);
    // localStorage.setItem("level", level);
}

function displayLevel(ammount){
    const target = document.getElementById("levels");
    target.innerText = ammount;
}

createButtons()
initializeVar()
initializeSettings()
displayCoin(coin)
displayLevel(level)