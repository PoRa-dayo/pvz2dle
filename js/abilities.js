"use strict";
let ActiveAbilities = {};
function IncorrectBuzzer(enable = true) {
    if (endTime-35000 - Date.now() <= 0) return;
    if (enable && GuessedPlants.size > 0) {
        if (!SpecialEffects["ThoroughSearch"]) {
            endTime-=35000;
            Transition(1.5, () => {},()=>{},`Active for 1 guess<br/>-35s`);
        }
        SpecialEffects["ThoroughSearch"] = true;
        ActiveAbilities["IncorrectBuzzer"] = true;
    } else {
        SpecialEffects["ThoroughSearch"] = false;
        delete ActiveAbilities["IncorrectBuzzer"];
    }
    TimeAttackStorage.TimeAttack_SpecialEffects = JSON.stringify(SpecialEffects);
}
function SkipPlant() {
    if (endTime-25000 - Date.now() <= 0) return;
    endTime-=25000;

    Transition(1.5, () => {
        SpecialEffects["PlantAltered"] = Number(SpecialEffects["PlantAltered"])+1;
        TimeAttackStorage.TimeAttack_SpecialEffects = JSON.stringify(SpecialEffects);
        GameMode = "Time";
        localStorage.CurrentGameMode = GameMode;
        GuessedPlants.clear();
        GuessResults = {};
        GuessedStats = {};
        for (let stat of StatList) {
            GuessedStats[stat] = {};
        }
        SetBlock(AnswerBox, RandomButton);

        /*THIS ROUND'S PLANT!!!*/
        {
            let number = '';
            number += Math.floor(Math.random() * 9 + 1);
            for (let i = 1; i < 25; i++) {
                number += Math.floor(Math.random() * 10);
            }
            sessionStorage.setItem("TimeAttack_attemptSeed", number);
        }
        if (!sessionStorage['TimeAttack_FreePlay']) {
            Math.seedV2 = [DateValue3-Number(localStorage["TimeAttack_CorrectGuesses"])-Number(SpecialEffects["PlantAltered"]), DateValue4-Number(localStorage["TimeAttack_CorrectGuesses"])-Number(SpecialEffects["PlantAltered"])];
        } else {
            Math.seedV2 = [sessionStorage.TimeAttack_attemptSeed-Number(SpecialEffects["PlantAltered"]), localStorage.userSeed-Number(SpecialEffects["PlantAltered"])];
        }
        TodaysPlant = AllPlants[Math.floor(Math.seededRandomV2(AllPlantsLen - 1, 0))];
        /*THIS ROUND'S PLANT!!!*/

        GuessedList.innerHTML = StatText;
        TimeAttackStorage.setItem("TimeAttack_GuessProgress",'[0,0,0,0,0,0,0,0,0]');
    },()=>{},`Skipped...<br/>-25s`);
}
function PennyHelp() {
    if (endTime-60000 - Date.now() <= 0) return;
    endTime-=60000;


    let DecisiveStats = ["World", "Family"].shuffle();
    let ImportantStats = ["SunNum", "Attack", "Recharge"].shuffle();
    let StatToFocusOn = null;
    for (let stat of DecisiveStats) {
        let Greenlit = false;
        for (let val in GuessedStats[stat]) {
            if (GuessedStats[stat][val] === 1) {
                Greenlit = true;
            }
        }
        if (!Greenlit) {
            StatToFocusOn = stat;
        }
    }
    if (!StatToFocusOn) {
        for (let stat of ImportantStats) {
            for (let val in GuessedStats[stat]) {
                let Greenlit = false;
                for (let val in GuessedStats[stat]) {
                    if (GuessedStats[stat][val] === 1) {
                        Greenlit = true;
                    }
                }
                if (!Greenlit) {
                    StatToFocusOn = stat;
                }
            }
        }
        if (!StatToFocusOn) {
            StatToFocusOn = ImportantStats.random();
        }
    }
    let Candidates = [];
    for (let plantName in AllPlantNames) {
        let plant = AllPlantNames[plantName];
        if (plantName !== TodaysPlant.EngName && !GuessedPlants.has(plantName) && plant[StatToFocusOn] === TodaysPlant[StatToFocusOn]) {
            Candidates.push(plantName);
        }
    }


    Transition(1.5, () => {},()=>{
        if (Candidates.length <= 0) {
            AddGuess(AllPlants[Math.floor(Math.random() * ((AllPlantsLen-1) + 1))].EngName, true);
        } else {
            AddGuess(Candidates.random(), true);
        }
    },`Penny is calculating...<br/>-60s`);
}
function UpdateAbility() {
    if (ActiveAbilities["IncorrectBuzzer"]) IncorrectBuzzer(false);
}
function ResetEffects() {
    SpecialEffects = {
        "ThoroughSearch": false,
        "PlantAltered": 0,
    }
    TimeAttackStorage.TimeAttack_SpecialEffects = JSON.stringify(SpecialEffects);
}
