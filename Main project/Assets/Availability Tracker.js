document.querySelectorAll('input[type="time"]').forEach(input => {
    input.addEventListener('change', (e) => {
      const row = e.target.closest('tr');
      const day = e.target.dataset.day;
      const start = row.querySelector(`.time-start[data-day='${day}']`).value;
      const end = row.querySelector(`.time-end[data-day='${day}']`).value;

      if (start && end && start >= end) {
        alert(`⚠️ Invalid time range for ${day}. Start time must be earlier than end time.`);
        row.querySelector(`.time-start[data-day='${day}']`).value = '';
        row.querySelector(`.time-end[data-day='${day}']`).value = '';
        e.target.closest('td').classList.add('unavailable');
      } else {
        e.target.closest('td').classList.remove('unavailable');
      }
    });
  });