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

    function calculateIngredients() {
      const qty = parseInt(document.getElementById("qtySold").value);
      const output = document.getElementById("usageOutput");

      if (isNaN(qty) || qty <= 0) {
        output.innerHTML = "<p style='color:red;'>Please enter a valid quantity.</p>";
        return;
      }

      const chickenUsed = qty * 0.5;
      const onionUsed = qty * 0.2;

      output.innerHTML = `
        <p>→ Chicken used: ${chickenUsed} Kg</p>
        <p>→ Onion used: ${onionUsed} Kg</p>
      `;
    }

    function updateStock() {
      const qty = parseInt(document.getElementById("qtySold").value);
      if (isNaN(qty) || qty <= 0) {
        alert("Please enter a valid quantity first.");
        return;
      }
      alert("Stock updated based on recipe usage for " + qty + " dishes sold.");
    }