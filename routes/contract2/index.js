const router = require("express").Router();
const contract = require("../../controllers/HaveplaceNocapital/HaveplaceNocapital.controllers")

//สร้างใบสัญญา
router.post("/create",contract.create)

module.exports = router; 