const { Schema } = require("mongoose")

const data = new Schema({
    contract_name: String,
    contract_start: Date,
    contract_end: Date,
    contract_code: String,
    contractor: {
        name: String,
        address: String,
        stamp: String,
        signature: [
            {
                name: String,
                role: String,
                position: String,
                sign: String,
                stamp: Boolean
            }
        ]
    },
    body: [
        {
            no: String,
            title: String,
            subtitle: String,
            detail: []
        }
    ],
    partner: {
        name: String,
        address: String,
        stamp: String,
        signature: [
            {
                name: String,
                role: String,
                position: String,
                sign: String,
                stamp: Boolean
            }
        ]
    },
    status: [
        {
            name: String,
            date: Date,
            sender: String
        }
    ],
    refer_doc: [
        {
            code: String,
            name: String
        }
    ],
    remark: String
})

module.exports = data;