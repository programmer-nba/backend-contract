const router = require("express").Router()
const Base64 = require('../../controllers/Contract/base64_controller')

router.post('/create', Base64.createBase64)
router.put('/update/:id', Base64.updateBase64)
//router.get('/get', Base64.getBase64s)
router.get('/get/:id', Base64.getBase64)
router.delete('/delete/:id', Base64.deleteBase64)
router.delete('/delete', Base64.deleteBase64s)

module.exports = router