{\rtf1\ansi\ansicpg1252\cocoartf2869
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const video = document.getElementById('webcam');\
const snapBtn = document.getElementById('snap-btn');\
const frameSelect = document.getElementById('frame-select');\
const timerEl = document.getElementById('timer');\
const canvas = document.getElementById('photo-strip');\
const ctx = canvas.getContext('2d');\
const downloadBtn = document.getElementById('download-btn');\
\
// Start Webcam Stream\
navigator.mediaDevices.getUserMedia(\{ video: true, audio: false \})\
  .then((stream) => \{\
    video.srcObject = stream;\
  \})\
  .catch((err) => \{\
    alert("Camera access is required for the photobooth.");\
    console.error("Camera access error:", err);\
  \});\
\
snapBtn.addEventListener('click', async () => \{\
  snapBtn.disabled = true;\
  const photos = [];\
\
  // Take 3 photos with a 3-second countdown each\
  for (let i = 0; i < 3; i++) \{\
    await countdown(3);\
    const photoData = capturePhoto();\
    photos.push(photoData);\
  \}\
\
  // Draw photo strip with selected frame color\
  drawPhotoStrip(photos, frameSelect.value);\
  snapBtn.disabled = false;\
\});\
\
function countdown(seconds) \{\
  return new Promise((resolve) => \{\
    timerEl.classList.remove('hidden');\
    let count = seconds;\
    timerEl.textContent = count;\
\
    const interval = setInterval(() => \{\
      count--;\
      if (count > 0) \{\
        timerEl.textContent = count;\
      \} else \{\
        clearInterval(interval);\
        timerEl.classList.add('hidden');\
        resolve();\
      \}\
    \}, 1000);\
  \});\
\}\
\
function capturePhoto() \{\
  const tempCanvas = document.createElement('canvas');\
  tempCanvas.width = video.videoWidth || 640;\
  tempCanvas.height = video.videoHeight || 480;\
  const tempCtx = tempCanvas.getContext('2d');\
\
  // Flip horizontally to match camera view\
  tempCtx.translate(tempCanvas.width, 0);\
  tempCtx.scale(-1, 1);\
  tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);\
\
  return tempCanvas;\
\}\
\
function drawPhotoStrip(photos, frameColor) \{\
  const photoWidth = 320;\
  const photoHeight = 240;\
  const padding = 20; // Frame border thickness\
  const gap = 15;      // Gap between photos\
  const bottomMargin = 60; // Space for booth brand/date at bottom\
\
  // Calculate total canvas dimensions\
  canvas.width = photoWidth + (padding * 2);\
  canvas.height = (photoHeight * photos.length) + (gap * (photos.length - 1)) + (padding * 2) + bottomMargin;\
\
  // 1. Draw Frame Background\
  ctx.fillStyle = frameColor;\
  ctx.fillRect(0, 0, canvas.width, canvas.height);\
\
  // 2. Draw Photos onto Canvas\
  photos.forEach((photoCanvas, index) => \{\
    const x = padding;\
    const y = padding + index * (photoHeight + gap);\
    ctx.drawImage(photoCanvas, x, y, photoWidth, photoHeight);\
  \});\
\
  // 3. Add Custom Text/Branding at Bottom\
  ctx.fillStyle = (frameColor === '#1a1a1a') ? '#ffffff' : '#000000';\
  ctx.font = 'bold 16px Arial';\
  ctx.textAlign = 'center';\
  ctx.fillText('PHOTOBOOTH', canvas.width / 2, canvas.height - 25);\
\
  // Prepare Download Link\
  downloadBtn.href = canvas.toDataURL('image/png');\
  downloadBtn.classList.remove('hidden');\
\}}
