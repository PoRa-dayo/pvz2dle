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
                innerHTML: `Expansion II of PvZ2Dle has arrived! Now Seediums (up to Bramble Bush) and Power Mints are there in the plant list! And new UI, you know, just wanna do something with the little CSS and photoshopping knowledge I have.<br/>Some plants' stat display has also been overhauled. (e.g. Shadow-shroom's poison now counts towards the DAMAGE stat instead of dealing no damage).<br/><br/>Also added a feature where guessed stats will show their colors in the search results like in the OG Wordle, because oh my god is the extended plant list big (btw, wrong stats will not show on the search results, you still gotta do the comparison yourself because that's the gameplay smh).`,
            }, TheNews);
            tutorialTxt.style.textShadow = txtshadow;
        });
    }
}