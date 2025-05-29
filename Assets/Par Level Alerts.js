// Par levels threshold for each ingredient
const parLevels = {
  Chicken: 10,
  Tomatoes: 15,
  Onion: 4,
  // Add other ingredients and par levels here as needed
};

// Navigate between pages
function navigate(screen) {
  const validScreens = ["stockCount", "parAlerts", "wasteLog", "receiveDelivery", "recipeUsage"];
  const errorMsg = document.getElementById("errorMsg");

  if (validScreens.includes(screen)) {
    errorMsg.style.display = "none";

    const screenToPage = {
      stockCount: "Stock Count.html",
      wasteLog: "Waste Log .html",
    
    };

    window.location.href = screenToPage[screen];
  } else {
    errorMsg.style.display = "block";
  }
}

// Redirect Home button to Inventory Dashboard page
function goHome() {
  window.location.href = "Inventory Dashboard.html";
}

// Refresh par level alerts based on current stock
function refreshParLevelAlerts() {
  const alertTableBody = document.querySelector("#alertTable tbody");
  alertTableBody.innerHTML = ""; // Clear existing alerts

  const stockTableBody = document.querySelector("#stockTable tbody");
  const rows = stockTableBody.querySelectorAll("tr");

  rows.forEach(row => {
    const ingredient = row.cells[0].textContent.trim();
    const currentQty = parseFloat(row.cells[1].textContent.trim());

    if (parLevels.hasOwnProperty(ingredient)) {
      const parLevel = parLevels[ingredient];
      if (currentQty < parLevel) {
        const alertRow = document.createElement("tr");
        alertRow.innerHTML = `
          <td>⚠️ ${ingredient} stock below par (${currentQty} &lt; ${parLevel})</td>
          <td>
            <button onclick="acknowledgeAlert(this)">🔘 Acknowledge</button>
            <button onclick="navigate('stockCount')">🔄 Update Stock</button>
          </td>
        `;
        alertTableBody.appendChild(alertRow);
      }
    }
  });
}

// Edit quantity of an item in the stock table
function editItem(button) {
  const row = button.closest("tr");
  const qtyCell = row.cells[1];
  const newQty = prompt("Enter new quantity:", qtyCell.textContent);
  if (newQty !== null && !isNaN(newQty) && Number(newQty) >= 0) {
    qtyCell.textContent = Number(newQty);
    row.cells[3].textContent = new Date().toLocaleDateString();
    alert("Quantity updated!");
    refreshParLevelAlerts();
  } else {
    alert("Invalid quantity.");
  }
}

// Add new ingredient to the stock table
function addIngredient() {
  const ingredient = prompt("Enter ingredient name:");
  const quantity = prompt("Enter quantity:");
  const unit = prompt("Enter unit (e.g., Kg, L):");

  if (
    ingredient &&
    ingredient.trim() !== "" &&
    !isNaN(quantity) &&
    Number(quantity) >= 0 &&
    unit &&
    unit.trim() !== ""
  ) {
    const table = document.getElementById("stockTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
      <td>${ingredient.trim()}</td>
      <td>${Number(quantity)}</td>
      <td>${unit.trim()}</td>
      <td>${new Date().toLocaleDateString()}</td>
      <td><button onclick="editItem(this)">✏️</button></td>
    `;
    alert("Ingredient added successfully!");
    refreshParLevelAlerts();
  } else {
    alert("Invalid input. Please try again.");
  }
}

// Remove an alert row after acknowledgement
function acknowledgeAlert(button) {
  const row = button.closest("tr");
  row.remove();
  alert("Alert acknowledged and removed.");
}

// Initialize alert refresh on page load
window.onload = function () {
  refreshParLevelAlerts();
};
