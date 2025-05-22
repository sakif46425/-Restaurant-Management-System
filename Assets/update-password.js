function validatePasswordForm() {
  const current = document.getElementById('currentPassword').value.trim();
  const newPass = document.getElementById('newPassword').value.trim();
  const confirm = document.getElementById('confirmPassword').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  // Clear previous error message
  errorMsg.textContent = '';

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

  // Allow form to submit
  return true;
}

function cancelUpdate() {
  window.location.href = "Profile view.html"; // You can also use history.back();
}
