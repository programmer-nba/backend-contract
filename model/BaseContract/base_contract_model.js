const mongoose = require ('mongoose')
const { Schema } = mongoose

const baseContractSchema = new Schema({
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
                img: String,
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
    start_date: Date,
    end_date: Date
    
}, { timestamps: true })

const BaseContract = mongoose.model( "BaseContract" , baseContractSchema )
module.exports = BaseContract