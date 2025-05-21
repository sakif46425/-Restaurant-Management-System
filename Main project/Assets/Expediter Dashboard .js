const orders = [
    { id: 1, item: 'Burger', table: '1', station: 'Grill', status: 'Queued', timeElapsed: 3 },
    { id: 2, item: 'Fries', table: '2', station: 'Fry', status: 'In Progress', timeElapsed: 7 },
    { id: 3, item: 'Steak', table: '1', station: 'Grill', status: 'Ready', timeElapsed: 12 }
  ];

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const targetStatus = ev.currentTarget.id;
    const order = orders.find(o => `order-${o.id}` === data);
    if (order) {
      order.status = targetStatus;
      renderBoard();
    }
  }

  function getBadgeColor(time) {
    if (time < 5) return 'green';
    else if (time <= 10) return 'yellow';
    else return 'red';
  }

  function renderBoard() {
    ['Queued', 'In Progress', 'Ready'].forEach(status => {
      const column = document.getElementById(status);
      column.innerHTML = `<h3>${status}</h3>`;
    });

    const tableFilter = document.getElementById('filterTable').value;
    const stationFilter = document.getElementById('filterStation').value;
    const statusFilter = document.getElementById('filterStatus').value;

    orders.forEach(order => {
      if ((tableFilter !== 'All' && order.table !== tableFilter) ||
          (stationFilter !== 'All' && order.station !== stationFilter) ||
          (statusFilter !== 'All' && order.status !== statusFilter)) return;

      const card = document.createElement('div');
      card.className = 'order-card';
      card.draggable = true;
      card.id = `order-${order.id}`;
      card.ondragstart = drag;

      const badgeColor = getBadgeColor(order.timeElapsed);

      card.innerHTML = `
        <strong>${order.item}</strong><br>
        Table: ${order.table}<br>
        Station: ${order.station}<br>
        <span class="badge ${badgeColor}">⏱ ${order.timeElapsed} min</span>
      `;

      document.getElementById(order.status).appendChild(card);
    });
  }

  renderBoard();