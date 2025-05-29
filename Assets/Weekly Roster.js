const shifts = document.querySelectorAll('.shift');
const dropzones = document.querySelectorAll('.dropzone');
const rosterGrid = document.getElementById('rosterGrid');
const shiftPool = document.getElementById('shiftPool');

// Enable drag-and-drop functionality for shifts
function enableDrag(shift) {
  shift.setAttribute('draggable', true);

  shift.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.outerHTML);

    // Clear original dropzone if dragging from a cell
    const parent = shift.parentElement;
    if (parent.classList.contains('dropzone')) {
      parent.innerHTML = '';
    }
  });
}

// Initialize drag for default pool shifts
shifts.forEach(enableDrag);

// Apply drop functionality to each dropzone
function makeDropzone(zone) {
  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.style.backgroundColor = '#d1fae5';
  });

  zone.addEventListener('dragleave', () => {
    zone.style.backgroundColor = '#f0f0f0';
  });

  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.style.backgroundColor = '#f0f0f0';

    if (zone.children.length > 0) {
      alert('Shift already assigned. Please clear or choose another slot.');
      return;
    }

    const html = e.dataTransfer.getData('text');
    zone.innerHTML = html;

    const newShift = zone.querySelector('.shift');
    enableDrag(newShift); // Re-enable dragging for future movement
  });
}

// Activate dropzones on page load
dropzones.forEach(makeDropzone);

// Add a new staff row
function addStaff(name) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const nameDiv = document.createElement('div');
  nameDiv.className = 'staff-name';
  nameDiv.textContent = name;
  rosterGrid.appendChild(nameDiv);

  days.forEach(day => {
    const cell = document.createElement('div');
    cell.className = 'cell dropzone';
    cell.dataset.name = name;
    cell.dataset.day = day;
    rosterGrid.appendChild(cell);
    makeDropzone(cell);
  });
}

// Remove a staff row
function removeStaff(name) {
  const children = Array.from(rosterGrid.children);
  children.forEach(child => {
    if (
      (child.classList.contains('staff-name') && child.textContent === name) ||
      (child.classList.contains('cell') && child.dataset.name === name)
    ) {
      rosterGrid.removeChild(child);
    }
  });
}

// Add new shift to the shift pool
function addShift(role, time) {
  const shift = document.createElement('div');
  shift.className = `shift ${time.toLowerCase()}`;
  shift.dataset.role = role;
  shift.dataset.time = time;
  shift.textContent = `${role} - ${time}`;
  enableDrag(shift);
  shiftPool.appendChild(shift);
}

// Remove shift from the pool
function removeShift(role, time) {
  const shifts = Array.from(shiftPool.children);
  shifts.forEach(shift => {
    if (
      shift.dataset.role === role &&
      shift.dataset.time === time
    ) {
      shiftPool.removeChild(shift);
    }
  });
}

function confirmUpdate() {
  alert("Roster has been updated successfully!");
  // You can add logic here to save the data to server/localStorage if needed
}

function goBack() {
  window.location.href = "Staff.html";
}
