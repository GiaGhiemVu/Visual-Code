/**************************Begin game section*********************************/
const size = 10;
game();

function game(){
    /*
    Debug Section

    // computer_Board[size*3+1].dataset.value = 1;
    // computer_Board[size*3+2].dataset.value = 1;
    // computer_Board[size*3+3].dataset.value = 1;
    // console.log(checkPositionValid(3,1,computer_Board,4,"vertical"));
    
    Ending Debug
    */
    let ship = [2,2,3,3,4,5];
    let playerShipPosition = [];
    let computer_Position = [];
    let ComputerShipArray = [0,0,0,0,0,0];

    createNewTable(size);

    let computer_Board = document.querySelectorAll("#computerCell");

    computer_placeShip(computer_Board,computer_Position);

    drawPlayerShip(ship);
    drawComputerShip(ship);

    //Player attack on ComputerZone
    computer_Board.forEach(function(computerCell) {
        computerCell.addEventListener("click", function() {
            console.log(computerCell.dataset.col+" "+computerCell.dataset.row+" "+computerCell.dataset.value);
            if(computerCell.dataset.value==0){
                computerCell.classList.add("selected");
                computerCell.id = "Empty";
                computerCell.dataset.value = -1;
            } else if(computerCell.dataset.value==1){
                computerCell.classList.add("selected");
                computerCell.id = "Ship";
                computerCell.dataset.value = -1;
                let table = document.querySelectorAll(".CShip-dboard-cell");
                computer_Position.forEach(function (position){
                    console.log("checking:"+position+"Position:"+computerCell.dataset.col+" "+computerCell.dataset.row);
                    if(position[1] == computerCell.dataset.col && position[2] == computerCell.dataset.row){
                        shipAttacked(ComputerShipArray,position,table);
                    }
                })
            }
            if(checkWinningCondition(computer_Board)){
                console.log("Winner");
            }
        });
    });
}

/**************************Begin function section*********************************/
function createNewTable(size){
    /*
        New Section: 
        create ComputerTable
    */

    let rightContentDiv = document.querySelector('.RightContent');
    
    // Tạo một đối tượng table
    let computerTable = document.createElement('computerTable');
    computerTable.id = 'computer_Board';
    computerTable.className = 'board';

    // Tạo các hàng trong bảng
    for (let i = 0; i < size; i++) {
        let computerRow = document.createElement('tr');

        // Tạo các ô trong mỗi hàng
        for (let j = 0; j < size; j++) {
            let computerCell = document.createElement('td');
            computerCell.className = 'board-cell';
            computerCell.id = 'computerCell';
            // Khởi tạo giá trị
            computerCell.dataset.row = i;
            computerCell.dataset.col = j;
            computerCell.dataset.value = 0;
            computerRow.appendChild(computerCell);
        }
        
        // Thêm hàng vào bảng
        computerTable.appendChild(computerRow);
    }

    // Thêm bảng vào phần tử div có class "content"
    rightContentDiv.appendChild(computerTable);

    /*
        New Section: 
        Tạo bảng Player 
    */
    let leftContentDiv = document.querySelector('.LeftContent');
    let playerTable = document.createElement('playerTable');
    playerTable.id = 'player_Board';
    playerTable.className = 'board';

    // Tạo các hàng trong bảng
    for (let i = 0; i < size; i++) {
        let playerRow = document.createElement('tr');

        // Tạo các ô trong mỗi hàng
        for (let j = 0; j < size; j++) {
            let playerCell = document.createElement('td');
            playerCell.className = 'board-cell';
            // Khởi tạo giá trị
            playerCell.dataset.row = i;
            playerCell.dataset.col = j;
            playerCell.dataset.value = 0;
            playerRow.appendChild(playerCell);
        }
        
        // Thêm hàng vào bảng
        playerTable.appendChild(playerRow);
    }

    // Thêm bảng vào phần tử div có class "content"
    leftContentDiv.appendChild(playerTable);
}

function checkPositionValid(x, y, table, shipSize, direction) {
    if (direction == "vertical") {
        for (let i = 0; i < shipSize; i++) {
            if (x >= size || y + i >= size || 
                table[(y + i) * size + x].dataset.value != 0 ) {
                return false;
            }
        }
    } else {
        for (let i = 0; i < shipSize; i++) {
            if (x + i >= size || y >= size || 
                table[y * size + x + i].dataset.value != 0 ) {
                return false;
            }
        }
    }
    return true;
}

function randomDirection(){
    return Math.floor(Math.random() * 2) == 0 ? "horizontal" : "vertical";
};

function computer_placeShip(computer_Board, computer_Position){
    const maxtries = 100;
    let count = 0;
    let computer_Ship = [2,2,3,3,4,5];
    computer_Ship.forEach(function(shipSize){
        let tries = 1;
        let x = Math.floor(Math.random()*size);
        let y = Math.floor(Math.random()*size);
        let direction = randomDirection();
        console.log(shipSize+" "+tries+" "+x+" "+y+" "+direction+" "+checkPositionValid(x,y,computer_Board,shipSize,direction));
        while(checkPositionValid(x,y,computer_Board,shipSize,direction)==false){
            x = Math.floor(Math.random()*size);
            y = Math.floor(Math.random()*size);
            direction = randomDirection();
            
            if(tries > maxtries){
                console.log("Maximum tries");
            }
            
            console.log(shipSize+" "+tries+" "+x+" "+y+" "+direction+" "+checkPositionValid(x,y,computer_Board,shipSize,direction));
            tries++;
        }

        if(direction == "vertical"){
            computer_Board.forEach(function(computerCell){
                for(let i = 0; i < shipSize; i++){
                    if(computerCell.dataset.col == (x) && computerCell.dataset.row == (y+i)){
                        if(computerCell.dataset.value == 1){
                            console.log("Trùng");
                            console.log(shipSize);
                        }
                        computerCell.dataset.value = 1;
                        let position = [count,computerCell.dataset.col,computerCell.dataset.row];
                        computer_Position.push(position);
                    }
                }
            })
        } else {
            computer_Board.forEach(function(computerCell){
                for(let i = 0; i < shipSize; i++){
                    if(computerCell.dataset.col == (x+i) && computerCell.dataset.row == (y)){
                        if(computerCell.dataset.value == 1){
                            console.log("Trùng");
                            console.log(shipSize);
                        }
                        computerCell.dataset.value = 1;
                        let position = [count,computerCell.dataset.col,computerCell.dataset.row];
                        computer_Position.push(position);

                    }
                }
            })
        }
        count++;
    });
}

function checkWinningCondition(table) {  
    for (let i = 0; i < size*size; i++) {  
        if (table[i].dataset.value == 1) {  
            return false; 
        }
    }
    return true;
};

function drawPlayerShip(shipSize){
    shipSize.forEach(function(sizeIndex){
        let playerShipdiv = document.querySelector('.PlayerShip');
        let playerShipTable = document.createElement('table');
        playerShipTable.id = 'player_Board';
        playerShipTable.className = 'dboard';
    
        let playerShipRow = document.createElement('tr');
        for (let i = 0; i < sizeIndex; i++) {
            let playerShipCell = document.createElement('td');
            playerShipCell.className = 'PShip-dboard-cell';
            // Khởi tạo giá trị
            playerShipCell.dataset.row = 0;
            playerShipCell.dataset.col = i;
            playerShipCell.dataset.value = i;
            playerShipRow.appendChild(playerShipCell);
        }
        playerShipTable.appendChild(playerShipRow);
        playerShipdiv.appendChild(playerShipTable);
    })
}

function drawComputerShip(shipSize,position) {
    let index = 0;
    shipSize.forEach(function (sizeIndex) {
        let computerShipDiv = document.querySelector('.ComputerShip');
        let computerShipTable = document.createElement('table'); // changed shiptable to table
        computerShipTable.id = 'computer_Board';
        computerShipTable.className = 'dboard';

        let computerShipRow = document.createElement('tr');
        for (let i = 0; i < sizeIndex; i++) {
            let computerShipCell = document.createElement('td');
            computerShipCell.className = 'CShip-dboard-cell';
            // Khởi tạo giá trị
            computerShipCell.dataset.row = 0;
            computerShipCell.dataset.col = i;
            computerShipCell.dataset.value = index;
            computerShipRow.appendChild(computerShipCell);
        }

        computerShipTable.appendChild(computerShipRow);
        computerShipDiv.appendChild(computerShipTable);
        index++;
    });
}

function shipAttacked(ship ,position, table){
    console.log("Begin method");
    for (let i = 0; i < table.length; i++) {
        console.log("Run"+table[i].dataset.value+" "+table[i].dataset.col+" "+table[i].dataset.row);
        if(position[0] == table[i].dataset.value && ship[position[0]] == table[i].dataset.col){
            table[i].id = "attacked";
            console.log("true");
            ship[position[0]]++;
            break;
        }
    }
}
/**************************End function section*********************************/