function filterItems() {
    const searchText = document.querySelector('input[type="text"]').value.toLowerCase();
    const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    const activeTags = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);

    const cards = document.querySelectorAll('.item-card');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const tags = card.getAttribute('data-tags') || '';
      const matchesSearch = text.includes(searchText);
      const matchesTags = activeTags.every(tag => tags.includes(tag));

      if (matchesSearch && matchesTags) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }