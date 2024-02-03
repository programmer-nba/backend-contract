const mongoose = require('mongoose')
const { Schema } = mongoose

const hmnl_schema = new Schema({
    code: String,
    title: String,
    ref : String,
    contractor: {
        name: String,
        tel: String,
        taxID: String,
        address : String,
        signature: [
            {
                name: String,
                role: String,
                position: String,
                sign: String
            }
        ],
        logo: String,
    },
    partner: {
        _id: String,
        name: String,
        tel: String,
        taxID: String,
        address : String,
        signature: [
            {
                name: String,
                role: String,
                position: String,
                sign: String
            }
        ],
        logo: String,
    }
})