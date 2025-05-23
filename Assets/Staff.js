function navigateTo(page) {
      const validPages = [
        "Weekly Roster.html",
        "Availability Tracker.html",
        "Shift Swap Board .html",
        "Home Dashboard.html"
      ];
      if (validPages.includes(page)) {
        window.location.href = page;
      } else {
        alert("Invalid page requested.");
      }
    }