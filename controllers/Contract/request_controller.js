const StandardContract = require('../../model/Contract/standardContract_model')
const MainContract = require('../../model/Contract/mainContract_model')
const RequestContract = require('../../model/Contract/requestContract_model')

exports.createRequest = async (req, res, next) => {
    const { 
        title,
        ref_id,
        ref_code,
        type,
        customer,
        remark,
        sender
    } = req.body

    if ( !type || !ref_id || !title ||  !customer.name ) {
        return res.status(404).json({
            message: 'จำเป็นต้องเพิ่มชื่อลูกค้า รหัสสัญญา หัวข้อสัญญา',
            status: false,
            data: null
        })
    }

    try {
        const new_request = new RequestContract(
            {
                title: title, // หัวข้อสัญญา
                type: type, // ประเภทสัญญา
                ref_id: ref_id, // รหัสสัญญา (ดึงจาก standard-contract)
                ref_code: ref_code, // รหัสสัญญา (ดึงจาก standard-contract)
                customer: { // ลูกค้า หรือ พาร์ทเนอร์ ผู้ทำสัญญา
                    name: customer.name, // ชื่อเต็มบริษัท หรือ ถ้าเป็นบุคคล ต้องมีคำนำหน้า
                    code: customer.code, // รหัสผู้สร้างสัญญา (ถ้ามี)
                    _id: customer._id, // _id ผู้สร้างสัญญา (ถ้ามี) >> รับมาจาก database อื่น
                    address: customer.address, // ที่อยู่เต็มของผู้ทำสัญญา (บ้านเลขที่ - รหัสไปรษณีย์ เว้นวรรค 1)
                    contact_person: customer.contact_person, // ชื่อผู้ประสานงานหลัก
                    contact_tel: customer.contact_tel, // เบอร์ติดต่อผู้ประสานงานหลัก
                    tax_id: customer.tax_id,
                    contact_email: customer.contact_email
                },
                remark: remark, // หมายเหตุ
                status: {
                    name: "ใหม่",
                    code: "new"
                },
                status_his: [
                    {
                        name: "ใหม่",
                        code: "new",
                        createdAt: new Date(),
                        sender: sender
                    }
                ]
            }
        )
        const saved_request = await RequestContract.create(new_request)
        if (!saved_request) {
            return res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการสร้างคำขอ',
                status: false,
                data: null
            })
        }

        return res.status(201).json({
            message: 'สร้างคำขอสำเร็จ!',
            status: true,
            data: saved_request
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

exports.updateRequest = async (req, res, next) => {
    const { 
        title,
        ref_code,
        ref_id,
        type,
        customer,
        remark,
        status,
        sender
    } = req.body

    const { id } = req.params

    try {
        let request = await RequestContract.findById( id )
        if (!request) {
            return res.status(404).json({
                message: 'ไม่พบคำขอนี้ในระบบ',
                status: false,
                data: null
            })
        }
        
        request.title = title || request.title 
        request.ref_code = ref_code || request.ref_code
        request.ref_id = ref_id || request.ref_id
        request.type = type || request.type
        request.customer = customer || request.customer
        request.remark = remark || request.remark
        request.status = status || request.status
        request.status_his = status?.name ? [...request.status_his, {
            name: status?.name,
            code: status?.code,
            createdAt: new Date(),
            sender: sender
        }] : request.status_his
            
        const saved_request = await request.save()
        if (!saved_request) {
            return res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการแก้ไขคำขอ',
                status: false,
                data: null
            })
        }

        return res.status(201).json({
            message: 'แก้ไขคำขอ สำเร็จ!',
            status: true,
            data: saved_request,
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

exports.getRequests = async (req, res, next) => {
    try {
        const requests = await RequestContract.find()

        return res.status(200).json({
            message: `มีคำขอในระบบ ${requests.length}`,
            status: true,
            data: requests
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

exports.getRequest = async (req, res, next) => {
    const { id } = req.params
    try {
        const request = await RequestContract.findById( id )
        if (!request) {
            return res.status(404).json({
                message: 'ไม่พบสัญญานี้ในระบบ',
                status: false,
                data: null
            })
        }

        return res.status(200).json({
            message: `พบ ${request.title}`,
            status: true,
            data: request
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

exports.deleteRequest = async (req, res, next) => {
    const { id } = req.params
    try {
        let request = await RequestContract.findByIdAndDelete( id )
        if (!request) {
            return res.status(404).json({
                message: 'ไม่พบคำขอนี้ในระบบ',
                status: false,
                data: null
            })
        }

        return res.status(200).json({
            message: `ลบคำขอสำเร็จ`,
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

exports.deleteRequests = async (req, res, next) => {
    try {
        const requests = await RequestContract.deleteMany()
        if (!requests) {
            return res.status(404).json({
                message: 'ไม่พบคำขอในระบบ',
                status: false,
                data: null
            })
        }

        return res.status(200).json({
            message: `ลบคำขอทั้งหมดสำเร็จ`,
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