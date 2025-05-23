 function updateRole(button) {
      const row = button.closest("tr");
      const select = row.querySelector(".role-select");
      const errorDiv = row.querySelector(".error");

      if (select.value === "") {
        errorDiv.textContent = "Please select a role.";
      } else {
        errorDiv.textContent = "";
        alert("Role updated to: " + select.value);
        // You can add AJAX call here to send update to server
      }
    }