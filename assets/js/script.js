var inactivityTimer; // Holds the inactivity timeout

// Function to start/resume the game: hide the intro, show the game view.
function startGame() {
  var introScreen = document.getElementById("introScreen");
  var gameContainer = document.getElementById("gameContainer");

  // Fade out the intro overlay.
  introScreen.style.opacity = "0";
  
  // Enable the game view by setting it visible and interactive.
  gameContainer.style.pointerEvents = "auto";
  gameContainer.style.opacity = "0";
  
  // After transition, remove the intro overlay from display and start the inactivity timer.
  setTimeout(function() {
    introScreen.style.display = "none";
    startInactivityTimer();
  }, 500);
}

// Function to return to the intro (i.e. "Return Home").
function goToIntro() {
  var introScreen = document.getElementById("introScreen");
  var gameContainer = document.getElementById("gameContainer");
  
  // Clear any running inactivity timer.
  clearTimeout(inactivityTimer);
  
  // Show the intro overlay.
  introScreen.style.display = "flex";
  setTimeout(function() {
    introScreen.style.opacity = "1";
  }, 50);
  
  // Hide the game container.
  gameContainer.style.opacity = "0";
  gameContainer.style.pointerEvents = "none";
}

// Function to start a 60‑second inactivity timer.
function startInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(goToIntro, 60000); // 60,000 ms = 60 seconds.
}

// Function to reset the inactivity timer on user activity.
function resetInactivityTimer() {
  // Only reset if the game view is active (i.e. introScreen is hidden).
  var introScreen = document.getElementById("introScreen");
  if (introScreen.style.display === "none") {
    startInactivityTimer();
  }
}

// Attach event listeners for the Start Game and Return Home buttons.
document.getElementById("startGameBtn").addEventListener("click", startGame);
document.getElementById("backToIntroBtn").addEventListener("click", goToIntro);

// Reset inactivity timer on user interactions.
document.addEventListener("mousemove", resetInactivityTimer);
document.addEventListener("keydown", resetInactivityTimer);
document.addEventListener("touchstart", resetInactivityTimer);
