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
                innerHTML: "You are expected to have played through the original PvZDle and know the basic rules.<br/>If search results are not found for Name, then World and Family will be considered.<br/>You have 8 guesses. Every time you guess, you'll see these colors on the stat cards:",
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
                    For <span style="color:green">Damage and Recharge</span>, the stat will be Partially Correct if you are <span style="color:yellow">1 level</span> away from the Correct stat (The highest stat is also 1 level away from the lowest).</br></br>
                    For <span style="color:green">World and Family</span>, the stat will be Partially Correct if you are <span style="color:yellow">2 worlds/families (or less)</span> away from the Correct one, following the <span style="color:yellow">order</span> of this list (the list can loop around, so e.g. Power Mints is still near Player's House):</br></br><span style="color:yellow">
            ` + WorldArr.join(", ") + `<br/><br/>` + FamilyArr.join(", ") + `</span><br/><br/>(P.S. Rhubarbarian and all Seediums released after that will not be included, because fuck Rhubarbarian look at his ugly face I hate him I hate him I hate him)`;

            let tutorialTxt2 = NewEle("tutorialTxt2", "center", `color:white;position:relative;font-size:15px;width:75%;display:inline-block;`, {
                innerHTML: theText,
            }, TheRules);
            tutorialTxt2.style.textShadow = txtshadow;
        });
    }
}, EDAll);