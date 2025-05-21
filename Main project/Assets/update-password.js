function validatePasswordForm() {
    const current = document.getElementById('currentPassword').value.trim();
    const newPass = document.getElementById('newPassword').value.trim();
    const confirm = document.getElementById('confirmPassword').value.trim();
    const errorMsg = document.getElementById('errorMsg');
  
    if (!current || !newPass || !confirm) {
      errorMsg.textContent = "All fields are required.";
      return false;
    }
  
    if (newPass.length < 6) {
      errorMsg.textContent = "New password must be at least 6 characters.";
      return false;
    }
  
    if (newPass !== confirm) {
      errorMsg.textContent = "Passwords do not match.";
      return false;
    }
  
    // Password update success
    alert("Password updated successfully!");
    return true;
  }
  
  function cancelUpdate() {
    window.location.href = "index.html"; // Or history.back();
  }
  