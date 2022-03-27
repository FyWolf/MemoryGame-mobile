let vibrationSetting = document.querySelector("#switch-vibration");

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

function createShop() {
    const target = document.getElementById("shop");

    item.forEach((result, id) => {
      const content = `
        <div class="shopCardDiv">
            <img src="${result.img}">
            <div>
                <h4>${result.title}</h4>
                <p>${result.Sdesc}</p>
                <button id="shopItem${id}">Infos</button>
            </div>
        </div>
        `;
      target.innerHTML += content;
    });
}


function updateInv() {
    const target = document.getElementById("inv");
    target.innerHTML = ""
    if (inventory.length > 0) {
        for(let i = 0; i < inventory.length; i++){
                const content = `
                  <div class="shopCardDiv" id="inv${i}">
                      <img src="${item[inventory[i]].img}">
                      <div>
                          <h4>${item[inventory[i]].title}</h4>
                          <p>${item[inventory[i]].Sdesc}</p>
                          <button id="selectDeck${inventory[i]}">Select Deck</button>
                      </div>
                  </div>
                  `;
                  target.innerHTML += content;
        }
    }
    else {
        target.innerHTML = "<p>Votre Inventaire est vide :c</p>"
    }
}

function setDeckBtn() {
    for(let i = 0; i < inventory.length; i++){
        let selectBtn = document.getElementById(`selectDeck${inventory[i]}`);
        selectBtn.onclick = function() {
            selectDeck(i)
        }
    }
}

function initializeShopButton() {
    item.forEach((result, id) => {
        let button = document.getElementById(`shopItem${id}`)
        button.onclick = function() {
            updateItemPage(id);
        }
    });
}

function updateItemPage(id) {
    const hider = document.getElementById("bgHide");
    const itemPage = document.getElementById("itemPage");
    const itemImage = document.getElementById("itemImage");
    const itemTitle = document.getElementById("itemTitle");
    const itemDesc = document.getElementById("itemDesc");
    const itemLevel = document.getElementById("itemLevel");
    const itemPrice = document.getElementById("itemPrice");
    const buyBtn = document.getElementById("buyButton");
    hider.classList.remove("hidden");
    itemImage.setAttribute("src", item[id].img);
    itemTitle.innerText = item[id].title;
    itemDesc.innerText = item[id].Ldesc;
    itemLevel.innerText = item[id].level;
    itemPrice.innerText = item[id].price;
    itemPage.classList.remove("hidden");

    buyBtn.onclick = function() {
        buyItem(id);
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

function displayCoin(ammount){
    const target = document.getElementById("coins");
    target.innerText = ammount;
}

function displayLevel(ammount){
    const target = document.getElementById("levels");
    target.innerText = ammount;
}
function setProgressBar() {
    const bar = document.getElementById("progressFull");
    let percentage = (100 * parseInt(experience)) / parseInt(levelStep);
    bar.setAttribute("style", `width:${percentage}%`);
}

document.getElementById("closeitem").onclick = function() {
    const hider = document.getElementById("bgHide");
    const itemPage = document.getElementById("itemPage");
    hider.classList.add("hidden");
    itemPage.classList.add("hidden");
}

function buyItem(id) {
    if (inventory.indexOf(id) == -1) {
        if (level >= item[id].level){
            if (coin >= item[id].price){
                updateInventory(id);
                updateCoin(`-${item[id].price}`);
                displayCoin(coin)
                updateInv()
                setActiveDeck()
                alert("Item brought !", "success")
            }
            else {
                alert("You don't have enough coins !", "error")
            }
        }
        else {
            alert("You don't have the level required !", "error")
        }
    }
    else {
        alert("This item is already brought !", "error")
    }
}

function setActiveDeck() {
    inventory.forEach((result, id) => {
        const target = document.getElementById(`inv${id}`);
        if (id == usedDeck){
            target.classList.add("greenOutline")
        }
        else {
            target.classList.remove("greenOutline")}
    });
}

function selectDeck(id) {
    usedDeck = id
    localStorage.setItem("deck", usedDeck)
    setActiveDeck()
    alert(`Deck ${item[id].title} selected !`, "info")
}
function alert(message, state){
    document.getElementById("alertText").innerText = message;
    document.getElementById("alertBox").className = `alert ${state}`;
    $("#alertBox").animate({"top": "+=11vh"}, "slow").delay("500").animate({"top": "-=11vh"}, "slow");
}

updateInv()
setDeckBtn()
setActiveDeck()
createShop()
initializeShopButton()
createButtons()
initializeVar()
initializeSettings()
displayCoin(coin)
displayLevel(level)
setProgressBar()