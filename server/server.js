const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = 3001;

// used to compress files when sending them to client
const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};

app.use(compression({
  filter: shouldCompress,
  level: 7,
}));

app.use(express.static('../client/dist'));

app.get('/products/:id', (req, res) => res.sendFile(path.resolve('..', 'client', 'dist', 'products.html')));

app.listen(PORT, () => {
  console.log(`Server running and listening on port: ${PORT}`);
});
