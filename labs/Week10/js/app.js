var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var camera;
// Variables that will help with checking rotation and last clicked
var box1rotation = null;
var lastclick1 = null;
var box2rotation = null;
var lastclick2 = null;
var box3rotation = null;
var lastclick3 = null;

var sphere, light, blueMat;
var selectedMesh = null;

var scene = createScene(); //Call the createScene function

function createScene() {

  // Create the scene space
  var scene = new BABYLON.Scene(engine);

  // Add a camera to the scene and attach it to the canvas
  camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  
  // Add lights to the scene
  var myLight = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, 1.0), scene);

  // Add and manipulate meshes in the scene
  box = BABYLON.MeshBuilder.CreateBox("box", {diameter: .2}, scene);
  box2 = BABYLON.MeshBuilder.CreateBox("box2", {diameter: .2}, scene);
  box3 = BABYLON.MeshBuilder.CreateBox("box3", {diameter: .2}, scene);
  box2.position.x = 1.25;
  box3.position.x = -1.25;
  
  light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(1, 1, 0), scene);

  blueMat = new BABYLON.StandardMaterial("ground", scene);
    blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    blueMat.emissiveColor = BABYLON.Color3.Blue();
  
  whiteMat = new BABYLON.StandardMaterial("ground", scene);
    whiteMat.diffuseColor = new BABYLON.Color3(1, 1, 1);
    whiteMat.specularColor = new BABYLON.Color3(1, 1, 1);
    whiteMat.emissiveColor = BABYLON.Color3.White();
  
  greenMat = new BABYLON.StandardMaterial("ground", scene);
    greenMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
    greenMat.specularColor = new BABYLON.Color3(0, 1, 0);
    greenMat.emissiveColor = BABYLON.Color3.Green();
  return scene;
};


// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () { 
  
  scene.render();
});


function checkUp() {
  // Picks a box rotated based on its position and then assigns their variable the rotation of the box
    if(selectedMesh.position.x == 1.25) {
      box2rotation = selectedMesh.rotation.x;
    }
    else if(selectedMesh.position.x == -1.25) {
      box3rotation = selectedMesh.rotation.x;
    }
    else {
      box1rotation = selectedMesh.rotation.x;
    }
    // Check for the rotation of all boxes with the variables
    if( (box1rotation == box2rotation) && (box1rotation == box3rotation) ) {
      box.material = greenMat;
      box2.material = greenMat;
      box3.material = greenMat;
    }
}

window.addEventListener("keydown", (event) => {

    if(selectedMesh) {
        if(event.keyCode == 87) {
            TweenLite.to(selectedMesh.rotation, 1, { x: "+=2", onComplete: checkUp });
        }
    }

    if(selectedMesh) {
        if(event.keyCode == 83) {
            TweenLite.to(selectedMesh.rotation, 1, { x: "-=2", onComplete: checkUp});
        }
    }

})

window.addEventListener("click", function () {
    // The scene looks at the x and y of the cursor and sees if it is within an object
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    // The object is made blue
    pickResult.pickedMesh.material = blueMat;
    // The object is indicated as selectedMesh
    selectedMesh = pickResult.pickedMesh;
    // Checks the variables; if one is equal to 1, it becomes white. This won't happen on the first time
    if(lastclick1 == 1) {
      box.material = whiteMat;
    } else if(lastclick2 == 1) {
      box2.material = whiteMat;
    } else if(lastclick3 == 1) {
      box3.material = whiteMat;
    }

    // Assigns the box that just got clicked on the lastclick variable for the second click and on 
    if(selectedMesh.position.x == 1.25) {
      lastclick2 = 1;
      lastclick3 = 0;
      lastclick1 = 0;
    } else if(selectedMesh.position.x == -1.25) {
      lastclick3 = 1;
      lastclick2 = 0;
      lastclick1 = 0;
    } else {
      lastclick1 = 1;
      lastclick3 = 0;
      lastclick2 = 0;
    }
 })