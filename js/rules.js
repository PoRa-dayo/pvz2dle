"use strict";
let AlmanacButton = NewEle(`AlmanacButton`, 'div', `background: url(images/Almanac_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;left:0px;width:${IsMobile?50:60}px;height:${IsMobile?50:60}px;${sessionStorage["CheckedRules"]?"":"animation: ButtonBlink 1s infinite"}`, {
    className: "Button",
    onclick: () => {
        sessionStorage.setItem("CheckedRules","1");
        AlmanacButton.style.animation="";
        let rulesShade = NewEle("rulesShade","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:1008;background:rgba(0,0,0,0.8);opacity:0;",{},EDAll);
        let tutorialTitle = NewEle("tutorialTitle", "center", `color:white;position:absolute;font-size:2em;width:100%;top:1.5%;`, {
            innerText: "Welcome to PvZ2Dle!"
        }, rulesShade);
        tutorialTitle.style.textShadow = txtshadow;
        NewEle(`ReturnButton`, 'div', `background: url(images/Return_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;left:0px;width:60px;height:60px;z-index:10;`, {
            className: "Button",
            onclick: () => {
                oEffects.fadeOut(rulesShade, "fast", ClearChild);
            }
        }, rulesShade);
        oEffects.fadeIn(rulesShade,"fast",() => {
            let RulesBoard = NewEle("RulesBoard", "center", "position:absolute;left:10%;background-position-x:center;width:80%;height:90vh;overflow:auto;background-size:100% 100%;background-image:url(images/TutorialBoard.webp);background-repeat:no-repeat;animation:descendBoard 0.3s ease-out 1;", {}, rulesShade);
            let TheRules = NewEle("PvZ2DleRules", "center", "position:absolute;left:10%;top:20%;background-position-x:center;width:80%;height:66vh;overflow:auto;animation:descendBoardContent 0.3s ease-out 1;", {
                className: "CustomScroll",
            }, rulesShade);
            let tutorialTxt = NewEle("tutorialTxt", "center", `color:white;position:relative;font-size:15px;width:75%;display:inline-block;`, {
                innerHTML: "Type to search and choose a search result to guess.<br/>If search results are not found for Name, then World and Family will be considered.<br/><br/>You have 8 guesses. You'll see these colors on the stat cards each guess, based on how close they are to that of the Correct plant:",
            }, TheRules);
            tutorialTxt.style.textShadow = txtshadow;
            let ExampleList = NewEle(`ExampleList`, 'div', 'position:relative;height:65px;top:0px;left:0%;width:22.2em;background:none;border:none;box-shadow:none;grid-template-columns: repeat(3, 110px);gap:5px;', {
                className: 'dFlexWrap_PvZ2DleItem',
            }, TheRules);
            NewEle(`WRONG`, 'div', `background-image:url(images/Card_Red.png);height:65px;`, {
                innerText: "WRONG",
            }, ExampleList);
            NewEle(`CORRECT`, 'div', `background-image:url(images/Card_Green.png);height:65px;`, {
                innerText: "CORRECT",
            }, ExampleList);
            NewEle(`PARTIALLY CORRECT`, 'div', `background-image:url(images/Card_Yellow.png);height:65px;`, {
                innerText: "PARTIALLY CORRECT",
            }, ExampleList);
            let theText = `For <span style="color:green">Name, Range/Area, Usage, and Special</span>, the stat will be Partially Correct if there are <span style="color:yellow">3 or more common consecutive letters</span> between your guess and the Correct stat. (e.g. <i>Pea</i> shoo<i>ter</i>  and Re<i>peater</i>)<br/>For <span style="color:green">Range/Area</span>, Partially Correct also occurs if your guess and the Correct stat both have the letter <span style="color:yellow">"x"</span>.</br></br>
                    For <span style="color:green">Sun Cost</span>, the stat will be Partially Correct if you are <span style="color:yellow">less than 50 sun</span> away from the Correct stat.</br></br>
                    For <span style="color:green">Damage and Recharge</span>, if the Correct stat has an icon, the stat will be Partially Correct if you are <span style="color:yellow">1 level</span> away from the Correct stat (The highest stat is also 1 level away from the lowest).</br></br>
                    For <span style="color:green">World and Family</span>, the stat will be Partially Correct if you are <span style="color:yellow">2 worlds/families (or less)</span> away from the Correct one, following the <span style="color:yellow">order</span> of this list (the list can loop around, so e.g. Power Mints is still near Player's House):</br></br><span style="color:yellow">
            ` + WorldArr.join(", ") + `<br/><br/>` + FamilyArr.join(", ") + `</span><br/><br/>(P.S. Rhubarbarian and all Seediums released after that will not be included, because fuck Rhubarbarian look at his ugly face I hate him I hate him I hate him)`;

            let tutorialTxt2 = NewEle("tutorialTxt2", "center", `color:white;position:relative;font-size:15px;width:75%;display:inline-block;`, {
                innerHTML: theText,
            }, TheRules);
            tutorialTxt2.style.textShadow = txtshadow;
        });
    }
}, EDAll);
function TimeAttack_Rules() {
    let rulesShade = NewEle("rulesShade","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:1008;background:rgba(0,0,0,0.8);opacity:0;",{},EDAll);
    let tutorialTitle = NewEle("tutorialTitle", "center", `color:white;position:absolute;font-size:2em;width:100%;top:1.5%;`, {
        innerText: "Time Attack: Rules"
    }, rulesShade);
    tutorialTitle.style.textShadow = txtshadow;
    NewEle(`ReturnButton`, 'div', `background: url(images/Return_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;left:0px;width:60px;height:60px;z-index:10;`, {
        className: "Button",
        onclick: () => {
            oEffects.fadeOut(rulesShade, "fast", ClearChild);
        }
    }, rulesShade);
    oEffects.fadeIn(rulesShade,"fast",() => {
        let RulesBoard = NewEle("RulesBoard", "center", "position:absolute;left:10%;background-position-x:center;width:80%;height:90vh;overflow:auto;background-size:100% 100%;background-image:url(images/TutorialBoard.webp);background-repeat:no-repeat;animation:descendBoard 0.3s ease-out 1;", {}, rulesShade);
        let TheRules = NewEle("PvZ2DleRules", "center", "position:absolute;left:10%;top:20%;background-position-x:center;width:80%;height:66vh;overflow:auto;animation:descendBoardContent 0.3s ease-out 1;", {
            className: "CustomScroll",
        }, rulesShade);
        let tutorialTxt = NewEle("tutorialTxt", "center", `color:white;position:relative;font-size:15px;width:75%;display:inline-block;`, {
            innerHTML: `In the Time Attack game mode, you are initially given 3 minutes, and your goal is to guess correctly as many plants as you can within the time limit.<br/><br/>
            Unlike other game modes, you have unlimited guesses, but you will be judged for every guess you make. Make good guesses and you will be rewarded with additional time. Make bad guesses and your remaining time will be subtracted as a penalty. Your remaining time cannot exceed 5 minutes. As you guess more plants correctly, time rewards will decrease in value, while time penalties will be more severe.<br/><br/>
            A run in Time Attack takes about 10-15 minutes on average, so be prepared before you start a run!<br/><br/>
            Each day, you will start with a Daily Time Challenge, where you will be getting the same plants as everyone else on the same day. After the Daily Time Challenge is over, you will get the option to play the mode freely with Free Play, with fully randomized plants.<br/><br/>
            You can also use power-ups during a Time Attack run to assist you. Each power-up requires you to spend an amount of remaining time to use.<br/><br/>
            TIME REWARDS:<br/>
            "Progress!" is given when you first discover a Partially Correct or Correct value of the stat.<br/>
            "CHAIN BONUS" is given when you make multiple guesses in a row that all reward you with "Progress!". The bonus increases for 1 second for each guess that keeps the chain, up to a maximum of 10 seconds.<br/>
            You are also rewarded with more time for guessing a plant correctly with few guesses.<br/><br/>
            TIME PENALTIES:<br/>
            "Oops..." is given when a stat, whose Partially Correct value is already known, is guessed Wrong. (e.g. if DAMAGE: Normal is known to be Partially Correct, and you guess DAMAGE: Huge (which is Wrong) for your next guess)<br/>
            "BLUNDER!!!" is given when a stat, whose Correct value is already known, is guessed Partially Correct or Wrong. (e.g. if WORLD: Player's House is known to be Correct, and you guess anything else for WORLD (which can be Partially Correct or Wrong) for your next guess)<br/>
            "BLUNDER!!!" is also given if an exact value of a stat that is known to be Wrong or Partially Correct is guessed again. (e.g. if FAMILY: Pepper-mint is known to be Wrong, and you guess FAMILY: Pepper-mint again in your next guess)<br/><br/>
            Remember, in PvZ2Dle, memorization of plant stats is not as important. Good understanding of the rules and your skills of searching and comparing information is key to guessing plants correctly! Now go protect that Wall-nut and defend the magic for as long as you can!`,
        }, TheRules);
        tutorialTxt.style.textShadow = txtshadow;
    });
}