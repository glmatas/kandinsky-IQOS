var inactivityTimer; // Holds the inactivity timeout

// Start/resume the game: hide the intro overlay so that the canvas can be interacted with.
function startGame() {
  var introScreen = document.getElementById("introScreen");
  var backButton = document.getElementById("backToIntroBtn");

  // Fade out the intro overlay.
  introScreen.style.opacity = "0";
  introScreen.style.pointerEvents = "none";
  
  // After 500ms (allowing the transition to finish), hide the overlay completely.
  setTimeout(function() {
    introScreen.style.display = "none";
    // Show the Return Home button.
    backButton.style.display = "block";
    startInactivityTimer();
  }, 500);
}

// Return to the intro screen ("Return Home").
function goToIntro() {
  var introScreen = document.getElementById("introScreen");
  var backButton = document.getElementById("backToIntroBtn");
  
  // Clear the inactivity timer.
  clearTimeout(inactivityTimer);
  
  // Display and fade in the intro overlay.
  introScreen.style.display = "flex";
  introScreen.style.pointerEvents = "auto";
  setTimeout(function() {
    introScreen.style.opacity = "1";
  }, 50);
  
  // Hide the Return Home button.
  backButton.style.display = "none";
}

// Start a 60-second inactivity timer.
function startInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(goToIntro, 60000); // 60 seconds
}

// Reset the inactivity timer on any user interaction.
function resetInactivityTimer() {
  // Only reset the timer if the intro overlay is currently hidden.
  if (document.getElementById("introScreen").style.display === "none") {
    startInactivityTimer();
  }
}

// Attach event listeners.
document.getElementById("startGameBtn").addEventListener("click", startGame);
document.getElementById("backToIntroBtn").addEventListener("click", goToIntro);
document.addEventListener("mousemove", resetInactivityTimer);
document.addEventListener("keydown", resetInactivityTimer);
document.addEventListener("touchstart", resetInactivityTimer);
