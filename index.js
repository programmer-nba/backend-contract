require("dotenv").config();

const express = require('express');
const app = express()
const bodyParser = require("body-parser");
const concention = require("./config/db");
const cors = require("cors");
concention();


app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

//test-sample
app.get("/", (req, res) => {
    res.send({ data: "hello world test   sdsdsadda 115zzz6\n5s5s5s5s5s5" })
});

//eContract
app.use("/contract", require("./routes/doc_a"));

const port = process.env.PORT || 9987;
app.listen(port, () => {
    console.log(`\n--- test-eContract --- \nListening on port ${port}\n`)
})