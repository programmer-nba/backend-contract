const Creator = require('../../model/Contract/creator_model')
const StandardContract = require('../../model/Contract/standardContract_model')
const MainContract = require('../../model/Contract/mainContract_model')

exports.createStandard = async (req, res, next) => {
    const { 
        name,
        title,
        ref_code,
        type,
        start_date,
        due_date,
        detail,
        creator,
        creator_signature,
        suffix,
        payment
    } = req.body

    if ( !name || !type || !ref_code || !title || detail.length < 1 || !creator._id ) {
        return res.status(404).json({
            message: 'จำเป็นต้องเพิ่มชื่อสัญญา ประเภทสัญญา รหัสสัญญา หัวข้อสัญญา รายละเอียดสัญญา และข้อมูลผู้สร้างสัญญา',
            status: false,
            data: null
        })
    }

    try {
        const new_standard = new StandardContract(
            {
                title: title,
                type: type,
                ref_code: ref_code,
                start_date: start_date || new Date(),
                due_date: due_date || new Date(),
                detail: [...detail],
                creator: {...creator},
                signature: {
                    creator: creator_signature?.length > 0 ? [...creator_signature] : [],
                    customer: []
                },
                suffix: suffix || null,
                payment: payment ? {...payment} : null,
            }
        )
        const saved_standard = await StandardContract.create(new_standard)
        if (!saved_standard) {
            return res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการสร้างสัญญาพื้นฐาน',
                status: false,
                data: null
            })
        }

        return res.status(201).json({
            message: 'สร้างสัญญาพื้นฐาน สำเร็จ!',
            status: true,
            data: saved_standard
        })
    }
    catch (error) {
        console.log( error )
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        })
    }
}

exports.updateStandard = async (req, res, next) => {
    const { 
        name,
        title,
        ref_code,
        type,
        start_date,
        due_date,
        detail,
        creator,
        creator_signature,
        suffix,
        payment
    } = req.body

    const { id } = req.params

    try {
        let standard = await StandardContract.findById( id )
        if (!standard) {
            return res.status(404).json({
                message: 'ไม่พบสัญญานี้',
                status: false,
                data: null
            })
        }
        
        standard.name = name || standard.name
        standard.title = title || standard.title 
        standard.ref_code = ref_code || standard.ref_code
        standard.type = type || standard.type
        standard.start_date = start_date || standard.start_date
        standard.due_date = due_date || standard.due_date
        standard.detail = detail?.length > 0 ? [...detail] : standard.detail
        standard.creator = creator ? {...creator} : standard.creator
        standard.signature.creator = creator_signature?.length > 0 ? [...creator_signature] : standard.signature.creator
        standard.suffix = suffix || standard.suffix
        standard.payment = payment ? {...payment} : standard.payment
            
        const saved_standard = await standard.save()
        if (!saved_standard) {
            return res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการแก้ไขสัญญา',
                status: false,
                data: null
            })
        }

        return res.status(201).json({
            message: 'แก้ไขสัญญา สำเร็จ!',
            status: true,
            data: saved_standard,
        })
    }
    catch (error) {
        console.log( error )
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        })
    }
}

exports.getStandards = async (req, res, next) => {
    try {
        const standards = await StandardContract.find()

        return res.status(200).json({
            message: `มีผู้สัญญาพื้นฐานในระบบ ${standards.length}`,
            status: true,
            data: standards
        })
    }
    catch ( error ) {
        console.log( error )
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        })
    }
}

exports.getStandard = async (req, res, next) => {
    const { id } = req.params
    try {
        const standard = await StandardContract.findById( id )
        if (!standard) {
            return res.status(404).json({
                message: 'ไม่พบสัญญานี้ในระบบ',
                status: false,
                data: null
            })
        }

        return res.status(200).json({
            message: `พบ ${standard.name}`,
            status: true,
            data: standard
        })
    }
    catch ( error ) {
        console.log( error )
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        })
    }
}

exports.deleteStandard = async (req, res, next) => {
    const { id } = req.params
    try {
        let standard = await StandardContract.findByIdAndDelete( id )
        if (!standard) {
            return res.status(404).json({
                message: 'ไม่พบสัญญานี้ในระบบ',
                status: false,
                data: null
            })
        }

        return res.status(200).json({
            message: `ลบสัญญาสำเร็จ`,
            status: true,
            data: null
        })
    }
    catch ( error ) {
        console.log( error )
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        })
    }
}

exports.deleteStandards = async (req, res, next) => {
    try {
        const standards = await StandardContract.deleteMany()
        if (!standards) {
            return res.status(404).json({
                message: 'ไม่พบสัญญาในระบบ',
                status: false,
                data: null
            })
        }

        return res.status(200).json({
            message: `ลบผู้สัญญาทั้งหมดสำเร็จ`,
            status: true,
            data: null
        })
    }
    catch ( error ) {
        console.log( error )
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        })
    }
}