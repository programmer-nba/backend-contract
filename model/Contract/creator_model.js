const mongoose = require ('mongoose')
const { Schema } = mongoose

const creatorSchema = new Schema(
    {
        name: String, // ชื่อเต็มบริษัท หรือ ถ้าเป็นบุคคล ต้องมีคำนำหน้า
        code: String, // รหัสผู้สร้างสัญญา (ถ้ามี)
        tax_id: String, // เลขประจำตัวผู้เสียภาษี
        stamp_img: String, // stamp บริษัท (ถ้ามี) base64-resized
        logo_img: String, // logo บริษัท base64-resized
        address: String, // ที่อยู่เต็มของผู้สร้างสัญญา (บ้านเลขที่ - รหัสไปรษณีย์ เว้นวรรค 1)
        contact_person: String, // ชื่อผู้ประสานงานหลัก
        contact_tel: String, // เบอร์ติดต่อผู้ประสานงานหลัก
        contact_email: String, // email
    },
    { 
        timestamps: true
    }
)

const Creator = mongoose.model( "Creator" , creatorSchema )
module.exports = Creator