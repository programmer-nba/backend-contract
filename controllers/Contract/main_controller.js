const Creator = require('../../model/Contract/creator_model')
const StandardContract = require('../../model/Contract/standardContract_model')
const MainContract = require('../../model/Contract/mainContract_model')
const RequestContract = require('../../model/Contract/requestContract_model')

exports.createMainContract = async (req, res, next) => {
    const { 
        req_id,
        title,
        ref_code,
        ref_id,
        type,
        creator_id,
        start_date,
        due_date,
        detail,
        creator,
        creator_signature,
        suffix,
        payment,
        status,
        sender
    } = req.body

    if ( !ref_id ) {
        return res.status(404).json({
            message: 'จำเป็นต้องเพิ่ม id สัญญาหลัก',
            status: false,
            data: null
        })
    }

    try {
        const request = await RequestContract.findById(req_id)

        const mainContracts = await MainContract.find()
        
        const customer = request ? {...request.customer} : null

        const standard = await StandardContract.findById(ref_id)
        if (!standard) {
            return res.status(404).json({
                message: 'ไม่พบ _id สัญญาหลัก',
                status: false,
                data: null
            })
        }

        const creatorRef = await Creator.findById(creator_id)

        const code = `${standard.ref_code}-${mainContracts.length+1}`

        const new_mainContract = new MainContract(
            {
                req_id: req_id || null,
                title: standard.title,
                type: standard.type,
                ref_id: standard._id,
                ref_code: standard.ref_code,
                code: code, // รหัสสัญญา รันตาม ref_code จาก standard-contract + รหัสลูกค้า หรือ เลขภายใน
                start_date: start_date || new Date(), // วันที่สร้างสัญญา (ตาม input)
                due_date: due_date || null, // วันที่สิ้นสุดสัญญา (ตาม input)
                detail: detail || standard.detail,
                creator: creator ? { // ผู้สร้างสัญญา
                    name: creator?.name, // ชื่อเต็มบริษัท หรือ ถ้าเป็นบุคคล ต้องมีคำนำหน้า
                    code: creator?.code, // รหัสผู้สร้างสัญญา (ถ้ามี)
                    _id: creator?._id, // _id ผูัสร้างสัญญา (ถ้ามี)
                    tax_id: creator?.tax_id, // เลขประจำตัวผู้เสียภาษี
                    stamp_img: creator?.stamp_img, // stamp บริษัท (ถ้ามี) base64-resized
                    logo_img: creator?.logo_img, // logo บริษัท base64-resized
                    address: creator?.address, // ที่อยู่เต็มของผู้สร้างสัญญา (บ้านเลขที่ - รหัสไปรษณีย์ เว้นวรรค 1)
                    contact_person: creator?.contact_person, // ชื่อผู้ประสานงานหลัก
                    contact_tel: creator?.contact_tel, // เบอร์ติดต่อผู้ประสานงานหลัก
                    contact_email: creator?.contact_email, // email
                } : { // ผู้สร้างสัญญา
                    name: creatorRef?.name, // ชื่อเต็มบริษัท หรือ ถ้าเป็นบุคคล ต้องมีคำนำหน้า
                    code: creatorRef?.code, // รหัสผู้สร้างสัญญา (ถ้ามี)
                    _id: creatorRef?._id, // _id ผูัสร้างสัญญา (ถ้ามี)
                    tax_id: creatorRef?.tax_id, // เลขประจำตัวผู้เสียภาษี
                    stamp_img: creatorRef?.stamp_img, // stamp บริษัท (ถ้ามี) base64-resized
                    logo_img: creatorRef?.logo_img, // logo บริษัท base64-resized
                    address: creatorRef?.address, // ที่อยู่เต็มของผู้สร้างสัญญา (บ้านเลขที่ - รหัสไปรษณีย์ เว้นวรรค 1)
                    contact_person: creatorRef?.contact_person, // ชื่อผู้ประสานงานหลัก
                    contact_tel: creatorRef?.contact_tel, // เบอร์ติดต่อผู้ประสานงานหลัก
                    contact_email: creatorRef?.contact_email, // email
                },
                customer: { // ลูกค้า หรือ พาร์ทเนอร์ ผู้ทำสัญญา
                    name: customer?.name, // ชื่อเต็มบริษัท หรือ ถ้าเป็นบุคคล ต้องมีคำนำหน้า
                    code: customer?.code, // รหัสผู้สร้างสัญญา (ถ้ามี)
                    _id: customer?._id, // _id ผู้สร้างสัญญา (ถ้ามี) >> รับมาจาก database อื่น
                    tax_id: customer?.tax_id, // เลขประจำตัวผู้เสียภาษี
                    stamp_img: customer?.stamp_img, // stamp บริษัท (ถ้ามี) base64-resized
                    logo_img: customer?.logo_img, // logo บริษัท base64-resized
                    address: customer?.address, // ที่อยู่เต็มของผู้ทำสัญญา (บ้านเลขที่ - รหัสไปรษณีย์ เว้นวรรค 1)
                    contact_person: customer?.contact_person, // ชื่อผู้ประสานงานหลัก
                    contact_tel: customer?.contact_tel, // เบอร์ติดต่อผู้ประสานงานหลัก
                    contact_email: customer?.contact_email // email
                },
                signature: { // ลายเซ็นที่ปรากฎในสัญญาฉบับบนี้ (put เข้ามาทีหลังเสมอ)
                    creator: creator_signature,
                    customer: []
                },
                suffix: suffix, // ข้อความท้ายสัญญา (ถ้ามี)
                payment: payment,
                approved: {
                    customer: false,
                    creator: false
                },
                status: {
                    code: status?.code || "pending",
                    name: status?.name || "รออนุมัติ"
                },
                status_his: [
                    {
                        code: status?.code || "pending",
                        name: status?.name || "รออนุมัติ",
                        sender: sender,
                        createdAt: new Date()
                    }
                ]
            }
        )
        const saved_main = await MainContract.create(new_mainContract)
        if (!saved_main) {
            return res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการสร้างสัญญา',
                status: false,
                data: null
            })
        }

        return res.status(201).json({
            message: 'สร้างสัญญา สำเร็จ!',
            status: true,
            data: saved_main
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

exports.updateMainContract = async (req, res, next) => {
    const { 
        req_id,
        name,
        title,
        ref_code,
        type,
        start_date,
        due_date,
        detail,
        creator,
        creator_signature,
        customer_signature,
        suffix,
        payment,
        status,
        sender,
        customer_approved,
        creator_approved
    } = req.body

    const { id } = req.params

    try {
        let mainContract = await MainContract.findById( id )
        if (!mainContract) {
            return res.status(404).json({
                message: 'ไม่พบสัญญานี้',
                status: false,
                data: null
            })
        }
        
        mainContract.name = name || mainContract.name
        mainContract.req_id = req_id || mainContract.req_id
        mainContract.approved.customer = customer_approved || false
        mainContract.approved.creator = creator_approved || false
        mainContract.title = title || mainContract.title 
        mainContract.ref_code = ref_code || mainContract.ref_code
        mainContract.type = type || mainContract.type
        mainContract.start_date = start_date || mainContract.start_date
        mainContract.due_date = due_date || mainContract.due_date
        mainContract.detail = detail?.length > 0 ? [...detail] : mainContract.detail
        mainContract.creator = creator ? {...creator} : mainContract.creator
        mainContract.signature.creator = creator_signature?.length > 0 ? [...creator_signature] : mainContract.signature.creator
        mainContract.signature.customer = customer_signature?.length > 0 ? [...customer_signature] : mainContract.signature.customer
        mainContract.suffix = suffix || mainContract.suffix
        mainContract.payment = payment ? {...payment} : mainContract.payment
        mainContract.status = status ? status : mainContract.status
        mainContract.status_his = status ? [...mainContract.status_his, {
            name: status?.name,
            code: status?.code,
            sender: sender
        }] : mainContract.status_his
            
        const saved_main = await mainContract.save()
        if (!saved_main) {
            return res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการแก้ไขสัญญา',
                status: false,
                data: null
            })
        }

        return res.status(201).json({
            message: 'แก้ไขสัญญา สำเร็จ!',
            status: true,
            data: saved_main,
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

exports.getMainContracts = async (req, res, next) => {
    try {
        const mains = await MainContract.find()

        return res.status(200).json({
            message: `มีผู้สัญญาในระบบ ${mains.length}`,
            status: true,
            data: mains
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

exports.getMyMainContracts = async (req, res, next) => {
    const { id } = req.params
    try {
        const mains = await MainContract.find( { 'customer._id' : id } )

        return res.status(200).json({
            message: `มีผู้สัญญาในระบบ ${mains.length}`,
            status: true,
            data: mains
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

exports.getMainContract = async (req, res, next) => {
    const { id } = req.params
    try {
        const main = await MainContract.findById( id )
        if (!main) {
            return res.status(404).json({
                message: 'ไม่พบสัญญานี้ในระบบ',
                status: false,
                data: null
            })
        }

        return res.status(200).json({
            message: `พบ ${main.title}`,
            status: true,
            data: main
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

exports.deleteMainContract = async (req, res, next) => {
    const { id } = req.params
    try {
        let main = await MainContract.findByIdAndDelete( id )
        if (!main) {
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

exports.deleteMainContracts = async (req, res, next) => {
    try {
        const mains = await MainContract.deleteMany()
        if (!mains) {
            return res.status(404).json({
                message: 'ไม่พบสัญญาในระบบ',
                status: false,
                data: null
            })
        }

        return res.status(200).json({
            message: `ลบสัญญาทั้งหมดสำเร็จ`,
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