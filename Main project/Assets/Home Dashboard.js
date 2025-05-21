function showDetails(type) {
  let message = '';
  switch(type) {
    case 'orders':
      const orders = document.getElementById('orders-count').innerText;
      if (isNaN(parseInt(orders))) {
        alert('Invalid order count!');
        return;
      }
      message = `Today's total orders: ${orders}`;
      break;
    case 'sales':
      const sales = document.getElementById('sales-amount').innerText.replace(/[^\d.]/g, '');
      if (isNaN(parseFloat(sales))) {
        alert('Invalid sales amount!');
        return;
      }
      message = `Total sales today: $${sales}`;
      break;
    case 'tables':
      const tableStatus = document.getElementById('table-status').innerText;
      const parts = tableStatus.split('/').map(x => parseInt(x.trim()));
      if (parts.length !== 2 || parts.some(isNaN)) {
        alert('Invalid table status!');
        return;
      }
      message = `Available tables: ${parts[0]} out of ${parts[1]}`;
      break;
    case 'topItem':
      const item = document.getElementById('top-item').innerText;
      if (!item.trim()) {
        alert('No item data!');
        return;
      }
      message = `Top-selling item: ${item}`;
      break;
  }
  alert(message);
}