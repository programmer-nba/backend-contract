require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const concention = require("./config/db");
const cors = require("cors");
concention();

app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

const prefix = "/contract";

app.use(prefix + "/", require("./routes/index"));

app.use(prefix + "/v1/creator", require("./routes/Contract/creator_route"));
app.use(prefix + "/v1/standard", require("./routes/Contract/standard_route"));

// สร้างสัญญาพื้นฐาน (BASE)
app.use(prefix + "/base-contract", require("./routes/BaseContract/index"));

// สร้างสัญญา partner
app.use(prefix + "/partner-contract", require("./routes/PartnerContract/index"));

// สร้างใบสัญญา
app.use(prefix + "/HaveplaceNocapital", require("./routes/contract2/index"));

// รับข้อมูลจาก partner
app.use(prefix + "/partner", require("./routes/partner/index"));

//user ทนายความ
app.use(prefix + "/lawyer", require("./routes/lawyer/index"));

//สัญญา api
app.use(prefix + "/contract-All", require("./routes/contractAll/index"));
// //eContract
app.use(prefix + "/WriteProgram", require("./routes/doc_a"));

const port = process.env.PORT || 9997;
app.listen(port, () => {
  console.log(`\n--- test-eContract --- \nListening on port ${port}\n`);
});
