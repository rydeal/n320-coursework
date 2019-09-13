//Ryan Deal
//NEWMN 320
//9.12.19
let dropCount = 0;
let blueCount = 0;
//Fix the error by removing the # and putting concatinating with '#' + 
let blue0 = '69C0FF';
let blue1 = '57A0D3';
let blue2 = '4682B4';
let blue3 = '0F52BA';
let blue4 = '000080'; 
let blue5 = '000064';
let blue6 = '000050';
let blue7 = '000032';
//the background would turn white for a second otherwise
let blue8 = '000032';
let blueColors = [blue0, blue1, blue2, blue3, blue4, blue5, blue6, blue7, blue8];
class Drop {
    constructor() {
        this.x = parseInt(Math.random() * 250) + 100;
        this.y = 0;
    }

    update() {
        this.y++;
        fill(0, 0, 100);
        circle(this.x, this.y, 5);
        fill('#' + blueColors[blueCount]);
        rect(0, 289, 400, 10);
    }
}

class Cloud {
    constructor() {
        this.drops = [];
    }

    createDrop() {
      //make a new drop
      let newDrop = new Drop();

      //put drops into array
      this.drops.push(newDrop);
    }

    update() {
        //used the stuff that i didn't take from below from the n320 rainlab2 yt video
        for(let i = 0; i < this.drops.length; i++) {
            this.drops[i].update();
            if(this.drops[i].y == 289) {
                dropCount++;
                if(dropCount >= 10) {
                    if(blueCount > 7) {
                        location.reload();
                    }
                    fill('#' + blueColors[blueCount]);
                    rect(0, 289, 300, 10);
                    blueCount++;
                    dropCount = 0;
                }
                console.log(dropCount);
            }
        }
    }
}

//global variables
let rainCloud = new Cloud();

function setup() {
createCanvas(400, 300);
fill('#' + blueColors[blueCount]);
rect(0, 289, 300, 10);
}

function draw() {
    background('purple');
    if(Math.random() < .03) {
        rainCloud.createDrop();
    }
    //put this up in Cloud's update() and it worked apparently
    // if(.y == 289) {
    //     dropCount++;
    //     if(dropCount >= 10) {
    //         fill('#' + blueColors[blueCount]);
    //         rect(0, 289, 300, 10);
    //         blueCount++;
    //         dropCount = 0;
    //     }
    //     console.log(dropCount);
    // }
    rainCloud.update();

}