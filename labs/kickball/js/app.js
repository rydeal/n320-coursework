// Making the space to render our objects
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var camera, scene, ball, wall, timeoutId, particleSystem;

// Running the function to create a basic scene
scene = createScene();
engine.runRenderLoop(function() {
    scene.render();
})

// Checking every frame for collision of ball and wall
scene.registerAfterRender(function() {
    if(ball.intersectsMesh(wall, false)) {

        // Randomizing where the wall moves around
        wall.position.x = (Math.random() * 10) - 4;

        // Making particles on collision
        particleSystem.manualEmitCount = 21;
        particleSystem.start();
        particleSystem.minEmitBox = ball.position;

        
        // Function to put ball back at 0,0,0 with 0 speed
        resetBall();
    }
})


// Function that sets up the scene and camera
function createScene() {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.UniversalCamera("UC", new BABYLON.Vector3(0, 0, -15), scene);

    // Putting light in the scene so the ball isn't just black
    var light = new BABYLON.DirectionalLight("balllight", new BABYLON.Vector3(0, -.2, .2), scene);

    // Physics for the scene
    var gravityVector = BABYLON.Vector3(0, -9.81, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);

    // Creating a ball that goes into the scene
    ball = BABYLON.MeshBuilder.CreateSphere("kickball", { diameter: 1}, scene);
    // Making the ball look like a soccer ball
    var ballMaterial = new BABYLON.StandardMaterial("ballMat", scene);
    ballMaterial.diffuseTexture = new BABYLON.Texture('images/ball.png', scene);
    ball.material = ballMaterial;
    // Making the ball fall
    ball.physicsImpostor = new BABYLON.PhysicsImpostor(
        ball, BABYLON.PhysicsImpostor.SphereImpostor,
        { mass: 1, restitution: .2 }, scene
    );

    ball.tag = "ball";

    // Creating the ground for the ball to be on
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { height: 20, width: 20, subdivions: 4}, scene);
    ground.position.y = -3;
    ground.position.z = 9;
    // Making the ground look like grass
        var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture('images/ground.png', scene);
        ground.material = groundMaterial;
    // Making it so the ball will actually land on the ground
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground, BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0.9 }, scene 
    );

    // Making the wall and setting its position
    wall = new BABYLON.MeshBuilder.CreateBox("goal", { height: 5, width: 5}, scene);
    // Without this, the wall would be directly on top of the ball
    wall.position.z = 7;
    wall.position.x = (Math.random() * 10) - 4;

    // Making the wall look like a goal
    var wallMaterial = new BABYLON.StandardMaterial("wallMat", scene);
    wallMaterial.diffuseTexture = new BABYLON.Texture('images/wall.png', scene);
    wall.material = wallMaterial;

    // Making particles
    particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    particleSystem.emitter = new BABYLON.Vector3(0, 0, 0);
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.addVelocityGradient(0, 2);

    // Particle texture
    particleSystem.particleTexture = new BABYLON.Texture("images/feather.png", scene);

    return scene;
}

function resetBall() {
    // The ball is placed back at 0, 0, 0
    ball.position = new BABYLON.Vector3();

    // The ball's speed is set back to 0
    ball.physicsImpostor.setLinearVelocity( new BABYLON.Vector3() );
    ball.physicsImpostor.setAngularVelocity( new BABYLON.Vector3() );

    // This gets rid of any remaining timeout, which helps solve the issue of 2 resets happening on collision with the wall
    clearTimeout( timeoutId );
}

window.addEventListener("click", function() {
    
    // Checking what mesh was clicked on once there is a click detected
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    var selectedObject = pickResult.pickedMesh;

    // Checking if the clicked object actually exists
    if(selectedObject) {

        if(selectedObject.tag == "ball") {
            // Makes the direction the opposite of where was clicked
            var surfaceNormal = pickResult.getNormal(true);
            var forceDirection = surfaceNormal.scale(-1000); 

            // Moving the ball
            selectedObject.physicsImpostor.applyForce(
                // This code was a static example of applying force
                //new BABYLON.Vector3(0, 100, 0),
                // This code is dynamic based on click
                forceDirection,
                selectedObject.getAbsolutePosition()
            )

            timeoutId = setTimeout(resetBall, 3000);
        }
    }
})