// Khởi tạo các biến
const boardSize = 10; // Kích thước của bảng
const shipLength = 3; // Độ dài của chiến hạm
const numShips = 3; // Số lượng chiến hạm
const ships = []; // Mảng chứa thông tin về các chiến hạm
const board = []; // Mảng chứa thông tin về các ô của bảng

// Khởi tạo bảng và mảng chứa thông tin về các chiến hạm
for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
        board[i][j] = {
            hit: false,
            ship: null
        };
    }
}

for (let i = 0; i < numShips; i++) {
    ships[i] = {
        locations: [],
        hits: []
    };
}

// Hàm để đặt chiến hạm lên bảng
function placeShip(ship) {
    let row, col, direction;
    while (!isValidLocation(row, col, direction, shipLength)){
        // Tạo ngẫu nhiên vị trí và hướng cho chiến hạm
        row = Math.floor(Math.random() * boardSize);
        col = Math.floor(Math.random() * boardSize);
        direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    }

    // Đặt chiến hạm lên bảng
    const locations = [];
    for (let i = 0; i < shipLength; i++) {
        if (direction === 'horizontal') {
            locations.push({ row, col: col + i });
        } else {
            locations.push({ row: row + i, col });
        }
    }

    for (let i = 0; i < shipLength; i++) {
        const { row, col } = locations[i];
        board[row][col].ship = ship;
    }

    return locations;
}

// Hàm kiểm tra vị trí đặt chiến hạm có hợp lệ không
function isValidLocation(row, col, direction, length) {
    const endRow = direction === 'horizontal' ? row : row + length - 1;
    const endCol = direction === 'horizontal' ? col + length - 1 : col;
    if (endRow >= boardSize || endCol >= boardSize) {
        return false;
    }

    for (let i = row - 1; i <= endRow + 1; i++) {
        for (let j = col - 1; j <= endCol + 1; j++) {
            if (i >= 0 && i < boardSize && j >= 0 && j < boardSize && board[i][j].ship !== null) {
                return false;
            }
        }
    }

    return true;
}

// Đặt các chiến hạm lên bảng
for (let i = 0; i < numShips; i++) {
    const locations = placeShip(i);
    ships[i].locations = locations;
}

// Hàm để kiểm tra khi người chơi bắn vào một ô trên bảng
function checkShot(row, col) {
    for (let i = 0; i < numShips; i++) {
        const ship = ships[i];
        const locations = ship.locations;
        for (let j = 0; j < shipLength; j++) {
            const { row: shipRow, col: shipCol } = locations[j];
            if (row === shipRow && col === shipCol) {
            // Nếu bắn trúng một ô của chiến hạm
            ship.hits.push({ row, col });
            board[row][col].hit = true;
            return true;
            }
        }
    }
    return false;
}
    
// Hàm để kiểm tra xem trò chơi đã kết thúc chưa (tức là đã bắn chìm hết các chiến hạm chưa)
function checkGameOver() {
    for (let i = 0; i < numShips; i++) {
        if (ships[i].hits.length !== shipLength) {
            return false;
        }
    }
    return true;
}

    // Ví dụ cách sử dụng các hàm trong trò chơi Battleship
    // Bắn vào ô (row, col)
    const row = 3;
    const col = 4;
    const isHit = checkShot(row, col);
    if (isHit) {
    console.log("Bắn trúng!");
    if (checkGameOver()) {
    console.log("Chiến thắng!");
    }
    } else {
    console.log("Bắn lạc!");
    }