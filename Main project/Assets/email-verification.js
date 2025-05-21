document.getElementById('resend-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('email-error');
    const resendInfo = document.getElementById('resend-info');
    const form = document.getElementById('resend-form');

    emailError.style.display = 'none';
    resendInfo.style.display = 'none';

    if (!validateEmail(email)) {
      emailError.innerText = 'Please enter a valid email address.';
      emailError.style.display = 'block';
      return;
    }

    // Simulate email resend
    resendInfo.innerText = 'Verification email sent again!';
    resendInfo.style.display = 'block';

    // Simulate verification success after a short delay
    setTimeout(() => {
      resendInfo.innerText = 'Your email has been verified!';
      // Replace form content with success message and login button
      form.innerHTML = `
        <p class="info">Your email has been verified!</p>
        <a href="../View/login.html" class="btn">Log in here</a>
      `;
    }, 3000);
  });

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }