const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getData, storeData, updateData } = require('./helpers');
const app = express();
const PORT = 6006;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
  const data = await getData();
  res.send(data);
});

app.post('/', async (req, res) => {
  const { body: data } = req;
  await storeData(data);
  res.send('dope');
});

app.put('/', async (req, res) => {
  const { body: data } = req;
  const updatedData = await updateData(data);
  console.log('express updatedData', updatedData);
  res.send(updatedData);
});

app.listen(PORT, () => {
  console.log(`Server initialized at: http://localhost:${PORT}`);
});
