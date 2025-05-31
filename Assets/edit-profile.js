function validateForm() {
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const error = document.getElementById("errorMsg");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{10,14}$/;

  error.textContent = ""; // Clear previous error

  // Basic validation
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

  // Submit using Fetch
  fetch("../Controller/edit-profile.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      fullName: name,
      email: email,
      phone: phone,
      address: address
    })
  })
  .then(response => response.text())
  .then(data => {
    if (data.trim() === "success") {
      alert("Profile updated successfully!");
      window.location.href = "Profile view.html"; // Redirect after success
    } else {
      error.textContent = data;
    }
  })
  .catch(() => {
    error.textContent = "Something went wrong. Please try again.";
  });

  return false; // Prevent default form submission
}

function cancelEdit() {
  window.location.href = "Profile view.html"; // Or use: history.back();
}
