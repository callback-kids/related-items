const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('../client/dist'));

app.get('/products/:id', (req, res) => res.sendFile(path.resolve('..', 'client', 'dist', 'products.html')));

app.listen(PORT, () => {
  console.log(`Server running and listening on port: ${PORT}`);
});
