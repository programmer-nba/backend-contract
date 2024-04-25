const Base64 = require('../../model/Contract/base64_model')
const StandardContract = require('../../model/Contract/standardContract_model')
const MainContract = require('../../model/Contract/mainContract_model')

exports.createBase64 = async (req, res, next) => {
    const { 
        remark,
        code,
        ref_id,
    } = req.body

    try {
        const new_base64 = new Base64(
            {
                code: code,
                ref_id: ref_id || null,
                remark: remark || null,
            }
        )
        const saved_base64 = await Base64.create(new_base64)
        if (!saved_base64) {
            return res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการสร้างลายเซ็น',
                status: false,
                data: null
            })
        }

        return res.status(201).json({
            message: 'สร้างลายเซ็น สำเร็จ!',
            status: true,
            data: saved_base64
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

exports.updateBase64 = async (req, res, next) => {
    const { 
        remark,
        code,
        ref_id,
    } = req.body

    const { id } = req.params

    try {
        let base64 = await Base64.findById(id)
        if (!base64) {
            return res.status(404).json({
                message: 'ไม่พบลายเซ็นนี้',
                status: false,
                data: null
            })
        }

        base64.remark = remark || base64.remark
        base64.code = code || base64.code
        base64.ref_id = ref_id || base64.ref_id

        const updated_base64 = await base64.save()
        if (!updated_base64) {
            return res.status(500).json({
                message: 'ไม่สามารถอัพเดทลายเซ็นนี้',
                status: false,
                data: null
            })
        }

        return res.status(201).json({
            message: 'อัพเดทลายเซ็น สำเร็จ!',
            status: true,
            data: updated_base64
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


exports.getBase64 = async (req, res, next) => {

    const { id } = req.params

    try {
        const base64 = await Base64.findById(id)
        if (!base64) {
            return res.status(404).json({
                message: 'ไม่พบลายเซ็นนี้',
                status: false,
                data: null
            })
        }

        return res.status(201).json({
            message: 'สำเร็จ!',
            status: true,
            data: base64
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

exports.deleteBase64 = async (req, res, next) => {

    const { id } = req.params

    try {
        const base64 = await Base64.findByIdAndDelete(id)
        if (!base64) {
            return res.status(404).json({
                message: 'ไม่พบลายเซ็นนี้',
                status: false,
                data: null
            })
        }

        return res.status(201).json({
            message: 'สำเร็จ!',
            status: true,
            data: null
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

exports.deleteBase64s = async (req, res, next) => {
    try {
        const base64 = await Base64.DeleteMany()
        if (!base64) {
            return res.status(500).json({
                message: 'ไม่สามารถลบลสยเซ็นทั้งหมดได้',
                status: false,
                data: null
            })
        }

        return res.status(201).json({
            message: 'สำเร็จ!',
            status: true,
            data: null
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