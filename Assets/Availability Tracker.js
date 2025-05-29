document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#availability-table tbody');

  // Time validation logic
  function addTimeValidation(row) {
    row.querySelectorAll('input[type="time"]').forEach(input => {
      input.addEventListener('change', (e) => {
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
  }

  // Remove staff button logic
  function addRemoveButtonFunctionality(row) {
    const removeBtn = row.querySelector('.remove-staff-btn');
    removeBtn.addEventListener('click', () => {
      row.remove();
    });
  }

  // Initialize existing rows
  document.querySelectorAll('#availability-table tbody tr').forEach(row => {
    addTimeValidation(row);
    addRemoveButtonFunctionality(row);
  });

  // Add staff
  document.getElementById('add-staff-btn').addEventListener('click', () => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><input type="text" class="staff-name" placeholder="Enter name" /></td>
      <td><input type="time" class="time-start" data-day="Mon" /> - <input type="time" class="time-end" data-day="Mon" /></td>
      <td><input type="time" class="time-start" data-day="Tue" /> - <input type="time" class="time-end" data-day="Tue" /></td>
      <td><input type="time" class="time-start" data-day="Wed" /> - <input type="time" class="time-end" data-day="Wed" /></td>
      <td><input type="time" class="time-start" data-day="Thu" /> - <input type="time" class="time-end" data-day="Thu" /></td>
      <td><input type="time" class="time-start" data-day="Fri" /> - <input type="time" class="time-end" data-day="Fri" /></td>
      <td><input type="text" class="notes-input" placeholder="e.g., Notes here" /></td>
      <td><button class="remove-staff-btn">Remove</button></td>
    `;
    tableBody.appendChild(newRow);
    addTimeValidation(newRow);
    addRemoveButtonFunctionality(newRow);
  });

  // Update button
  document.getElementById('update-btn').addEventListener('click', () => {
    if (confirm('Do you want to save the updates?')) {
      alert('✅ Updates saved successfully!');
      // Optional: Send data to server here
    }
  });

  // Back button
  document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'Staff.html';
  });
});
