var canvas = document.getElementById("renderCanvas");
var rgCost = document.getElementById("rgCost");
var infoBox = document.getElementById("infoBox");
var filterButtons = document.querySelectorAll(".filterNav");
var camera, scene, data, selectedPieces;
var selectedType = "all";

// Getting the json file
fetch("data/furniture.json", { method: 'get' })
    .then(response => response.json())
    .then((jsonData) => {
        // json data
        data = jsonData;

        // loading all models
        data.furniture.forEach((piece, idx) => {
            var p = BABYLON.SceneLoader.ImportMesh(
                "", "./models/house/", piece.asset, scene,
                (meshes) => {
                    var containerNode = new BABYLON.TransformNode("nice");
                    piece.asset = containerNode;
                    piece.asset.dataId = idx;

                    meshes.forEach((mesh) => {
                        mesh.parent = containerNode;
                    })
                    // TweenMax.to(piece.asset.position, 10, { y: 4});
                }
            );

        })

        console.log(data);
    })

var engine = new BABYLON.Engine(canvas, true);

scene = createScene();
// Rendering the scene
engine.runRenderLoop(function() {
    scene.render();
})

// Making the scene
function createScene() {
    var scene = new BABYLON.Scene(engine);

    // Creating the camera
    camera = new BABYLON.ArcRotateCamera(
        "camera", Math.PI / 2, Math.PI / 4,
        4, BABYLON.Vector3.Zero(), scene
    );

    // Putting some light into the scene
    var light = new BABYLON.DirectionalLight(
        "1", new BABYLON.Vector3(0, -.5, 1.0), scene
    )

    /*
    var bed = BABYLON.SceneLoader.Append(
        "./models/house/",
        "bathroomMirror.obj",
        scene
    );
    */
    return scene;
}

function selectType(event) {
    // Getting what is selected
    selectedType = event.target.getAttribute("data-type");

    // Resetting what is picked
    filterButtons.forEach((button) => { button.classList.remove("selected") });
    // Adding a class to what is selected
    event.target.classList.add("selected");
}

function showAvailable() {
    // Getting the amount of the slider cost
    var amount = Number(rgCost.value);
    // Filtering selected pieces based on price
    selectedPieces = data.furniture.filter((piece) => {
        // Filter only on price if it is all
        if(selectedType = "all") {
            return piece.price < amount;
        } else {
            // Filters price and type otherwise
            return (piece.price < amount) && (piece.type == selectedType);
        }
    })
    // Hides pieces
    data.furniture.forEach((piece) => {
        TweenLite.to(piece.asset.position, .7, { y: 5, onComplete: showFiltered })
    })
}

// Animates the options that are less than the amount back in
function showFiltered() {
    selectedPieces.forEach((piece, idx) => {
        TweenLite.to(piece.asset.position, .7, { y: 0, x: idx})
    })
}

// If there's a click, grab the object
window.addEventListener("click", function() {
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    var selectedObject = pickResult.pickedMesh;
    if(selectedObject) {
        // Grab object id
        var dataId = selectedObject.parent.dataId; 
        // Grab rest of the object
        var itemInfo = data.furniture[dataId];
        // Ouputting the item information onto the page
        infoBox.innerHTML = `${itemInfo.style} ${itemInfo.type} : $${itemInfo.price}`;
    }
})