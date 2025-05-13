const shifts = document.querySelectorAll('.shift');
    const dropzones = document.querySelectorAll('.dropzone');

    shifts.forEach(shift => {
      shift.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', e.target.outerHTML);
      });
    });

    dropzones.forEach(zone => {
      zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.style.backgroundColor = '#d1fae5';
      });

      zone.addEventListener('dragleave', () => {
        zone.style.backgroundColor = '#f0f0f0';
      });

      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.style.backgroundColor = '#f0f0f0';

        if (zone.children.length > 0) {
          alert('Shift already assigned. Please clear or choose another slot.');
          return;
        }

        const html = e.dataTransfer.getData('text');
        zone.innerHTML = html;

        // Remove drag behavior from dropped shift
        const newShift = zone.querySelector('.shift');
        newShift.setAttribute('draggable', false);
      });
    });