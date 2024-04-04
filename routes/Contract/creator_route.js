const router = require("express").Router()
const Creator = require('../../controllers/Contract/creator_controller')

router.post('/create', Creator.createCreator)
router.put('/update/:id', Creator.updateCreator)
router.get('/get', Creator.getCreators)
router.get('/get/:id', Creator.getCreator)
router.delete('/delete/:id', Creator.deleteCreator)
router.delete('/delete', Creator.deleteCreators)

module.exports = router