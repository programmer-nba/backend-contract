const router = require("express").Router();
const parter = require("../../controllers/partner/partner.controllers")

//รับข้อมุลสัญญา
router.post("/create", parter.create);
router.delete("/deleteAllPartner",parter.deleteAllPartner)
router.get("/GetAllPartner",parter.GetAllPartner)

module.exports = router;
