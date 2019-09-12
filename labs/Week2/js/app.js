let dropCount = 0;
let blueCount = 0;
let blue0 = rgb(126, 249, 255);
let blue1 = rgb(87, 160, 211);
let blue2 = rgb(70, 130, 180);
let blue3 = rgb(15, 82, 186);
let blue4 = rgb(0, 0, 128);
let blue5 = rgb(0, 0, 100);
let blue6 = rgb(0, 0, 80);
let blue7 = rgb(0, 0, 50);
let blueColors = [blue0, blue1, blue2, blue3, blue4, blue5, blue6, blue7];
class Drop {
    constructor() {
        this.x = 40;
        this.y = 0;
    }

    update() {
        this.y++;
        fill(0, 0, 100);
        circle(this.x, this.y, 5);
    }
}

//Ryan Deal
//NEWMN 320
//9.5.19

let d = new Drop();

function setup() {
createCanvas(400, 300);
fill('green');
rect(0, 289, 300, 10);
}

function draw() {
    d.update();
    if(d.y == 289) {
        dropCount++;
        if(dropCount >= 0) {
            blueCount++;
            dropCount = 0;
        }
        console.log(dropCount);
    }
}

class rainCloud {
    constructor() {
        this.drops = [];
    }

    createDrop() {
       // if((blueCount != 0) && (dropCount == 0)) {

      //  }
        //stub
    }
}
