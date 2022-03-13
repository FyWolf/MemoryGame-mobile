let coin = JSON.parse(localStorage.getItem("coin"));
let level = JSON.parse(localStorage.getItem("level"));
let experience = JSON.parse(localStorage.getItem("exp"));

setTimeout(function() {navigator.splashscreen.hide();}, 1000);

screen.orientation.lock('portrait');