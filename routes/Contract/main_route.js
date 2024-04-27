const router = require("express").Router()
const MainContract = require('../../controllers/Contract/main_controller')

router.post('/create', MainContract.createMainContract)
router.put('/update/:id', MainContract.updateMainContract)
router.get('/get', MainContract.getMainContracts)
router.get('/get/:id', MainContract.getMainContract)
router.get('/get-my/:id', MainContract.getMyMainContracts)
router.delete('/delete/:id', MainContract.deleteMainContract)
router.delete('/delete', MainContract.deleteMainContracts)

module.exports = router