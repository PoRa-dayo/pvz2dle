"use strict";
dBG.style.background = `url("${localStorage.CurrentBGName}") center center / cover no-repeat fixed`;
let BGSwitchButton = NewEle(`BGSwitchButton`, 'div', `background: url(images/BG_Switch_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:70px;left:0px;width:${IsMobile?50:60}px;height:${IsMobile?50:60}px;z-index:400;display:${JSON.parse(localStorage.UnlockedBackgrounds).length > 1 ? "block" : "none"};`, {
    className: "Button",
    onclick: () => {
        let flash = NewEle("flash","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:5000;background:white;opacity:0;",{},dBG);
        oEffects.fadeIn(flash,"fast",() => {
            let BGArray = JSON.parse(localStorage.UnlockedBackgrounds);
            let CurrentBGName = dBG.style.background.match(/"(.*?)"/)[1];
            let ind = BGArray.findIndex(imgName => imgName === CurrentBGName);
            if (!ind) ind=0;
            let newBGName = BGArray[ind+1 < BGArray.length ? ind+1 : 0];
            dBG.style.background = `url("${newBGName}") center center / cover no-repeat fixed`;
            localStorage.CurrentBGName = newBGName;
            oEffects.fadeOut(flash,"fast",ClearChild);
        });
    }
}, EDAll);
function UnlockBG() {
    let UnlockedBGArr = JSON.parse(localStorage.UnlockedBackgrounds);
    let BGArr = AllBackgrounds.shuffle();
    let BGName;
    if (!UnlockedBGArr.includes("images/Backgrounds/Menu1.png")) {
        BGName = "images/Backgrounds/Menu1.png";
        UnlockedBGArr.push("images/Backgrounds/Menu1.png");
    } else {
        for (let name of BGArr) {
            if (!UnlockedBGArr.includes(name)) {
                BGName = name;
                UnlockedBGArr.push(name);
                break;
            }
        }
    }
    localStorage.setItem("UnlockedBackgrounds",JSON.stringify(UnlockedBGArr));
    if (!BGName) return;
    let BGUnlockShade = NewEle("BGUnlockShade","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:1008;background:rgba(0,0,0,0.8);opacity:0;",{},EDAll);
    let BGUnlockTitle = NewEle("BGUnlockTitle", "center", `color:white;position:absolute;font-size:2em;width:100%;top:1.5%;`, {
        innerText: "New background unlocked!"
    }, BGUnlockShade);
    BGUnlockTitle.style.textShadow = txtshadow;
    NewEle(`BGUnlock_ReturnButton`, 'div', `background: url(images/Return_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;left:0px;width:60px;height:60px;z-index:10;`, {
        className: "Button",
        onclick: () => {
            oEffects.fadeOut(BGUnlockShade, "fast", ClearChild);
        }
    }, BGUnlockShade);
    oEffects.fadeIn(BGUnlockShade,"fast",() => {
        let BGUnlockBoard = NewEle("BGUnlockBoard", "center", "position:absolute;left:10%;background-position-x:center;width:80%;height:90vh;overflow:auto;background-size:100% 100%;background-image:url(images/TutorialBoard.webp);background-repeat:no-repeat;animation:descendBoard 0.3s ease-out 1;", {}, BGUnlockShade);
        let TheBGUnlock = NewEle("PvZ2DleBGUnlock", "center", "position:absolute;left:10%;top:20%;background-position-x:center;width:80%;height:66vh;overflow:auto;animation:descendBoardContent 0.3s ease-out 1;", {}, BGUnlockShade);
        let TheUnlockedBG = NewEle(`TheUnlockedBG`, 'div', `background: url(${BGName}) no-repeat center center; background-size: contain;position:relative;left:0px;width:90%px;height:65%;`, {
        }, TheBGUnlock);
        let BGUnlockTxt = NewEle("BGUnlockTxt", "center", `color:white;position:relative;font-size:18px;width:75%;display:inline-block;padding-top:10px;`, {
            innerHTML: `Switch backgrounds with the button on the bottom-left corner!<br/>Complete more daily challenges to unlock new backgrounds, no matter what your results are!`,
        }, TheBGUnlock);
        BGUnlockTxt.style.textShadow = txtshadow;
    });
    SetBlock(BGSwitchButton);
}