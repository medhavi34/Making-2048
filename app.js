document.addEventListener('DOMContentLoaded', ()=>{
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    const width = 4;
    //a playing board
    let squares = [];

    function createBoard(){
        for(let i = 0; i < width*width; i++){
            square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    };
    createBoard();

    //generate a number randomly

    function generate(){
        let randomNumber = Math.floor(Math.random()*squares.length);
        if(squares[randomNumber].innerHTML == 0) squares[randomNumber].innerHTML=2;
        else generate();
    }

    //swipe right 

    function moveRight() {
        for(let i = 0; i < 16; i++){
            if(i%4 === 0){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);

                let newRow = zeros.concat(filteredRow);
                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }
    //move left
    function moveLeft() {
        for(let i = 0; i < 16; i++){
            if(i%4 === 0){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);
                    let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);

                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    // move up 

    function moveUp() {
        for(let i = 0; i < 4; i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+4].innerHTML;
            let totalThree = squares[i+8].innerHTML;
            let totalFour = squares[i+12].innerHTML;
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill(0);

            let newRow = filteredRow.concat(zeros);

            squares[i].innerHTML = newRow[0];
            squares[i+4].innerHTML = newRow[1];
            squares[i+8].innerHTML = newRow[2];
            squares[i+12].innerHTML = newRow[3];
            
        }
    }

    // move down

    function moveDown() {
        for(let i = 0; i < 4; i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+4].innerHTML;
            let totalThree = squares[i+8].innerHTML;
            let totalFour = squares[i+12].innerHTML;
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill(0);

            let newRow = zeros.concat(filteredRow);

            squares[i].innerHTML = newRow[0];
            squares[i+4].innerHTML = newRow[1];
            squares[i+8].innerHTML = newRow[2];
            squares[i+12].innerHTML = newRow[3];
            
        }
    }

    function combineRow(){
        let total =parseInt(scoreDisplay.innerHTML);

        for(let i = 0 ; i < 15; i++){
            if(squares[i].innerHTML == squares[i+1].innerHTML){
                let combineSum = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i+1].innerHTML = combineSum;
                squares[i].innerHTML = 0;
                total +=combineSum;
            }
        }
        checkForWin();
        checkForLoss();
        scoreDisplay.innerHTML = total;
    }

    function combineCol(){
        let total = parseInt(scoreDisplay.innerHTML);
        for(let i = 0 ; i < 12; i++){
            if(squares[i].innerHTML == squares[i+width].innerHTML){
                let combineSum = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
                squares[i+width].innerHTML = combineSum;
                squares[i].innerHTML = 0;
                total += combineSum;
            }
        }
        checkForWin();
        checkForLoss();
        scoreDisplay.innerHTML = total;
    }

    function control(e){
        if(e.key === 'ArrowRight'){
            keyRight();
        }
        else if(e.key === 'ArrowLeft'){
            keyLeft();
        }
        else if(e.key === 'ArrowDown'){
            keyDown();
        }
        else if(e.key === 'ArrowUp'){
            keyUp();
        }
    }

    document.addEventListener('keyup', control);

    function keyRight(){
        moveRight();
        combineRow();
        moveRight();
        generate();
    }
    
    function keyLeft(){
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyDown(){
        moveDown();
        combineCol();
        moveDown();
        generate();
    }

    function keyUp(){
        moveUp();
        combineCol();
        moveUp();
        generate();
    }

    function checkForWin(){
        for(let i = 0; i < squares.length; i++){
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = "You WIN!";
                document.removeEventListener('keyup', control)
            }
        }
    }

    function checkForLoss(){
        let check = true;
        for(let i = 0; i < squares.length; i++){
            if(squares[i].innerHTML == 0) {
                check = false; 
                break;
            }
        }

        if(check){
            resultDisplay.innerHTML = "I am sorry, you LOST!";
            document.removeEventListener('keyup', control)
        }
    }
});