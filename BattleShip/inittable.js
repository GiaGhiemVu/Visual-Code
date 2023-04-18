// Lấy phần tử div có class "content" để thêm bảng vào
let contentDiv = document.querySelector('.LeftContent');
let size = 10;
// Tạo một đối tượng table
let table = document.createElement('table');
table.id = 'player-board';
table.className = 'board';

// Tạo các hàng trong bảng
for (let i = 0; i < size; i++) {
    let row = document.createElement('tr');

    // Tạo các ô trong mỗi hàng
    for (let j = 0; j < size; j++) {
        let cell = document.createElement('td');
        cell.className = 'board-cell';
        row.appendChild(cell);
    }

    // Thêm hàng vào bảng
    table.appendChild(row);
}

// Thêm bảng vào phần tử div có class "content"
contentDiv.appendChild(table);