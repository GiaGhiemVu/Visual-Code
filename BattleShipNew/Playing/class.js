export class Position{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    getPos(){
        return this;
    }

    getX(){
        return parseInt(this.x);
    }

    getY(){
        return parseInt(this.y);
    }
}

export class AdvancePosition extends Position{
    constructor(x,y,direction){
        super(x,y);
        this.direction = direction;
        this.value;
    }

    getAdvancePos(){
        return this;
    }
}

export class Ship{
    constructor(AdvancePosition, shipSize){
        this.cordinates = [];
        if(AdvancePosition.direction === "vertical"){
            for(let i = 0; i < shipSize; i++){
                this.cordinates.push(new Position(AdvancePosition.getX() + i, AdvancePosition.getY()));
            }
        } else {
            for(let i = 0; i < shipSize; i++){
                this.cordinates.push(new Position(AdvancePosition.getX(), AdvancePosition.getY() + i));
            }
        }
    }
}

export class Board{
    constructor(size){
        this.table = [[],[],[],[],[],[],[],[],[],[]];
        this.shipArray = [];
        this.shipSize = [2,2,3,3,4,5];
        this.shipIndex = [0,0,0,0,0,0];
        this.currentShip = 0;
        this.size = size;
        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                this.table[i][j] = 0;
            }
        }
    }

    attacked(position, who){
        console.log(position);
        if(this.table[position.getX()][position.getY()] === 0 || this.table[position.getX()][position.getY()] === 1){
            if(who === "player"){
                const playerTable = document.querySelectorAll("#playerCell");
                const playerShip = document.querySelectorAll("#player_ship_cell");

                if(this.table[position.getX()][position.getY()] === 0 ){
                    playerTable[position.getX()*this.size+position.getY()].classList.add("Empty");
                }
                if(this.table[position.getX()][position.getY()] === 1 ){
                    playerTable[position.getX()*this.size+position.getY()].classList.remove("selectedCell");
                    playerTable[position.getX()*this.size+position.getY()].classList.add("ShipHitted");
                    for(let i = 0; i < this.shipIndex; i++){
                        if(this.shipArray[i].some(pos => pos === position)){
                            playerShip.forEach(function(cell){
                                if(cell.dataset.col === shipIndex[i] && cell.dataset.row === i){
                                    cell.classList.add("Empty");
                                }
                            })
                            this.shipIndex[i]++;
                        }
                    }
                }
            } else {
                const comTable = document.querySelectorAll("#computer_Cell");
                const comShip = document.querySelectorAll("#computer_ship_cell");

                if(this.table[position.getX()][position.getY()] === 0 ){
                    comTable[position.getX()*this.size+position.getY()].setAttribute("background-color",'red');
                }
                if(this.table[position.getX()][position.getY()] === 1 ){
                    comTable[position.getX()*this.size+position.getY()].classList.remove("selectedCell");
                    comTable[position.getX()*this.size+position.getY()].classList.add("ShipHitted");
                    for(let i = 0; i < this.shipIndex; i++){
                        if(this.shipArray[i].some(pos => pos === position)){
                            comShip.forEach(function(cell){
                                if(cell.dataset.col === shipIndex[i] && cell.dataset.row === i){
                                    cell.classList.add("Empty");
                                }
                            })
                            this.shipIndex[i]++;
                        }
                    }
                }
            }
            this.table[position.getX()][position.getY()] = -1;
        } else {
            console.log("Invalid Attacked");
            if(who === "computer"){
                this.attacked(position, "computer");
            }
            
        }
    }

    checkValidPlacingShip(ship){
        for(let i = 0; i < ship.cordinates.length; i++){
            if(ship.cordinates[i].getX() > 9 || ship.cordinates[i].getX() < 0 || ship.cordinates[i].getY() > 9 || ship.cordinates[i].getX() < 0){
                return false;
            }
            
            if(this.table[ship.cordinates[i].getX()][ship.cordinates[i].getY()] !== 0){
                return false;
            }
        }
        return true;
    }

    placeShip(){
        const newShip = this.shipArray.pop();
        console.log(newShip);
        if(this.checkValidPlacingShip(newShip)){
            this.shipArray.push(...[newShip]);
            for(let i = 0; i < newShip.cordinates.length; i++){
                this.table[newShip.cordinates[i].getX()][newShip.cordinates[i].getY()] = 1;
            }
            this.currentShip = this.currentShip + 1;
            console.log("Create Success", newShip);
        } else {
            console.log("Create fail!");
        }
    }

    createShip(position, direction){
        if(this.currentShip <= this.shipSize.length - 1){
            let newAdvancePosition = new AdvancePosition(position.x, position.y, direction); 
            let newShip = new Ship(newAdvancePosition, this.shipSize[this.currentShip]);
            this.shipArray.push(newShip);
            this.placeShip();
        } else {
            console.log("Full ship");
        }
    }

    deleteShip(){
        if(this.currentShip === 0){
            console.log("Invalid Undo");
        } else {
            const newShip = this.shipArray.pop();
            this.currentShip = this.currentShip - 1;

            for(let i = 0; i < newShip.cordinates.length; i++){
                this.table[newShip.cordinates[i].getX()][newShip.cordinates[i].getY()] = 0;
            }

            this.syncPlayerShipToTable();    
        }
    }

    syncPlayerShipToTable(){
        const playerTable = document.querySelectorAll("#playerCell");

        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if(this.table[i][j] === 1){
                    playerTable[i * this.size + j].classList.add("selectedCell");
                }
            }
        }

        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if(this.table[i][j] === 0){
                    playerTable[i * this.size + j].classList.remove("selectedCell");
                }
            }
        }
    }

    syncComShipToTable(){
        const playerTable = document.querySelectorAll("#computer_Cell");

        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if(this.table[i][j] === 1){
                    playerTable[i * this.size + j].classList.add("selectedCell");
                }
            }
        }

        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if(this.table[i][j] === 0){
                    playerTable[i * this.size + j].classList.remove("selectedCell");
                }
            }
        }
    }
}

export class Computer{
    constructor(Board){
        this.attackArray = new Queue();
        this.trackingDir = [];
        this.currentPos = new AdvancePosition();
        this.lastAttack;
        this.Board = Board;
        this.currentShip = 0;
    }

    placingShip(){
        while(this.currentShip <= 5){
            let newPos = this.randomPos();
            let direction = this.randowPlacingDirection();
            let ship = new Ship(new AdvancePosition(newPos.getX(),newPos.getY(),direction),this.Board.shipSize[this.currentShip]);
            
            while(!this.Board.checkValidPlacingShip(ship)){
                newPos = this.randomPos();
                direction = this.randowPlacingDirection();
                ship = new Ship(new AdvancePosition(newPos.getX(),newPos.getY(),direction),this.Board.shipSize[this.currentShip]);
            }

            this.Board.createShip(newPos, direction);
            this.Board.syncComShipToTable();
            this.currentShip = this.currentShip + 1;
        }
    }

    attack(){
        if(this.attackArray.length === 0){
            this.lastAttack = this.randomAttack();
        } else {
            this.lastAttack = this.trackingAttack();
        }

        return this.lastAttack;
    }

    randomAttack(){
        let pos = this.randomPos();
        while(this.checkValidPos(pos)){
            pos = this.randomPos();
        }

        if(this.Board.table[pos.x][pos.y] === 1){
            this.attackArray.enqueue(pos);
        }

        this.Board.attacked(pos);
        
        return pos;
    }

    trackingAttack(){
        if(this.trackingDir.length >= 4){
            this.trackingDir = [];
            this.attackArray.dequeue();
        }
        
        this.currentPos = this.attackArray.peek();
        this.currentPos.direction = this.randomDirection();

        while(this.trackingDir.some(dirs => this.currentPos.direction === dirs)){
            this.currentPos.direction = this.randomDirection();
        }

        if(this.checkValidPos(this.currentPos)){
            let newPos = this.createNewPosWithDir(this.currentPos,this.currentPos.direction);
            if(newPos.value === 1){
                this.currentPos = newPos;
                this.Board.attacked(this.currentPos);
            } else {
                this.Board.attacked(newPos);
                this.trackingDir.push(...[this.currentPos.direction]);
            }
        } else {
            this.trackingAttack();
        } 
    }

    randomPos(){
        let x = Math.floor(Math.random() * this.Board.size);
        let y = Math.floor(Math.random() * this.Board.size);
        let newPos = new Position(x,y);
        return newPos;
    }

    checkValidPos(Position){
        if(this.Board.table[Position.x][Position.y] === 0 || this.Board.table[Position.x][Position.y] === 1){
            return true;
        } else {
            return false;
        }
    }

    createNewPosWithDir(Position,direction){
        const up = [1,0], down = [-1,0], left = [0,-1], right = [0,1];
        let x = Position.x;
        let y = Position.y;

        if(direction === "up"){
            x = x + up[0];
            y = y + up[1];
        } else if(direction === "down"){
            x = x + down[0];
            y = y + down[1];
        } else if(direction === "left"){
            x = x + left[0];
            y = y + left[1];
        } else {
            x = x + right[0];
            y = y + right[1];
        }

        let newPos = new AdvancePosition(x,y,direction);
        newPos.value = this.Board.table[x][y];
        return newPos;
    }

    randomDirection(){
        let directions = ["up", "down", "left", "right"];
        let randomIndex = Math.floor(Math.random() * directions.length);
        return directions[randomIndex];
    }

    randowPlacingDirection(){
        let directions = ["vertical", "horizontal"];
        let randomIndex = Math.floor(Math.random() * directions.length);
        return directions[randomIndex];
    }
}

export class Player{
    constructor(Board){
        this.attackArray;
        this.Board = Board;
    }
}

export class Controller{
    constructor(size) {
        this.computerTable = new Board(size);
        this.playerTable = new Board(size);
        this.computer = new Computer(this.computerTable);
        this.player = new Player(this.playerTable);
        this.state = "prepare";
    }

    setState(state){
        this.state = state;
    }

    checkWinningCondition(){
        if(this.computerTable.table.some(cell => cell === 1)){
            return false;
        } else {
            return true;
        }
    }

    checkLosingCondition(){
        if(this.playerTable.table.some(cell => cell === 1)){
            return false;
        } else {
            return true;
        }
    }


}

export class Game{
    constructor(){
        this.size = 10;
        this.controller = new Controller(this.size);
    }

    drawTable(){
        let rightContentDiv = document.querySelector('.game_RightContent');
        let computerTable = document.createElement('computer_Table');

        computerTable.id = 'computer_Board';
        computerTable.className = 'board';
    
        for (let i = 0; i < this.size; i++) {
            let computerRow = document.createElement('tr');

            for (let j = 0; j < this.size; j++) {
                let computerCell = document.createElement('td');
                computerCell.className = 'board_cell';
                computerCell.id = 'computer_Cell';
                
                computerCell.dataset.col = i;
                computerCell.dataset.row = j;
                computerRow.appendChild(computerCell);
            }
            
            computerTable.appendChild(computerRow);
        }
    
        rightContentDiv.appendChild(computerTable);
    
        let leftContentDiv = document.querySelector('.game_LeftContent');
        let playerTable = document.createElement('player_Table');
        playerTable.id = 'player_Board';
        playerTable.className = 'board';
    
        for (let i = 0; i < this.size; i++) {
            let playerRow = document.createElement('tr');
    
            for (let j = 0; j < this.size; j++) {
                let playerCell = document.createElement('td');
                playerCell.className = 'board_cell';
                playerCell.id = 'playerCell';

                playerCell.dataset.row = i;
                playerCell.dataset.col = j;
                playerRow.appendChild(playerCell);
            }
            
            playerTable.appendChild(playerRow);
        }
    
        leftContentDiv.appendChild(playerTable);
    }

    createPlacingButton(){
        this.drawTable();
        let midContent = document.querySelector('.game_MidContent');

        let text = document.createElement('div');
        text.textContent = 'Prepare Phase';
        text.className = 'PlacingText';

        midContent.appendChild(text);
    
        if (!midContent) {
            console.error("Element with class 'MidContent' not found.");
            return;
        }
    
        const button = document.createElement('div');
        button.className = 'Button';
    
        const horizontalButton = document.createElement('button');
        horizontalButton.textContent = 'Horizontal';
        horizontalButton.classList.add("PlacingButton");
        horizontalButton.id = "horizontalButton";
        button.appendChild(horizontalButton);
    
        const verticalButton = document.createElement('button');
        verticalButton.textContent = 'Vertical';
        verticalButton.classList.add("PlacingButton");
        verticalButton.id = "verticalButton";
        button.appendChild(verticalButton);

        const undoButton = document.createElement('button');
        undoButton.textContent = 'Undo';
        undoButton.classList.add("PlacingButton");
        undoButton.id = "undoButton";
        button.appendChild(undoButton);
        
        const beginButton = document.createElement('button');
        beginButton.textContent = 'Begin';
        beginButton.classList.add("PlacingButton");
        beginButton.id = "beginButton";
        button.appendChild(beginButton);
    
        midContent.appendChild(button);
    }

    drawShipTable(shipSize, table, board){
        
        if(table === "player"){
            shipSize.forEach(function(sizeIndex){
                let playerShipdiv = document.querySelector('.PlayerShip');
                let playerShipTable = document.createElement('table');
                playerShipTable.id = 'player_ship_data';
                playerShipTable.className = 'ship_data';
            
                let count = 0;
                let playerShipRow = document.createElement('tr');
                for (let i = 0; i < sizeIndex; i++) {
                    let playerShipCell = document.createElement('td');
                    playerShipCell.className = 'Ship_Cell';
                    playerShipCell.id = 'player_ship_cell';
                    // Khởi tạo giá trị
                    for(let j = 0; j < board.shipArray[i].cordinates.length; j++){
                        playerShipCell.dataset.row = count;
                        playerShipCell.dataset.col = j;
                        playerShipRow.appendChild(playerShipCell);
                    }
                }
                playerShipTable.appendChild(playerShipRow);
                playerShipdiv.appendChild(playerShipTable);
            })
        } else {
            shipSize.forEach(function(sizeIndex){
                let comShipdiv = document.querySelector('.ComputerShip');
                let comShipTable = document.createElement('table');
                comShipTable.id = 'com_ship_data';
                comShipTable.className = 'ship_data';
            
                let count = 0;
                let comShipRow = document.createElement('tr');
                for (let i = 0; i < sizeIndex; i++) {
                    let comShipCell = document.createElement('td');
                    comShipCell.className = 'Ship_Cell';
                    comShipCell.id = 'com_ship_cell';
                    // Khởi tạo giá trị
                    for(let j = 0; j < board.shipArray[i].cordinates.length; j++){
                        comShipCell.dataset.row = count;
                        comShipCell.dataset.col = j;
                        comShipRow.appendChild(comShipCell);
                    }
                }
                comShipTable.appendChild(comShipRow);
                comShipdiv.appendChild(comShipTable);
            })
        }
    }
}

export class Queue {
    constructor() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }

    enqueue(element) {
      this.elements[this.tail] = element;
      this.tail++;
    }

    dequeue() {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }

    peek() {
      return this.elements[this.head];
    }

    get length() {
      return this.tail - this.head;
    }
    
    get isEmpty() {
      return this.length === 0;
    }
}