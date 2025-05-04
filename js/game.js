"use strict";
const EDAll = $("dAll");
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
if (DateValue+"" !== localStorage.DateLastPlayed) {
    localStorage.removeItem("DateLastPlayed");
    localStorage.removeItem("GuessedPlants");
    localStorage.removeItem("GuessResults");
    localStorage.setItem("DateLastPlayed", DateValue+"");
    console.log("reset");
}
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
const DamageList = {"Light": 0, "Normal": 1, "Moderate": 2, "Heavy": 3, "Massive": 4};
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

showTxtCenter("TopText", 35,"GUESS TODAY'S PLANT!");
showTxtCenter("judgmentText", 30,"placeholder", 2);
$("TopText").style.width = "300px";
SetNone($("judgmentText"));
let TodaysPlant;

const StatList = ["SunNum", "World", "Attack", "Recharge", "RangeArea", "Usage", "Special", "Family"];
let StatText = `
    <div>NAME</div>
    <div>SUN COST</div>
    <div>WORLD</div>
    <div>DAMAGE</div>
    <div>RECHARGE</div>
    <div>RANGE/AREA</div>
    <div>USAGE</div>
    <div>SPECIAL</div>
    <div>FAMILY</div>
`;

/*THE ANSWER BOX AND THE GUESSING LIST THAT SHOWS UP WHEN YOU PUT IN A PLANT'S NAME*/
let GuessedPlants = new Set();
let GuessResults = {};
let GuessingListDOM = NewEle(`GuessingListDOM`, 'div', 'width:100%;height:100%;position:absolute;left:0;top:0;opacity:0;pointer-events:none;', {
}, EDAll);
let GuessingList = NewEle(`dFlexWrap_PvZ2DleGuessBox`, 'div', 'z-index:900;', {
    className: IsMobile ? 'dFlexWrap_PvZ2DleGuessBox_Mobile' : 'dFlexWrap_PvZ2DleGuessBox',
}, GuessingListDOM);
let AnswerBox = NewEle("AnswerBox","input","position:absolute;top:100px;left:25%;z-index:1000;width: 50%;height: 30px;font-size: 20px;text-rendering: optimizeSpeed;user-select:all;margin:0px;",{
    placeholder:"Type in a plant's name",
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
AnswerBox.oninput = () => {
    if (AnswerBox.value.length > 0) {
        let Ans = AnswerBox.value.toLowerCase();
        let plantList = [], worldList = [], familyList = [];
        for (let plant of AllPlants) {
            let plantName = plant.EngName;
            let plantWorld = plant.World.toLowerCase();
            let plantFamily = plant.Family.toLowerCase();
            let LowerPlantName = plantName.toLowerCase();
            if (!GuessedPlants.has(plantName)) {
                if (LowerPlantName.startsWith(Ans)) {
                    plantList.push(plantName);
                }
                if (plantWorld.startsWith(Ans)) {
                    worldList.push(plantName);
                }
                if (plantFamily.startsWith(Ans)) {
                    familyList.push(plantName);
                }
            }
        }
        if (plantList.length > 0) {
            GuessingListDOM.style.opacity = 1;
            GuessingListDOM.style.pointerEvents = "auto";
            GuessingList.innerHTML = StatText;
            SetBlock(searchShade);
            for (let plName of plantList) {
                let plantObj = AllPlantNames[plName];
                NewEle(`${plantObj.CodeName}_Name`, 'div', 'cursor:pointer;height:60px;', {
                    innerText: plName,
                    onclick: () => {AddGuess(plantObj.EngName)}
                }, GuessingList);
                for (let stat of StatList) {
                    NewEle(`${plantObj.CodeName}_${stat}`, 'div', 'cursor:pointer;height:60px;', {
                        innerText: plantObj[stat] ?? "No",
                        onclick: () => {AddGuess(plantObj.EngName)}
                    }, GuessingList);
                }
            }
        } else if (worldList.length > 0) {
            GuessingListDOM.style.opacity = 1;
            GuessingListDOM.style.pointerEvents = "auto";
            GuessingList.innerHTML = StatText;
            SetBlock(searchShade);
            for (let plName of worldList) {
                let plantObj = AllPlantNames[plName];
                NewEle(`${plantObj.CodeName}_Name`, 'div', 'cursor:pointer;height:60px;', {
                    innerText: plName,
                    onclick: () => {AddGuess(plantObj.EngName)}
                }, GuessingList);
                for (let stat of StatList) {
                    NewEle(`${plantObj.CodeName}_${stat}`, 'div', 'cursor:pointer;height:60px;', {
                        innerText: plantObj[stat] ?? "No",
                        onclick: () => {AddGuess(plantObj.EngName)}
                    }, GuessingList);
                }
            }
        } else if (familyList.length > 0) {
            GuessingListDOM.style.opacity = 1;
            GuessingListDOM.style.pointerEvents = "auto";
            GuessingList.innerHTML = StatText;
            SetBlock(searchShade);
            for (let plName of familyList) {
                let plantObj = AllPlantNames[plName];
                NewEle(`${plantObj.CodeName}_Name`, 'div', 'cursor:pointer;height:60px;', {
                    innerText: plName,
                    onclick: () => {AddGuess(plantObj.EngName)}
                }, GuessingList);
                for (let stat of StatList) {
                    NewEle(`${plantObj.CodeName}_${stat}`, 'div', 'cursor:pointer;height:60px;', {
                        innerText: plantObj[stat] ?? "No",
                        onclick: () => {AddGuess(plantObj.EngName)}
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
function findCommonConsecutiveLetters(str1, str2) {
    // Normalize strings to lowercase to make comparison case-insensitive
    str1 = (str1 + "").toLowerCase();
    str2 = (str2 + "").toLowerCase();

    // Loop through substrings of str1 of length 3 or more
    for (let len = 3; len <= Math.min(str1.length, str2.length); len++) {
        for (let i = 0; i <= str1.length - len; i++) {
            const substring = str1.substring(i, i + len);
            if (str2.includes(substring)) {
                return true;
            }
        }
    }

    return false;
}


function AddGuess(plantName) {
    GuessedPlants.add(plantName);
    localStorage.setItem((GameMode === "Daily" ? "" : "StreakHunt_") + "GuessedPlants",Array.from(GuessedPlants).join(','));
    AnswerBox.value = "";
    GuessingList.innerHTML = "";
    GuessingListDOM.style.opacity = 0;
    GuessingListDOM.style.pointerEvents = "none";
    /*PLANT NAME*/
    let plantObj = AllPlantNames[plantName];
    let correct = (plantName === TodaysPlant.EngName);
    let partiallyCorrect = findCommonConsecutiveLetters(plantName, TodaysPlant.EngName);
    let tem = NewEle(`${plantName}_Name`, 'div', `background-color:${correct ? "green" : (partiallyCorrect ? "yellow" : "red")}; height:60px;`, {
        innerText: plantName
    }, GuessedList);
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
                partiallyCorrect = findCommonConsecutiveLetters(plantObj[stat], TodaysPlant[stat]);
            } else {
                // Note: It checks if the difference is SMALLER than diff, not smaller or equal to diff
                const statLists = {
                    SunNum: { diff: 50, list: null },
                    Damage: { diff: 2, list: DamageList },
                    Recharge: { diff: 2, list: RechargeList },
                    World: { diff: 3, list: WorldList },
                    Family: { diff: 3, list: FamilyList }
                };

                for (const key in statLists) {
                    if (new RegExp(key).test(stat)) {
                        const { diff, list } = statLists[key];
                        const val1 = list ? list[plantObj[stat]] : Number(plantObj[stat]);
                        const val2 = list ? list[TodaysPlant[stat]] : Number(TodaysPlant[stat]);
                        if (val1 != null && val2 != null) {
                            partiallyCorrect = Math.abs(val1 - val2) < diff;
                        }
                        break;
                    }
                }
            }
        }
        let tem = NewEle(`${plantName}_${stat}`, 'div', `background-color:${correct ? "green" : (partiallyCorrect ? "yellow" : "red")}; height:60px;`, {
            innerText: plantObj[stat] ?? "No"
        }, GuessedList);
        GuessResults[plantName][++statCount] = correct ? 1 : (partiallyCorrect ? 2 : 0);
    }
    localStorage.setItem((GameMode === "Daily" ? "" : "StreakHunt_") + "GuessResults",JSON.stringify(GuessResults));
    /*FINAL JUDGMENT*/
    if (correctCount >= 7) {
        SetNone(AnswerBox);
        SetBlock($("judgmentText"));
        if (GuessedPlants.size <= 1) {
            $("judgmentText").innerHTML = "What the fuck.";
        } else {
            $("judgmentText").innerHTML = "Congrats! You won in " + GuessedPlants.size + " tries!";
        }
        if (GameMode === "Daily") {
            localStorage.setItem("FinalResult","Won");
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

    } else if (GuessedPlants.size >= 8) {
        SetNone(AnswerBox);
        SetBlock($("judgmentText"));
        $("judgmentText").innerHTML = "No more guesses... " + (GameMode === "Daily" ? "Today" : "This round") + "'s plant is: " + TodaysPlant.EngName;
        setTimeout(() => {
            SetBlock($("ShareButton"));
        },10);
        if (GameMode === "Streak") {
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
    GameMode = "Daily";
    localStorage.CurrentGameMode = GameMode;
    GuessedPlants.clear();
    GuessResults = {};
    SetBlock(AnswerBox);
    SetNone($("judgmentText"));
    SetNone($("ShareButton"));
    ClearChild($(`ContinueButton`));
    $("TopText").innerHTML = "GUESS TODAY'S PLANT!";
    /*TODAY'S PLANT!!!*/
    Math.seedV2 = [DateValue,DateValue2];
    TodaysPlant = AllPlants[Math.floor(Math.seededRandomV2(AllPlantsLen-1,0))];
    /*TODAY'S PLANT!!!*/

    GuessedList.innerHTML = StatText;

    /*AUTOMATICALLY SUBMIT GUESSES FROM LOCALSTORAGE*/
    if (localStorage.GuessedPlants) {
        for (let plantName of localStorage.GuessedPlants.split(",")) {
            AddGuess(plantName);
        }
    }
}


/*STREAK HUNT*/
function SwitchToStreakHunt() {
    GameMode = "Streak";
    localStorage.CurrentGameMode = GameMode;
    GuessedPlants.clear();
    GuessResults = {};
    SetBlock(AnswerBox);
    SetNone($("judgmentText"));
    SetNone($("ShareButton"));
    ClearChild($(`ContinueButton`));
    $("TopText").innerHTML = "GUESS ROUND " + localStorage["StreakHunt_CurrentStreak"] + "'S PLANT!";
    if (!localStorage.StreakHunt_attemptSeed) {
        let number = '';
        number += Math.floor(Math.random() * 9 + 1);
        for (let i = 1; i < 25; i++) {
            number += Math.floor(Math.random() * 10);
        }
        localStorage.setItem("StreakHunt_attemptSeed", number);
    }
    /*THIS ROUND'S PLANT!!!*/
    Math.seedV2 = [localStorage.StreakHunt_attemptSeed,localStorage.userSeed];
    TodaysPlant = AllPlants[Math.floor(Math.seededRandomV2(AllPlantsLen-1,0))];
    /*THIS ROUND'S PLANT!!!*/

    GuessedList.innerHTML = StatText;

    /*AUTOMATICALLY SUBMIT GUESSES FROM LOCALSTORAGE*/
    if (localStorage.StreakHunt_GuessedPlants) {
        for (let plantName of localStorage.StreakHunt_GuessedPlants.split(",")) {
            AddGuess(plantName);
        }
    }
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