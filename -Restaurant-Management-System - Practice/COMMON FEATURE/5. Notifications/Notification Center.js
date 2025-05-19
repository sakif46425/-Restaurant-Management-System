function toggleNotifications() {
    const center = document.getElementById("notification-center");
    center.classList.toggle("hidden");
  }
  
  function markAllAsRead() {
    const notifications = document.querySelectorAll(".notification");
    let unreadFound = false;
  
    notifications.forEach(notification => {
      if (notification.dataset.status === "new") {
        notification.classList.add("read");
        notification.dataset.status = "read";
        unreadFound = true;
      }
    });
  
    if (!unreadFound) {
      alert("All notifications are already marked as read.");
    } else {
      document.getElementById("unread-count").innerText = "0";
    }
  }
  
  function clearAll() {
    const list = document.getElementById("notification-list");
  
    if (list.children.length === 0) {
      alert("No notifications to clear.");
      return;
    }
  
    list.innerHTML = "";
    document.getElementById("unread-count").innerText = "0";
  }
  