document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous error messages
    document.getElementById('name-error').style.display = 'none';
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('password-error').style.display = 'none';
    document.getElementById('confirm-password-error').style.display = 'none';

    // Get form input values
    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    let isValid = true;

    // Validate Full Name
    if (fullName === "") {
      document.getElementById('name-error').style.display = 'block';
      document.getElementById('name-error').innerText = 'Full name is required.';
      isValid = false;
    }

    // Validate Email
    if (!validateEmail(email)) {
      document.getElementById('email-error').style.display = 'block';
      document.getElementById('email-error').innerText = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate Password
    if (password.length < 6) {
      document.getElementById('password-error').style.display = 'block';
      document.getElementById('password-error').innerText = 'Password must be at least 6 characters.';
      isValid = false;
    }

    // Validate Confirm Password
    if (password !== confirmPassword) {
      document.getElementById('confirm-password-error').style.display = 'block';
      document.getElementById('confirm-password-error').innerText = 'Passwords do not match.';
      isValid = false;
    }

    // If form is valid, redirect to email verification page
    if (isValid) {
      window.location.href = 'email-verification.html';
    }
  });

  // Email validation function
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }