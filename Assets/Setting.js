function navigateTo(page) {
      const validPages = [
        "Profile view.html",
        "Notification Settings .html",
        "Home Dashboard.html",
        "login.html"
      ];
      if (validPages.includes(page)) {
        window.location.href = page;
      } else {
        alert("Invalid page requested.");
      }
    }