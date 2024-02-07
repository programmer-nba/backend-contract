const router = require("express").Router();
const parter = require("../../controllers/partner/partner.controllers")

//รับข้อมุลสัญญา
router.post("/create", parter.create);


module.exports = router;
