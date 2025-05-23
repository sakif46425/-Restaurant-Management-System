// Add a new category to the list
function addCategory() {
  const category = prompt("Enter new category name:");
  if (category) {
    const ul = document.getElementById("categoryList");
    const li = document.createElement("li");
    li.textContent = category;
    ul.appendChild(li);
  }
}

// Delete a category by name
function deleteCategory() {
  const ul = document.getElementById("categoryList");
  const categories = ul.getElementsByTagName("li");

  if (categories.length === 0) {
    alert("No categories to delete.");
    return;
  }

  const categoryToDelete = prompt("Enter the exact category name to delete:");
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].textContent === categoryToDelete) {
      ul.removeChild(categories[i]);
      alert(`Category "${categoryToDelete}" deleted.`);
      return;
    }
  }

  alert("Category not found.");
}

// Navigate back to Menu Home
function goBack() {
  window.location.href = "Menu Home.html";
}

// Validate the first item's inputs
function saveChanges() {
  const name = document.getElementById("itemName").value.trim();
  const price = document.getElementById("itemPrice").value.trim();

  if (!name || !price || isNaN(price)) {
    alert("Please enter a valid item name and numeric price.");
    return;
  }

  alert("Changes saved successfully!");
}

// Simulate syncing the menu
function syncNow() {
  alert("Menu synced across all devices!");
}

// Delete an individual item card
function deleteItem(btn) {
  const card = btn.parentElement;
  card.remove();
}

// Add a new item card
function addItem() {
  const menuItems = document.getElementById("menuItems");

  const card = document.createElement("div");
  card.className = "item-card";
  card.innerHTML = `
    <input type="text" placeholder="Item Name" />
    <input type="number" placeholder="Price" />
    <label>
      <input type="checkbox" /> Seasonal Availability
    </label>
    <input type="file" />
    <button class="btn btn-delete" onclick="deleteItem(this)">🗑️ Delete</button>
  `;

  menuItems.appendChild(card);
}
