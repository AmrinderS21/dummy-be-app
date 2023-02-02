const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

const { initApyhub, data } = require("apyhub");
initApyhub("APT0R8Ss23IaKkJvzYZaZKoQiXjnF1AGQnzwvr303YRaXU");

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

app.get("/currency-list", (req, res) => {
    data.currencyList()
    .then((resp) => res.send({ list: resp }))
    .catch((err) => res.send({ error: err}))
    
});

app.post("/currency-converter", (req, res) => {
    data.currencyConverter(req.query)
    .then((resp) => res.send({ resp }))
    .catch((err) =>  res.status(400).send({
        err: {...err}
     }))
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});