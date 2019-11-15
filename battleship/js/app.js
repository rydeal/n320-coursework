//Ryan Deal
//NEWM N 320
//5 November 2019

//i tested it a few times and it went right each time so hopefully there isn't anything wrong
//i apologize for the huge amount of code
//these is the hp for all of the ships: the carrier (5 spaces), the battleship (4 spaces), the cruiser (3 spaces), the submarine (3 spaces), and the destroyer (2 spaces). This adds up to 17 for the player.
var player_hp = 17;
//this is the total hp of the bot
var bot_hp = 17;
//keeping track of initial placement. goes through loop and switches off on the players placing each of their ships until placed_1 = 5
var placed_player = 0;
var placed_bot = 0;
//variables for random number the bot will base their placements on
var bot_place_row;
var bot_place_column;
var bot_direction;
var rowBot;
var colBot;
//start of Vue and the grid
var app = new Vue({
    el: "#app",
    data: {
        gameOver: false,
        winner1: false,
        winner2: false,
        gameReady: false,
        playerTurn: 1,
        grid_player: [
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
        ],
        grid_bot_hidden: [
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
        ],
        grid_bot_visible: [
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
        placeShip: function() {
            if(this.playerTurn === 1) {
                placed_player++;
                //makes a new grid
                var tempGrid = this.grid_player.slice(0);
                //for loop to pre-place the ships since i ran out of time
                for(x = 0; x < 5; x++) {
                    if(x === 0) {
                        tempGrid[8][1] = this.playerTurn;
                        tempGrid[8][2] = this.playerTurn;
                    } else if(x === 1) {
                        tempGrid[0][7] = this.playerTurn;
                        tempGrid[0][8] = this.playerTurn;
                        tempGrid[0][9] = this.playerTurn;
                    } else if(x === 2) {
                        tempGrid[4][7] = this.playerTurn;
                        tempGrid[5][7] = this.playerTurn;
                        tempGrid[6][7] = this.playerTurn;
                    } else if(x === 3) {
                        tempGrid[9][6] = this.playerTurn;
                        tempGrid[9][7] = this.playerTurn;
                        tempGrid[9][8] = this.playerTurn;
                        tempGrid[9][9] = this.playerTurn;

                    } else if(x === 4) {
                        tempGrid[2][2] = this.playerTurn;
                        tempGrid[2][3] = this.playerTurn;
                        tempGrid[2][4] = this.playerTurn;
                        tempGrid[2][5] = this.playerTurn;
                        tempGrid[2][6] = this.playerTurn;
                    }
                }

                //new grid replaces old grid
                app.grid_player = tempGrid;
                //player switch
                app.playerTurn = 2;
            }
            if(app.playerTurn === 2) {
                //this whole statement is just ran through once because that's what makes sense to me in my head right now
                if(placed_bot === 0) {
                    placed_bot++;
                    //all 5 ships are placed at once. 0 is destroyer (2). 1 is submarine (3). 2 is cruiser (3). 3 is battleship (4). 4 is carrier (5).
                    for(x = 0; x < 5; x++) {
                        //random starting  row and column for each ship of the bot's
                        bot_place_row = parseInt(Math.random() * 9);
                        bot_place_column = parseInt(Math.random() * 9);
                        //bot_direction = 0: go up. bot_direction = 1: go right. bot_direction = 2: go down. bot_direction = 3+: go left.
                        bot_direction = parseInt(Math.random() * 4);
                        //new grid made for bot
                        var tempGridBot = app.grid_bot_hidden.slice(0);
                        //set of if statements to check and make sure the ship can actually be placed in a direction
                        //im sorry
                        //corrections for going up
                        if(bot_direction === 0) {
                            if(x === 0) {
                                if
                                ( 
                                    //this is hard coded because my brain hurts i apologize
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][9]
                                ) {
                                    tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                    tempGridBot[(bot_place_row + 1)][bot_place_column] = app.playerTurn;
                                    app.grid_bot_hidden = tempGridBot;
                                }
                            }
                            else if(x === 1 || x === 2) {
                                if
                                ( 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][9] 
                                ) {
                                    tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                    tempGridBot[(bot_place_row + 1)][bot_place_column] = app.playerTurn;
                                    tempGridBot[(bot_place_row + 2)][bot_place_column] = app.playerTurn;
                                    app.grid_bot_hidden = tempGridBot;
                                }
                            }
                            else if(x === 3) {
                                if
                                ( 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][9] 
                                ) {
                                    tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                    tempGridBot[(bot_place_row + 1)][bot_place_column] = app.playerTurn;
                                    tempGridBot[(bot_place_row + 2)][bot_place_column] = app.playerTurn;
                                    tempGridBot[(bot_place_row + 3)][bot_place_column] = app.playerTurn;
                                    app.grid_bot_hidden = tempGridBot;
                                }
                            }
                            else {
                                if
                                ( 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][9] 
                                ) {
                                tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                tempGridBot[(bot_place_row + 1)][bot_place_column] = app.playerTurn;
                                tempGridBot[(bot_place_row + 2)][bot_place_column] = app.playerTurn;
                                tempGridBot[(bot_place_row + 3)][bot_place_column] = app.playerTurn;
                                tempGridBot[(bot_place_row + 4)][bot_place_column] = app.playerTurn;
                                app.grid_bot_hidden = tempGridBot;
                                }
                            }
                        }
                        //corrections for going right
                        else if(bot_direction === 1) {
                            if(x === 1) {
                                if
                                ( 
                                    //this is hard coded because my brain hurts i apologize
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][9] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][9] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][9] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][9] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][9]
                                ) {
                                    tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                    tempGridBot[bot_place_row][(bot_place_column - 1)] = app.playerTurn;
                                    app.grid_bot_hidden = tempGridBot;
                                }
                            }
                            else if(x === 1 || x === 2) {
                                if
                                ( 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][9] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][9] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][9] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][9] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][9] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][8] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][8] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][8] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][8] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][8]
                                ) {
                                    tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                    tempGridBot[bot_place_row][(bot_place_column - 1)] = app.playerTurn;
                                    tempGridBot[bot_place_row][(bot_place_column - 2)] = app.playerTurn;
                                    app.grid_bot_hidden = tempGridBot;
                                }
                            }
                            else if(x === 3) {
                                if
                                ( 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][9] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][9] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][9] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][9] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][9] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][8] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][8] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][8] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][8] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][7] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][7] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][7] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][7] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][7] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][7] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][7] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][7]
                                ) {
                                    tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                    tempGridBot[bot_place_row][(bot_place_column - 1)] = app.playerTurn;
                                    tempGridBot[bot_place_row][(bot_place_column - 2)] = app.playerTurn;
                                    tempGridBot[bot_place_row][(bot_place_column - 3)] = app.playerTurn;
                                    app.grid_bot_hidden = tempGridBot;
                                }
                            }
                            else {
                                if
                                ( 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][9] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][9] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][9] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][9] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][9] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][8] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][8] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][8] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][8] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][7] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][7] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][7] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][7] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][7] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][7] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][7] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][7] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][6] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][6] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][6] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][6] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][6]                                    
                                    
                                ) {
                                tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                tempGridBot[bot_place_row][(bot_place_column - 1)] = app.playerTurn;
                                tempGridBot[bot_place_row][(bot_place_column - 2)] = app.playerTurn;
                                tempGridBot[bot_place_row][(bot_place_column - 3)] = app.playerTurn;
                                tempGridBot[bot_place_row][(bot_place_column - 4)] = app.playerTurn;
                                app.grid_bot_hidden = tempGridBot;
                                }
                            }
                        }
                        //corrections for going down
                        else if(bot_direction === 2) {
                            if(x === 0) {
                                if
                                ( 
                                    //this is hard coded because my brain hurts i apologize
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][9]
                                ) {
                                    tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                    tempGridBot[(bot_place_row - 1)][bot_place_column] = app.playerTurn;
                                    app.grid_bot_hidden = tempGridBot;
                                }
                            }
                            else if(x === 1 || x === 2) {
                                if
                                ( 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][9] 
                                ) {
                                    tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                    tempGridBot[(bot_place_row - 1)][bot_place_column] = app.playerTurn;
                                    tempGridBot[(bot_place_row - 2)][bot_place_column] = app.playerTurn;
                                    app.grid_bot_hidden = tempGridBot;
                                }
                            }
                            else if(x === 3) {
                                if
                                ( 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][9] 
                                ) {
                                    tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                    tempGridBot[(bot_place_row - 1)][bot_place_column] = app.playerTurn;
                                    tempGridBot[(bot_place_row - 2)][bot_place_column] = app.playerTurn;
                                    tempGridBot[(bot_place_row - 3)][bot_place_column] = app.playerTurn;
                                    app.grid_bot_hidden = tempGridBot;
                                }
                            }
                            else {
                                if
                                ( 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][9] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][4] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][5] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][6] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][7] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][8] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][9] 
                                ) {
                                tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                tempGridBot[(bot_place_row - 1)][bot_place_column] = app.playerTurn;
                                tempGridBot[(bot_place_row - 2)][bot_place_column] = app.playerTurn;
                                tempGridBot[(bot_place_row - 3)][bot_place_column] = app.playerTurn;
                                tempGridBot[(bot_place_row - 4)][bot_place_column] = app.playerTurn;
                                app.grid_bot_hidden = tempGridBot;
                                }
                            }
                        }
                        //corrections for left
                        else {
                            if(x === 1) {
                                if
                                ( 
                                    //this is hard coded because my brain hurts i apologize
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][0] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][0] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][0]
                                ) {
                                    tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                    tempGridBot[bot_place_row][(bot_place_column + 1)] = app.playerTurn;
                                    app.grid_bot_hidden = tempGridBot;
                                }
                            }
                            else if(x === 1 || x === 2) {
                                if
                                ( 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][0] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][0] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][0] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][1] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][1] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][1]
                                ) {
                                    tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                    tempGridBot[bot_place_row][(bot_place_column + 1)] = app.playerTurn;
                                    tempGridBot[bot_place_row][(bot_place_column + 2)] = app.playerTurn;
                                    app.grid_bot_hidden = tempGridBot;
                                }
                            }
                            else if(x === 3) {
                                if
                                ( 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][0] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][0] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][0] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][1] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][1] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][2] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][2] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][2] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][2] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][2]
                                ) {
                                    tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                    tempGridBot[bot_place_row][(bot_place_column + 1)] = app.playerTurn;
                                    tempGridBot[bot_place_row][(bot_place_column + 2)] = app.playerTurn;
                                    tempGridBot[bot_place_row][(bot_place_column + 3)] = app.playerTurn;
                                    app.grid_bot_hidden = tempGridBot;
                                }
                            }
                            else {
                                if
                                ( 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][0] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][0] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][0] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][0] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][0] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][1] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][1] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][1] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][1] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][2] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][2] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][2] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][2] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][2] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[0][3] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[1][3] || tempGridBot[bot_place_row][bot_place_column] === tempGridBot[2][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[3][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[4][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[5][3] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[6][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[7][3] || 
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[8][3] ||
                                    tempGridBot[bot_place_row][bot_place_column] === tempGridBot[9][3]                                    
                                    
                                ) {
                                tempGridBot[bot_place_row][bot_place_column] = app.playerTurn;
                                tempGridBot[bot_place_row][(bot_place_column + 1)] = app.playerTurn;
                                tempGridBot[bot_place_row][(bot_place_column + 2)] = app.playerTurn;
                                tempGridBot[bot_place_row][(bot_place_column + 3)] = app.playerTurn;
                                tempGridBot[bot_place_row][(bot_place_column + 4)] = app.playerTurn;
                                app.grid_bot_hidden = tempGridBot;
                                }
                            }
                        }
                        //im sorry over
                    }
                    //player switch
                    app.playerTurn = 1;
                    //game is ready
                    app.gameReady = true;
                }
            }
            app.playerTurn = 1;
        },
        shootMissile: function(row, col) {
          //  console.log(this.playerTurn);
            if(app.playerTurn === 1) {
                //slice both of the bot's grids: hidden to see if the shot hit and visible to change what the player sees
                var tempGridHidden = app.grid_bot_hidden.slice(0);
                console.log(tempGridHidden[row][col]);
                var tempGridVisible = app.grid_bot_visible.slice(0);
                //if the "missile" hits the right spot, 
                if(tempGridHidden[row][col] === 2) {
                    console.log("That's a hit");
                    bot_hp--;
                    tempGridVisible[row][col] = "✓";
                    app.grid_bot_visible = tempGridVisible;
                    app.checkGame();
                } else {
                    console.log("That's a miss");
                    tempGridVisible[row][col] = "X";
                    app.grid_bot_visible = tempGridVisible;
                }
                app.playerTurn = 2;
            }
            if(app.playerTurn === 2) {
                //the row and col by the bot are chosen randomly and can be 1-9. Going to 10 lets the bot guess 9 approx. 20% of the time and the other 8 options 10% of the time. I am not sure how to do this otherwise to make this more even without more code with ranges.
                rowBot = parseInt((Math.random() * 9) + 1);
                colBot = parseInt((Math.random() * 9) + 1);
                if(rowBot === 10) {
                    rowBot = 9;
                }
                if(colBot === 10) {
                    colBot = 9;
                }
                //slice the grid of what the player has
                var tempGridPlayer = app.grid_player.slice(0);

                if(tempGridPlayer[rowBot][colBot] === 1) {
                    player_hp--;
                    tempGridPlayer[rowBot][colBot] = " ";
                    app.grid_player = tempGridPlayer;
                    app.checkGame();
                } else {
                    tempGridPlayer[rowBot][colBot] = "X";
                    app.grid_player = tempGridPlayer;
                }
                app.playerTurn = 1;
            }
        },
        checkGame: function() {
            if(player_hp === 0) {
                app.gameOver = true;
                app.winner2 = true;
            }

            if(bot_hp === 0) {
                app.gameOver = true;
                app.winner1 = true;
            }
        },
        //was originally going to be a useful function, but my for-loops made it useless. i'll still leave it in just as a way to know something i was thinking about
        checkShip: function() {
            if(placed_player === 5 & placed_bot > 0) {
                app.gameReady = true;
            }
            else {
                app.gameReady = false;
            }
        },
        beginGame: function() {
            app.placeShip();
            app.placeShip();
        }
    }
})