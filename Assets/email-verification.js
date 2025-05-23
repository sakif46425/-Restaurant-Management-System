document.getElementById('resend-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const emailError = document.getElementById('email-error');
  const resendInfo = document.getElementById('resend-info');
  const form = document.getElementById('resend-form');

  // Hide previous messages
  emailError.style.display = 'none';
  resendInfo.style.display = 'none';

  if (!validateEmail(email)) {
    emailError.innerText = 'Please enter a valid email address.';
    emailError.style.display = 'block';
    return;
  }

  // Send POST request to PHP backend
  fetch('../Controller/resend-verification.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `email=${encodeURIComponent(email)}`
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => { throw new Error(text); });
    }
    return response.text();
  })
  .then(data => {
    resendInfo.innerText = data;
    resendInfo.style.display = 'block';

    // After a delay, show verified message and login link
    setTimeout(() => {
      form.innerHTML = `
        <p class="info">Your email has been verified!</p>
        <a href="login.html" class="btn">Log in here</a>
      `;
    }, 3000);
  })
  .catch(error => {
    emailError.innerText = error.message || "An error occurred. Please try again.";
    emailError.style.display = 'block';
  });
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
