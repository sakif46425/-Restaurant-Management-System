const stationOrders = [
    { id: 1, item: 'Steak', station: 'Grill', timeElapsed: 4, status: 'Queued' },
    { id: 2, item: 'Fries', station: 'Fry', timeElapsed: 11, status: 'Queued' },
    { id: 3, item: 'Pizza', station: 'Oven', timeElapsed: 6, status: 'In Progress' },
    { id: 4, item: 'Cake', station: 'Dessert', timeElapsed: 12, status: 'Queued' }
  ];

  function getBadgeColor(time) {
    if (time < 5) return 'green';
    else if (time <= 10) return 'yellow';
    else return 'red';
  }

  function toggleStatus(id) {
    const order = stationOrders.find(o => o.id === id);
    if (order) {
      if (order.status === 'Queued') order.status = 'In Progress';
      else if (order.status === 'In Progress') order.status = 'Ready';
      renderOrders();
    }
  }

  function renderOrders() {
    const selectedStation = document.getElementById('stationSelect').value;
    const grid = document.getElementById('orderGrid');
    const notification = document.getElementById('notificationBar');
    grid.innerHTML = '';
    let delayExists = false;

    stationOrders.forEach(order => {
      if (selectedStation !== 'All' && order.station !== selectedStation) 
        return;

      const card = document.createElement('div');
      card.className = 'order-card';

      const badgeClass = getBadgeColor(order.timeElapsed);
      if (badgeClass === 'red') delayExists = true;

      card.innerHTML = `
        <strong>Item:</strong> ${order.item}<br>
        <strong>Station:</strong> ${order.station}<br>
        <strong>Status:</strong> ${order.status}<br>
        <span class="badge ${badgeClass}">⏱ ${order.timeElapsed} min</span><br>
        <button class="status-btn" onclick="toggleStatus(${order.id})">➡️ Change Status</button>
      `;

      grid.appendChild(card);
    });

    notification.style.display = delayExists ? 'block' : 'none';
  }

  function filterOrders() {
    renderOrders();
  }

  renderOrders();