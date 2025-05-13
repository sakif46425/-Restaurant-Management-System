let salesChart, dishesChart, peakChart;

function initCharts() {
  const ctx1 = document.getElementById('salesChart').getContext('2d');
  salesChart = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Sales ($)',
        data: [120, 190, 300, 500, 200, 300, 450],
        backgroundColor: 'rgba(39, 174, 96, 0.2)',
        borderColor: '#27ae60',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: { responsive: true, plugins: { legend: { display: true } } }
  });

  const ctx2 = document.getElementById('dishesChart').getContext('2d');
  dishesChart = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['Burger', 'Pizza', 'Pasta', 'Salad', 'Steak'],
      datasets: [{
        label: 'Orders',
        data: [50, 80, 40, 30, 20],
        backgroundColor: '#2980b9'
      }]
    },
    options: { responsive: true, plugins: { legend: { display: true } } }
  });

  const ctx3 = document.getElementById('peakChart').getContext('2d');
  peakChart = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['12PM', '1PM', '2PM', '6PM', '7PM', '8PM'],
      datasets: [{
        label: 'Customer Visits',
        data: [10, 25, 30, 50, 60, 40],
        backgroundColor: '#e67e22'
      }]
    },
    options: { responsive: true, plugins: { legend: { display: true } } }
  });
}

function updateCharts() {
  const filter = document.getElementById('dateFilter').value;
  alert('Charts updated for: ' + filter);
  // Update logic can be implemented here for real data
}

window.onload = initCharts;