const router = require("express").Router()
const PartnerContract = require('../../controllers/PartnerContract/partner_contract_controller.js')
const authLawyer = require("../../lib/auth-lawyer")

router.post('/create', PartnerContract.createPartnerContract)
router.post('/code', PartnerContract.getPartnerContractByCode)
router.get('/all', PartnerContract.getPartnerContracts)
//router.put('/:id', authLawyer, PartnerContract.editBaseContract)
//router.delete('/:id', authLawyer, PartnerContract.deleteBaseContract)
//router.get('/codes', PartnerContract.getBaseContractCodes)

module.exports = router