const createRequest = data => fetch('./php/server.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'appliction/json',
  },
  body: JSON.stringify(data)
});
