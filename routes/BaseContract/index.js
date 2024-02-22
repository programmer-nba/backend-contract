const router = require("express").Router()
const BaseContract = require('../../controllers/BaseContract/base_contract_controller.js')
const authLawyer = require("../../lib/auth-lawyer")

router.post('/create', authLawyer, BaseContract.createBaseContract)
router.post('/code', authLawyer, BaseContract.getBaseContractByCode)
router.get('/all', authLawyer, BaseContract.getBaseContracts)
router.put('/:id', authLawyer, BaseContract.editBaseContract)
router.delete('/:id', authLawyer, BaseContract.deleteBaseContract)
router.get('/codes', BaseContract.getBaseContractCodes)
router.get('/:id', BaseContract.getBaseContractById)

module.exports = router