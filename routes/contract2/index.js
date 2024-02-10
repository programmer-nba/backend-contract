const router = require("express").Router();
const contract = require("../../controllers/HaveplaceNocapital/HaveplaceNocapital.controllers");
const contractNew = require("../../controllers/HaveplaceNocapital/PartnerHaveplaceNocapital.controllers");
const authLawyer = require("../../lib/auth-lawyer")

//สร้างใบสัญญา
router.post("/create",authLawyer, contract.create);
router.put("/EditContract/:id",authLawyer, contract.EditContract);
router.delete("/deleteContractBase/:id",authLawyer, contract.deleteContractBase);
router.get("/GetAllContractByCode",authLawyer, contract.GetAllContractByCode);
router.get("/GetAllContract",authLawyer, contract.GetAllContract);
router.get("/GetContractBy/:id",authLawyer, contract.GetContractByID);

//สร้างอีกใบสัญญา
router.post("/createNew/:id",authLawyer, contractNew.createNew); //สร้างแบบ BY ID
router.post("/createCode",authLawyer, contractNew.createCode);
router.put("/EditContractNew/:id",authLawyer, contractNew.EditContractNew);
router.put("/AddStatus/:id",authLawyer, contractNew.AddStatus)//เพิ่มสถาณะ
router.delete("/deleteContract/:id",authLawyer, contractNew.deleteContract);
router.get("/GetAllContractNewByCode",authLawyer, contractNew.GetAllContractNewByCode)
router.get("/GetAllContractNew",authLawyer, contractNew.GetAllContractNew);
router.get("/GetContractByIDNew/:id",authLawyer, contractNew.GetContractByIDNew);

module.exports = router;
