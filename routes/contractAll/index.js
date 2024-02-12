const router = require("express").Router();
const lawyer = require("../../controllers/lawyer/lawyer.controllers");
const HaveplaceNocapital = require("../../controllers/HaveplaceNocapital/HaveplaceNocapital.controllers");
const PartnerHaveplaceNocapital = require("../../controllers/HaveplaceNocapital/PartnerHaveplaceNocapital.controllers");
const authContractAll = require("../../lib/auth-Contract");

//สร้าง token
router.post("/genPublicToken", lawyer.genPublicToken);

//สร้างสัญญา
router.post("/create", authContractAll, HaveplaceNocapital.create);
router.put(
  "/EditContract/:id",
  authContractAll,
  HaveplaceNocapital.EditContract
);
router.delete(
  "/deleteContractBase/:id",
  authContractAll,
  HaveplaceNocapital.deleteContractBase
);
router.get(
  "/GetAllContractByCode",
  authContractAll,
  HaveplaceNocapital.GetAllContractByCode
);
router.get(
  "/GetAllContract",
  authContractAll,
  HaveplaceNocapital.GetAllContract
);
router.get(
  "/GetContractBy/:id",
  authContractAll,
  HaveplaceNocapital.GetContractByID
);

//สร้างอีกใบสัญญา
router.post("/createNew/:id", authContractAll, PartnerHaveplaceNocapital.createNew); //สร้างแบบ BY ID
router.post("/createCode", authContractAll, PartnerHaveplaceNocapital.createCode);
router.put(
  "/EditContractNew/:id",
  authContractAll,
  PartnerHaveplaceNocapital.EditContractNew
);
router.put("/AddStatus/:id", authContractAll, PartnerHaveplaceNocapital.AddStatus); //เพิ่มสถาณะ
router.delete(
  "/deleteContract/:id",
  authContractAll,
  PartnerHaveplaceNocapital.deleteContract
);
router.get(
  "/GetAllContractNewByCode",
  authContractAll,
  PartnerHaveplaceNocapital.GetAllContractNewByCode
);
router.get(
  "/GetAllContractNew",
  authContractAll,
  PartnerHaveplaceNocapital.GetAllContractNew
);
router.get(
  "/GetContractByIDNew/:id",
  authContractAll,
  PartnerHaveplaceNocapital.GetContractByIDNew
);

module.exports = router;
