const mongoose = require("mongoose");

const pressingServiceSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    category: {
        type: String,
        required: true,
        enum: ['extra_virgin', 'virgin', 'third_quality']
    },
    fee: { type: Number, required: true },
    active: { type: Boolean, default: true },
},
{timestamps:true ,});
module.exports = mongoose.model('PressingService', pressingServiceSchema);
