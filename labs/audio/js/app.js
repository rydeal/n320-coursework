var soundButtons = document.getElementById("soundButtons");

var sounds = [
    "chimes_long.mp3", "click_clock_loop.mp3", "pop_10.mp3","puff.mp3", "rustle_5.mp3"
];

var soundElements = [];

// put all sounds on page through loop
sounds.forEach((soundURL, idx) => {
    // the sound itself
    var newSound = new Audio( "sounds/" + soundURL );
    // puts all sounds in an array for later
    soundElements.push(newSound);

    // making a button to play the sound
    var newButton = document.createElement("button");

    // renaming the buttons
    if(idx == 0) {
        newButton.innerHTML = "Chimes";
    } else if(idx == 1) {
        newButton.innerHTML = "Click Clock";
    } else if(idx == 2) {
        newButton.innerHTML = "Pop";
    } else if(idx == 3) {
        newButton.innerHTML = "Puff";
    } else if(idx == 4) {
        newButton.innerHTML = "Rustle";
    }

    // put the sound's index on the button
    newButton.setAttribute("data-sound-id", idx)

    // add the button to the page
    soundButtons.appendChild(newButton);

    // listening for a button click, sound is played after
    newButton.addEventListener("click", playSoundInArray);
})

function playSoundInArray(event) {
    // getting the button that was clicked
    var soundIndex = Number(event.target.getAttribute("data-sound-id"));

    // grabbing the sound from the array
    var selectedSound = soundElements[soundIndex];

    selectedSound.play();
}