const shiftStart = new Date();
shiftStart.setHours(10, 0, 0); // 10:00 AM
const shiftEnd = new Date(shiftStart);
shiftEnd.setHours(18, 0, 0); // 6:00 PM

const clockInBtn = document.getElementById('clockInBtn');
const clockOutBtn = document.getElementById('clockOutBtn');
const currentTimeDisplay = document.getElementById('currentTime');
const hoursDisplay = document.getElementById('hours');
const flagDisplay = document.getElementById('flags');

let clockInTime = null;
let clockOutTime = null;

function updateCurrentTime() {
  const now = new Date();
  currentTimeDisplay.textContent = `Current Time: ${now.toLocaleTimeString()}`;

  // Enable Clock In 15 mins before shift
  if (now >= new Date(shiftStart.getTime() - 15 * 60000) && !clockInTime) {
    clockInBtn.disabled = false;
    clockInBtn.classList.remove('disabled');
  } else {
    clockInBtn.disabled = true;
    clockInBtn.classList.add('disabled');
  }

  // Enable Clock Out after shift starts
  if (now >= shiftStart && clockInTime && !clockOutTime) {
    clockOutBtn.disabled = false;
    clockOutBtn.classList.remove('disabled');
  }
}

setInterval(updateCurrentTime, 1000);

clockInBtn.addEventListener('click', () => {
  clockInTime = new Date();
  clockInBtn.disabled = true;
  clockInBtn.classList.add('disabled');
  alert('Clocked in at ' + clockInTime.toLocaleTimeString());

  // Late flag
  if (clockInTime > shiftStart) {
    flagDisplay.textContent = '⚠️ Late Clock-In';
    flagDisplay.classList.add('flag');
  }
});

clockOutBtn.addEventListener('click', () => {
  clockOutTime = new Date();
  clockOutBtn.disabled = true;
  clockOutBtn.classList.add('disabled');
  alert('Clocked out at ' + clockOutTime.toLocaleTimeString());

  const diff = (clockOutTime - clockInTime) / (1000 * 60 * 60); // in hours
  hoursDisplay.textContent = diff.toFixed(2);

  // Early flag
  if (clockOutTime < shiftEnd) {
    flagDisplay.textContent = '⚠️ Early Clock-Out';
    flagDisplay.classList.add('flag');
  }
});