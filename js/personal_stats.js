"use strict";
let LogButton = NewEle(`LogButton`, 'div', `background: url(images/Personal_Stats_Button.png) no-repeat center center; background-size: contain;position:absolute;top:0px;right:70px;width:${IsMobile?50:60}px;height:${IsMobile?50:60}px;z-index:400;`, {
    className: "Button",
    onclick: () => {
        let statsShade = NewEle("statsShade","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:1008;background:rgba(0,0,0,0.8);opacity:0;",{},EDAll);
        let tutorialTitle = NewEle("tutorialTitle", "center", `color:white;position:absolute;font-size:2em;width:100%;top:1.5%;`, {
            innerText: "Personal Stats"
        }, statsShade);
        tutorialTitle.style.textShadow = txtshadow;
        NewEle(`ReturnButton`, 'div', `background: url(images/Return_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;left:0px;width:60px;height:60px;z-index:10;`, {
            className: "Button",
            onclick: () => {
                oEffects.fadeOut(statsShade, "fast", ClearChild);
            }
        }, statsShade);
        oEffects.fadeIn(statsShade,"fast",() => {
            let statsBoard = NewEle("statsBoard", "center", "position:absolute;left:10%;background-position-x:center;width:80%;height:90vh;overflow:auto;background-size:100% 100%;background-image:url(images/TutorialBoard.webp);background-repeat:no-repeat;animation:descendBoard 0.3s ease-out 1;", {}, statsShade);
            let TheStats = NewEle("PvZ2DleStats", "center", "position:absolute;left:10%;top:20%;background-position-x:center;width:80%;height:66vh;overflow:auto;animation:descendBoardContent 0.3s ease-out 1;", {
                className: "CustomScroll",
            }, statsShade);
            let tutorialTxt = NewEle("tutorialTxt", "center", `color:white;position:relative;font-size:18px;width:75%;display:inline-block;`, {
                innerHTML: `DAILY CHALLENGE<br/>Total Guesses: ${localStorage["TotalGuesses"]}<br/>Total Wins: ${localStorage["TotalWins"]}<br/>------------<br/>STREAK HUNT<br/>Total Guesses: ${localStorage["StreakHunt_TotalGuesses"]}<br/>Total Wins: ${localStorage["StreakHunt_TotalWins"]}<br/>Highest Streak: ${localStorage["StreakHunt_HighestStreak"]}`,
            }, TheStats);
            tutorialTxt.style.textShadow = txtshadow;
        });
    }
}, EDAll);