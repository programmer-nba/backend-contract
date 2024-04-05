const router = require("express").Router()
const RequestContract = require('../../controllers/Contract/request_controller')

router.post('/create', RequestContract.createRequest)
router.put('/update/:id', RequestContract.updateRequest)
router.get('/get', RequestContract.getRequests)
router.get('/get/:id', RequestContract.getRequest)
router.delete('/delete/:id', RequestContract.deleteRequest)
router.delete('/delete', RequestContract.deleteRequests)

module.exports = router