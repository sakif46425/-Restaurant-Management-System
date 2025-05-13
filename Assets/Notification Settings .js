document.getElementById("notificationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing page
  
    const settings = {
      orderEmail: this.orderEmail.checked,
      tablePush: this.tablePush.checked,
      lowInventoryEmail: this.lowInventoryEmail.checked,
      staffApp: this.staffApp.checked
    };
  
    console.log("Saved settings:", settings);
  
    // Simple validation: at least one alert must be active
    if (!Object.values(settings).includes(true)) {
      alert("Please enable at least one notification method.");
      return;
    }
  
    alert("Notification settings saved successfully!");
  });
  