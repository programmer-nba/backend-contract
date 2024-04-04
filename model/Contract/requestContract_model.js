const mongoose = require ('mongoose')
const { Schema } = mongoose

const requestContractSchema = new Schema(
    {
        title: String, // หัวข้อสัญญา
        type: String, // ประเภทสัญญา
        ref_code: String, // รหัสสัญญา (ดึงจาก standard-contract)
        customer: { // ลูกค้า หรือ พาร์ทเนอร์ ผู้ทำสัญญา
            name: String, // ชื่อเต็มบริษัท หรือ ถ้าเป็นบุคคล ต้องมีคำนำหน้า
            code: String, // รหัสผู้สร้างสัญญา (ถ้ามี)
            _id: String, // _id ผู้สร้างสัญญา (ถ้ามี) >> รับมาจาก database อื่น
            address: String, // ที่อยู่เต็มของผู้ทำสัญญา (บ้านเลขที่ - รหัสไปรษณีย์ เว้นวรรค 1)
            contact_person: String, // ชื่อผู้ประสานงานหลัก
            contact_tel: String // เบอร์ติดต่อผู้ประสานงานหลัก
        },
        remark: String // หมายเหตุ
    },
    { 
        timestamps: true // เก็บเวลาการบันทึกและอัพเดทจริงอัตโนมัติ
    }
)

const RequestContract = mongoose.model( "RequestContract" , requestContractSchema )
module.exports = RequestContract