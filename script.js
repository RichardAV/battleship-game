// Variables globales 
const cellsNumber = 10;  // Default = 80 u 81 (se debe definir)
const armyUser = 4;
const armyIA = armyUser;

const locationsUser = [];
const locationsIA = [];
let guess = 0; // Conteo numerico de intentos (todos)
const hits = []; // Golpes USER (solo aciertos)
const hitsIA = []; // Golpes de IA (solo aciertos)
const guesses = []; // Registro total de intentos User
const guessesIA = []; // Registro total de intentos IA
const validationShotsIA = []; // Registros numeros random IA para ataque
const validationLocationIA = []; // Registros numeros random para locationIA

let onSetupActive = true;
let onBattleActive = false;
let isSunk = false;
let userArmySelected = 0;
const stage = document.getElementById('stage');
const IApanel = document.getElementById('IApanel');
const blockIATable = document.getElementById('main-table-IA');

// Funcion para calcular el ratio de aciertos en score screen
let ratioValue = (h,g) => {
    let hitstimeguesses = ((h/g)*100); 
    return hitstimeguesses;
};
/********************** Creacion de armada ***************************/
class Army {
    constructor(player,level){
        this.player = player;
        this.level = level;
    }
}


/********************** Configuraciones iniciales ***************************/
// Mostrar hits
const showHits = document.getElementById('hits');
showHits.textContent = `Hits ${hits.length}`;

// Mostrar Guess en Panel
const showGuess = document.getElementById('guess');
showGuess.textContent = `Guess ${guess}`;

/**********************  Locations para IA  ***************************/

for (i = 0; locationsIA.length < armyIA; i++) {
    let randomNBR = parseInt((Math.random()*cellsNumber) +1); // Default = 80
    // let randomNBR = Math.floor(Math.random()*80);
    // console.log(`Random number: ${randomNBR}`);
    if(!validationLocationIA.includes(randomNBR)){
        validationLocationIA.push(randomNBR);
        const asig = "c" + randomNBR + '-IA';
        locationsIA.push(asig);
    }
}
console.log("LocationIA: " + locationsIA);

/**********************  Locations para User  ***************************/
// STAGE
stage.innerHTML = 'Locations para User';

// Insert userArmyRemain in HTML (Before first click)
let printArmyRemain = document.getElementById('army-user-remain');
printArmyRemain.textContent = userArmySelected;

//Clickear tablero User para posicionar barcos
const getTable = document.getElementById('main-table');
getTable.addEventListener("click", (e) => {

    // Obtener ID de celdas en tablero USER
    if (e.target !== e.currentTarget) {
    var cellId = e.target.id;
    }

    // Proceso de posicionamiento de barcos USER
    selectCell();
    function selectCell(){
        if (onSetupActive) {

            // console.log(onSetupActive);
            // console.log(`Locations tiene ${locationsUser.length + 1} items`);
            // console.log(`Start: ${onSetupActive}`);
            
            locationsUser.push(cellId); //asigna celda a locationUser
    
            // Marcar celda
            let printCell = document.getElementById(cellId);
            printCell.classList.add('ship');         
            
            console.log(locationsUser);
            // console.log(`End: ` + onSetupActive);

            // Aumentar contador de barcos
            userArmySelected++;

            // Insert userArmyRemain in HTML
            document.getElementById('army-user-remain').textContent = userArmySelected;
            // console.log(userArmyRemain);

            if (userArmySelected == armyUser) {
                console.log('LocationUser: ' + locationsUser + ' Total: ' + locationsUser.length); 
                onSetupActive = false;
                onBattleActive = true;
                if (onBattleActive) {
                    onBattle();
                }
            }
        }
    }
})

/**********************  Batalla  ***************************/
// Ataque USER a IA
function onBattle() {

    /*** Setup inicial ***/

    // Mostrar stage actual
    stage.innerHTML = 'Batalla';
        
    //Desbloquear main-table-IA
    blockIATable.classList.remove('hide-block')

    /*** Desarrollo principal del juego ***/

    // Al hacer click en tablero IA
    const getTableIA = document.getElementById('main-table-IA');
    getTableIA.addEventListener("click", (e) => {
        
        console.log('*****DISPARO USER*****');
        
        // Obtener ID de celdas en tablero USER
        if (e.target !== e.currentTarget) {
            var cellIdIA = e.target.id;
        }
        console.log(cellIdIA);
        
        // Aumentar guess
        guess++;
        console.log(`Guess n: ${guess}`);
        showGuess.textContent = `Guess ${guess}`;
        
        // Asigna celda a guesses
        guesses.push(cellIdIA); 
        console.log(guesses);
        
        // Marcar celdas
        let printCellIA = document.getElementById(cellIdIA);
        printCellIA.classList.add('attack');

        // Marcado de ataques a IA
        attackIA();
        function attackIA(){

            // Registrar Hits de User, Informar WIn o Fallo
            if (locationsIA.includes(cellIdIA)) {
                
                // Aumentar hits (enviarnlos al array hits)
                hits.push(cellIdIA);
                console.log(`Hits: ${hits.length}`);
                console.log(hits);
                // Mostrar hits en panel
                showHits.textContent = `Hits ${hits.length}`;

                // Marcar la celda golpeada con otro color
                printCellIA.classList.add('ship-hit');

                // Informar Win
                if (locationsIA.length == hits.length) {
                    score('won');
                } else {
                    // Informe de disparo exitoso
                    alert('Disparo exitoso! Pium!');
                    attackUser();   
                }
            } else {
                // Informe de disparo Fallado
                alert('FALLO');
                attackUser();              
            }
        }
    }) 
}

// Ataque de IA a USER
function attackUser(){
    console.log('*****DISPARO IA*****');

    // Validando el numero random para ataque de IA a USER
    const elegirRandomIA = () => {
        // Generar numero random para ataque de IA a USER
	    for(i=-1;;i++) {
            let randomNBRia = parseInt((Math.random()*cellsNumber) + 1);
            console.log(randomNBRia);
            console.log(validationShotsIA);
            // si el numero no esta incluido retornar "randomNBRia"
            if(!validationShotsIA.includes(randomNBRia)){
                console.log('NO REPETIDO');
                validationShotsIA.push(randomNBRia);
                return randomNBRia;
            } 		
	    }
    };

    // console.log(`elegirRandomIA: ${elegirRandomIA()}`);    

    // Armar ID from random number
    const asigIA = "c" + parseInt(elegirRandomIA());
    // Registro guesses IA
    guessesIA.push(asigIA);
    
    // console.log(`shotIA number: ${elegirRandomIA()}`);
    console.log(`shotIA ID: ${asigIA}`);
    console.log(`GuessesIA: ${guessesIA}`);

    // Si la IA acierta
    if (locationsUser.includes(asigIA)) {
        // Registrar hit en hitsIA
        hitsIA.push(asigIA);
        console.log(`HitsIA: ${hitsIA.length}`);
        console.log("hitsIA array:");
        console.log(hitsIA);

        // Marcar celda acertada por IA
        let printCellIA = document.getElementById(asigIA);
        printCellIA.classList.add('ship-hit');  

        // Descontar barco de contador
        printArmyRemain.textContent = --userArmySelected;

        // Alertar hit a User
        infoAttackIA('hit');
        alert('Te dieron!');

        // Informar Lose 
        if (locationsUser.length == hitsIA.length) {
            score('Loose');
        }
    } else { // Si la IA falla
        // Informar Miss
        infoAttackIA('miss');
        console.info('La IA falló');

        // Marcar celda fallada por IA
        let printCellIA = document.getElementById(asigIA);
        printCellIA.classList.add('attack'); 
    }
};

// Informar en panel el resultado del ataque de IA
function infoAttackIA(outcome) {
    IApanel.innerHTML = '<p></p>';
    if (outcome == 'miss') {
        IApanel.innerHTML = '<p class="verde">La IA falló</p>';
    } else if (outcome == 'hit') {
        IApanel.innerHTML = '<p>Te dieron</p>';
    }
}

/**********************  SCORE  ***************************/
function score(outcome){
    const showScore = document.getElementById('scorePanel');
    showScore.style.display = 'block';
    const youWonLooseText = document.getElementById('youWonLoose');
    youWonLooseText.textContent = `${outcome}`;
    const enemySunkShips = document.getElementById('enemySunkShips');
    enemySunkShips.textContent = `${hits.length}`;
    const mySunkShips = document.getElementById('mySunkShips');
    mySunkShips.textContent = `${hitsIA.length}`;
    const ratio = document.getElementById('ratio');
    ratio.textContent = `${ratioValue(hits.length,guesses.length).toFixed(2)}%`;
    // ratio.textContent = parseInt(ratioValue);
    const reset = document.getElementById('reset');
    reset.addEventListener('click', function(){
        location.reload(true);
    })
}















/** NUEVO CODIGO **/

// const arr1 = [];

// document.getElementById('buttonRandom').addEventListener("click", function(){

//     arr1.push(getClearNumber());
//     document.getElementById('panel').innerHTML = arr1;
//     console.log(arr1);
// })

// const getClearNumber = () => {
// 	// Generar numero random
// 	for(i=0;i<100;i++) {
// 		let numRan = parseInt(Math.random()*10);
// 		console.log(numRan);
// 		// si el numero no esta incluido retornar "numRan"
// 		if(arr1.includes(numRan)==false){
// 			// console.log('NO REPETIDO');
// 			return numRan;
// 		} 		
// 	}	
// }


/* respaldo */


// Disparo de IA
    // IAchoose();
    // function IAchoose() {
        
    //     elegirRandomIA();
                
    //     // Si el ranbomnbr esta en validation se debe hacer de nuevo
    //     if (validationShotsIA.includes(elegirRandomIA())) {
    //         elegirRandomIA();
    //         console.log('Se repitio');
    //     } else {
    //         validationShotsIA.push(elegirRandomIA());
    //         const shotIA = elegirRandomIA();
    //         console.log('NO Se repitio');
    //         return shotIA;
    //     }
    // }; 
    // console.log(`IAchoose: ${IAchoose()}`); 