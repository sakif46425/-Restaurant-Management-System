 function goBack() {
      window.location.href = "Inventory DashBoard.html";
    }

    function navigate(page) {
      window.location.href = page;
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
          <td>
            <button onclick="editRow(this)">✏️ Edit</button>
            <button onclick="deleteRow(this)">🗑️ Delete</button>
          </td>
        `;
        alert("Waste logged successfully!");
      } else {
        alert("All fields are required.");
      }
    }

    function deleteRow(btn) {
      const row = btn.closest("tr");
      if (confirm("Are you sure you want to delete this log?")) {
        row.remove();
        alert("Waste log deleted.");
      }
    }

    function editRow(btn) {
      const row = btn.closest("tr");
      const cells = row.getElementsByTagName("td");

      const date = prompt("Edit date:", cells[0].textContent);
      const ingredient = prompt("Edit ingredient:", cells[1].textContent);
      const qty = prompt("Edit quantity:", cells[2].textContent);
      const reason = prompt("Edit reason:", cells[3].textContent);
      const staff = prompt("Edit logged by:", cells[4].textContent);

      if (date && ingredient && qty && reason && staff) {
        cells[0].textContent = date;
        cells[1].textContent = ingredient;
        cells[2].textContent = qty;
        cells[3].textContent = reason;
        cells[4].textContent = staff;
        alert("Waste log updated.");
      } else {
        alert("All fields must be filled to edit.");
      }
    }

    function updateAll() {
      const rows = document.querySelectorAll("#wasteTable tbody tr");
      if (rows.length === 0) {
        alert("No waste logs to update.");
        return;
      }

      let logs = [];

      rows.forEach(row => {
        const cells = row.getElementsByTagName("td");
        const log = {
          date: cells[0].textContent,
          ingredient: cells[1].textContent,
          qty: cells[2].textContent,
          reason: cells[3].textContent,
          staff: cells[4].textContent
        };
        logs.push(log);
      });

      // This is where you'd usually send logs to backend or localStorage
      console.log("✅ Updated Waste Logs:", logs);
      alert("All waste logs confirmed and updated!");
    }