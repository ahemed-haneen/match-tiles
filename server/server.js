const express = require("express");
const cors = require("cors");
const app = express();
const port = 5172;

app.use(cors());
app.use(express.json());

const results = [];
const winner = {
  player: "",
  timestamp: ""
}

app.post("/api/results", (req, res) => {
  const receivedData = req.body;
  console.log("Recieved Data: ", receivedData);
  // Process the data here (e.g., save to database)

  results.push(receivedData);

  if (winner.timestamp < receivedData.timestamp) {
    winner.player = receivedData.player;
    winner.timestamp = receivedData.timestamp;
  }
  res.status(200).send(winner);

  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  console.log(
    "$$$  " + winner.player + "  $$$  " + winner.timestamp + "  $$$$"
  );
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
});

app.get("/api/results", (req, res) => {
  console.log("results total : ", results);
  res.status(200).send(results);
});

app.listen(port, () => {
  console.log(`Server listening on port no : ${port}`);
});
