function navigateTo(page) {
      const validPages = [
        "Floor Plan Map.html",
        "Reservation Book.html",
        "Waitlist .html",
        "Home Dashboard.html"
      ];
      if (validPages.includes(page)) {
        window.location.href = page;
      } else {
        alert("Invalid page requested.");
      }
    }