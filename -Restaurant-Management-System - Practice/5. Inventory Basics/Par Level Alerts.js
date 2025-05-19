function navigate(screen) {
      const validScreens = ["stockCount", "parAlerts", "wasteLog", "receiveDelivery", "recipeUsage"];
      const errorMsg = document.getElementById("errorMsg");

      if (validScreens.includes(screen)) {
        errorMsg.style.display = "none";
        alert("Navigating to: " + screen);
      } else {
        errorMsg.style.display = "block";
      }
    }

    function goHome() {
      alert("Returning to Home Page");
    }

    function editItem(button) {
      const row = button.closest("tr");
      const qtyCell = row.cells[1];
      const newQty = prompt("Enter new quantity:", qtyCell.textContent);
      if (newQty !== null && !isNaN(newQty) && Number(newQty) >= 0) {
        qtyCell.textContent = newQty;
        row.cells[3].textContent = new Date().toLocaleDateString();
        alert("Quantity updated!");
      } else {
        alert("Invalid quantity.");
      }
    }

    function addIngredient() {
      const ingredient = prompt("Enter ingredient name:");
      const quantity = prompt("Enter quantity:");
      const unit = prompt("Enter unit (e.g., Kg, L):");

      if (ingredient && !isNaN(quantity) && Number(quantity) >= 0 && unit) {
        const table = document.getElementById("stockTable").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        newRow.innerHTML = `
          <td>${ingredient}</td>
          <td>${quantity}</td>
          <td>${unit}</td>
          <td>${new Date().toLocaleDateString()}</td>
          <td><button onclick="editItem(this)">✏️</button></td>
        `;
        alert("Ingredient added successfully!");
      } else {
        alert("Invalid input. Please try again.");
      }
    }

    function acknowledgeAlert(button) {
      const row = button.closest("tr");
      row.remove();
      alert("Alert acknowledged and removed.");
    }