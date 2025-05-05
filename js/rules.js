"use strict";
let AlmanacButton = NewEle(`AlmanacButton`, 'div', `background: url(images/Almanac_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;left:0px;width:60px;height:60px;${sessionStorage["CheckedRules"]?"":"animation: ButtonBlink 1s infinite"}`, {
    className: "Button",
    onclick: () => {
        sessionStorage.setItem("CheckedRules","1");
        AlmanacButton.style.animation="";
        let rulesShade = NewEle("rulesShade","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:1008;background:rgba(0,0,0,0.8);",{},EDAll);
        let RulesBoard = NewEle("RulesBoard","center","position:absolute;left:10%;background-position-x:center;width:80%;height:90vh;overflow:auto;background-size:100% 100%;background-image:url(images/TutorialBoard.webp);background-repeat:no-repeat;",{
        },rulesShade);
        let TheRules = NewEle("PvZ2DleRules","center","position:absolute;left:10%;top:20%;background-position-x:center;width:80%;height:66vh;overflow:auto;",{
        },rulesShade);
        let tutorialTitle = NewEle("tutorialTitle","center",`color:white;position:absolute;font-size:2em;width:100%;top:1.5%;`,{
            innerText: "Welcome to PvZ2Dle!"
        },rulesShade);
        tutorialTitle.style.textShadow=txtshadow;
        let tutorialTxt = NewEle("tutorialTxt","center",`color:white;position:relative;font-size:18px;width:75%;display:inline-block;`,{
            innerHTML: "If search results are not found for Name, then World and Family will be considered.<br/>You have 8 guesses. Every time you guess, you'll see these colors behind the plant's stats:",
        },TheRules);
        tutorialTxt.style.textShadow=txtshadow;
        let ExampleList = NewEle(`ExampleList`, 'div', 'position:relative;height:65px;top:0px;left:0%;width:22.2em;background:none;border:none;grid-template-columns: repeat(3, 110px);gap:10px;', {
            className: 'dFlexWrap_PvZ2DleItem',
        }, TheRules);
        NewEle(`WRONG`, 'div', 'background-color:red;height:30px;font-size:14px;padding-top:0px;', {
            innerText: "WRONG",
        }, ExampleList);
        NewEle(`CORRECT`, 'div', 'background-color:green;height:30px;font-size:14px;padding-top:0px;', {
            innerText: "CORRECT",
        }, ExampleList);
        NewEle(`PARTIALLY CORRECT`, 'div', 'background-color:yellow;height:30px;font-size:14px;padding-top:0px;', {
            innerText: "PARTIALLY CORRECT",
        }, ExampleList);
        let theText = `For Name, Range/Area, Usage, and Special, the stat will be Partially Correct if there are 3 or more common consecutive letters between your guess and the Correct stat. (e.g. <i>Pea</i> shoo<i>ter</i>  and Re<i>peater</i>)</br></br>
                For Sun Cost, the stat will be Partially Correct if you are only 25 sun (or less) away from the Correct stat.</br></br>
                For Damage and Recharge, the stat will be Partially Correct if you are 1 level away from the Correct stat.</br></br>
                For World and Family, the stat will be Partially Correct if you are 2 worlds/families (or less) away from the Correct one, following this order:</br></br>
        ` + WorldArr.join(", ") + `<br/><br/>` + FamilyArr.join(", ");

        let tutorialTxt2 = NewEle("tutorialTxt2","center",`color:white;position:relative;font-size:18px;width:75%;display:inline-block;`,{
            innerHTML: theText,
        },TheRules);
        tutorialTxt2.style.textShadow=txtshadow;
        NewEle(`ReturnButton`, 'div', `background: url(images/Return_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;left:0px;width:60px;height:60px;`, {
            className: "Button",
            onclick: () => {
                ClearChild(rulesShade);
            }
        }, rulesShade);
    }
}, EDAll);