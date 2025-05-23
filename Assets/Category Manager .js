let draggedItem;

    document.querySelectorAll('.category').forEach(item => {
      item.addEventListener('dragstart', () => {
        draggedItem = item;
      });

      item.addEventListener('dragover', e => {
        e.preventDefault();
        const container = document.getElementById('categoryList');
        const children = Array.from(container.children);
        const indexDragged = children.indexOf(draggedItem);
        const indexTarget = children.indexOf(item);
        if (indexDragged < indexTarget) {
          container.insertBefore(draggedItem, item.nextSibling);
        } else {
          container.insertBefore(draggedItem, item);
        }
      });
    });
    function goBack() {
  window.location.href = "Menu Home.html";
}

    

    function addCategory() {
      const container = document.getElementById('categoryList');
      const div = document.createElement('div');
      div.className = 'category';
      div.draggable = true;
      div.innerHTML = `
        <input type="text" value="New Category">
        <div class="controls">
          <button class="btn-delete" onclick="deleteCategory(this)">🗑️</button>
        </div>`;

      div.addEventListener('dragstart', () => {
        draggedItem = div;
      });
      div.addEventListener('dragover', e => {
        e.preventDefault();
        const children = Array.from(container.children);
        const indexDragged = children.indexOf(draggedItem);
        const indexTarget = children.indexOf(div);
        if (indexDragged < indexTarget) {
          container.insertBefore(draggedItem, div.nextSibling);
        } else {
          container.insertBefore(draggedItem, div);
        }
      });

      container.appendChild(div);
    }

    function deleteCategory(btn) {
      const div = btn.closest('.category');
      div.remove();
    }

    function saveOrder() {
      alert("Category order saved successfully!");
    }