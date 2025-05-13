const ctx = document.getElementById('costSalesChart').getContext('2d');

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const laborCost = [700, 850, 790, 810, 950, 1200, 1100];
    const salesForecast = [1000, 1100, 950, 1200, 1400, 2000, 1800];

    const backgroundColors = laborCost.map((cost, i) =>
      cost > salesForecast[i] ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)'
    );

    const borderColors = laborCost.map((cost, i) =>
      cost > salesForecast[i] ? 'rgba(255, 0, 0, 1)' : 'rgba(54, 162, 235, 1)'
    );

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Labor Cost 💸',
            data: laborCost,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
          },
          {
            label: 'Sales Forecast 💵',
            data: salesForecast,
            type: 'line',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            borderWidth: 2,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                return `${label}: $${value}`;
              }
            }
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount ($)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Days of the Week'
            }
          }
        }
      }
    });