const tables = [
  { id: 1, status: 'available' },
  { id: 2, status: 'reserved' },
  { id: 3, status: 'occupied' },
  { id: 4, status: 'available' },
  { id: 5, status: 'available' },
  { id: 6, status: 'reserved' },
  { id: 7, status: 'occupied' },
  { id: 8, status: 'available' },
  { id: 9, status: 'reserved' },
  { id: 10, status: 'available' }
];

function renderTables() {
  const grid = document.getElementById('tableGrid');
  grid.innerHTML = '';
  const filter = document.getElementById('filter').value;
  tables.forEach(table => {
    if (filter !== 'all' && table.status !== filter) return;
    const div = document.createElement('div');
    div.className = `table ${table.status}`;
    div.textContent = table.id;
    div.onclick = () => alert(`Table ${table.id} is ${table.status}`);
    grid.appendChild(div);
  });
}

function filterTables() {
  renderTables();
}

function openAssignForm() {
  document.getElementById('assignForm').classList.remove('hidden');
}

function closeAssignForm() {
  document.getElementById('assignForm').classList.add('hidden');
}

function validateForm() {
  const tableNumber = document.getElementById('tableNumber').value;
  const partyName = document.getElementById('partyName').value.trim();
  const guests = document.getElementById('guests').value;

  if (!tableNumber || !partyName || guests < 1) {
    alert("Please fill all fields correctly.");
    return false;
  }

  alert(`Assigned ${partyName} to Table ${tableNumber} with ${guests} guest(s).`);
  closeAssignForm();
  return false; // prevent form submission for demo
}

function updateTime() {
  const now = new Date();
  document.getElementById('currentTime').textContent = now.toLocaleTimeString();
}

setInterval(updateTime, 1000);
renderTables();
updateTime();