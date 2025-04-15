var inactivityTimer; // Holds the inactivity timeout

// Start/resume the game: hide the intro overlay and show the game.
function startGame() {
  var introScreen = document.getElementById("introScreen");
  var backButton = document.getElementById("backToIntroBtn");

  // Fade out the intro overlay and disable its interactions.
  introScreen.style.opacity = "0";
  introScreen.style.pointerEvents = "none";
  
  // After the fade, remove the overlay from display and show the Return Home button.
  setTimeout(function() {
    introScreen.style.display = "none";
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
  
  // Show the intro overlay.
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

// Reset the inactivity timer upon any user interaction.
function resetInactivityTimer() {
  var introScreen = document.getElementById("introScreen");
  // Only reset if the intro overlay is hidden (i.e. the game is active).
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
