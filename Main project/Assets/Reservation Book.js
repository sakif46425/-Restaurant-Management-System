function toggleForm() {
    const form = document.getElementById('reservationForm');
    form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
  }

  function validateAndAdd() {
    const time = document.getElementById('resTime').value;
    const table = document.getElementById('resTable').value;
    const name = document.getElementById('resName').value.trim();
    const guests = document.getElementById('resGuests').value;

    if (!time || !table || !name || guests < 1) {
      alert("Please fill all fields correctly.");
      return false;
    }

    const tableBody = document.querySelector('#reservationTable tbody');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${time}</td>
      <td>${table}</td>
      <td>${name}</td>
      <td>${guests}</td>
      <td>Confirmed</td>
      <td class="action-buttons">
        <button onclick="editReservation(this)">Edit</button>
        <button onclick="cancelReservation(this)">Cancel</button>
      </td>
    `;

    toggleForm();
    return false;
  }

  function cancelReservation(button) {
    if (confirm("Are you sure you want to cancel this reservation?")) {
      const row = button.closest("tr");
      row.remove();
    }
  }

  function editReservation(button) {
    alert("Edit functionality not implemented in this demo.");
  }

  function searchReservations() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const rows = document.querySelectorAll("#reservationTable tbody tr");

    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(query) ? "" : "none";
    });
  }