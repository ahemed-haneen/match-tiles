const express = require('express')
const cors = require('cors')
const app = express()
const port = 5172;

app.use(cors())
app.use(express.json());

app.post('/api/results', (req, res) => {
    const receivedData = req.body;
    console.log('Recieved Data: ', receivedData);
  // Process the data here (e.g., save to database)
  res.send('Data received!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});