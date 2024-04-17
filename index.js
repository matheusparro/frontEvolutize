function notifyMe() {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      handleServiceWorker();
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          handleServiceWorker();
        }
      });
    }
  }
  
  function handleServiceWorker() {
 alert("IHRA")
    navigator.serviceWorker.register("service-worker.js")
      .then(async (serviceWorker) => {
        serviceWorker.update();
  
        let subscription = await serviceWorker.pushManager.getSubscription();
        if (!subscription) {
          const publicKeyResponse = await fetch('http://192.168.1.11:3333/notification/push/public_key');
          const publicKeyData = await publicKeyResponse.json();
          subscription = await serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKeyData.publicKey,
          });
        }
        var string = 'http://192.168.1.11:3333/notification/push/register'
        await fetch(string, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ subscription })
        });
        var stringF = 'http://192.168.1.11:3333/notification/push/send'
        console.log(stringF)
        await fetch('http://192.168.1.11:3333/notification/push/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ subscription })
        });
      });
  }


  
  document.getElementById('subscribeButton').addEventListener('click', notifyMe);
  