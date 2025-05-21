function goHome() {
      alert("Returning to Home Page");
    }

    function navigate(screen) {
      const validScreens = ["stockCount", "parAlerts", "wasteLog", "receiveDelivery", "recipeUsage"];
      if (!validScreens.includes(screen)) {
        alert("Invalid screen selected.");
        return;
      }
      alert("Navigating to: " + screen);
    }

    function logWaste() {
      const date = prompt("Enter date (e.g., May 9):");
      const ingredient = prompt("Enter ingredient:");
      const qty = prompt("Enter quantity (e.g., 2L):");
      const reason = prompt("Enter reason (e.g., Spoiled):");
      const staff = prompt("Logged by (e.g., Staff 1):");

      if (date && ingredient && qty && reason && staff) {
        const table = document.getElementById("wasteTable").getElementsByTagName("tbody")[0];
        const newRow = table.insertRow();
        newRow.innerHTML = `
          <td>${date}</td>
          <td>${ingredient}</td>
          <td>${qty}</td>
          <td>${reason}</td>
          <td>${staff}</td>
        `;
        alert("Waste logged successfully!");
      } else {
        alert("All fields are required.");
      }
    }