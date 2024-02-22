const BaseContract = require('../../model/BaseContract/base_contract_model.js')

exports.createBaseContract = async (req, res) => {
    const {
        code,
        type,
        title,
        sub_title,
        company_name,
        company_address,
        company_tax_id,
        company_tel,
        company_signature, // Array
        company_stamp,
        company_logo,
        detail_text, // Object
        detail_html // Object
    } = req.body

    const data = {
        code: code,
        type: type,
        title: title,
        sub_title: sub_title,
        company: {
            name: company_name,
            address: company_address,
            tax_id: company_tax_id,
            tel: company_tel,
            signature: company_signature,
            stamp: company_stamp,
            logo: company_logo
        },
        detail_text: detail_text,
        detail_html: detail_html
    }
    try {
        const baseContractCheck = await BaseContract.findOne({ code: code })
        if(baseContractCheck){
            return res.send({
                message: 'this contract code have already exist!',
                status: false,
                data: null
            })
        }
        const baseContract = new BaseContract(data)
        const saved_contract = await baseContract.save()
        if ( !saved_contract ) {
            return res.send({
                message: 'can not save data!',
                status: false,
                data: null
            })
        }

        return res.send({
            message: 'success create base contract !',
            status: true,
            data: saved_contract
        })
    }
    catch ( err ) {
        console.log(err)
        return res.send({
            message: err.message,
            status: false,
            data: null
        })
    }
}

exports.editBaseContract = async (req, res) => {
    const { id } = req.params
    const {
        code,
        type,
        title,
        sub_title,
        company_name,
        company_address,
        company_tax_id,
        company_tel,
        company_signature, // Array
        company_stamp,
        company_logo,
        detail_text, // Object
        detail_html // Object
    } = req.body

    try {
        const baseContract = await BaseContract.findByIdAndUpdate(id , {
            $set: {
                code: code,
                type: type,
                title: title,
                sub_title: sub_title,
                company: {
                    name: company_name,
                    address: company_address,
                    tax_id: company_tax_id,
                    tel: company_tel,
                    signature: company_signature,
                    stamp: company_stamp,
                    logo: company_logo
                },
                detail_text: detail_text,
                detail_html: detail_html
            }
        }, { new : true })
        if ( !baseContract ) {
            return res.send({
                message: 'not found contract!',
                status: false,
                data: null
            })
        }

        return res.send({
            message: 'success editted base contract !',
            status: true,
            data: baseContract
        })
    }
    catch ( err ) {
        console.log(err)
        return res.send({
            message: err.message,
            status: false,
            data: null
        })
    }
}

exports.getBaseContracts = async (req, res) => {
    try {
        const baseContracts = await BaseContract.find()
        return res.send({
            message: `have ${baseContracts.length} contract`,
            status: true,
            data: baseContracts
        })
    }
    catch ( err ) {
        console.log(err)
        return response.send({
            message: err.message,
            status: false
        })
    }
}

exports.getBaseContractByCode = async (req, res) => {
    const { code } = req.body
    try {
        const baseContract = await BaseContract.findOne({ code: code })
        if(!baseContract){
            return res.send({
                message: 'not found contract!',
                status: false,
                data : null
            })
        }

        return res.send({
            message: `contract founded`,
            status: true,
            data: baseContract
        })
    }
    catch ( err ) {
        console.log(err)
        return response.send({
            message: err.message,
            status: false
        })
    }
}

exports.getBaseContractById = async (req, res) => {
    const { id } = req.params
    try {
        const baseContract = await BaseContract.findById(id)
        if(!baseContract){
            return res.send({
                message: 'not found contract!',
                status: false,
                data : null
            })
        }

        return res.send({
            message: `contract founded`,
            status: true,
            data: baseContract
        })
    }
    catch ( err ) {
        console.log(err)
        return response.send({
            message: err.message,
            status: false
        })
    }
}

exports.deleteBaseContract = async (req, res) => {
    const { id } = req.params
    try {
        const baseContract = await BaseContract.findByIdAndDelete( id )
        if(!baseContract){
            return res.send({
                message: 'not found contract!',
                status: false,
                data : null
            })
        }

        return res.send({
            message: `contract deleted!`,
            status: true,
            data: baseContract.code
        })
    }
    catch ( err ) {
        console.log(err)
        return response.send({
            message: err.message,
            status: false
        })
    }
}

exports.getBaseContractCodes = async (req, res) => {
    try {
        const baseContracts = await BaseContract.find()
        if(baseContracts.length < 1) {
            return res.send({
                message: 'have no contract!',
                status: false,
                data: null
            })
        }

        const baseContracts_tossagun = baseContracts.filter(contract=>contract.type==='tossagun')
        const codes_tossagun = baseContracts_tossagun.length > 0 ? baseContracts_tossagun.map(contract=> {
            return {
                "code" : contract.code,
                "type" : contract.type,
                "title" : contract.title,
                "sub_title" : contract.sub_title
            }
        }) : []

        const baseContracts_ddsc = baseContracts.filter(contract=>contract.type==='ddsc')
        const codes_ddsc = baseContracts_ddsc.length > 0 ? baseContracts_ddsc.map(contract=> {
            return {
                "code" : contract.code,
                "type" : contract.type,
                "title" : contract.title,
                "sub_title" : contract.sub_title
            }
        }) : []

        return res.send({
            message: `success!`,
            data: {
                ddsc: codes_ddsc,
                tossagun: codes_tossagun
            },
            status: true
        })
    }
    catch (err) {
        console.log(err.message)
        return res.send({
            message: err.message,
            status: false,
            data: null
        })
    }
}