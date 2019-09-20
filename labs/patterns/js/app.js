//class Ball is a module pattern. It is a set of code that allows me to create several balls that would be independent from one another.
class Ball {
  
    constructor() {
      this.position = { x: 100, y: 100 };
      this.velocity = { x: 10, y: 0 };
    }
    
    update() {
      
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      
      circle(this.position.x, this.position.y, 20);
      
      if(this.position.x < 0 || this.position.x > 400) {
        World.ballBeyond(this);
        box0.grow();
        box1.grow();
      }
    }
    
  }
  //var World is a singleton pattern because it creates all balls after the first in a way that doesn't interfere with anything else
  var World = {
    bgcolor: [237, 119, 83],
    ballBeyond: function(whichBall) {
      this.bgcolor = [ Math.random()*255, Math.random()*255, 83 ];
      whichBall.position.x = 100;
      whichBall.velocity.x = (Math.random() - .5) * 20;
    }
  }
  
  var ball = new Ball();
  
  //class Box is an observer pattern. Class Box waits for var ball to hit the edge of the screen, with then prompts the grow() function. grow() makes the width and height of Box grow by 5.
  class Box {
    constructor() {
        this.position = {x: parseInt(Math.random() * 200), y: parseInt(Math.random() * 150) };
        this.width = 20;
        this.height = 20;
    }
    placeBox() {
        rect(this.position.x, this.position.y, this.width, this.height);
    }

    grow() {
        this.width += 5;
        this.height += 5;
    }
    
}
var box0 = new Box();
var box1 = new Box();

  
  function setup() {
    createCanvas(400,300);
    
  }
  
  function draw() {
    background( World.bgcolor );
    ball.update();
    box0.placeBox();
    box1.placeBox();
  }