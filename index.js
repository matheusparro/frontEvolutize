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

// Função para abrir a câmera e capturar uma foto
async function openCamera() {
  try {
    const video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    // Quando o vídeo começar a tocar, tira uma foto após 3 segundos
    video.onloadedmetadata = () => {
      setTimeout(capturePhoto, 3000); // Captura a foto após 3 segundos
    };
  } catch (error) {
    console.error('Erro ao acessar a câmera:', error);
  }
}

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
document.getElementById('cameraButton').addEventListener('click', openCamera);
