const mongoose = require("mongoose")

const channelSchema = new mongoose.Schema({
    channels : [{
        u1 : Boolean,
        u2 : Boolean,
        name : String
    }]

})    

const channel = new mongoose.model("channel",channelSchema)

module.exports = channel;