// function notifyMe() {
//   if (!('Notification' in window)) {
//     alert('This browser does not support desktop notification');
//   } else if (Notification.permission === 'granted') {
//     handleServiceWorker();
//   } else if (Notification.permission !== 'denied') {
//     Notification.requestPermission().then((permission) => {
//       if (permission === 'granted') {
//         handleServiceWorker();
//       }
//     });
//   }else{
//     handleServiceWorker();
//   }
// }

// function handleServiceWorker() {
//   alert("IHRA")
//   navigator.serviceWorker.register("service-worker.js")
//     .then(async (serviceWorker) => {
//       serviceWorker.update();
//       debugger;
//       let subscription = await serviceWorker.pushManager.getSubscription();
//       if (!subscription) {
//         const publicKeyResponse = await fetch('https://backendevolutize.onrender.com/notification/push/public_key');
//         const publicKeyData = await publicKeyResponse.json();
//         subscription = await serviceWorker.pushManager.subscribe({
//           userVisibleOnly: true,
//           applicationServerKey: publicKeyData.publicKey,
//         });
//         var string = 'https://backendevolutize.onrender.com/notification/push/register'
//         const teste  = await fetch(string, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ subscription })
//         });
//       }
//       console.log("oi")
//       // var stringF = 'https://backendevolutize.onrender.com/notification/push/send'
//       // console.log(stringF)
//       // await fetch('https://backendevolutize.onrender.com/notification/push/send', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json'
//       //   },
//       //   body: JSON.stringify({ subscription })
//       // });
//     });
// }
// function verficarSubscricao() {


//   if (!('Notification' in window)) {
//     alert('This browser does not support desktop notification');
//   } else if (Notification.permission === 'granted') {
//     navigator.serviceWorker.register("service-worker.js")
//     .then(async (serviceWorker) => {
//       serviceWorker.update();
//       debugger;
//       let subscription = await serviceWorker.pushManager.getSubscription();
//       if (subscription) {
//         alert("JA ESTA SUBSCRITO")
//       }else{
//         alert("NAO ESTA SUBSCRITO")
//       }
    
//     });
//   }else if(Notification.permission === 'default'){
//     alert("SEM NOTIFICAO - DEFAULT")
//   }else if(Notification.permission === 'denied'){
//     alert("NOTIFICAO BLOQUEADA")
//   }
// }

// document.getElementById('subscribeButton').addEventListener('click', notifyMe);
// document.getElementById('verifyButton').addEventListener('click', verficarSubscricao);
async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register("service-worker.js");
    return registration;
  } catch (error) {
    console.error('Erro ao registrar o Service Worker:', error);
  }
}

async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  return permission;
}

async function notifyMe() {
  if (!('Notification' in window)) {
    alert('Este navegador não suporta notificações desktop');
    return;
  }

  const permission = await requestNotificationPermission();

  if (permission === 'granted') {
    const registration = await registerServiceWorker();
    if (registration) {
      registration.showNotification('Notificação com ServiceWorker');
    }
  } else if (permission === 'denied') {
    alert('Permissão para notificações foi negada.');
  }
}

document.getElementById('subscribeButton').addEventListener('click', notifyMe);
