"use strict";
const EDAll = $("dAll");
const txtshadow = "rgb(0 0 0) 2px 0px 0px, rgb(0 0 0) 1.75517px 0.958851px 0px, rgb(0 0 0) 1.0806px 1.68294px 0px, rgb(0 0 0) 0.141474px 1.99499px 0px, rgb(0 0 0) -0.832294px 1.81859px 0px, rgb(0 0 0) -1.60229px 1.19694px 0px, rgb(0 0 0) -1.97998px 0.28224px 0px, rgb(0 0 0) -1.87291px -0.701566px 0px, rgb(0 0 0) -1.30729px -1.5136px 0px, rgb(0 0 0) -0.421592px -1.95506px 0px, rgb(0 0 0) 0.567324px -1.91785px 0px, rgb(0 0 0) 1.41734px -1.41108px 0px, rgb(0 0 0) 1.92034px -0.558831px 0px";
function showTxt(top, txt, left=35, size = 4){
    NewEle("","a","z-index: 258; position: absolute; font-size: " + size + "vw;left:" + left + "%;top:" + top + "px;height:30pt;line-height:30pt;color:white;text-shadow:" + txtshadow + ";text-align:center;",{
        innerText:txt,
    },EDAll);
}function showTxtCenter(top, txt, size = 4){
    NewEle("","a","z-index: 258; position:relative; font-size: " + size + "vw;display:block;margin:auto;padding-top:" + top + "px;height:30pt;line-height:30pt;color:white;text-shadow:" + txtshadow + ";text-align:center;",{
        innerText:txt,
    },EDAll);
}


/*--PLANT LIST START--*/
let AllPlantNames = [];
let json = {};
for (let i in AllPlants) {
    json[AllPlants[i].EngName] = AllPlants[i];
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

showTxtCenter(28,"GUESS TODAY'S PLANT!");
let TodaysPlant = AllPlants.random();
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
let GuessedPlants = new Set();
let GuessingList = NewEle(`dFlexWrap_PvZ2DleGuessBox`, 'div', 'opacity:0;', {
    className: 'dFlexWrap_PvZ2DleGuessBox',
}, EDAll);
let AnswerBox = NewEle("AnswerBox","input","position:absolute;top:100px;left:25%;z-index:1000;width: 50%;height: 30px;font-size: 20px;text-rendering: optimizeSpeed;user-select:all;margin:0px;",{
    placeholder:"Type in a plant's name",
},EDAll);
AnswerBox.oninput = () => {
    if (AnswerBox.value.length > 0) {
        let Ans = AnswerBox.value.toLowerCase();
        let plantList = [];
        for (let plantName in AllPlantNames) {
            let LowerPlantName = plantName.toLowerCase();
            if (LowerPlantName.startsWith(Ans) && !GuessedPlants.has(plantName)) {
                plantList.push(plantName);
            }
        }
        if (plantList.length > 0) {
            GuessingList.style.opacity = 1;
            GuessingList.style.pointerEvents = "auto";
            GuessingList.innerHTML = StatText;
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
        } else {
            GuessingList.innerHTML = "";
            GuessingList.style.opacity = 0;
            GuessingList.style.pointerEvents = "none";
        }
    } else {
        GuessingList.innerHTML = "";
        GuessingList.style.opacity = 0;
        GuessingList.style.pointerEvents = "none";
    }
}
let GuessedList = NewEle(`dFlexWrap_PvZ2DleItem`, 'div', '', {
    className: 'dFlexWrap_PvZ2DleItem',
}, EDAll);
GuessedList.innerHTML = StatText;
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
    AnswerBox.value = "";
    GuessingList.innerHTML = "";
    GuessingList.style.opacity = 0;
    GuessingList.style.pointerEvents = "none";
    let plantObj = AllPlantNames[plantName];
    let correct = (plantName === TodaysPlant.EngName);
    let partiallyCorrect = findCommonConsecutiveLetters(plantName, TodaysPlant.EngName);
    let tem = NewEle(`${plantName}_Name`, 'div', `background-color:${correct ? "green" : (partiallyCorrect ? "yellow" : "red")}; height:60px;`, {
        innerText: plantName
    }, GuessedList);
    let correctCount = 0;
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
    }
    if (correctCount >= 7) {
        ClearChild(AnswerBox);
        if (GuessedPlants.size <= 1) {
            showTxtCenter(30,"What the fuck.", 4);
        } else {
            showTxtCenter(30, "Congrats! You won in " + GuessedPlants.size + " tries!", 4);
        }
    } else if (GuessedPlants.size >= 8) {
        ClearChild(AnswerBox);
        showTxtCenter(48,"No more guesses... Today's plant is: " + TodaysPlant.EngName, 4);
    }
}

NewEle(`AlmanacButton`, 'div', `background: url(images/Almanac_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;left:0px;width:60px;height:60px;`, {
    className: "Button",
    onclick: () => {
        let rulesShade = NewEle("rulesShade","div","position:absolute;left:0;top:0;width:100%;height:100%;z-index:1008;background:rgba(0,0,0,0.8);",{},EDAll);
        let RulesBoard = NewEle("RulesBoard","center","position:absolute;left:10%;background-position-x:center;width:80%;height:100vh;overflow:auto;background-size:100% 100%;background-image:url(images/TutorialBoard.webp);background-repeat:no-repeat;",{
        },rulesShade);
        let TheRules = NewEle("PvZ2DleRules","center","position:absolute;left:10%;top:22%;background-position-x:center;width:80%;height:73vh;overflow:auto;",{
        },rulesShade);
        let tutorialTitle = NewEle("tutorialTitle","center",`color:white;position:absolute;font-size:5vw;width:100%;top:1.5%;`,{
            innerText: "Welcome to PvZ2Dle!"
        },rulesShade);
        tutorialTitle.style.textShadow=txtshadow;
        let tutorialTxt = NewEle("tutorialTxt","center",`color:white;position:relative;font-size:18px;width:75%;display:inline-block;`,{
            innerHTML: "You have 8 guesses. Every time you guess, you'll see these colors behind the plant's stats:",
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
        NewEle(`AlmanacButton`, 'div', `background: url(images/Return_Button.png) no-repeat center center; background-size: contain;position:absolute;bottom:10px;left:0px;width:60px;height:60px;`, {
            className: "Button",
            onclick: () => {
                ClearChild(rulesShade);
            }
        }, rulesShade);
    }
}, EDAll);