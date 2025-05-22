  function validateForm() {
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const error = document.getElementById("errorMsg");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{10,14}$/;

  if (!name || !email || !phone) {
    error.textContent = "Name, Email, and Phone are required.";
    return false;
  }

  if (!emailRegex.test(email)) {
    error.textContent = "Invalid email format.";
    return false;
  }

  if (!phoneRegex.test(phone)) {
    error.textContent = "Invalid phone number format.";
    return false;
  }

  // If passed validation
  alert("Profile updated successfully!");
  return true;
}

function cancelEdit() {
  window.location.href = "Profile view.html"; // or use history.back() if navigating from view screen
}
