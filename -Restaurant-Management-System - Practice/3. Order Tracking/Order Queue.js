const orders = [
    { id: 1024, table: 5, course: 'Appetizer', timeElapsed: 3, status: 'Queued' },
    { id: 1025, table: 2, course: 'Main', timeElapsed: 7, status: 'In Progress' },
    { id: 1026, table: 8, course: 'Dessert', timeElapsed: 12, status: 'Queued' }
  ];

  function getBadgeColor(time) {
    if (time < 5) return 'green';
    else if (time <= 10) return 'yellow';
    else return 'red';
  }

  function renderOrders() {
    const list = document.getElementById('orderList');
    list.innerHTML = '';

    orders.forEach(order => {
      const card = document.createElement('div');
      card.className = 'order-card';

      const badgeClass = getBadgeColor(order.timeElapsed);

      card.innerHTML = `
        <strong>Order ID:</strong> #${order.id}<br>
        <strong>Table:</strong> ${order.table}<br>
        <strong>Course:</strong> ${order.course}<br>
        <strong>Status:</strong> ${order.status}<br>
        <span class="badge ${badgeClass}">⏱ ${order.timeElapsed} min</span><br><br>
        <button class="fire-btn" onclick="fireOrder(${order.id})">🔥 Fire to Station</button>
        <button class="ready-btn" onclick="markReady(${order.id})">✅ Mark as Ready</button>
        <button class="delay-btn" onclick="alertDelay(${order.id})">⏳ Delay Alert</button>
      `;

      list.appendChild(card);
    });
  }

  function fireOrder(id) {
    const order = orders.find(o => o.id === id);
    if (order) {
      if (order.status === 'Ready') {
        alert(`Order #${id} is already ready.`);
      } else {
        order.status = 'In Progress';
        alert(`Order #${id} fired to station.`);
        renderOrders();
      }
    }
  }

  function markReady(id) {
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = 'Ready';
      alert(`Order #${id} marked as ready.`);
      renderOrders();
    }
  }

  function alertDelay(id) {
    const order = orders.find(o => o.id === id);
    if (order && order.timeElapsed > 10) {
      alert(`🚨 Order #${id} is delayed!`);
    } else {
      alert(`Order #${id} is on schedule.`);
    }
  }

  renderOrders();