var inactivityTimer; // Holds the inactivity timeout

// Start/resume the game: hide intro, show game container.
function startGame() {
  var introScreen = document.getElementById("introScreen");
  var gameContainer = document.getElementById("gameContainer");

  // Fade out the intro overlay.
  introScreen.style.opacity = "0";
  
  // Make the game container visible and interactive.
  gameContainer.style.pointerEvents = "auto";
  gameContainer.style.opacity = "1";
  
  // After the transition, remove the intro overlay and start the inactivity timer.
  setTimeout(function() {
    introScreen.style.display = "none";
    startInactivityTimer();
  }, 500);
}

// Return to the intro screen ("Return Home").
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

// Start a 60-second inactivity timer.
function startInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(goToIntro, 60000); // 60,000 ms = 60 seconds.
}

// Reset the inactivity timer on user activity.
function resetInactivityTimer() {
  var introScreen = document.getElementById("introScreen");
  // Only reset if the game container is active (introScreen hidden).
  if (introScreen.style.display === "none") {
    startInactivityTimer();
  }
}

// Attach event listeners.
document.getElementById("startGameBtn").addEventListener("click", startGame);
document.getElementById("backToIntroBtn").addEventListener("click", goToIntro);
document.addEventListener("mousemove", resetInactivityTimer);
document.addEventListener("keydown", resetInactivityTimer);
document.addEventListener("touchstart", resetInactivityTimer);
