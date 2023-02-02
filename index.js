const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

const { initApyhub, data } = require("apyhub");
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
  try {
    const resp = await data.currencyList();
    res.send({ list: resp })
  } catch (e) {
    console.log(e, 'eeee');
  } finally {
    console.log('eeee');
  }
    // data.currencyList()
    // .then((resp) => res.send({ list: resp }))
    // .catch((err) => res.send({ err: throw new Error('ws')}))
    
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

module.exports = app;