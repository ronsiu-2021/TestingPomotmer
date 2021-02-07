//////// Default Timer ////////

var sessionMinutes = 25; //default minute
var sessionSeconds = "00"; //default second


// Starting template for the timer
function template () {
    // Show the element as string especailly for second to show as 00
    document.getElementById("minutes").innerHTML = sessionMinutes;
    document.getElementById("seconds").innerHTML = sessionSeconds;
}


//////// States ////////
let breakState = false;
let completedCycles = 2;
let cycleCount = 6 - completedCycles;

//////// Audio files ////////
var click_sound = new Audio("click.mp3");
var bell = new Audio("bell.mp3");

//////// Section for header nav ////////
const todayDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const date = todayDate.toLocaleDateString('en-us', options);
document.getElementById("date").innerHTML = date;


//////// Section for Cycle count ////////

// create unfilled circle for incomplete cycle
for (var i = 0; i < cycleCount; i++) {
    let newCyble = document.createElement('span');
    newCyble.innerHTML = ' <span class="dot"></span>';
    document.getElementById("cycle-count").prepend(newCyble);
}

// create filled circle for completed cycle
for (var i = 0; i < completedCycles; i++) {
    let newCyble = document.createElement('span');
    newCyble.innerHTML = ' <span class="filled-dot"></span>';
    document.getElementById("cycle-count").prepend(newCyble);
}

const cycleText = document.getElementById("completed-cycle");
cycleText.innerText = "| Completed Cycles: " + completedCycles;




//////// Session for Timer countdown ////////
function start_timer () {
    click_sound.play();

    // Change the minutes and seconds to starting time
    sessionMinutes = 1;
    sessionSeconds = 59;

    // Add the seconds and minutes to the page
    document.getElementById("minutes").innerHTML = sessionMinutes;
    document.getElementById("seconds").innerHTML = sessionSeconds;

    // Start the countdown
    var minutes_interval = setInterval(minutesTimer, 60000);
    var seconds_interval = setInterval(secondsTimer, 1000);

    // Functions
    // Function for minute counter
    function minutesTimer () {
        sessionMinutes = sessionMinutes - 1;
        document.getElementById("minutes").innerHTML = sessionMinutes;
    }

    // Function for second counter
    function secondsTimer () {
        sessionSeconds = sessionSeconds - 1;
        document.getElementById("seconds").innerHTML = sessionSeconds;

        // Check if the seconds and minutes counter has reached 0
        // If reached 0 then end the session
        if (sessionSeconds <= 0) {
            if (sessionMinutes <= 0) {
                // Clears the interval i.e. stops the counter
                clearInterval(minutes_interval);
                clearInterval(seconds_interval);
                doneMessage();
            }
            // Reset the session seconds to 60
            sessionSeconds = 60;
        }
    }
}

function doneMessage () {
    document.getElementById("done").innerHTML = "Session Completed!! Take a Break";
    document.getElementById("done").classList.add("show_message");
    bell.play();
}

/////////////// Section for distracted counter //////////////
var count = 0;
document.getElementById('distraction-counter').addEventListener("click", function (event) {
    event.preventDefault();
    count++;
    if (count !== 0) {
        document.getElementById('distraction-counter').innerHTML = "Distraction: " +
            count;
    }
});