let cropper;

document.getElementById('imageInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const image = document.getElementById('imagePreview');
    image.src = URL.createObjectURL(file);

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

function setAsAvatar() {
  if (cropper) {
    const canvas = cropper.getCroppedCanvas({
      width: 200,
      height: 200
    });

    const avatar = document.getElementById('finalAvatar');
    avatar.src = canvas.toDataURL();
    alert("Avatar updated!");
  } else {
    alert("Please upload and crop an image first.");
  }
}
