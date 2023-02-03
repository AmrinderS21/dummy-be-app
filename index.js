const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

const { initApyhub, data } = require("apyhub");

// please add your own token
initApyhub("APT0fbmLi30UrF6MeMGo6K339YzmvPtL7kAHgljIFvsU8gfh6sDz")
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

const handleErrorCode = (err) => {
  if (err.includes(401)) {
    return 401
  } else return 400
}

app.get("/currency-list", async (req, res) => {
  try {
    const resp = await data.currencyList();
    res.send({ list: resp })
  } catch (error) {
    res.status(handleErrorCode(error.message)).send(error.message);
  }
});

app.post("/currency-converter", async (req, res) => {
  try {
    const resp = await data.currencyConverter(req.query);
    res.send({ resp });
  } catch (error) {
    res.status(handleErrorCode(error.message)).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;