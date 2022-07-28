const mongoose = require('mongoose');


const BbqblogSchema = new mongoose.Schema({

    name: {
        type: String, 
        required: [true, "Name is required"]
    }, 

    photo: {
        type: String, 
        required: [true, "Upload an photo"]
    }, 

    recipe: {
        type: String, 
        required: [true, "Recipe is required"]
    },

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }


}, {timestamps: true})


const BBQ = mongoose.model("BBQ", BbqblogSchema);

module.exports = BBQ;