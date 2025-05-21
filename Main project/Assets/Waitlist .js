function toggleForm(id) {
    const form = document.getElementById(id);
    form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
  }

  function validateAndAddReservation() {
    const time = document.getElementById('resTime').value;
    const table = document.getElementById('resTable').value;
    const name = document.getElementById('resName').value.trim();
    const guests = document.getElementById('resGuests').value;

    if (!time || !table || !name || guests < 1) {
      alert("Please fill all reservation fields correctly.");
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

    toggleForm('reservationForm');
    return false;
  }

  function validateAndAddWaitlist() {
    const name = document.getElementById('waitName').value.trim();
    const size = document.getElementById('waitSize').value;
    const time = document.getElementById('waitTime').value;
    const notes = document.getElementById('waitNotes').value;

    if (!name || size < 1 || !time) {
      alert("Please fill all waitlist fields correctly.");
      return false;
    }

    const waitBody = document.querySelector('#waitlistTable tbody');
    const newRow = waitBody.insertRow();
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${size}</td>
      <td>${time}</td>
      <td>${notes}</td>
      <td><button onclick="assignTable(this)">Assign Table</button></td>
    `;

    toggleForm('waitlistForm');
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

  function assignTable(button) {
    alert("Assign Table functionality not implemented.");
  }

  function searchReservations() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const rows = document.querySelectorAll("#reservationTable tbody tr");

    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(query) ? "" : "none";
    });
  }