"use strict";
function ShowNews() {
    if (!localStorage.CheckedNews) {
        localStorage.setItem("CheckedNews","1");
        let newsShade = NewEle("newsShade","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:1008;background:rgba(0,0,0,0.8);opacity:0;",{},EDAll);
        let tutorialTitle = NewEle("tutorialTitle", "center", `color:white;position:absolute;font-size:2em;width:100%;top:1.5%;`, {
            innerText: "News"
        }, newsShade);
        tutorialTitle.style.textShadow = txtshadow;
        NewEle(`ReturnButton`, 'div', `background: url(images/Return_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;left:0px;width:60px;height:60px;z-index:10;`, {
            className: "Button",
            onclick: () => {
                oEffects.fadeOut(newsShade, "fast", ClearChild);
            }
        }, newsShade);
        oEffects.fadeIn(newsShade,"fast",() => {
            let newsBoard = NewEle("newsBoard", "center", "position:absolute;left:10%;background-position-x:center;width:80%;height:90vh;overflow:auto;background-size:100% 100%;background-image:url(images/TutorialBoard.webp);background-repeat:no-repeat;animation:descendBoard 0.3s ease-out 1;", {}, newsShade);
            let TheNews = NewEle("PvZ2DleNews", "center", "position:absolute;left:10%;top:20%;background-position-x:center;width:80%;height:66vh;overflow:auto;animation:descendBoardContent 0.3s ease-out 1;", {
                className: "CustomScroll",
            }, newsShade);
            let tutorialTxt = NewEle("tutorialTxt", "center", `color:white;position:relative;font-size:18px;width:75%;display:inline-block;`, {
                innerHTML: `Yep, PvZ2Dle has been updated with Expansion III! Now with some new features and A BRAND NEW GAME MODE: TIME ATTACK! Please be aware that a run on this mode might take 10+ minutes, so be prepared before you start one. I added a bunch of new stuff to this game mode so there will be a bunch of bugs. If you're on a Discord server that has me in it feel free to ping me if you find something wrong. Enjoy the silly animations!<br/><br/>Now if I have a nickel for every time I tried to make a puzzle-y game into an action-packed time-based one...`,
            }, TheNews);
            tutorialTxt.style.textShadow = txtshadow;
        });
    }
}