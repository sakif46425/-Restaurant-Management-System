document.getElementById('reset-password-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const newPassword = document.getElementById('new-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const newPassError = document.getElementById('new-password-error');
    const confirmPassError = document.getElementById('confirm-password-error');
    const successMsg = document.getElementById('reset-success');

    newPassError.style.display = 'none';
    confirmPassError.style.display = 'none';
    successMsg.style.display = 'none';

    let isValid = true;

    // Password strength check (min 6 chars; can add more rules)
    if (newPassword.length < 6) {
      newPassError.innerText = 'Password must be at least 6 characters long.';
      newPassError.style.display = 'block';
      isValid = false;
    }

    // Password match check
    if (newPassword !== confirmPassword) {
      confirmPassError.innerText = 'Passwords do not match.';
      confirmPassError.style.display = 'block';
      isValid = false;
    }

    if (isValid) {
      // Simulate reset success
      successMsg.innerText = 'Password has been reset successfully!';
      successMsg.style.display = 'block';

      // Reset form
      document.getElementById('reset-password-form').reset();
    }
  });