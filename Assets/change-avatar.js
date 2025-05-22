let cropper;

// Handle image upload and preview
document.getElementById('imageInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const image = document.getElementById('imagePreview');
    image.src = URL.createObjectURL(file);

    // Destroy previous cropper if exists
    if (cropper) {
      cropper.destroy();
    }

    image.onload = function () {
      cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        minContainerWidth: 300,
        minContainerHeight: 300
      });
    };
  }
});

// Set cropped image as avatar and upload to server
function setAsAvatar() {
  if (cropper) {
    const canvas = cropper.getCroppedCanvas({
      width: 200,
      height: 200
    });

    const dataURL = canvas.toDataURL('image/png');

    fetch('save-avatar.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'avatar=' + encodeURIComponent(dataURL)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        const avatar = document.getElementById('finalAvatar');
        avatar.src = data.file;
        alert('Avatar saved successfully!');
      } else {
        alert('Error: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Upload error:', error);
      alert('Failed to upload avatar.');
    });
  } else {
    alert('Please upload and crop an image first.');
  }
}

// back and go to profile view page
function BackAvatarChange() {
  window.location.href = 'Profile view.html';
}

// Reset the avatar preview and delete saved avatar from server
function resetAvatar() {
  // Clear image input
  document.getElementById('imageInput').value = '';

  // Clear and destroy cropper
  const image = document.getElementById('imagePreview');
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  image.src = '';

  // Clear final avatar preview
  document.getElementById('finalAvatar').src = '';

  // Notify server to delete the avatar
  fetch('save-avatar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'action=reset'
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
  })
  .catch(error => {
    console.error('Reset failed:', error);
  });
}
