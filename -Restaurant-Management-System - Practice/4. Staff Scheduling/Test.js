
  document.querySelector('button').addEventListener('click', function (e) {
    e.preventDefault(); // prevent form submission

    const inputs = document.querySelectorAll('input[type="text"]');
    let isValid = true;
    let timePattern = /^(\d{1,2})(:\d{2})?\s?(am|pm)?\s?-\s?(\d{1,2})(:\d{2})?\s?(am|pm)?$/i;

    inputs.forEach((input) => {
      const value = input.value.trim();
      input.style.borderColor = "#ccc"; // reset border

      if (value !== "" && !timePattern.test(value)) {
        input.style.borderColor = "red";
        isValid = false;
      }
    });

    if (!isValid) {
      alert("Please enter valid time ranges like '9am - 5pm' or '10:00 - 18:00'.");
    } else {
      alert("Availability submitted successfully!");
      // Optionally: document.querySelector('form').submit();
    }
  });

