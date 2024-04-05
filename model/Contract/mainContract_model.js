const mongoose = require ('mongoose')
const { Schema } = mongoose

const mainContractSchema = new Schema(
    {
        req_id: String, // _id ของคำขอสร้างสัญญา
        title: String, // หัวข้อสัญญา
        type: String, // ประเภทสัญญา
        code: String, // รหัสสัญญา รันตาม ref_code จาก standard-contract + รหัสลูกค้า หรือ เลขภายใน
        start_date: Date, // วันที่สร้างสัญญา (ตาม input)
        due_date: Date, // วันที่สิ้นสุดสัญญา (ตาม input)
        detail: [ // รายละเอียดสัญญา อาจมีได้หลายข้อ
            {
                header: String, // หัวข้อข้อความ (ถ้ามี)
                body: String, // รายละเอียดข้อความ
                footer: String // ท้ายข้อความ (ถ้ามี)
            }
        ],
        creator: { // ผู้สร้างสัญญา
            name: String, // ชื่อเต็มบริษัท หรือ ถ้าเป็นบุคคล ต้องมีคำนำหน้า
            code: String, // รหัสผู้สร้างสัญญา (ถ้ามี)
            _id: String, // _id ผูัสร้างสัญญา (ถ้ามี)
            tax_id: String, // เลขประจำตัวผู้เสียภาษี
            stamp_img: String, // stamp บริษัท (ถ้ามี) base64-resized
            logo_img: String, // logo บริษัท base64-resized
            address: String, // ที่อยู่เต็มของผู้สร้างสัญญา (บ้านเลขที่ - รหัสไปรษณีย์ เว้นวรรค 1)
            contact_person: String, // ชื่อผู้ประสานงานหลัก
            contact_tel: String, // เบอร์ติดต่อผู้ประสานงานหลัก
            contact_email: String, // email
        },
        customer: { // ลูกค้า หรือ พาร์ทเนอร์ ผู้ทำสัญญา
            name: String, // ชื่อเต็มบริษัท หรือ ถ้าเป็นบุคคล ต้องมีคำนำหน้า
            code: String, // รหัสผู้สร้างสัญญา (ถ้ามี)
            _id: String, // _id ผู้สร้างสัญญา (ถ้ามี) >> รับมาจาก database อื่น
            tax_id: String, // เลขประจำตัวผู้เสียภาษี
            stamp_img: String, // stamp บริษัท (ถ้ามี) base64-resized
            logo_img: String, // logo บริษัท base64-resized
            address: String, // ที่อยู่เต็มของผู้ทำสัญญา (บ้านเลขที่ - รหัสไปรษณีย์ เว้นวรรค 1)
            contact_person: String, // ชื่อผู้ประสานงานหลัก
            contact_tel: String, // เบอร์ติดต่อผู้ประสานงานหลัก
            contact_email: String // email
        },
        signature: { // ลายเซ็นที่ปรากฎในสัญญาฉบับบนี้ (put เข้ามาทีหลังเสมอ)
            creator: [ // ลายเซ็นผู้สร้างสัญญา, อาจมีหลายลายเซ็น
                {
                    name: String, // ชื่อเจ้าของลายเซ็น
                    designation: String, // ตำแหน่งในสัญญา (เช่น ผู้มีอำนาจลงนาม, พยาน เป็นต้น)
                    host: {
                        type: Boolean, // true = มีอำนาจสูงสุด
                        default: false
                    },
                    sign_img: String // รูปภาพลายเซ็น base64-resized (ต้องปรับขนาดให้เล็กก่อนส่งมา)
                }
            ],
            customer: [ // ลายเซ็นผู้ทำสัญญา, อาจมีหลายลายเซ็น
                {
                    name: String,
                    designation: String,
                    host: {
                        type: Boolean, // true = มีอำนาจสูงสุด
                        default: false
                    },
                    sign_img: String
                }
            ]
        },
        suffix: String, // ข้อความท้ายสัญญา (ถ้ามี)
        payment: { // ช่องทางชำระเงิน (ถ้ามี)
            bank_name: String,
            bank_branch: String,
            account_holder: String,
            account_number: String,
        },
        approved: {
            customer: Boolean,
            creator: Boolean
        },
        status: {
            code: String, // last status_his.code
            name: String // last status_his.name
        },
        status_his: [
            {
                code: String,
                name: String,
                sender: String,
                createdAt: Date
            }
        ]
    },
    { 
        timestamps: true // เก็บเวลาการบันทึกและอัพเดทจริงอัตโนมัติ
    }
)

const MainContract = mongoose.model( "MainContract" , mainContractSchema )
module.exports = MainContract