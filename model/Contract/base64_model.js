const mongoose = require ('mongoose')
const { Schema } = mongoose

const base64Schema = new Schema(
    {
        ref_id: String,
        remark: String,
        code: String,
    },
    {
        timestamps: true
    }
)

const Base64 = mongoose.model( "Base64" , base64Schema )
module.exports = Base64