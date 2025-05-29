function navigate(screen) {
  const screenMap = {
    stockCount: "Stock Count.html",
    parAlerts: "Par Level Alerts.html",
    wasteLog: "Waste Log.html", // Make sure filename does NOT have extra space
    receiveDelivery: "Receive Delivery.html",
    recipeUsage: "Recipe Usage.html"
  };

  const errorMsg = document.getElementById("errorMsg");

  if (screenMap.hasOwnProperty(screen)) {
    errorMsg.style.display = "none";
    window.location.href = screenMap[screen];
  } else {
    errorMsg.style.display = "block";
  }
}

function goHome() {
  // Adjust this path to your actual home page if needed
  window.location.href = "Home Dashboard.html";
}
