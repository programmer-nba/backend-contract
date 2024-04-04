const router = require("express").Router()
const Standard = require('../../controllers/Contract/standard_controller')

router.post('/create', Standard.createStandard)
router.put('/update/:id', Standard.updateStandard)
router.get('/get', Standard.getStandards)
router.get('/get/:id', Standard.getStandard)
router.delete('/delete/:id', Standard.deleteStandard)
router.delete('/delete', Standard.deleteStandards)

module.exports = router