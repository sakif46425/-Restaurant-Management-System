function assignRole(event) {
    event.preventDefault();
  
    const user = document.getElementById("userSelect").value;
    const role = document.getElementById("roleSelect").value;
    const message = document.getElementById("confirmationMessage");
  
    if (user && role) {
      message.textContent = `Role successfully updated: ${user} is now an ${role}.`;
      message.style.display = "block";
  
      // Simulate role update logic (can be replaced with backend call)
      console.log(`Updated ${user} to role: ${role}`);
    } else {
      message.textContent = "";
      message.style.display = "none";
    }
  }
  
  function resetForm() {
    document.getElementById("roleAssignmentForm").reset();
    document.getElementById("confirmationMessage").style.display = "none";
  }