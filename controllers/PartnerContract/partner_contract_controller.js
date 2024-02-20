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
        const baseContract = baseContracts.find(contract=>contract.code===code)
        if( baseContracts.length < 1 || !baseContract ) {
            return res.send({
                code: code,
                message: `not found code ${code} in base contract !`,
                status: false,
                data: null
            })
        }

        const contract_code = baseContract ? `${baseContract.code}-${baseContracts.length}` : null
        
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
            status: {
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
    const { code } = req.body
    try {
        const partnerContract = await PartnerContract.findOne({ code: code })
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