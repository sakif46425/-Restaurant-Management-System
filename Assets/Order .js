function navigateTo(page) {
      const validPages = [
        "Order Queue.html",
        "Station View.html",
        "Expediter Dashboard .html",
        "Home Dashboard.html"
      ];
      if (validPages.includes(page)) {
        window.location.href = page;
      } else {
        alert("Invalid page requested.");
      }
    }