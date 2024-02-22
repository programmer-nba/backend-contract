const router = require("express").Router()
const PartnerContract = require('../../controllers/PartnerContract/partner_contract_controller.js')
const authLawyer = require("../../lib/auth-lawyer")

router.post('/create', PartnerContract.createPartnerContract)
router.post('/code', PartnerContract.getPartnerContractByCode)
router.get('/one/:id', PartnerContract.getPartnerContractById)
router.delete('/:id', PartnerContract.deletePartnerContract)
router.put('/edit/:id', PartnerContract.editPartnerContract)
router.get('/all', PartnerContract.getPartnerContracts)
router.put('/sign/:id', PartnerContract.signPartnerContract)
router.put('/paid/:id', PartnerContract.paidPartnerContract)
//router.delete('/:id', authLawyer, PartnerContract.deleteBaseContract)
router.post('/all-me', PartnerContract.getPartnerContractsByPartnerIdOrCode)

module.exports = router