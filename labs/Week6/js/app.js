var check = "";
var winner = 0;
var turnNum = 0;
var winMsg = document.createElement("div");
var app = new Vue({
    el: "#app",
    data: {
        gameOver: false,
        winner1: false,
        winner2: false,
        noWin: false,
        playerTurn: 1,
        grid: [
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
        ]
    },
    methods: {
        selectCell: function(row, col) {
            //since we aren't doing diagonals, there is a higher possibility of tied games and turnNum addresses that
            turnNum++;
            var moveRow = this.lowestMove(col);
            
            if(moveRow >= 0) {
                //new grid is made that is the same as the original and then modified
                var tempGrid = this.grid.slice(0);  
                tempGrid[moveRow][col] = this.playerTurn;

                //new grid is replaced by old grid
                this.grid = tempGrid;

                //switch player turn based on what number it is
                this.playerTurn = (this.playerTurn == 1) ? 2 : 1;

            //check if the game is over first, and if it isn't, check for a winner
            if(app.gameOver === false) {
                this.checkWin();
            }
            }
            
        },
        checkWin: function() {
        //row check with the check variable, it is "" in order to do concatenation
        for(y = 0; y < 6; y++) {
            for(x = 0; x < 4; x++) {
                if(check + app.grid[y][x] + app.grid[y][x + 1] + app.grid[y][x + 2] + app.grid[y][x + 3] == "1111") {
                    app.gameOver = true;
                    app.winner1 = true;
                    
                }
                if(check + app.grid[y][x] + app.grid[y][x + 1] + app.grid[y][x + 2] + app.grid[y][x + 3] == "2222") {
                    app.gameOver = true;
                    app.winner2 = true;
                    var modWin = document.createTextNode("Congratulations to Player " + winner + " for winning Connect 4!");
                    winMsg.appendChild(modWin);
                    
                }
            }
        }
        //column check
        for(x = 0; x < 6; x++) {
            for(y = 0; y < 3; y++) {
                if(check + app.grid[y][x] + app.grid[y + 1][x] + app.grid[y + 2][x] + app.grid[y + 3][x] == "1111") {
                    app.gameOver = true;
                    app.winner1 = true;
                     console.log(winner);
                    
                }
                if(check + app.grid[y][x] + app.grid[y + 1][x] + app.grid[y + 2][x] + app.grid[y + 3][x] == "2222") {
                    app.gameOver = true;
                    app.winner2 = true;
                    var modWin = document.createTextNode("Congratulations to Player " + winner + " for winning Connect 4!");
                    winMsg.appendChild(modWin);
                    
                }
            }
        }
            if(turnNum === 42) {
                app.noWin = true;
            }
        },
        lowestMove: function(col) {
            //start at the bottom of a col, loop upwards
            for(var row = 5; row >= 0; row--) {
                //check to see if current row is free
                if(this.grid[row][col]==0) {
                    //if it is free, return the row index
                    return(row);
                }
            }
        }
    }
})