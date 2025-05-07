"use strict";
let ShareButton = NewEle(`ShareButton`, 'div', `background: url(images/Share_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;right:0px;width:${IsMobile?50:60}px;height:${IsMobile?50:60}px;display:none;${sessionStorage["CheckedShare"]?"":"animation: ButtonBlink 1s infinite"}`, {
    className: "Button",
    onclick: () => {
        sessionStorage.setItem("CheckedShare","1");
        ShareButton.style.animation="";
        let shareShade = NewEle("shareShade","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:1008;background:rgba(0,0,0,0.8);",{},EDAll);
        let shareBoard = NewEle("shareBoard","center","position:absolute;left:10%;background-position-x:center;width:80%;height:90vh;overflow:auto;background-size:100% 100%;background-image:url(images/TutorialBoard.webp);background-repeat:no-repeat;animation:descendBoard 0.3s ease-out 1;",{
        },shareShade);
        let TheShare = NewEle("PvZ2DleShare","center","position:absolute;left:10%;top:20%;background-position-x:center;width:80%;height:66vh;overflow:auto;animation:descendBoardContent 0.3s ease-out 1;",{
            className: "CustomScroll",
        },shareShade);
        let tutorialTitle = NewEle("tutorialTitle","center",`color:white;position:absolute;font-size:2em;width:100%;top:1.5%;`,{
            innerText: "Share your " + (localStorage.FinalResult === "Won" ? "victory!" : "attempt!"),
        },shareShade);
        tutorialTitle.style.textShadow=txtshadow;
        let shareTxt = NewEle("tutorialTxt","center",`color:white;position:relative;font-size:22px;width:75%;display:inline-block;`,{
            innerHTML: "Copy using the button below.",
        },TheShare);
        tutorialTxt.style.textShadow=txtshadow;
        let GuessList = NewEle("GuessList","center",`color:white;position:relative;font-size:15px;width:75%;display:inline-block;`,{
        },TheShare);
        let ResultsObj = JSON.parse(localStorage[(localStorage.FinalResult === "Streak" ? "StreakHunt_" : "") + "GuessResults"]);
        let ind = 0;
        let NumberArr = ["0", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣"];
        let ResultStr = "";
        for (let plantName in ResultsObj) {
            ResultStr+=NumberArr[++ind];
            for (let result of ResultsObj[plantName]) {
                ResultStr+=(result === 1 ? `🟩` : (result === 2 ? `🟨` : `🟥`));
            }
            ResultStr+=`<br/>`;
        }
        GuessList.innerHTML+=ResultStr;
        let tutorialTxt2 = NewEle("tutorialTxt2","center",`color:white;position:relative;font-size:22px;width:75%;display:inline-block;opacity:0;`,{
            innerHTML: `Message copied to clipboard!`,
        },TheShare);
        tutorialTxt2.style.textShadow=txtshadow;
        Math.seedV2 = [localStorage.userSeed,DateValue2];
        let IntroShareStr;
        switch (localStorage.FinalResult) {
            case "Won":
            {
                IntroShareStr = "I won today's PvZ2Dle! ";
                break;
            }
            case "Lost":
            {
                IntroShareStr = "I lost today's PvZ2Dle... ";
                break;
            }
            case "Streak":
            {
                IntroShareStr = "I got to " + localStorage["StreakHunt_CurrentStreak"] + " streaks in PvZ2Dle's Streak Hunt Mode! ";
                break;
            }
            default:
            {
                IntroShareStr = "Error... ";
                break;
            }
        }
        let BonusIntroArr = [
            "I feel so sigma!",
            "I feel so Invisible!",
            "I feel so 1437!",
            "I feel like I know exactly what's different about the Newspaper Zombie!",
            "I feel like sans undertale.",
            "I feel like rushing art.",
            "I feel like I just witnessed another one of Liu Kun's Egyptian masterpiece.",
            "I feel like my brother has a very special attack.",
            "I feel like a huge leader of everyone!",
            "I feel like I've regained my magic!",
            "I feel like I could melt all hordes!",
            "I feel like it truly isn't over until it's Blover.",
            "I feel so Possa Possa...",
            "I feel so Cuberry.",
            "I feel like Creeps20's fellow citizen.",
            "I feel like ItsP's S-4 fail montage.",
            "I feel like I'm enjoying Zants vs. Plombies again!",
            "I feel like NMTX-IV, also known as Twerking the Party.",
            "I feel like assaulting some airspaces.",
            "I feel like Chain Block, also known as 19-5",
            "I feel like criticizing a PvZ mod.",
            "I feel like criticizing a PvZ downfall video.",
            "I feel like a new Flag Zombie video.",
            "I feel like shit's truly gone wild...",
            "I feel like bad game design!",
            "I feel like I'm gonna make an announcement.",
            "I feel like a bad apple is gonna fall on my head.",
            "I feel like Sussus Amogus.",
            "I feel like I see Hatsune Miku at the end of the horizon.",
            "I feel like a new ELM update!",
            "I feel like Bonus Balls!",
            "I feel like that was the guess of '87.",
            "I feel like jumpscaring PvZ fans with an anime girl!",
            "I feel like spending 10 hours at PvZ Brutal EX Plus Hard Mode Total Death Edition.",
            "I feel like making a clickbait video with Stardrop's meteors.",
        ];
        IntroShareStr += BonusIntroArr[Math.floor(Math.seededRandomV2(BonusIntroArr.length-1,0))];
        if (localStorage.FinalResult === "Streak") {
            IntroShareStr += " This is what ended my run:";
        }
        let FinalStr = IntroShareStr + `<br/>` +  ResultStr + `Play PvZ2Dle here:<br/>https://pora-dayo.github.io/pvz2dle/`;
        NewEle(`CopyButton`, 'div', `background: url(images/Purple_Button.png) no-repeat center center; color:white; text-shadow:${txtshadow};background-size: 150px auto;position:relative;left:0px;width:150px;height:67px;font-size:25px;padding-top:35px;`, {
            className: "Button",
            innerText: "SHARE",
            onclick: () => {
                FinalStr = FinalStr.replace(/<br\s*[\/]?>/gi, "\n");
                navigator.clipboard.writeText(FinalStr).then(() => {
                    tutorialTxt2.style.opacity = "1";
                }).catch(err => {
                    alert("Failed to copy: " + err);
                });
            }
        }, TheShare);
        if (/Won|Lost/.test(localStorage.FinalResult)) {
            let tutorialTxt3 = NewEle("tutorialTxt3", "center", `color:white;position:relative;font-size:22px;width:75%;display:inline-block;`, {
                innerHTML: `Next challenge in:`,
            }, TheShare);
            tutorialTxt3.style.textShadow = txtshadow;
            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            let countDownDate = tomorrow.getTime();

            // Update the count down every 1 second
            let x = setInterval(function () {

                // Get today's date and time
                let now = new Date().getTime();

                // Find the distance between now and the count down date
                let distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Display the result
                tutorialTxt3.innerHTML = `Next challenge in:<br/>` + hours + "h "
                    + minutes + "m " + seconds + "s ";

                // If the count down is finished, write some text
                if (distance < 0) {
                    clearInterval(x);
                    location.reload();
                }
            }, 1000);
        }
        NewEle(`ReturnButton`, 'div', `background: url(images/Return_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;left:0px;width:60px;height:60px;`, {
            className: "Button",
            onclick: () => {
                oEffects.fadeOut(shareShade,"fast",ClearChild);
            }
        }, shareShade);
    }
}, EDAll);