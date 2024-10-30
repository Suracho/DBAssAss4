const express = require('express');
const connectDB = require('./db');
const port = 3000;
const app = express();

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World');  
});

app.post('/submit-form', (req, res) => {
  res.send('Form submitted');
}); 

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);  
});