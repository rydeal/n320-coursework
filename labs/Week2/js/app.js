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

}

function draw() {
    d.update();
}

class rainCloud {
    constructor() {
        this.drops = [];
    }

    createDrop() {
        //stub
    }
}
