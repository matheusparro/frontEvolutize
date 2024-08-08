// Função para solicitar permissão de notificação e registrar o Service Worker
function notifyMe() {
  if (!('Notification' in window)) {
    alert('Este navegador não suporta notificações desktop');
    return;
  }

  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        registration.showNotification('Notificação com ServiceWorker');
      }).catch(function(error) {
        console.error('Erro ao registrar o Service Worker:', error);
      });
    } else if (result === 'denied') {
      alert('Permissão para notificações foi negada.');
    }
  });
}

// Adiciona evento ao botão de subscrição
document.getElementById('subscribeButton').addEventListener('click', notifyMe);


// Função para capturar uma foto da câmera
function capturePhoto() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL('image/png');
  console.log('Foto capturada:', imageData);

  // Você pode enviar a foto para o servidor ou usá-la como necessário
  // Exemplo: enviar para o servidor
  // fetch('URL_DO_SEU_SERVIDOR', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ image: imageData })
  // });
}

// Adiciona evento ao botão de câmera
function openCamera() {
  // Verifica se o navegador suporta a API de MediaDevices
  if (!('mediaDevices' in navigator) || !('getUserMedia' in navigator.mediaDevices)) {
    alert('Este navegador não suporta acesso à câmera');
    return;
  }

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.autoplay = true;
      videoElement.style.width = '100%';
      videoElement.style.height = 'auto';

      const cameraContainer = document.getElementById('cameraContainer');
      cameraContainer.innerHTML = '';
      cameraContainer.appendChild(videoElement);

      const captureButton = document.createElement('button');
      captureButton.textContent = 'Capture Photo';
      cameraContainer.appendChild(captureButton);

      captureButton.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        const imageUrl = canvas.toDataURL('image/png');
        console.log(imageUrl);

        const img = document.createElement('img');
        img.src = imageUrl;
        cameraContainer.innerHTML = '';
        cameraContainer.appendChild(img);

        // Para a stream da câmera
        stream.getTracks().forEach(track => track.stop());
      });
    })
    .catch(error => {
      console.error('Erro ao acessar a câmera:', error);
    });
}

document.getElementById('openCameraButton').addEventListener('click', openCamera);
