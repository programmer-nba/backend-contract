const PartnerContract = require('../../model/PartnerContract/partner_contract_model.js')
const BaseContract = require('../../model/BaseContract/base_contract_model.js')

exports.createPartnerContract = async (req, res) => {
    const {
        code,
        partner_main_name,
        start_date,
        end_date,
        partner_id,
        partner_code,
        partner_prefix,
        partner_full_name,
        partner_first_name,
        partner_last_name,
        partner_company_name,
        partner_company_branch,
        partner_address,
        partner_tax_id,
        partner_tel,
        partner_signature, // Array
        partner_stamp,
        partner_logo
    } = req.body

    try {
        const baseContracts = await BaseContract.find()
        const partnerContracts = await PartnerContract.find()
        const baseContract = baseContracts.find(contract=>contract.code===code)
        if( baseContracts.length < 1 || !baseContract ) {
            return res.send({
                code: code,
                message: `not found code ${code} in base contract !`,
                status: false,
                data: null
            })
        }

        const contract_code = baseContract ? `${baseContract.code}-${partnerContracts.length}` : null
        
        /* const formatText_body = baseContract.detail_text ? baseContract.detail_text.body
        .replace('นาย/นาง/นางสาว', partner_prefix)
        .replace('partner_name', partner_full_name)
        : null */

        const formatHtml_body = baseContract.detail_html.body
        .replace('นาย/นาง/นางสาว', partner_prefix)
        .replace('partner_main_name', partner_main_name)
        .replace('partner_tax_id', partner_tax_id)
        
       /*  const format_detail_text = {
            head: baseContract.detail_text.head,
            body: formatText_body,
            footer: baseContract.detail_text.footer
        } */

        const format_detail_html = {
            head: baseContract.detail_html.head,
            body: formatHtml_body,
            footer: baseContract.detail_html.footer
        }

        const data = {
            contract_code: contract_code,
            type: baseContract.type,
            title: baseContract.title,
            sub_title: baseContract.sub_title,
            company: baseContract.company,
            partner_main_name: partner_main_name,
            partner: {
                _id: partner_id,
                code: partner_code,
                prefix: partner_prefix,
                full_name: partner_full_name,
                first_name: partner_first_name,
                last_name: partner_last_name,
                company_name: partner_company_name,
                company_branch: partner_company_branch,
                address: partner_address,
                tax_id: partner_tax_id,
                tel: partner_tel,
                signature: partner_signature, // Array
                stamp: partner_stamp,
                logo: partner_logo
            },
            //detail_text: format_detail_text,
            detail_html: format_detail_html,
            file_pdf: null,
            start_date: start_date ? start_date : new Date(),
            end_date: end_date ? end_date : null,
            status: baseContract.type === 'ddsc' ? {
                name: 'pending',
                text: 'รอยืนยัน',
                createdAt: new Date()
            } : {
                name: 'new',
                text: 'รอลงนาม',
                createdAt: new Date()
            }
        }

        const new_partnerContract = new PartnerContract(data)
        const saved_partnerContract = await new_partnerContract.save()
        if(!saved_partnerContract){
            return res.send({
                message: 'can not save partner contract!',
                status: false,
                data : null
            })
        }

        return res.send({
            message: 'success create new partner contract',
            status: true,
            data: saved_partnerContract
        })
        
    }
    catch ( err ) {
        console.log( err )
        return res.send({
            message: err.message,
            status: false,
            data : null
        })
    }
}

exports.getPartnerContracts = async ( req, res ) => {
    try {
        const partnerContracts = await PartnerContract.find()
        return res.send({
            message: `มีสัญญา ${partnerContracts.length} ฉบับ`,
            status: true,
            data: partnerContracts
        })
    }
    catch(err) {
        console.log(err)
        return res.send({
            message: err.message,
            status: false,
            data: null
        })
    }
}

exports.getPartnerContractByCode = async ( req, res ) => {
    const { contract_code } = req.body
    try {
        const partnerContract = await PartnerContract.findOne({ contract_code: contract_code })
        if(!partnerContract){
            return res.send({
                message: 'partner contract not founded',
                status: false,
                data: null
            })
        }
        return res.send({
            message: `sucess!`,
            status: true,
            data: partnerContract
        })
    }
    catch(err) {
        console.log(err)
        return res.send({
            message: err.message,
            status: false,
            data: null
        })
    }
}

exports.getPartnerContractsByPartnerIdOrCode = async ( req, res ) => {
    const { partner_id, partner_code } = req.body
    try {
        const partnerIdContracts = partner_id && partner_id!=='' ? await PartnerContract.find({ 'partner._id' : partner_id }) : null
        const partnerCodeContracts = partner_code && partner_code!=='' ? await PartnerContract.find({ 'partner.code' : partner_code }) : null
        
        if(!partnerIdContracts && !partnerCodeContracts){
            return res.send({
                message: 'partner contracts not found',
                status: false,
                data: null
            })
        }
        return res.send({
            message: `success!`,
            status: true,
            data: partnerIdContracts ? partnerIdContracts : partnerCodeContracts
        })
    }
    catch(err) {
        console.log(err)
        return res.send({
            message: err.message,
            status: false,
            data: null
        })
    }
}

exports.getPartnerContractById = async ( req, res ) => {
    const { id } = req.params
    try {
        const partnerContract = await PartnerContract.findById( id )
        if(!partnerContract){
            return res.send({
                message: 'partner contract not founded',
                status: false,
                data: null
            })
        }
        return res.send({
            message: `sucess!`,
            status: true,
            data: partnerContract
        })
    }
    catch(err) {
        console.log(err)
        return res.send({
            message: err.message,
            status: false,
            data: null
        })
    }
}

exports.deletePartnerContract = async ( req, res ) => {
    const { id } = req.params
    try {
        const partnerContract = await PartnerContract.findByIdAndDelete( id )
        if(!partnerContract){
            return res.send({
                message: 'partner contract not founded',
                status: false,
                data: null
            })
        }
        return res.send({
            message: `sucess!`,
            status: true,
            data: null
        })
    }
    catch(err) {
        console.log(err)
        return res.send({
            message: err.message,
            status: false,
            data: null
        })
    }
}

exports.editPartnerContract = async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const partnerContract = await PartnerContract.findByIdAndUpdate(id,{
            $set: {
                ...body,
                start_date: body.start_date ?  body.start_date : new Date(),
                'payment.bank_owner_name': body.bank_owner_name,
                'payment.bank_number': body.bank_number,
                'payment.bank_type': body.bank_type,
                'payment.bank_branch': body.bank_branch, 
                'payment.bank_img': body.bank_img, 
                'payment.deposit_amount' : body.deposit_amount,
                all_price: body.all_price
            },
            $push: {
                status: {
                    name: "new",
                    text: "รอลงนาม",
                    createdAt: new Date()
                }
            }
        }, { new : true })
        if(!partnerContract){
            return res.send({
                message: 'can not edit partner contract!',
                status: false,
                data : null
            })
        }

        return res.send({
            message: 'success edit partner contract',
            status: true,
            data: partnerContract
        })
        
    }
    catch ( err ) {
        console.log( err )
        return res.send({
            message: err.message,
            status: false,
            data : null
        })
    }
}

exports.paidPartnerContract = async (req, res) => {
    const { id } = req.params
    const { slip, paid_amount, transfer_by, paidAt   } = req.body
    console.log(slip)
    try {
        const partnerContract = await PartnerContract.findByIdAndUpdate(id,{
            $set: {
                'payment.paid_slip': slip,
                'payment.paid_amount': paid_amount,
                'payment.transfer_by': transfer_by,
                'payment.paidAt': paidAt || new Date()
            },
            $push: {
                status: {
                    name: 'paid',
                    text: 'ชำระเงินแล้ว',
                    createdAt: new Date()
                }
            }
        }, { new : true })
        if(!partnerContract){
            return res.send({
                message: 'can not sign partner contract!',
                status: false,
                data : null
            })
        }

        return res.send({
            message: 'success sign partner contract',
            status: true,
            data: partnerContract
        })
        
    }
    catch ( err ) {
        console.log( err )
        return res.send({
            message: err.message,
            status: false,
            data : null
        })
    }
}

exports.signPartnerContract = async (req, res) => {
    const { id } = req.params
    const { partner_signature } = req.body
    console.log(partner_signature)
    try {
        const partnerContract = await PartnerContract.findByIdAndUpdate(id,{
            $set: {
                'partner.signature' : partner_signature,
            },
            $push: {
                status: {
                    name: 'signed',
                    text: 'ลงนามแล้ว',
                    createdAt: new Date()
                }
            }
        }, { new : true })
        if(!partnerContract){
            return res.send({
                message: 'can not sign partner contract!',
                status: false,
                data : null
            })
        }

        return res.send({
            message: 'success sign partner contract',
            status: true,
            data: partnerContract
        })
        
    }
    catch ( err ) {
        console.log( err )
        return res.send({
            message: err.message,
            status: false,
            data : null
        })
    }
}
