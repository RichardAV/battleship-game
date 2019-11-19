
/*
if (onSetupActive == true) {
    begin();
}

function begin(){
    console.log("begin working");
    if (onSetupActive == true) {
        console.log(onSetupActive);

        const getTable = document.getElementById('main-table');
        getTable.addEventListener("click", getCell, false);

        function getCell(e) {
            console.log(`Locations tiene ${locationsUser.length + 1} items`);
            console.log(`Start: ${onSetupActive}`);
        
            if (e.target !== e.currentTarget) {
            var cellId = e.target.id;
            }

            locationsUser.push(cellId); //asigna celda a locationUser

            console.log(locationsUser);
            if (locationsUser.length == 4) {
                console.log("Location = 4");
                console.log(`End: ${onSetupActive}`);
                return beginEnd();
            }
        }
    }
    

}
function beginEnd() {
    onSetupActive = false;
}    
*/




// function begin(){
//     if (onSetupActive == true) {

//         const getTable = document.getElementById('main-table');
//         getTable.addEventListener("click", getCell, false);

//         function getCell(e) {
//             console.log(`Locations tiene ${locationsUser.length + 1}`);
        
//             if (e.target !== e.currentTarget) {
//             var cellId = e.target.id;
//             }
            
//             locationsUser.push(cellId); //asigna celda a locationUser
    
//             // Marcar celda
//             let selectCell = document.getElementById(cellId);
//             selectCell.classList.add('ship');
//         }
        
//     }
// }
