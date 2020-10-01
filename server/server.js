const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.static('../client/dist'));

app.get('/:id', (req,res) => {

});

app.listen(PORT, () => {
  console.log(`Server running and listening on port: ${PORT}`);
});
