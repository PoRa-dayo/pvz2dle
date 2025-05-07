"use strict";
function Transition(duration=1, MidCallback,EndCallback, text="") {
    if (!sessionStorage["First_Start"]) {
        let PreLoadImg = new Image();
        PreLoadImg.src = "images/Transition.png";
        PreLoadImg.onload = function() {
            TrueTransition(duration, MidCallback, EndCallback, text);
        }
    } else {
        TrueTransition(duration, MidCallback, EndCallback, text);
    }
}
function TrueTransition(duration=1, MidCallback,EndCallback, text="") {
    DisableAnswerBox();
    let TimeTillFlyingText = 0;
    if (!sessionStorage["First_Start"]) {
        sessionStorage["First_Start"] = true;
        duration += 3;
        TimeTillFlyingText = 2.2;
        TitleDrop();
    }
    if (text) {
        setTimeout(() => {
            FlyingText(text);
        }, TimeTillFlyingText*1000);
    }
    let TransitionScreen = NewEle(`TransitionScreen`, 'div', `background: url(images/Transition.png) no-repeat center center; background-size: cover;position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:1500;opacity:0;animation:Transition ${duration}s linear 1;`, {
    }, EDAll);
    setTimeout(() => {
        MidCallback && MidCallback();
    }, duration*1000/4);
    setTimeout(() => {
        EndCallback && EndCallback();
    }, duration*1000/4*3);
    setTimeout(() => {
        ClearChild(TransitionScreen);
        ShowNews();
        EnableAnswerBox();
    }, duration*1000);
}
function DisableAnswerBox() {
    SetStyle($("AnswerBox"),{
        "pointer-events":"none",
        "background-color":"grey",
    });
}
function EnableAnswerBox() {
    SetStyle($("AnswerBox"),{
        "pointer-events":"",
        "background-color":"",
    });
}
function FlyingText(text="Your Mom", duration=0.5, size = 2.5) {
    const FlyingTextDOM = NewEle(`FlyingTextDOM`, 'div', 'position:absolute;top:100%;left:0px;z-index:1501;pointer-events:none;width:100%;', {
    }, EDAll);
    let TheText = NewEle("FlyingText","a","position:relative; display:block;margin:auto;font-size: "+ size + "em;height:30pt;line-height:30pt;color:white;text-shadow:" + txtshadow + ";text-align:center;",{
        innerHTML:text,
    },FlyingTextDOM);
    oEffects.Animate(FlyingTextDOM,{
        "top":"50%",
    },0.3,"ease-out",() => {
        oEffects.Animate(FlyingTextDOM,{
            "opacity": "0",
        },"fast","linear",ClearChild, duration);
    })
}
function TitleDrop() {
    const TitleDOM = NewEle(`TitleDOM`, 'div', 'position:absolute;top:40%;left:0px;z-index:1503;pointer-events:none;width:100%;height:150px;', {
    }, EDAll);
    let Logo_PvZ = NewEle(`Logo_PvZ`, 'div', `background: url(images/PvZ2Dle_Logo_PvZ.png) no-repeat center center; background-size: contain;position:relative;display:block;margin:auto;left:-13vw;width:30vw;height:35vh;animation:bounce-in 0.3s ease-out 1;`, {
    }, TitleDOM);
    const TitleDOM2 = NewEle(`TitleDOM2`, 'div', 'position:absolute;top:40%;left:0px;z-index:1501;pointer-events:none;width:100%;height:150px;', {
    }, EDAll);
    let Logo_DLE = NewEle(`Logo_DLE`, 'div', `background: url(images/PvZ2Dle_Logo_DLE.png) no-repeat center center; background-size: contain;position:relative;display:block;margin:auto;left:12vw;width:30vw;height:35vh;animation:bounce-in 0.3s ease-out 1;`, {
    }, TitleDOM2);
    setTimeout(() => {
        const TitleDOM3 = NewEle(`TitleDOM3`, 'div', 'position:absolute;top:40%;left:0px;z-index:1502;pointer-events:none;width:100%;height:150px;', {
        }, EDAll);
        let Logo_2 = NewEle(`Logo_2`, 'div', `background: url(images/PvZ2Dle_Logo_2.png) no-repeat center center; background-size: contain;position:relative;display:block;margin:auto;width:20vw;height:50vh;top:-10vh;animation:bounce-in 0.3s ease-out 1;`, {
        }, TitleDOM3);
        oEffects.Animate(Logo_PvZ,{
            "left":"-18vw",
        },0.2,"cubic-bezier(0.22, 1, 0.36, 1)");
        oEffects.Animate(Logo_DLE,{
            "left":"17vw",
        },0.2,"cubic-bezier(0.22, 1, 0.36, 1)");
        setTimeout(() => {
            oEffects.Animate(Logo_PvZ,"bounce-out", 0.3, "ease-in", ClearChild);
            oEffects.Animate(Logo_DLE,"bounce-out", 0.3, "ease-in", ClearChild);
            oEffects.Animate(Logo_2,"bounce-out", 0.3, "ease-in", ClearChild);
        },750);
    },750);
}
