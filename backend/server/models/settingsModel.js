const mongoose= require("mongoose");

const settingsSchema = new mongoose.Schema({
    pressing_percentage_taken: { type: Number, required: true, default: 30 },
},
{timestamps:true} ,
);

module.exports = mongoose_1.default.model('Settings', settingsSchema);
