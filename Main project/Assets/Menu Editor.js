function addCategory() {
  const category = prompt("Enter new category name:");
  if (category) {
    const ul = document.getElementById("categoryList");
    const li = document.createElement("li");
    li.textContent = category;
    ul.appendChild(li);
  }
}

function saveChanges() {
  const name = document.getElementById("itemName").value.trim();
  const price = document.getElementById("itemPrice").value.trim();

  if (!name || !price || isNaN(price)) {
    alert("Please enter a valid item name and numeric price.");
    return;
  }
  alert("Changes saved successfully!");
}

function syncNow() {
  alert("Menu synced across all devices!");
}

function deleteItem(btn) {
  const card = btn.parentElement;
  card.remove();
}