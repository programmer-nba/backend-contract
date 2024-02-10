const router = require("express").Router();
const lawyer = require("../../controllers/lawyer/lawyer.controllers");

//สร้าง user
router.post("/create", lawyer.create);
module.exports = router;
