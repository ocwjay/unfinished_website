var navIconLinkElement = document.getElementById("navOpenLink");
var trayElement = document.getElementById("navigationTray");
var trayHeight;
var animationTime;
var navContentElement = document.getElementById("navigationContent");
var headerElement = document.getElementById("headerWrap");
var trayHeightNeedsToBe;
var trayHeightChangesBy;

function navIconToggle(){
  var navIconLinkElement = document.getElementById("navOpenLink");
  if(navIconLinkElement.innerHTML === '<img id="navToggleIcon" src="img/icon/navOpenIcon.png">'){
    navIconLinkElement.innerHTML = '<img id="navToggleIcon" src="img/icon/navCloseIcon.png">';
  }
  else{
    navIconLinkElement.innerHTML = '<img id="navToggleIcon" src="img/icon/navOpenIcon.png">';
  }
}

function isTrayOpen(a, b){
  if(trayElement.classList.contains("trayIsOpen")){
    animationTime = setInterval(frameClose, 1);
    trayHeight = a;
  }
  else{
    animationTime = setInterval(frameOpen, 1);
    trayHeight = 0;
  }
  function frameOpen(){
    if(trayHeight === a){
      clearInterval(animationTime);
      trayElement.classList.add("trayIsOpen");
      navContentElement.style.display = "flex";
      headerElement.style.boxShadow = "none";
      trayElement.style.boxShadow = "0 10px 50px -10px rgba(0, 0, 0, 0.5)";
    }
    else{
      trayHeight = trayHeight + b;
      trayElement.style.height = trayHeight + "px";
    }
  }
  function frameClose(){
    if(trayHeight === 0){
      clearInterval(animationTime);
      trayElement.classList.remove("trayIsOpen");
      headerElement.style.boxShadow = "0 10px 50px -10px rgba(0, 0, 0, 0.5)";
      trayElement.style.boxShadow = "none";
    }
    else{
      trayHeight = trayHeight - b;
      trayElement.style.height = trayHeight + "px";
      navContentElement.style.display = "none";
    }
  }
}

function screenWidthChanges(windowSize) {
    if (windowSize.matches) { // If media query matches
        //Icon change works. Now to build up a little.
        trayHeightNeedsToBe = 80;
        trayHeightChangesBy = 2;
    }
    else {
        trayHeightNeedsToBe = 400;
        trayHeightChangesBy = 5;
    }
}

var windowSize = window.matchMedia("(min-width: 600px)");
screenWidthChanges(windowSize); // Call listener function at run time
windowSize.addListener(screenWidthChanges); // Attach listener function on state changes

function onIconClick(){
  isTrayOpen(trayHeightNeedsToBe, trayHeightChangesBy);
}