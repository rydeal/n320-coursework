var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var camera, scene, sphere;
t = 0;

function createScene() {
    var scene = new BABYLON.Scene(engine);

    camera = new BABYLON.ArcRotateCamera("Camera", 
    Math.PI / 2, Math.PI / 4, 
    4, BABYLON.Vector3.Zero(),
    scene);

    camera.attachControl(canvas, true);

    return scene;
}

var scene = createScene(); 
engine.runRenderLoop(function () { 

    t += .0001;

    sphere.scaling.x += Math.sin(t);
    sphere.scaling.y += Math.sin(t);
    sphere.scaling.z += Math.sin(t);

    scene.render();
});

var light = new BABYLON.DirectionalLight("lllllll", new BABYLON.Vector3(0, -0.5, 1.0), scene);
var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: .5}, scene);
