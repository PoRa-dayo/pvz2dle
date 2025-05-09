"use strict";
const EDAll = $("dAll");
let CurrentExpansionVer = "2";
let GameMode;
if (localStorage.CurrentGameMode) {
    GameMode = localStorage.CurrentGameMode;
} else {
    GameMode = "Daily";
    localStorage.CurrentGameMode = "Daily";
}
if (!localStorage["StreakHunt_CurrentStreak"]) {
    localStorage["StreakHunt_CurrentStreak"] = "1";
}
["TotalGuesses", "StreakHunt_TotalGuesses", "TotalWins", "StreakHunt_TotalWins", "StreakHunt_HighestStreak"]
    .forEach(key => {
        if (!localStorage[key]) localStorage[key] = "0";
    });
const TextDOM = NewEle(`TextDOM`, 'div', 'width:100%;height:100%;position:absolute;left:0;top:0;', {
}, EDAll);
const txtshadow = "rgb(0 0 0) 2px 0px 0px, rgb(0 0 0) 1.75517px 0.958851px 0px, rgb(0 0 0) 1.0806px 1.68294px 0px, rgb(0 0 0) 0.141474px 1.99499px 0px, rgb(0 0 0) -0.832294px 1.81859px 0px, rgb(0 0 0) -1.60229px 1.19694px 0px, rgb(0 0 0) -1.97998px 0.28224px 0px, rgb(0 0 0) -1.87291px -0.701566px 0px, rgb(0 0 0) -1.30729px -1.5136px 0px, rgb(0 0 0) -0.421592px -1.95506px 0px, rgb(0 0 0) 0.567324px -1.91785px 0px, rgb(0 0 0) 1.41734px -1.41108px 0px, rgb(0 0 0) 1.92034px -0.558831px 0px";
function showTxt(id, top, txt, left=35, size = 2){
    NewEle(id,"a","z-index: 258; position: absolute; font-size: " + size + "em;left:" + left + "%;top:" + top + "px;height:30pt;line-height:30pt;color:white;text-shadow:" + txtshadow + ";text-align:center;",{
        innerText:txt,
    },EDAll);
}function showTxtCenter(id, top, txt, size = 2){
    NewEle(id,"a","z-index: 258; position:relative; font-size: " + size + "em;display:block;margin:auto;padding-top:" + top + "px;height:30pt;line-height:30pt;color:white;text-shadow:" + txtshadow + ";text-align:center;",{
        innerText:txt,
    },TextDOM);
}
let DateInt = new Date(),
    DateValue = DateInt.getDate()+(DateInt.getMonth()+1)*100+DateInt.getFullYear()*10000,
    DateValue2 = Math.floor(((Math.abs(DateInt.getDate()*(DateInt.getMonth()+1)-DateInt.getFullYear())/DateValue)+DateInt.getDay())*Math.sqrt(DateValue));
if (DateValue+"" !== localStorage.DateLastPlayed || !localStorage.ExpansionVer || localStorage.ExpansionVer !== CurrentExpansionVer) {
    localStorage.removeItem("DateLastPlayed");
    localStorage.removeItem("GuessedPlants");
    localStorage.removeItem("GuessResults");
    localStorage.setItem("DateLastPlayed", DateValue+"");
    console.log("reset");
}
if (!localStorage.ExpansionVer || localStorage.ExpansionVer !== CurrentExpansionVer) {
    localStorage.removeItem("CheckedNews");
}
localStorage.ExpansionVer = CurrentExpansionVer;
if (!localStorage.userSeed) {
    let number = '';
    number += Math.floor(Math.random() * 9 + 1);
    for (let i = 1; i < 25; i++) {
        number += Math.floor(Math.random() * 10);
    }
    localStorage.setItem("userSeed", number);
}

/*--PLANT LIST START--*/
let AllPlantNames = [];
let json = {};
let AllPlantsLen = 0;
for (let i in AllPlants) {
    json[AllPlants[i].EngName] = AllPlants[i];
    AllPlantsLen++;
}
AllPlantNames = json;
/*--PLANT LIST END--*/

/*--STAT LIST START--*/
const DamageList = {"Light": 0, "Normal": 1, "Moderate": 2, "Heavy": 3, "Extensive": 4, "Huge": 5, "Massive": 6};
const RechargeList = {"Fast": 0, "Mediocre": 1, "Sluggish": 2, "Slow": 3, "Very Slow": 4};
let WorldArr = ["Player's House","Ancient Egypt","Pirate Seas","Wild West","Frostbite Caves","Lost City","Far Future","Dark Ages","Neon Mixtape Tour","Jurassic Marsh","Big Wave Beach","Modern Day","Gemium","Premium","Seedium","Power Mints"];
let FamilyArr = ["Contain-mint","Conceal-mint","Enchant-mint","Enlighten-mint","Enforce-mint","Appease-mint","Arma-mint","Spear-mint","Reinforce-mint","Bombard-mint","Winter-mint","Pepper-mint","Fila-mint","Ail-mint"]
/*--STAT LIST END--*/

/*reorder World List and Family List*/
let WorldList = {};
let FamilyList = {};
(function sortAlphabetically() {
    for (let worldInd in WorldArr) {
        let worldName = WorldArr[worldInd];
        WorldList[worldName] = worldInd;
    }

    FamilyArr = FamilyArr.slice().sort((a, b) => a.localeCompare(b));
    for (let familyInd in FamilyArr) {
        let familyName = FamilyArr[familyInd];
        FamilyList[familyName] = familyInd;
    }
})();

showTxtCenter("TopText", 45,"GUESS TODAY'S PLANT!",1.5);
showTxtCenter("judgmentText", 30,"placeholder", 2);
SetNone($("judgmentText"));
let TodaysPlant;

const StatList = ["SunNum", "World", "Attack", "Recharge", "RangeArea", "Usage", "Special", "Family"];
let StatText = `
    <div class="dGreenTop"><img src="images/StatTitles/Name.webp" alt"" style="position:relative;top:0;width:20px;height:20px;vertical-align:middle;"> NAME</div>
    <div class="dGreenTop"><img src="images/StatTitles/Sun_Cost.webp" alt"" style="position:relative;top:0;width:20px;height:20px;vertical-align:middle;"> SUN COST</div>
    <div class="dGreenTop"><img src="images/StatTitles/World.webp" alt"" style="position:relative;top:0;width:20px;height:20px;vertical-align:middle;"> WORLD</div>
    <div class="dGreenTop"><img src="images/StatTitles/Damage.webp" alt"" style="position:relative;top:0;width:20px;height:20px;vertical-align:middle;"> DAMAGE</div>
    <div class="dGreenTop"><img src="images/StatTitles/Recharge.webp" alt"" style="position:relative;top:0;width:20px;height:20px;vertical-align:middle;"> RECHARGE</div>
    <div class="dGreenTop"><img src="images/StatTitles/Area.webp" alt"" style="position:relative;top:0;width:20px;height:20px;vertical-align:middle;"> RANGE/AREA</div>
    <div class="dGreenTop"><img src="images/StatTitles/Usage.webp" alt"" style="position:relative;top:0;width:20px;height:20px;vertical-align:middle;"> USAGE</div>
    <div class="dGreenTop"><img src="images/StatTitles/Special.webp" alt"" style="position:relative;top:0;width:20px;height:20px;vertical-align:middle;"> SPECIAL</div>
    <div class="dGreenTop"><img src="images/StatTitles/Family.webp" alt"" style="position:relative;top:0;width:20px;height:20px;vertical-align:middle;"> FAMILY</div>
`;
let StatTextSimple = StatText.replaceAll('dGreenTop', 'dGreenTop_Simple');

/*THE ANSWER BOX AND THE GUESSING LIST THAT SHOWS UP WHEN YOU PUT IN A PLANT'S NAME*/
let GuessedPlants = new Set();
let GuessResults = {};
let GuessedStats = {};
for (let stat of StatList) {
    GuessedStats[stat] = {};
}
let GuessingListDOM = NewEle(`GuessingListDOM`, 'div', 'width:100%;height:100%;position:absolute;left:0;top:0;opacity:0;pointer-events:none;', {
}, EDAll);
let GuessingList = NewEle(`dFlexWrap_PvZ2DleGuessBox`, 'div', 'z-index:900;', {
    className: IsMobile ? 'dFlexWrap_PvZ2DleGuessBox_Mobile' : 'dFlexWrap_PvZ2DleGuessBox',
}, GuessingListDOM);
let AnswerBox = NewEle("AnswerBox","input","position:absolute;top:100px;left:25%;z-index:1000;width: 50%;height: 30px;font-size: 18px;text-rendering: optimizeSpeed;user-select:all;margin:0px;pointer-events:none;background-color:grey",{
    placeholder:"Plant's Name/World/Family",
},EDAll);
let searchShade = NewEle("searchShade","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:500;background:rgba(0,0,0,0.5);display:none;",{},EDAll);
let ReturnButton = NewEle(`ReturnButton`, 'div', `background: url(images/Return_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;left:0px;width:60px;height:60px;`, {
    className: "Button",
    onclick: () => {
        GuessingListDOM.style.opacity = 0;
        GuessingListDOM.style.pointerEvents = "none";
        SetNone(searchShade);
    }
}, searchShade);
AnswerBox.oninput = AnswerBox.onfocus = () => {
    /*JUDGE THE ANSWER AND ADD THE PLANTS TO THE SEARCH RESULTS, AS WELL AS SHOW OR HIDE THE SEARCH RESULT BOX ACCORDINGLY*/
    if (AnswerBox.value.length > 0) {
        let Ans = AnswerBox.value.toLowerCase();
        let plantList = [], worldList = [], familyList = [];
        let OopsAllMints = true;
        for (let plant of AllPlants) {
            let plantName = plant.EngName;
            let plantWorld = plant.World.toLowerCase();
            let plantFamily = plant.Family.toLowerCase();
            let LowerPlantName = plantName.toLowerCase();
            if (!GuessedPlants.has(plantName)) {
                if (LowerPlantName.startsWith(Ans)) {
                    plantList.push(plantName);
                    if (!/-mint/.test(plantName)) {
                        OopsAllMints = false;
                    }
                }
                if (plantWorld.startsWith(Ans)) {
                    worldList.push(plantName);
                    if (!/-mint/.test(plantName)) {
                        OopsAllMints = false;
                    }
                }
                if (plantFamily.startsWith(Ans)) {
                    familyList.push(plantName);
                }
            }
        }
        if (plantList.length > 0 && !OopsAllMints) {
            GuessingListDOM.style.opacity = 1;
            GuessingListDOM.style.pointerEvents = "auto";
            GuessingList.innerHTML = StatTextSimple;
            SetBlock(searchShade);
            for (let plName of plantList) {
                let plantObj = AllPlantNames[plName];
                NewEle(`${plantObj.CodeName}_Name`, 'div', 'cursor:pointer;', {
                    innerHTML: `<img src="images/Name/${plName.replaceAll(" ", "_")}.webp" alt"" style="position:relative;top:0px;width:30px;height:30px;vertical-align:middle;"> ` + plName,
                    className: "card_Normal" + (IsMobile ? "_Mobile" : ""),
                    onclick: () => {AddGuess(plantObj.EngName, true)}
                }, GuessingList);
                for (let stat of StatList) {
                    let BGcolor = "lightblue", TheGuessedStat = GuessedStats[stat][plantObj[stat] ?? "No"];
                    if (!isNullish(TheGuessedStat)){
                        BGcolor = (TheGuessedStat === 0 ? "F8657B" : (TheGuessedStat === 1 ? "67D898" : "E0C584"));
                    }
                    NewEle(`${plantObj.CodeName}_${stat}`, 'div', "cursor:pointer;background-color:#" + BGcolor, {
                        innerHTML: ((/World|Family|Recharge|Attack/.test(stat) && plantObj[stat] && !/\?\?\?|Variable/.test(plantObj[stat])) ? `<img src="images/${stat}/${plantObj[stat]}.png" alt"" style="position:relative;top:0px;width:30px;height:30px;vertical-align:middle;"> ` : ``) + (plantObj[stat] ?? "No"),
                        className: "card_Normal" + (IsMobile ? "_Mobile" : ""),
                        onclick: () => {AddGuess(plantObj.EngName, true)}
                    }, GuessingList);
                }
            }
        } else if (worldList.length > 0) {
            GuessingListDOM.style.opacity = 1;
            GuessingListDOM.style.pointerEvents = "auto";
            GuessingList.innerHTML = StatTextSimple;
            SetBlock(searchShade);
            for (let plName of worldList) {
                let plantObj = AllPlantNames[plName];
                NewEle(`${plantObj.CodeName}_Name`, 'div', 'cursor:pointer;', {
                    innerHTML: `<img src="images/Name/${plName.replaceAll(" ", "_")}.webp" alt"" style="position:relative;top:0px;width:30px;height:30px;vertical-align:middle;"> ` + plName,
                    className: "card_Normal" + (IsMobile ? "_Mobile" : ""),
                    onclick: () => {AddGuess(plantObj.EngName, true)}
                }, GuessingList);
                for (let stat of StatList) {
                    let BGcolor = "lightblue", TheGuessedStat = GuessedStats[stat][plantObj[stat] ?? "No"];
                    if (!isNullish(TheGuessedStat)){
                        BGcolor = (TheGuessedStat === 0 ? "F8657B" : (TheGuessedStat === 1 ? "67D898" : "E0C584"));
                    }
                    NewEle(`${plantObj.CodeName}_${stat}`, 'div', 'cursor:pointer;background-color:#' + BGcolor, {
                        innerHTML: ((/World|Family|Recharge|Attack/.test(stat) && plantObj[stat] && !/\?\?\?|Variable/.test(plantObj[stat])) ? `<img src="images/${stat}/${plantObj[stat]}.png" alt"" style="position:relative;top:0px;width:30px;height:30px;vertical-align:middle;"> ` : ``) + (plantObj[stat] ?? "No"),
                        className: "card_Normal" + (IsMobile ? "_Mobile" : ""),
                        onclick: () => {AddGuess(plantObj.EngName, true)}
                    }, GuessingList);
                }
            }
        } else if (familyList.length > 0) {
            GuessingListDOM.style.opacity = 1;
            GuessingListDOM.style.pointerEvents = "auto";
            GuessingList.innerHTML = StatTextSimple;
            SetBlock(searchShade);
            for (let plName of familyList) {
                let plantObj = AllPlantNames[plName];
                NewEle(`${plantObj.CodeName}_Name`, 'div', 'cursor:pointer;', {
                    innerHTML: `<img src="images/Name/${plName.replaceAll(" ", "_")}.webp" alt"" style="position:relative;top:0px;width:30px;height:30px;vertical-align:middle;"> ` + plName,
                    className: "card_Normal" + (IsMobile ? "_Mobile" : ""),
                    onclick: () => {AddGuess(plantObj.EngName, true)}
                }, GuessingList);
                for (let stat of StatList) {
                    let BGcolor = "lightblue", TheGuessedStat = GuessedStats[stat][plantObj[stat] ?? "No"];
                    if (!isNullish(TheGuessedStat)){
                        BGcolor = (TheGuessedStat === 0 ? "F8657B" : (TheGuessedStat === 1 ? "67D898" : "E0C584"));
                    }
                    NewEle(`${plantObj.CodeName}_${stat}`, 'div', 'cursor:pointer;background-color:#' + BGcolor, {
                        innerHTML: ((/World|Family|Recharge|Attack/.test(stat) && plantObj[stat] && !/\?\?\?|Variable/.test(plantObj[stat])) ? `<img src="images/${stat}/${plantObj[stat]}.png" alt"" style="position:relative;top:0px;width:30px;height:30px;vertical-align:middle;"> ` : ``) + (plantObj[stat] ?? "No"),
                        className: "card_Normal" + (IsMobile ? "_Mobile" : ""),
                        onclick: () => {AddGuess(plantObj.EngName, true)}
                    }, GuessingList);
                }
            }
        } else {
            GuessingList.innerHTML = "";
            GuessingListDOM.style.opacity = 0;
            GuessingListDOM.style.pointerEvents = "none";
            SetNone(searchShade);
        }
    } else {
        GuessingList.innerHTML = "";
        GuessingListDOM.style.opacity = 0;
        GuessingListDOM.style.pointerEvents = "none";
        SetNone(searchShade);
    }
}

/*THE BOX CONTAINING YOUR SUBMITTED GUESSES*/
let GuessedList = NewEle(`dFlexWrap_PvZ2DleItem`, 'div', '', {
    className: IsMobile ? 'dFlexWrap_PvZ2DleItem_Mobile' : 'dFlexWrap_PvZ2DleItem',
}, EDAll);

/*THE FUNCTIONS RELATED TO SUBMITTING A GUESS*/
function findCommonConsecutiveLetters(str1, str2, stat) {
    // Normalize strings to lowercase to make comparison case-insensitive
    str1 = ((str1 ?? "No") + "").toLowerCase();
    str2 = ((str2 ?? "No") + "").toLowerCase();
    if (stat === "RangeArea" && /x/.test(str1) && /x/.test(str2)) {
        return true;
    }
    if (str1.length < 3 || str2.length < 3) {return false;}

    // Loop through substrings of str1 of length 3 or more
    for (let len = 3; len <= Math.min(str1.length, str2.length); len++) {
        for (let i = 0; i <= str1.length - len; i++) {
            const substring = str1.substring(i, i + len);
            //the substring must not contain spaces
            if (str2.includes(substring) && !/ /.test(substring)) {
                return true;
            }
        }
    }

    return false;
}


function AddGuess(plantName, manual = false) {
    GuessedPlants.add(plantName);
    localStorage.setItem((GameMode === "Daily" ? "" : "StreakHunt_") + "GuessedPlants",Array.from(GuessedPlants).join(','));
    if (manual) {
        let ItemName = (GameMode === "Daily" ? "" : "StreakHunt_") + "TotalGuesses";
        localStorage.setItem(ItemName,(Number(localStorage[ItemName])+1)+"");
    }
    if (GameMode === "Streak") {
        let NoOfGuesses = localStorage.StreakHunt_GuessedPlants?.length > 0 ? localStorage.StreakHunt_GuessedPlants.split(",").length : 0;
        let Delta = ((8-Math.min(7,Math.floor(localStorage.StreakHunt_CurrentStreak/20))) - NoOfGuesses);
        $("TopText").innerHTML = "GUESS ROUND " + localStorage["StreakHunt_CurrentStreak"] + "'S PLANT! " + (Delta === 1 ? "LAST GUESS!" : (Delta + " GUESSES LEFT!"));
    } else {
        let NoOfGuesses = localStorage.GuessedPlants?.length > 0 ? localStorage.GuessedPlants.split(",").length : 0;
        let Delta = (8 - NoOfGuesses);
        $("TopText").innerHTML = "GUESS TODAY'S PLANT! " + (Delta === 1 ? "LAST GUESS!" : (Delta + " GUESSES LEFT!"));
    }
    AnswerBox.value = "";
    GuessingList.innerHTML = "";
    GuessingListDOM.style.opacity = 0;
    GuessingListDOM.style.pointerEvents = "none";
    SetNone(searchShade);
    /*PLANT NAME*/
    let plantObj = AllPlantNames[plantName];
    let correct = (plantName === TodaysPlant.EngName);
    let partiallyCorrect = findCommonConsecutiveLetters(plantName, TodaysPlant.EngName);
    /*----CARD DOM START*/
    let temCard = NewEle(`${plantName}_Name_Card`, 'div', `top:100px;opacity:0;overflow:hidden;`, {
        className: "flip-card flip-card-inner card_Normal" + (IsMobile ? "_Mobile" : ""),
    }, GuessedList);
    let f=NewEle(`${plantName}_Name_f`, 'div', `background-image:url(images/Card_Hidden.png);${IsMobile?"background-size: 70px 80px;":""}`, {
        className: "flip-card-front",
    }, temCard);
    let b=NewEle(`${plantName}_Name_b`, 'div', `background-image:url(images/Card_${correct ? "Green" : (partiallyCorrect ? "Yellow" : "Red")}.png);background-color:#${correct ? "6DDA9D" : (partiallyCorrect ? "DEC37F" : "FA697D")};${IsMobile?"background-size: 70px 80px;":""}`, {
        innerHTML: `<img src="images/Name/${plantName.replaceAll(" ", "_")}.webp" alt"" style="position:relative;top:0px;width:30px;height:30px;vertical-align:middle;"> ` + plantName,
        className: "flip-card-back",
    }, temCard);
    oEffects.Animate(temCard,{
        "top": "0px",
        "opacity": "1",
    },0.4,"ease-out",()=>{
        oEffects.Animate(f,{
            "transform": "rotateX(180deg)",
        },0.4,"ease-out", () => {}, 0.4);
        oEffects.Animate(b,{
            "transform": "rotateX(0deg)",
        },0.4,"ease-out", () => {}, 0.4);
    });
    /*----CARD DOM END*/
    GuessResults[plantName] = [];
    GuessResults[plantName][0] = correct ? 1 : (partiallyCorrect ? 2 : 0);
    let correctCount = 0;
    let statCount = 0;
    /*OTHER PLANT STATS*/
    for (let stat of StatList) {
        let correct = (plantObj[stat] === TodaysPlant[stat]);
        let partiallyCorrect = false;
        if (correct) {
            correctCount++;
        } else {
            if (/RangeArea|Usage|Special/.test(stat)) {
                partiallyCorrect = findCommonConsecutiveLetters(plantObj[stat], TodaysPlant[stat], stat);
            } else {
                // Note: It checks if the difference is SMALLER than diff, not smaller or equal to diff
                const statLists = {
                    SunNum: { diff: 50, list: null },
                    Attack: { diff: 2, list: DamageList },
                    Recharge: { diff: 2, list: RechargeList },
                    World: { diff: 3, list: WorldList },
                    Family: { diff: 3, list: FamilyList }
                };

                for (const key in statLists) {
                    if (new RegExp(key).test(stat)) {
                        const { diff, list } = statLists[key];
                        const totalItems = list ? Object.keys(list).length : null;
                        const val1 = list ? list[plantObj[stat]] : Number(plantObj[stat]);
                        const val2 = list ? list[TodaysPlant[stat]] : Number(TodaysPlant[stat]);
                        let DiffToCompare = Math.abs(val1 - val2);
                        if (totalItems && DiffToCompare > totalItems/2) {
                            DiffToCompare = totalItems - DiffToCompare;
                        }
                        if (val1 != null && val2 != null) {
                            partiallyCorrect = DiffToCompare < diff;
                        }
                        break;
                    }
                }
            }
        }
        GuessResults[plantName][++statCount] = correct ? 1 : (partiallyCorrect ? 2 : 0);
        if (correct || partiallyCorrect) GuessedStats[stat][plantObj[stat] ?? "No"] = correct ? 1 : 2;
        /*----CARD DOM START*/
        let temCard = NewEle(`${plantName}_${stat}_Card`, 'div', `top:100px;opacity:0;overflow:hidden;`, {
            className: "flip-card flip-card-inner card_Normal" + (IsMobile ? "_Mobile" : ""),
        }, GuessedList);
        let f=NewEle(`${plantName}_${stat}_f`, 'div', `background-image:url(images/Card_Hidden.png);${IsMobile?"background-size: 70px 80px;":""}`, {
            className: "flip-card-front",
        }, temCard);
        let b=NewEle(`${plantName}_${stat}_b`, 'div', `background-image:url(images/Card_${correct ? "Green" : (partiallyCorrect ? "Yellow" : "Red")}.png);background-color:#${correct ? "6DDA9D" : (partiallyCorrect ? "DEC37F" : "FA697D")};${IsMobile?"background-size: 70px 80px;":""}`, {
            innerHTML: ((/World|Family|Recharge|Attack/.test(stat) && plantObj[stat] && !/\?\?\?|Variable/.test(plantObj[stat])) ? `<img src="images/${stat}/${plantObj[stat]}.png" alt"" style="position:relative;top:0px;width:30px;height:30px;vertical-align:middle;"> ` : ``) + (plantObj[stat] ?? "No"),
            className: "flip-card-back",
        }, temCard);
        setTimeout(() => {
            oEffects.Animate(temCard, {
                "top": "0px",
                "opacity": "1",
            }, 0.4, "ease-out", () => {
                oEffects.Animate(f, {
                    "transform": "rotateX(180deg)",
                }, 0.4, "ease-out",() => {}, 0.3);
                oEffects.Animate(b, {
                    "transform": "rotateX(0deg)",
                }, 0.4, "ease-out",() => {}, 0.3);
            });
        }, statCount*50);
        /*----CARD DOM END*/
    }
    localStorage.setItem((GameMode === "Daily" ? "" : "StreakHunt_") + "GuessResults",JSON.stringify(GuessResults));
    /*FINAL JUDGMENT*/
    if (correctCount >= 8) {
        SetNone(AnswerBox);
        SetBlock($("judgmentText"));
        if (GuessedPlants.size <= 1) {
            $("judgmentText").innerHTML = "What the fuck.";
        } else {
            $("judgmentText").innerHTML = "Congrats! You won in " + GuessedPlants.size + " tries!";
        }
        if (manual) {
            let ItemName = (GameMode === "Daily" ? "" : "StreakHunt_") + "TotalWins";
            localStorage.setItem(ItemName,(Number(localStorage[ItemName])+1)+"");
        }
        if (GameMode === "Daily") {
            localStorage.setItem("FinalResult","Won");
            sessionStorage.removeItem("CheckedShare");
            setTimeout(() => {
                SetBlock($("ShareButton"));
            },10);
        } else {
            let ContinueButton = NewEle(`ContinueButton`, 'div', `background: url(images/Purple_Button.png) no-repeat center center; color:white; text-shadow:${txtshadow};background-size: 150px auto;position:relative;top:8%;width:150px;height:50px;font-size:25px;text-align:center;padding-top:20px;margin:auto;`, {
                className: "Button",
                innerText: "CONTINUE",
                onclick: () => {
                    localStorage.removeItem("StreakHunt_GuessedPlants");
                    localStorage.removeItem("StreakHunt_GuessResults");
                    localStorage.removeItem("StreakHunt_attemptSeed");
                    localStorage["StreakHunt_CurrentStreak"] = (Number(localStorage["StreakHunt_CurrentStreak"])+1) + "";
                    SwitchToStreakHunt();
                    ClearChild(ContinueButton);
                }
            }, EDAll);
        }

    } else if (GuessedPlants.size >= (GameMode === "Streak" ? 8-Math.min(7,Math.floor(localStorage.StreakHunt_CurrentStreak/20)) : 8)) {
        SetNone(AnswerBox);
        SetBlock($("judgmentText"));
        $("judgmentText").innerHTML = "No more guesses... " + (GameMode === "Daily" ? "Today" : "This round") + "'s plant is: " + TodaysPlant.EngName + ` <img src="images/Name/${TodaysPlant.EngName.replaceAll(" ", "_")}.webp" alt"" style="position:relative;top:0px;width:30px;height:30px;vertical-align:middle;"> `;
        sessionStorage.removeItem("CheckedShare");
        setTimeout(() => {
            SetBlock($("ShareButton"));
        },10);
        if (GameMode === "Streak") {
            if (manual) {
                let ItemName = "StreakHunt_HighestStreak";
                localStorage.setItem(ItemName,Math.max(Number(localStorage[ItemName]),Number(localStorage["StreakHunt_CurrentStreak"]))+"");
            }
            let ContinueButton = NewEle(`ContinueButton`, 'div', `background: url(images/Purple_Button.png) no-repeat center center; color:white; text-shadow:${txtshadow};background-size: 150px auto;position:relative;top:8%;width:150px;height:50px;font-size:25px;text-align:center;padding-top:20px;margin:auto;`, {
                className: "Button",
                innerText: "RETRY",
                onclick: () => {
                    localStorage.removeItem("StreakHunt_GuessedPlants");
                    localStorage.removeItem("StreakHunt_GuessResults");
                    localStorage.removeItem("StreakHunt_attemptSeed");
                    localStorage["StreakHunt_CurrentStreak"] = "1";
                    SwitchToStreakHunt();
                    ClearChild(ContinueButton);
                }
            }, EDAll);
            localStorage.setItem("FinalResult","Streak");
        } else {
            localStorage.setItem("FinalResult","Lost");
        }
    }
}

function SwitchToDailyChallenge() {
    Transition(1, () => {
        GameMode = "Daily";
        localStorage.CurrentGameMode = GameMode;
        GuessedPlants.clear();
        GuessResults = {};
        GuessedStats = {};
        for (let stat of StatList) {
            GuessedStats[stat] = {};
        }
        SetBlock(AnswerBox);
        SetNone($("judgmentText"));
        SetNone($("ShareButton"));
        ClearChild($(`ContinueButton`));
        let NoOfGuesses = localStorage.GuessedPlants?.length > 0 ? localStorage.GuessedPlants.split(",").length : 0;
        let Delta = (8 - NoOfGuesses);
        $("TopText").innerHTML = "GUESS TODAY'S PLANT! " + (Delta === 1 ? "LAST GUESS!" : (Delta + " GUESSES LEFT!"));
        /*TODAY'S PLANT!!!*/
        Math.seedV2 = [DateValue, DateValue2];
        TodaysPlant = AllPlants[Math.floor(Math.seededRandomV2(AllPlantsLen - 1, 0))];
        /*TODAY'S PLANT!!!*/

        GuessedList.innerHTML = StatText;
    }, () => {
        /*AUTOMATICALLY SUBMIT GUESSES FROM LOCALSTORAGE*/
        if (localStorage.GuessedPlants) {
            for (let plantName of localStorage.GuessedPlants.split(",")) {
                AddGuess(plantName);
            }
        }
    }, "DAILY CHALLENGE");
}


/*STREAK HUNT*/
function SwitchToStreakHunt() {
    Transition(1, () => {
        GameMode = "Streak";
        localStorage.CurrentGameMode = GameMode;
        GuessedPlants.clear();
        GuessResults = {};
        GuessedStats = {};
        for (let stat of StatList) {
            GuessedStats[stat] = {};
        }
        SetBlock(AnswerBox);
        SetNone($("judgmentText"));
        SetNone($("ShareButton"));
        ClearChild($(`ContinueButton`));
        if (!localStorage.StreakHunt_CurrentStreak) localStorage.StreakHunt_CurrentStreak = "1";
        let NoOfGuesses = localStorage.StreakHunt_GuessedPlants?.length > 0 ? localStorage.StreakHunt_GuessedPlants.split(",").length : 0;
        let Delta = ((8 - Math.min(7, Math.floor(localStorage.StreakHunt_CurrentStreak / 20))) - NoOfGuesses);
        $("TopText").innerHTML = "GUESS ROUND " + localStorage["StreakHunt_CurrentStreak"] + "'S PLANT! " + (Delta === 1 ? "LAST GUESS!" : (Delta + " GUESSES LEFT!"));
        if (!localStorage.StreakHunt_attemptSeed) {
            let number = '';
            number += Math.floor(Math.random() * 9 + 1);
            for (let i = 1; i < 25; i++) {
                number += Math.floor(Math.random() * 10);
            }
            localStorage.setItem("StreakHunt_attemptSeed", number);
        }
        /*THIS ROUND'S PLANT!!!*/
        Math.seedV2 = [localStorage.StreakHunt_attemptSeed, localStorage.userSeed];
        TodaysPlant = AllPlants[Math.floor(Math.seededRandomV2(AllPlantsLen - 1, 0))];
        /*THIS ROUND'S PLANT!!!*/

        GuessedList.innerHTML = StatText;
    }, () => {
        /*AUTOMATICALLY SUBMIT GUESSES FROM LOCALSTORAGE*/
        if (localStorage.StreakHunt_GuessedPlants) {
            for (let plantName of localStorage.StreakHunt_GuessedPlants.split(",")) {
                AddGuess(plantName);
            }
        }
    }, `STREAK HUNT<br/>ROUND ${localStorage["StreakHunt_CurrentStreak"]}`);
}

if (localStorage.CurrentGameMode === "Daily") {
    SwitchToDailyChallenge();
} else {
    SwitchToStreakHunt();
}

let DailyChallengeButton = NewEle(`DailyChallengeButton`, 'div', `background: url(images/Blue_Button.png) no-repeat center center; color:white; text-shadow:${txtshadow};background-size: 8em auto;position:absolute;left:0;top:0;width:8em;height:auto;font-size:${IsMobile ? "3vw" : "25px"};text-align:center;padding-top:1em;z-index:400;display:${GameMode === "Streak" ? "block" : "none"}`, {
    className: "Button",
    innerText: "ENTER DAILY CHALLENGE MODE",
    onclick: () => {
        SetNone(DailyChallengeButton);
        SetBlock(StreakHuntButton);
        SwitchToDailyChallenge();
    }
}, EDAll);
let StreakHuntButton = NewEle(`StreakHuntButton`, 'div', `background: url(images/Gold_Button.png) no-repeat center center; color:white; text-shadow:${txtshadow};background-size: 8em auto;position:absolute;left:0;top:0;width:8em;height:auto;font-size:${IsMobile ? "3vw" : "25px"};text-align:center;padding-top:1em;z-index:400;display:${GameMode === "Daily" ? "block" : "none"}`, {
    className: "Button",
    innerText: "ENTER STREAK HUNT MODE",
    onclick: () => {
        SetBlock(DailyChallengeButton);
        SetNone(StreakHuntButton);
        SwitchToStreakHunt();
    }
}, EDAll);