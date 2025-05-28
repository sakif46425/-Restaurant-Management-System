document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Clear previous error messages
  document.getElementById('email-error').style.display = 'none';
  document.getElementById('password-error').style.display = 'none';
  document.getElementById('role-error').style.display = 'none';

  // Get input values
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;

  let isValid = true;

  // Validate email
  if (!validateEmail(email)) {
    document.getElementById('email-error').style.display = 'block';
    document.getElementById('email-error').innerText = 'Please enter a valid email address.';
    isValid = false;
  }

  // Validate password
  if (password.length < 6) {
    document.getElementById('password-error').style.display = 'block';
    document.getElementById('password-error').innerText = 'Password must be at least 6 characters.';
    isValid = false;
  }

  // Validate role
  if (role === "") {
    document.getElementById('role-error').style.display = 'block';
    document.getElementById('role-error').innerText = 'Please select a role.';
    isValid = false;
  }

  // If form is valid, proceed
  if (isValid) {
    alert(`Login successful as ${capitalize(role)}!`);

    // Redirect based on role
    if (role === "admin") {
      window.location.href = "Home Dashboard.html";
    } else {
      alert("Redirecting for other roles not set yet.");
    }

    // If you want to actually submit the form to the backend instead, use this:
    // document.getElementById('login-form').submit();
  }
});

// Email validation function
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// Capitalize the first letter of the role
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
