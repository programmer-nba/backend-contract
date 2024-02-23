const mongoose = require ('mongoose')
const { Schema } = mongoose

const partnerContractSchema = new Schema({
    contract_code: String,
    code: String,
    type: {
        type: String
    },
    title: String,
    sub_title: String,
    company: {
        name: String,
        address: String,
        tax_id: String,
        tel: String,
        signature: [
            {
                name: String,
                role: String,
                img_id: String,
                img_64: String
            }
        ],
        stamp: String,
        logo: String
    },
    partner_main_name: String,
    partner: {
        _id: String,
        code: String,
        prefix: String,
        full_name: String,
        first_name: String,
        last_name: String,
        company_name: String,
        company_branch: String,
        address: String,
        tax_id: String,
        tel: String,
        signature: [
            {
                name: String,
                role: String,
                img_id: String,
                img_64: String
            }
        ],
        stamp: String,
        logo: String
    },
    detail_text: {
        head: String,
        body: String,
        footer: String
    },
    detail_html: {
        head: String,
        body: String,
        footer: String
    },
    file_pdf: String,
    start_date: {
        type: Date,
        default: new Date()
    },
    end_date: Date,
    status: [
        {
            name: String,
            text: String,
            createdAt: Date
        }
    ],
    all_price: Number,
    payment: {
        paid_slip: String,
        bank_owner_name: String,
        deposit_amount: Number,
        bank_number: String,
        bank_type: String,
        bank_branch: String,
        paid_amount: Number,
        bank_img: String,
        transfer_by: String,
        paidAt: Date
    }
    
}, { timestamps: true })

const PartnerContract = mongoose.model( "PartnerContract" , partnerContractSchema )
module.exports = PartnerContract