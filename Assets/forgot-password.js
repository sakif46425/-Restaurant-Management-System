document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('email-error');
    const resetInfo = document.getElementById('reset-info');

    emailError.style.display = 'none';
    resetInfo.style.display = 'none';

    if (!validateEmail(email)) {
      emailError.innerText = 'Please enter a valid email address.';
      emailError.style.display = 'block';
      return;
    }

    // Show success message
    resetInfo.innerText = 'Check your email for the reset link.';
    resetInfo.style.display = 'block';

    // Redirect after 3 seconds
    setTimeout(() => {
      window.location.href = 'reset-password.html';
    }, 3000);
  });

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }