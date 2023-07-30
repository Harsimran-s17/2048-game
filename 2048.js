var board;
var score = 0;
var rows = 4;
var columns = 4;


window.onload = function(){
    setGame();
}

function setGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
     ]
     
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile); // appending the tiles one by one
        }
    }
    
    setTwo();
    setTwo();
    
}


function updateTile(tile,num){
    tile.innerText = "";
    tile.classList.value = ""  //clear the classList
    tile.classList.add("tile");
    if(num>0){
        tile.innerText = num.toString();
        if(num<=4096){
            tile.classList.add("x" + num.toString());
        }
        else{
            tile.classList.add("x8192");
        }
    }
}

function control(e){
    if(e.code == "ArrowLeft" || e.code == "swiped-left"){
        slideLeft();
        setTwo();
    }
    else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }
    else if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById("Score").innerText = score;
}

document.addEventListener("keyup",control);


// For swiping
document.addEventListener('swiped-left', control);;


function filterZero(row){
    return row.filter(num => num != 0); //create a new array without Zeros
}

function slide(row){
    row = filterZero(row); // get rid of zeroes

    for(let i = 0; i < row.length - 1; i++){
        if(row[i]== row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row);
    // Add Zeroes
    while(row.length < columns){
        row.push(0);
    }
    return row;
}

function slideLeft() {
    for(let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
        checkForWin();
    }
}

function slideRight() {
    for(let r = 0; r < rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
        checkForWin();
    }
}

function slideUp(){
    for(let c = 0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
        checkForWin();
    }
}

function slideDown(){
    for(let c = 0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
        checkForWin();
    }
}

function checkForWin(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            if(board[r][c].innerText == '2048'){
                const resultDisplay = document.getElementById('result');
                resultDisplay.innerHTML = "<h2 style=\"color: #f59575;\">You WIN </h2>"; 
                document.removeEventListener('keyup', control);
                document.removeEventListener('swiped-left', control);
                setTimeout(() => clear(), 3000);
            }
        }
    }
}

function checkForGameOver(){
    let zeroes = 0;
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            if(board[r][c].innerText == '0'){
                zeros++;
            }
        }
    }
    if(zeroes === 0){
        const resultDisplay = document.getElementById('result');
        resultDisplay.innerHTML = "<h2 style=\"color: #f59575;\">Game Over <br> Your Score: " + score.toString() + "</h2>";
        document.removeEventListener('keyup', control);
        document.removeEventListener('swiped-left', control);
        setTimeout(() => clear(), 3000);
    }
}

function setTwo(){
    if(!hasEmptyTile()){
        checkForGameOver();
        return;
    }

    let found = false;
    while(!found){
        //random r, c
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}
