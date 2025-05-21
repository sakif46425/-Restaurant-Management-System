function navigate(screen) {
      const validScreens = ["stockCount", "parAlerts", "wasteLog", "receiveDelivery", "recipeUsage"];
      const errorMsg = document.getElementById("errorMsg");

      if (validScreens.includes(screen)) {
        errorMsg.style.display = "none";
        alert("Navigating to: " + screen);
        // Replace alert with real navigation logic as needed
      } else {
        errorMsg.style.display = "block";
      }
    }

    function goHome() {
      alert("Returning to Home Page");
      // Add real navigation if needed
    }