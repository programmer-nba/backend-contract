const router = require("express").Router();
const con_a = require("../controllers/doc_a.controller");

router.post("/add", con_a.create);
router.get("/all", con_a.getAllDoc);
router.get("/all/:id", con_a.getAllDocbyPartnerId);
router.get("/one/:id", con_a.getOneDocbyContractCode);
router.put("/:id", con_a.update);
router.delete("/:id", con_a.delete);

//status
router.put("/waiting/:id", con_a.status_waiting_to_sign);
router.put("/editing/:id", con_a.status_editing_contract);
router.put("/validate/:id", con_a.status_validate);
router.put("/successfully/:id", con_a.status_successfully_sign);
router.put("/cancle/:id", con_a.status_cancle_sign);

module.exports = router;