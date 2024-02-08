const router = require("express").Router();
const contract = require("../../controllers/HaveplaceNocapital/HaveplaceNocapital.controllers");
const contractNew = require("../../controllers/HaveplaceNocapital/PartnerHaveplaceNocapital.controllers");

//สร้างใบสัญญา
router.post("/create", contract.create);
router.put("/EditContract/:id", contract.EditContract);
router.delete("/deleteContractBase/:id", contract.deleteContractBase);
router.get("/GetAllContractByCode", contract.GetAllContractByCode);
router.get("/GetAllContract", contract.GetAllContract);
router.get("/GetContractBy/:id", contract.GetContractByID);

//สร้างอีกใบสัญญา
router.post("/createNew/:id", contractNew.createNew); //สร้างแบบ BY ID
router.post("/createCode", contractNew.createCode);
router.put("/EditContractNew/:id", contractNew.EditContractNew);
router.put("/AddStatus/:id", contractNew.AddStatus)//เพิ่มสถาณะ
router.delete("/deleteContract/:id", contractNew.deleteContract);
router.get("/GetAllContractNewByCode", contractNew.GetAllContractNewByCode)
router.get("/GetAllContractNew", contractNew.GetAllContractNew);
router.get("/GetContractByIDNew/:id", contractNew.GetContractByIDNew);

module.exports = router;
