/*
    New Section: 1st
    Tạo bảng Computer
*/
let rightContentDiv = document.querySelector('.RightContent');
let size = 10;
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
    New Section: Running 2nd
    Tạo bảng Player 
*/
let leftContentDiv = document.querySelector('.LeftContent');
let playerTable = document.createElement('computerTable');
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

/*
    New Section: Function
    Check Valid Position
*/

checkPositionValid = function(x, y, table, shipSize, direction){
    if(direction == "vertical"){
        table.forEach(function(computerCell){
            for(let i = 0; i < shipSize; i++){
                if(computerCell.dataset.col === (x+i) && computerCell.dataset.row === y){
                    return false;
                }
            }
        })
    }

    if(direction == "horizon"){
        table.forEach(function(computerCell){
            for(let i = 0; i < shipSize; i++){
                if(computerCell.dataset.col ===x && computerCell.dataset.row === (y+i)){
                    return false;
                }
            }
        })
    }

    return true;
}

/*
    New Section:
    randomDirection
*/

randomDirection = function(){return Math.floor(Math.random() * 2) == 0 ? "horizon" : "vertical";};

/*
    New Section:
    Random Computer position Ship
*/
let computer_Board = document.querySelectorAll("#computerCell");
let computer_Ship = [2,3,4,4,5];
let computer_Ship_Position = [];

computer_Ship.forEach(function(shipSize){
    let x = Math.floor(Math.random()*size);
    let y = Math.floor(Math.random()*size);
    let direction = randomDirection();
    console.log(x + " " + y + " " + direction + shipSize);
    console.log(checkPositionValid(x,y,computer_Board,shipSize,direction));
    while(checkPositionValid(x,y,computer_Board,shipSize,direction)==false){
        x = Math.floor(Math.random()*size);
        y = Math.floor(Math.random()*size);
        direction = randomDirection();
    }

    let positions = [];
    console.log(x + " " + y + " " + direction);

    if(direction == "vertical"){
        computer_Board.forEach(function(computerCell){
            for(let i = 0; i < shipSize; i++){
                console.log("vertical run");
                if(computerCell.dataset.col == (x+i) && computerCell.dataset.row == y){
                    computerCell.dataset.value = 1;
                    positions.push(computerCell);
                    console.log(computerCell.dataset.col + " " + computerCell.dataset.row);
                }
            }
        })
    } else {
        computer_Board.forEach(function(computerCell){
            for(let i = 0; i < shipSize; i++){
                console.log("horizon run");
                if(computerCell.dataset.col == (x) && computerCell.dataset.row == (y+i)){
                    computerCell.dataset.value = 1;
                    positions.push(computerCell);
                    console.log(computerCell.dataset.col + " " + computerCell.dataset.row);
                }
            }
        })
    }
    computer_Ship_Position.push(positions);

});

/*
    New Section:
    Point Cell Action
*/

// Game starts here

//Player attack on ComputerZone
computer_Board.forEach(function(computerCell) {
    computerCell.addEventListener("click", function() {
        console.log(computerCell.dataset.value);
        if(computerCell.dataset.value==0){
            computerCell.classList.add("selected");
            computerCell.id = "Empty";
            computerCell.dataset.value = -1;
        } else if(computerCell.dataset.value==1){
            computerCell.classList.add("selected");
            computerCell.id = "Ship";
            computerCell.dataset.value = -1;
        }
        console.log(computerCell.dataset.value);
    });
});
/*
    New Section:
    Turn Action
*/
