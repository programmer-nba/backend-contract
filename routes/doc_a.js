const router = require("express").Router();
const con_a = require("../controllers/doc_a.controller");

router.post("/add", con_a.create);
router.get("/all", con_a.getAllDoc);
router.get("/all/:id", con_a.getAllDocbyOwnerId);
router.get("/one/:id", con_a.getOneDocbyOwnerId);
router.put("/:id", con_a.update);
router.delete("/:id", con_a.delete);

module.exports = router;