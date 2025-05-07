"use strict";
NewEle(`CreditsButton`, 'div', `background: url(images/Credits_Button.png) no-repeat center center; background-size: contain;position:absolute;top:0px;right:0px;width:${IsMobile?50:60}px;height:${IsMobile?50:60}px;z-index:400;`, {
    className: "Button",
    onclick: () => {
        let creditsShade = NewEle("creditsShade","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:1008;background:rgba(0,0,0,0.8);opacity:0;",{},EDAll);
        let creditsTitle = NewEle("creditsTitle", "center", `color:white;position:absolute;font-size:2em;width:100%;top:1.5%;`, {
            innerText: "Credits"
        }, creditsShade);
        creditsTitle.style.textShadow = txtshadow;
        NewEle(`ReturnButton`, 'div', `background: url(images/Return_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;left:0px;width:60px;height:60px;z-index:10;`, {
            className: "Button",
            onclick: () => {
                oEffects.fadeOut(creditsShade, "fast", ClearChild);
            }
        }, creditsShade);
        oEffects.fadeIn(creditsShade,"fast",() => {
            let creditsBoard = NewEle("creditsBoard", "center", "position:absolute;left:10%;background-position-x:center;width:80%;height:90vh;overflow:auto;background-size:100% 100%;background-image:url(images/TutorialBoard.webp);background-repeat:no-repeat;animation:descendBoard 0.3s ease-out 1;", {}, creditsShade);
            let TheCredits = NewEle("PvZ2DleCredits", "center", "position:absolute;left:10%;top:20%;background-position-x:center;width:80%;height:66vh;overflow:auto;animation:descendBoardContent 0.3s ease-out 1;", {}, creditsShade);
            let creditsTxt = NewEle("creditsTxt", "center", `color:white;position:relative;font-size:18px;width:75%;display:inline-block;`, {
                innerHTML: `PvZ2Dle by PoRa<br/><br/>Based on PvZDle by Kaio "Kirb" Cadorin<br/><a href="https://kirbtop.github.io/PvzDle/">https://kirbtop.github.io/PvzDle/</a><br/><br/>and Plants vs. Zombies 2<br/>by PopCap and Electronic Arts<br/><a href="https://www.ea.com/games/plants-vs-zombies/plants-vs-zombies-2">https://www.ea.com/games/plants-vs-zombies/plants-vs-zombies-2</a><br/><br/>Plant information from Plants vs. Zombies Wiki<br/><a href="https://plantsvszombies.wiki.gg/">https://plantsvszombies.wiki.gg/</a><br/><br/>Convenient CSS/JS plugins stolen from Plants vs. Zombies Travel<br/>(though I'm also one of the coders for it now so heh)<br/><a href="https://pvz.jiangnangame.com/">https://pvz.jiangnangame.com/</a>`,
            }, TheCredits);
            creditsTxt.style.textShadow = txtshadow;
        });
    }
}, EDAll);