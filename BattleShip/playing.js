/*
    New Section:
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
    New Section:
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
    New Section:
    Point Cell Action
*/
// Game bắt đầu từ đây

//Player attack on ComputerZone
let computer_Board = document.querySelectorAll("#computerCell")

computer_Board.forEach(function(computerCell) {
    computerCell.addEventListener("click", function() {
        if(computerCell.dataset.value==0){
            computerCell.classList.add("selected");
            computerCell.dataset.value = 1;
            console.log(computer_Board);
        }
    });
});

/*
    New Section:
    Turn Action
*/
