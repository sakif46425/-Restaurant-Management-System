const filterDate = document.getElementById('filterDate');
    const filterRole = document.getElementById('filterRole');
    const filterUrgency = document.getElementById('filterUrgency');

    const posts = document.querySelectorAll('.post');

    function applyFilters() {
      const dateVal = filterDate.value;
      const roleVal = filterRole.value;
      const urgencyVal = filterUrgency.value;

      posts.forEach(post => {
        const postDate = post.getAttribute('data-date');
        const postRole = post.getAttribute('data-role');
        const postUrgency = post.getAttribute('data-urgency');

        const show = (
          (!dateVal || postDate === dateVal) &&
          (!roleVal || postRole === roleVal) &&
          (!urgencyVal || postUrgency === urgencyVal)
        );

        post.style.display = show ? 'flex' : 'none';
      });
    }

    filterDate.addEventListener('change', applyFilters);
    filterRole.addEventListener('change', applyFilters);
    filterUrgency.addEventListener('change', applyFilters);

    document.querySelectorAll('.offer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        alert('Offer to swap sent to the original employee.');
      });
    });

    document.querySelectorAll('.approve-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        alert('Manager approved the swap. Shift updated.');
      });
    });