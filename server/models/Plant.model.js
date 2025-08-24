const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {  name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    categories:[
        {
            type:String,
            required: true,
        },
    ],
    available: {
        type: Boolean,
        default: true,
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("Plant", plantSchema);
