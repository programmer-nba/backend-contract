const router = require("express").Router();
const contract = require("../../controllers/HaveplaceNocapital/HaveplaceNocapital.controllers");

//สร้างใบสัญญา
router.post("/create", contract.create);
router.get("/GetAllContract", contract.GetAllContract);
router.get("/GetContractBy/:id", contract.GetContractByID);

module.exports = router;
