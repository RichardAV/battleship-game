let locationsUser = [];
let locationsIA = [];
let army = 7;
let guess;
let hits = 0;
let guesses = 0;

let onSetupActive = true;
let onBattleActive = false;
let isSunk = false;

const getTable = document.getElementById('main-table');
getTable.addEventListener("click", (e) => {

    if (e.target !== e.currentTarget) {
    var cellId = e.target.id;
    }

    selectCell();
    function selectCell(){
        if (onSetupActive == true) {
    
            console.log(onSetupActive);
            console.log(`Locations tiene ${locationsUser.length + 1} items`);
            console.log(`Start: ${onSetupActive}`);
            
            locationsUser.push(cellId); //asigna celda a locationUser
    
            // Marcar celda
            let printCell = document.getElementById(cellId);
            printCell.classList.add('ship');         
            
            console.log(locationsUser);
            console.log(`End: ` + onSetupActive);

            if (locationsUser.length == army) {
                onSetupActive = false;
                onBattleActive = true;
            }    
        }
    }
})


