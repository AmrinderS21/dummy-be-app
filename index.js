const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

const { initApyhub, data } = require("apyhub");

// please add your own token 
// initApyhub("your-token");
initApyhub("APT0fbmLi30UrF6MeMGo6K339YzmvPtL7kAHgljIFvsU8gfh6sDz");

const PORT = process.env.PORT || 3001;

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
};
  
app.use(cors(corsOpts));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get("/currency-list", async (req, res) => {
  data.currencyList()
  .then((resp) => res.send({ list: resp }))
  .catch((error) => res.status(400).send({ error }))
});

app.post("/currency-converter", (req, res) => {
    data.currencyConverter(req.query)
    .then((resp) => res.send({ resp }))
    .catch((error) => res.status(400).send({ error }))
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;