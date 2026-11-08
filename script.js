const video = document.getElementById('webcam');
const snapBtn = document.getElementById('snap-btn');
const frameSelect = document.getElementById('frame-select');
const timerEl = document.getElementById('timer');
const canvas = document.getElementById('photo-strip');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('download-btn');

// Start Webcam Stream with explicit resolution constraints
navigator.mediaDevices.getUserMedia({ 
  video: { width: 640, height: 480 }, 
  audio: false 
})
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    alert("Camera access is required for the photobooth.");
    console.error("Camera access error:", err);
  });

snapBtn.addEventListener('click', async () => {
  snapBtn.disabled = true;
  downloadBtn.classList.add('hidden'); // Hide download button while shooting
  const photos = [];

  // Take 3 photos with a 3-second countdown each
  for (let i = 0; i < 3; i++) {
    await countdown(3);
    const photoData = capturePhoto();
    photos.push(photoData);
  }

  // Draw photo strip with selected frame color
  drawPhotoStrip(photos, frameSelect.value);
  snapBtn.disabled = false;
});

function countdown(seconds) {
  return new Promise((resolve) => {
    timerEl.classList.remove('hidden');
    let count = seconds;
    timerEl.textContent = count;

    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        timerEl.textContent = count;
      } else {
        clearInterval(interval);
        timerEl.classList.add('hidden');
        resolve();
      }
    }, 1000);
  });
}

function capturePhoto() {
  const tempCanvas = document.createElement('canvas');
  // Detect actual video layout or fallback to standard 4:3 proportions
  const vWidth = video.videoWidth || 640;
  const vHeight = video.videoHeight || 480;
  
  tempCanvas.width = vWidth;
  tempCanvas.height = vHeight;
  const tempCtx = tempCanvas.getContext('2d');

  // Flip horizontally to match mirrored camera view
  tempCtx.translate(tempCanvas.width, 0);
  tempCtx.scale(-1, 1);
  tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

  return tempCanvas;
}

function drawPhotoStrip(photos, frameColor) {
  // Use the dimensions from the first shot to keep aspect ratio perfect
  const nativeWidth = photos[0].width;
  const nativeHeight = photos[0].height;
  
  // Set output width to 360px and scale height proportionally so nothing stretches
  const photoWidth = 360;
  const photoHeight = Math.round((nativeHeight / nativeWidth) * photoWidth);
  
  const padding = 24;      // Clean frame border thickness
  const gap = 16;          // Gap between photos
  const bottomMargin = 70; // Space for branding at bottom

  // Calculate total canvas dimensions dynamically
  canvas.width = photoWidth + (padding * 2);
  canvas.height = (photoHeight * photos.length) + (gap * (photos.length - 1)) + (padding * 2) + bottomMargin;

  // 1. Draw Frame Background
  ctx.fillStyle = frameColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Draw Photos onto Canvas beautifully
  photos.forEach((photoCanvas, index) => {
    const x = padding;
    const y = padding + index * (photoHeight + gap);
    ctx.drawImage(photoCanvas, x, y, photoWidth, photoHeight);
  });

  // 3. Add Custom Text/Branding at Bottom
  ctx.fillStyle = (frameColor === '#1a1a1a') ? '#ffffff' : '#000000';
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('⚡ PHOTOBOOTH ⚡', canvas.width / 2, canvas.height - 30);

  // 4. Securely Convert Canvas to Downloadable Data URL
  try {
    const dataUrl = canvas.toDataURL('image/png');
    downloadBtn.href = dataUrl;
    downloadBtn.classList.remove('hidden');
  } catch (e) {
    console.error("Canvas export failed:", e);
    alert("Could not process image download due to a browser restriction. Try using Google Chrome or Firefox.");
  }
}
