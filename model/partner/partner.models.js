const {
  siteVerification,
} = require("googleapis/build/src/apis/siteVerification");
const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const partnerSchema = new mongoose.Schema(
  {
    antecedent: { type: String, required: false },
    partner_name: { type: String, required: false },
    partner_phone: { type: String, required: false },
    partner_email: { type: String, required: false },
    partner_iden_number: { type: String, required: false },
    partner_address: { type: String, required: false },
    partner_district: { type: String, required: false }, //ตำบล
    partner_amphure: { type: String, required: false }, //อำเภอ
    partner_province: { type: String, required: false }, //จังหวัด
    partner_postcode: { type: String, required: false }, //รหัสไปรษณีย์
    contract_type: { type: String, default: "", required: false },

    //otp
    status_opt: { type: Boolean, default: false },
    status_appover: { type: String, default: "ยังกรอกข้อมูลไม่ครบ" },

    // นิติบุคคล

    /// บริษัท
    partner_company_name: { type: String, required: false, default: "" },
    partner_company_number: { type: String, required: false, default: "" },
    partner_company_address: { type: String, required: false, default: "" },
    partner_company_district: { type: String, required: false, default: "" }, //ตำบล
    partner_company_amphure: { type: String, required: false, default: "" }, //อำเภอ
    partner_company_province: { type: String, required: false, default: "" }, //จังหวัด
    partner_company_postcode: { type: String, required: false, default: "" }, //รหัสไปรษณีย์
    partner_company_phone: { type: String, default: "" },
    contract_type: { type: String, required: false },

    partner_iden: { type: String, required: false, default: "" }, // เลขบัตรประชาชน
    filecompany: { type: String, default: "" },
    logo: { type: String, default: "" },
    // ลายเซ็นต์
    signature: {
      type: [
        {
          name: { type: String },
          role: { type: String },
          position: { type: String },
          sign: { type: String },
        },
      ],
      default: null,
    },
    partner_timestamp: { type: Array, required: false, default: [] },
  },
  { timestamps: true }
);

const Partner = mongoose.model("partner", partnerSchema);

module.exports = { Partner };
