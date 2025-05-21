function navigateTo(page) {
      const validPages = [
        "Menu Editor.html",
        "Customer View.html",
        "Category Manager.html",
        "Home Dashboard.html"
      ];
      if (validPages.includes(page)) {
        window.location.href = page;
      } else {
        alert("Invalid page requested.");
      }
    }