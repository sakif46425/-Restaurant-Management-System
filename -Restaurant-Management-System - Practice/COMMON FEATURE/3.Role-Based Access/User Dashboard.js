// Simulate logged-in user's role
    const userRole = "Editor"; // Change to "User" to test user view

    const navMenu = document.getElementById("navMenu");
    const dashboardContent = document.getElementById("dashboardContent");

    // Define role-based menu items
    const menuItems = {
      Editor: [
        { label: "View Menu", id: "viewMenu" },
        { label: "Add Menu Items", id: "addItems" }
      ],
      User: [
        { label: "View Menu", id: "viewMenu" },
        { label: "Place Order", id: "placeOrder" }
      ]
    };

    // Add buttons based on role
    function loadMenu(role) {
      if (!menuItems[role]) {
        alert("Invalid role detected.");
        return;
      }
      menuItems[role].forEach(item => {
        const btn = document.createElement("button");
        btn.textContent = item.label;
        btn.onclick = () => loadContent(item.label);
        navMenu.appendChild(btn);
      });
    }

    // Load dummy content for each menu action
    function loadContent(title) {
      dashboardContent.innerHTML = `<h2>${title}</h2><p>You selected: ${title}</p>`;
    }

    // Load menu for current user role
    loadMenu(userRole);