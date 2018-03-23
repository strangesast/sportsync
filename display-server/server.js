const express = require('express');
const app = express();
const PORT = parseInt(process.env.SPORTSYNC_DISPLAY_SERVER_PORT || '3000', 10);

app.get('/', (req, res) => {
  res.send('display server');
});

app.listen(3000, () => console.log(`SportSync Display Server listening on ${ PORT }`));
