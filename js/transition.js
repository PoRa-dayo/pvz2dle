"use strict";
async function Transition(duration=1, MidCallback,EndCallback, text="") {
    if (!sessionStorage["First_Start"]) {
        const promiseArray = [];
        const imageArray = [];
        const ImgToPreload = ["images/PvZ2Dle_Logo_PvZ.png", "images/PvZ2Dle_Logo_DLE.png", "images/PvZ2Dle_Logo_2.png"]
        for (let imageUrl of ImgToPreload) {
            promiseArray.push(new Promise(resolve => {
                const img = new Image();
                img.onload = function() {
                    // resolve the promise, indicating that the image has been loaded
                    resolve();
                };
                img.src = imageUrl;
                imageArray.push(img);
            }));
        }
        await Promise.all(promiseArray); // wait for all the images to be loaded
        TrueTransition(duration, MidCallback, EndCallback, text);
        EDAll.style["pointer-events"] = "";
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
    SetStyle($("RandomButton"),{
        "pointer-events":"none",
        "filter":"brightness(50%)",
    });
}
function EnableAnswerBox() {
    SetStyle($("AnswerBox"),{
        "pointer-events":"",
        "background-color":"",
    });
    SetStyle($("RandomButton"),{
        "pointer-events":"",
        "filter":"",
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
function FlyingText2(text="Your Mom", duration=2, size = 1.5, color = 'white') {
    let randomTop = Math.random()*10-5;
    const FlyingTextDOM = NewEle(`FlyingTextDOM`, 'div', 'position:absolute;top:'+(50+randomTop)+'%;left:'+(Math.random()*40-20)+'%;z-index:1501;pointer-events:none;width:100%;', {
    }, EDAll);
    let TheText = NewEle("FlyingText","a","position:relative; display:block;margin:auto;font-size: "+ size + "em;height:30pt;line-height:30pt;" + (color==="rainbow" ? `` : `color:${color};text-shadow:${txtshadow};`) + "text-align:center;",{
        innerHTML:text,
    },FlyingTextDOM);
    if (color === "rainbow") {
        TheText.className="rainbow-text";
        TheText.style.animation="rainbow-scroll 2s ease infinite";
    }
    oEffects.Animate(FlyingTextDOM,{
        "top":`${randomTop}%`,
        "opacity": "0",
    },duration,"ease-out");
}
function ZoomingText(text="Your Mom", duration=2, size = 2.5) {
    const ZoomingTextDOM = NewEle(`ZoomingTextDOM`, 'div', 'position:absolute;top:50%;left:0px;z-index:1501;pointer-events:none;width:100%;transform:scale(5);', {
    }, EDAll);
    let TheText = NewEle("ZoomingText","a","position:relative; display:block;margin:auto;font-size: "+ size + "em;height:30pt;line-height:30pt;color:white;text-shadow:" + txtshadow + ";text-align:center;",{
        innerHTML:text,
    },ZoomingTextDOM);
    oEffects.Animate(ZoomingTextDOM,{
        "transform":"scale(1)",
    },0.3,"ease-in");
    setTimeout(() => {
        oEffects.fadeOut(ZoomingTextDOM,'fast',ClearChild);
    },duration*1000);
}
function VibratingText(text="Your Mom", duration=1, size = 2.5, color = 'white') {
    let spamShade = NewEle("spamShade","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:1008;background:rgba(255,0,0,0.8);opacity:1;",{},EDAll);
    const FlyingTextDOM = NewEle(`FlyingTextDOM`, 'div', 'position:absolute;top:50%;left:0px;z-index:1501;pointer-events:none;width:100%;animation:shaking 0.1s infinite;', {
    }, EDAll);
    let TheText = NewEle("FlyingText","a","position:relative; display:block;margin:auto;font-size: "+ size + "em;height:30pt;line-height:30pt;color:" + color + ";text-shadow:" + txtshadow + ";text-align:center;",{
        innerHTML:text,
    },FlyingTextDOM);
    setTimeout(() => {
        ClearChild(FlyingTextDOM);
        ClearChild(spamShade);
    },duration*1000)
}
function LastWarning(enable = true) {
    if (enable && !$("timeWarningShade")) {
        NewEle("timeWarningShade","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:1008;background:rgba(255,0,0,0.5);opacity:0;animation:warningFlash 1s ease-in-out infinite;pointer-events:none;",{},EDAll);
    } else if (!enable && $("timeWarningShade")) {
        ClearChild($("timeWarningShade"));
    }
}
function TitleDrop() {
    const TitleDOM = NewEle(`TitleDOM`, 'div', 'position:absolute;top:40%;left:0px;z-index:1503;pointer-events:none;width:100%;height:150px;', {
    }, EDAll);
    let Logo_PvZ = NewEle(`Logo_PvZ`, 'div', `background: url(images/PvZ2Dle_Logo_PvZ.png) no-repeat center center; background-size: contain;position:relative;display:block;margin:auto;left:-12vw;width:30vw;height:35vh;animation:bounce-in 0.3s ease-out 1;`, {
    }, TitleDOM);
    const TitleDOM2 = NewEle(`TitleDOM2`, 'div', 'position:absolute;top:40%;left:0px;z-index:1501;pointer-events:none;width:100%;height:150px;', {
    }, EDAll);
    let Logo_DLE = NewEle(`Logo_DLE`, 'div', `background: url(images/PvZ2Dle_Logo_DLE.png) no-repeat center center; background-size: contain;position:relative;display:block;margin:auto;left:11vw;width:30vw;height:35vh;animation:bounce-in 0.3s ease-out 1;`, {
    }, TitleDOM2);
    setTimeout(() => {
        const TitleDOM3 = NewEle(`TitleDOM3`, 'div', 'position:absolute;top:40%;left:0px;z-index:1502;pointer-events:none;width:100%;height:150px;', {
        }, EDAll);
        let Logo_2 = NewEle(`Logo_2`, 'div', `background: url(images/PvZ2Dle_Logo_2.png) no-repeat center center; background-size: contain;position:relative;display:block;margin:auto;width:20vw;height:50vh;top:-10vh;animation:bounce-in 0.3s ease-out 1;`, {
        }, TitleDOM3);
        oEffects.Animate(Logo_PvZ,{
            "left":"-17vw",
        },0.2,"cubic-bezier(0.22, 1, 0.36, 1)");
        oEffects.Animate(Logo_DLE,{
            "left":"16vw",
        },0.2,"cubic-bezier(0.22, 1, 0.36, 1)");
        setTimeout(() => {
            oEffects.Animate(TitleDOM,"bounce-out", 0.3, "ease-in", ClearChild);
            oEffects.Animate(TitleDOM2,"bounce-out", 0.3, "ease-in", ClearChild);
            oEffects.Animate(TitleDOM3,"bounce-out", 0.3, "ease-in", ClearChild);
        },750);
    },750);
}
function TimeAttack_IntroAnim(callback) {
    let explosionScreen = NewEle(`explosionScreen`, 'div', `background: url(images/Animations/explosion.webp) no-repeat center center; position:absolute;display:block;left:0;top:0;width:100%;height:100%;background-size:cover;z-index:1000;pointer-events:none;opacity:0`, {
    }, EDAll);
    let space = NewEle(`space`, 'div', `background: url(images/Animations/space.png) no-repeat center center; position:absolute;display:block;left:0;top:0;width:100%;height:100%;background-size:cover;z-index:1000;pointer-events:none;opacity:0`, {
    }, EDAll);
    let anime = NewEle(`anime`, 'div', `background: url(images/Animations/anime.png) no-repeat center center; position:absolute;display:block;left:0;top:0;width:100%;height:100%;background-size:cover;z-index:1000;pointer-events:none;animation:wagRotation step-end 0.2s infinite;opacity:0`, {
    }, EDAll);
    let JustADOM = NewEle("JustADOM","div","position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;",{},EDAll);
    let SOSpanel = NewEle(`SOSpanel`, 'div', `background: url(images/Animations/SOSpanel.png) no-repeat center center; position:absolute;display:block;left:10%;top:-4.5%;width:150px;height:186px;transform:scale(0.6);opacity:0;pointer-events:none;`, {
    }, JustADOM);
    let WallNut = NewEle(`WallNut`, 'div', `background: url(images/Animations/Wallnut.png) no-repeat center center; position:absolute;display:block;left:90%;top:150%;width:150px;height:179px;transform:rotate(800deg) scale(5);pointer-events:none;`, {
    }, JustADOM);
    let WizardDOM = NewEle(`WizardDOM`, 'div', `position:absolute;display:block;left:100%;top:0%;width:125px;height:156px;z-index:402;pointer-events:none;`, {
    }, EDAll);
    let Wizard = NewEle(`Wizard`, 'div', `background: url(images/Animations/Wizard.png) no-repeat center center; position:absolute;display:block;transform:rotate(0deg);width:125px;height:156px;background-size:contain;pointer-events:none;`, {
    }, WizardDOM);
    let Projectile = NewEle(`Projectile`, 'div', `background: url(images/Animations/Projectile.png) no-repeat center center; position:absolute;display:block;width:150px;height:179px;transform:scale(0.3);top:-5%;left:80%;animation:shakingScale03 0.1s infinite;pointer-events:none;opacity:0;`, {
    }, JustADOM);
    let MagicFX = NewEle(`MagicFX`, 'div', `background: url(images/Animations/MagicFX.png) no-repeat center center; position:absolute;display:block;width:115px;height:113px;transform:scale(0.3);top:2%;left:80%;pointer-events:none;opacity:0;z-index:1000;`, {
    }, EDAll);
    let MidnightMagic = NewEle(`MidnightMagic`, 'div', `background: url(images/Animations/MidnightMagic.png) no-repeat center center; position:absolute;display:block;left:0;top:0%;transform:translateY(-100%);width:100%;height:100%;background-size:100% 100%;z-index:1001;pointer-events:none;opacity:0`, {
    }, EDAll);
    NewEle("IntroShade","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:1008;background:rgba(0,0,0,0.7);opacity:0;",{},EDAll);
    oEffects.fadeIn($("IntroShade"),"fast");
    ZoomingText(`3 MINUTES<br/>UNLIMITED GUESSES`);
    setTimeout(() => {
        ZoomingText(`GOOD GUESSES give MORE TIME`);
    },2200);
    setTimeout(() => {
        ZoomingText(`BAD GUESSES will be PENALIZED`);
    },4400);
    setTimeout(() => {
        ZoomingText(`READY?`);
    },6600);
    setTimeout(() => {
        oEffects.fadeOut($("IntroShade"),"fast",ClearChild);
    },8800);
    setTimeout(() => {
        oEffects.fadeIn(SOSpanel,"slow");
        oEffects.Animate(WallNut,{
            "transform": "rotate(0deg) scale(0.3)",
            "left": "10%",
            "top": "-5%",
        }, "slow", "linear", () => {
            oEffects.Animate(Wizard,{
                "transform": "rotate(-45deg)"
            }, 0.5, "cubic-bezier(0.22, 1, 0.36, 1)", () => {
                oEffects.Animate(Wizard,{
                    "transform": "rotate(0deg)"
                }, "fast", "ease-in");
            });
            oEffects.Animate(WizardDOM,{
                "left": "85%"
            }, 0.5, "cubic-bezier(0.22, 1, 0.36, 1)", () => {
                oEffects.fadeIn(Projectile,"fast");
                MagicFX.style.opacity="1";
                oEffects.Animate(MagicFX,{
                    "opacity": "0",
                    "transform": "scale(1.5)",
                });
                Projectile.style.transition="left 0.2s ease-out";
                oEffects.Animate(WizardDOM,{
                    "left": "100%"
                }, "fast", "ease-in", () => {
                    ClearChild(WizardDOM);
                    ZoomingText([`GO!`,`GO!`,`GO!`,`GO!`,`GO!`,`GO!`,`GO!`,`GO!`,`GO!`,`GO!`,`GO!`,`GO!`,`BAZINGA!`,`SPONGEBOB!`, `CUBERRY!`, `Missing INTRO_MESSAGE`].random(),1,5);
                    setTimeout(() => {
                        callback && callback();
                    }, 1000);
                });
            });
        });
    },9500);
}
function TimeAttack_IntroAnimFast() {
    let explosionScreen = NewEle(`explosionScreen`, 'div', `background: url(images/Animations/explosion.webp) no-repeat center center; position:absolute;display:block;left:0;top:0;width:100%;height:100%;background-size:cover;z-index:1000;pointer-events:none;opacity:0;`, {
    }, EDAll);
    let space = NewEle(`space`, 'div', `background: url(images/Animations/space.png) no-repeat center center; position:absolute;display:block;left:0;top:0;width:100%;height:100%;background-size:cover;z-index:1000;pointer-events:none;opacity:0;`, {
    }, EDAll);
    let anime = NewEle(`anime`, 'div', `background: url(images/Animations/anime.png) no-repeat center center; position:absolute;display:block;left:0;top:0;width:100%;height:100%;background-size:cover;z-index:1004;pointer-events:none;animation:wagRotation step-end 0.2s infinite;opacity:0;`, {
    }, EDAll);
    let JustADOM = NewEle("JustADOM","div","position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;",{},EDAll);
    let SOSpanel = NewEle(`SOSpanel`, 'div', `background: url(images/Animations/SOSpanel.png) no-repeat center center; position:absolute;display:block;left:10%;top:-4.5%;width:150px;height:186px;transform:scale(0.6);pointer-events:none;opacity:0;`, {
    }, JustADOM);
    let WallNut = NewEle(`WallNut`, 'div', `background: url(images/Animations/Wallnut.png) no-repeat center center; position:absolute;display:block;left:10%;top:-5%;width:150px;height:179px;transform:scale(0.3);pointer-events:none;opacity:0;`, {
    }, JustADOM);
    let Projectile = NewEle(`Projectile`, 'div', `background: url(images/Animations/Projectile.png) no-repeat center center; position:absolute;display:block;width:150px;height:179px;transform:scale(0.3);top:-5%;left:80%;animation:shakingScale03 0.1s infinite;pointer-events:none;opacity:0;`, {
    }, JustADOM);
    let MidnightMagic = NewEle(`MidnightMagic`, 'div', `background: url(images/Animations/MidnightMagic.png) no-repeat center center; position:absolute;display:block;left:0;top:0%;transform:translateY(-100%);width:100%;height:100%;background-size:100% 100%;z-index:1001;pointer-events:none;opacity:0;`, {
    }, EDAll);
    oEffects.fadeIn(SOSpanel,"fast");
    oEffects.fadeIn(WallNut,"fast");
    oEffects.fadeIn(Projectile,"fast");
    Projectile.style.transition="left 0.2s ease-out";
}
function TimeAttack_OutroAnim(callback) {
    let flash = NewEle("flash","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:5000;background:white;opacity:0;",{},EDAll);
    let explosionScreen = $("explosionScreen");
    let anime = $("anime");
    let space = $("space");
    let JustADOM = $("JustADOM");
    let WallNut = $("WallNut");
    let SOSpanel = $("SOSpanel");
    let Projectile = $("Projectile");
    let MidnightMagic = $("MidnightMagic");
    if (!explosionScreen || !anime || !space || !JustADOM || !WallNut || !SOSpanel || !Projectile || !MidnightMagic) {
        ClearChild(explosionScreen, anime, space, JustADOM, WallNut, SOSpanel, Projectile, MidnightMagic, flash);
        callback && callback();
        console.warn("Failed to load assets for cutscene");
    } else {
        setTimeout(() => {
            space.style.opacity="1";
            anime.style.opacity="1";
            SetStyle(JustADOM,{
                "z-index":"2001",
                "transform":"scale(0.5)",
            });
            SetStyle(SOSpanel,{
                "transform":"scale(5)",
                "top":"34.5%"
            });
            SetStyle(WallNut,{
                "transform":"scale(3)",
                "top":"35%"
            });
            SetStyle(Projectile,{
                "animation":"shakingScale5 0.1s infinite",
                "top":"35%",
                "transition": "",
                "left":"100%",
            });
            oEffects.Animate(JustADOM, {
                "transform":"scale(1)"
            },1.5,"ease-out");
            setTimeout(() => {
                Projectile.style.transition="left 1.5s linear";
                Projectile.style.left="40%";
            },50);
            oEffects.fadeIn(flash,1.5, () =>{
                explosionScreen.style.opacity="1";
                flash.style.opacity="0";
                ClearChild(space,anime,Projectile,SOSpanel);
                explosionScreen.style.background="url(images/Animations/explosion.webp) no-repeat center center";
                explosionScreen.style.backgroundSize="cover";
                WallNut.style.transform="scale(0) rotate(0deg)";
                JustADOM.style.left="10%";
                setTimeout(()=>{
                    oEffects.Animate(WallNut,{
                        "transform":"scale(10) rotate(1000deg)",
                    },2);
                    oEffects.Animate(JustADOM,{
                        "left":"400%"
                    },2);
                },10);
                setTimeout(() => {
                    MidnightMagic.style.opacity="1";
                    MidnightMagic.style.animation="bounce 1.8s forwards";
                    setTimeout(()=>{
                        ClearChild(WallNut,MidnightMagic,explosionScreen,JustADOM);
                    },2500);
                    setTimeout(() => {
                        ZoomingText("GAME OVER",2.5);
                        Transition(3,()=>{},()=>{
                            ClearChild(flash);
                            callback && callback();
                        },"");
                    },3000);
                },1000);
            });
        },500);
    }
}
