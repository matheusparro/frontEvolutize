self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('TESTE SERVICE MATHEUS push notification:', data);

  const options = {
    body: data.body,
    icon: data.icon,
    image: data.imageUrl,
    badge: 'your-badge.png',
    data: {
      title: data.title,
      body: data.body
    }
  };

  // Exibir a notificação
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
