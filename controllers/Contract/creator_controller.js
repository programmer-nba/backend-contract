const Creator = require('../../model/Contract/creator_model')
const StandardContract = require('../../model/Contract/standardContract_model')
const MainContract = require('../../model/Contract/mainContract_model')

exports.createCreator = async (req, res, next) => {
    const { 
        name,
        code,
        tax_id,
        stamp_img,
        logo_img,
        address,
        contact_person,
        contact_tel,
        contact_email
    } = req.body

    if ( !name || !address || !contact_tel ) {
        return res.status(404).json({
            message: 'จำเป็นต้องเพิ่มชื่อ ที่อยู่ หรือเบอร์โทรติดต่อ',
            status: false,
            data: null
        })
    }

    try {
        const creator = await Creator.find()
        const codeNumber = code ? code+'0'+creator.length+1 : 'CR'+'0'+creator.length+1
        const new_creator = new Creator(
            {
                name: name, // ชื่อเต็มบริษัท หรือ ถ้าเป็นบุคคล ต้องมีคำนำหน้า
                code: codeNumber, // รหัสผู้สร้างสัญญา (ถ้ามี)
                tax_id: tax_id || null, // เลขประจำตัวผู้เสียภาษี
                stamp_img: stamp_img || null, // stamp บริษัท (ถ้ามี) base64-resized
                logo_img: logo_img || null, // logo บริษัท base64-resized
                address: address, // ที่อยู่เต็มของผู้สร้างสัญญา (บ้านเลขที่ - รหัสไปรษณีย์ เว้นวรรค 1)
                contact_person: contact_person || null, // ชื่อผู้ประสานงานหลัก
                contact_tel: contact_tel, // เบอร์ติดต่อผู้ประสานงานหลัก
                contact_email: contact_email || null, // email
            }
        )
        const saved_creator = await Creator.create(new_creator)
        if (!saved_creator) {
            return res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการสร้างผู้สร้างสัญญาใหม่',
                status: false,
                data: null
            })
        }

        return res.status(201).json({
            message: 'สร้างผู้สร้างสัญญาใหม่ สำเร็จ!',
            status: true,
            data: saved_creator
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

exports.updateCreator = async (req, res, next) => {
    const { 
        name,
        code,
        tax_id,
        stamp_img,
        logo_img,
        address,
        contact_person,
        contact_tel,
        contact_email,
        update_all_standardContracts,
        update_all_mainContracts
    } = req.body

    const { id } = req.params

    if ( !name || !address || !contact_tel ) {
        return res.status(404).json({
            message: 'จำเป็นต้องเพิ่มชื่อ ที่อยู่ หรือเบอร์โทรติดต่อ',
            status: false,
            data: null
        })
    }

    try {
        let creator = await Creator.findById( id )
        if (!creator) {
            return res.status(404).json({
                message: 'ไม่พบผู้สร้างสัญญานี้',
                status: false,
                data: null
            })
        }

        creator.name = name || creator.name
        creator.code = code || creator.code
        creator.tax_id = tax_id || creator.tax_id
        creator.stamp_img = stamp_img || creator.stamp_img
        creator.logo_img = logo_img || creator.logo_img
        creator.address = address || creator.address
        creator.contact_person = contact_person || creator.contact_person
        creator.contact_tel = contact_tel || creator.contact_tel
        creator.contact_email = contact_email || creator.contact_email
            
        const saved_creator = await creator.save()
        if (!saved_creator) {
            return res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการแก้ไขผู้สร้างสัญญา',
                status: false,
                data: null
            })
        }

        let updated_standardContracts = null
        if ( update_all_standardContracts ) {
            updated_standardContracts = await StandardContract.updateMany(
                {
                    'creator._id': id
                },
                {
                    $set: {
                        'creator.name': saved_creator.name,
                        'creator.code': saved_creator.code,
                        'creator.stamp_img': saved_creator.stamp_img,
                        'creator.logo_img': saved_creator.logo_img,
                        'creator.address': saved_creator.address
                    }
                }
            )
        }

        let updated_mainContracts = null
        if ( update_all_mainContracts ) {
            updated_mainContracts = await MainContract.updateMany(
                {
                    'creator._id': id,
                    'approved.customer' : { $ne: true },
                    'approved.creator' : { $ne: true }
                },
                {
                    $set: {
                        'creator.name': saved_creator.name,
                        'creator.code': saved_creator.code,
                        'creator.stamp_img': saved_creator.stamp_img,
                        'creator.address': saved_creator.address,
                        'creator.logo_img': saved_creator.logo_img,
                        'creator.contact_person': saved_creator.contact_person,
                        'creator.contact_tel': saved_creator.contact_tel,
                        'creator.contact_email': saved_creator.contact_email
                    }
                }
            )
        }

        return res.status(201).json({
            message: 'แก้ไขผู้สร้างสัญญา สำเร็จ!',
            status: true,
            data: saved_creator,
            standardContracts: updated_standardContracts ? {...updated_standardContracts} : updated_standardContracts,
            mainContracts: updated_mainContracts ? {...updated_mainContracts} : updated_mainContracts
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

exports.getCreators = async (req, res, next) => {
    try {
        const creators = await Creator.find()

        return res.status(200).json({
            message: `มีผู้สร้างสัญญาในระบบ ${creators.length}`,
            status: true,
            data: creators
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

exports.getCreator = async (req, res, next) => {
    const { id } = req.params
    try {
        const creator = await Creator.findById( id )
        if (!creator) {
            return res.status(404).json({
                message: 'ไม่พบผู้สร้างสัญญานี้ในระบบ',
                status: false,
                data: null
            })
        }

        return res.status(200).json({
            message: `พบ ${creator.name}`,
            status: true,
            data: creator
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

exports.deleteCreator = async (req, res, next) => {
    const { id } = req.params
    try {
        let creator = await Creator.findByIdAndDelete( id )
        if (!creator) {
            return res.status(404).json({
                message: 'ไม่พบผู้สร้างสัญญานี้ในระบบ',
                status: false,
                data: null
            })
        }

        return res.status(200).json({
            message: `ลบผู้สร้างสัญญาสำเร็จ`,
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

exports.deleteCreators = async (req, res, next) => {
    try {
        const creators = await Creator.deleteMany()
        if (!creators) {
            return res.status(404).json({
                message: 'ไม่พบผู้สร้างสัญญาในระบบ',
                status: false,
                data: null
            })
        }

        return res.status(200).json({
            message: `ลบผู้สร้างสัญญาทั้งหมดสำเร็จ`,
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