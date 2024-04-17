// function notifyMe() {
//   if (!('Notification' in window)) {
//     console.log('Este navegador não suporta notificações na área de trabalho');
//   } else {
//     new Promise((resolve) => {
//       Notification.requestPermission(resolve)?.then(resolve);
//     }).then(permission => handleServiceWorker())
//   }
// }

async function notifyMe() {
  let swRegistration = await navigator.serviceWorker.register('service-worker.js', {scope: '/webpush-ios-example/'})
  let pushManager = swRegistration.pushManager;

  if (!isPushManagerActive(pushManager)) {
      return;
  }

  let permissionState = await pushManager.permissionState({userVisibleOnly: true});
  switch (permissionState) {
      case 'prompt':
          document.getElementById('subscribe_btn').style.display = 'block';
          break;
      case 'granted':
          displaySubscriptionInfo(await pushManager.getSubscription())
          break;
      case 'denied':
          document.getElementById('subscribe_btn').style.display = 'none';
          document.getElementById('active_sub').style.display = 'block';
          document.getElementById('active_sub').innerHTML = 'User denied push permission';
  }
}

// function notifyMe() {
//     // if (!('Notification' in window)) {
//     //   alert('This browser does not support desktop notification');
//     // } else if (Notification.permission === 'granted') {
//     //   handleServiceWorker();
//     // } else if (Notification.permission !== 'denied') {
//     //   Notification.requestPermission().then((permission) => {
//     //     if (permission === 'granted') {
//     //       handleServiceWorker();
//     //     }
//     //   });
//     // }
//     new Promise((resolve) => {
//       Notification.requestPermission(resolve)?.then(resolve);
//    }).then(permission => console.log(permission))
//   }
  
  function subscribeToPush() {
 alert("IHRA")
    navigator.serviceWorker.getRegistration().then(async (serviceWorker) => {
        serviceWorker.update();
  
        let subscription = await serviceWorker.pushManager.getSubscription();
        if (!subscription) {
          const publicKeyResponse = await fetch('https://backendevolutize.onrender.com/notification/push/public_key');
          const publicKeyData = await publicKeyResponse.json();
          subscription = await serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKeyData.publicKey,
          });
        }
        var string = 'https://backendevolutize.onrender.com/notification/push/register'
        await fetch(string, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ subscription })
        });
        var stringF = 'https://backendevolutize.onrender.com/notification/push/send'
        console.log(stringF)
        await fetch('https://backendevolutize.onrender.com/notification/push/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ subscription })
        });
      });
  }


  
  document.getElementById('subscribeButton').addEventListener('click', notifyMe);
  
  if ((new URLSearchParams(window.location.search)).get('page') === 'success') {
    document.getElementById('content').innerHTML = 'You successfully opened page from WebPush! (this url was that was set in json data param)';
}

if (navigator.serviceWorker) {
    initServiceWorker();
}
