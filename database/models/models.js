const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

// Model for user
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    resettoken: String,
    expiretoken: Date,
    active: { type: Boolean, required: true, default: false },
    pic: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
})


// Model for post
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: [{
        type: String,
    }],
    date: {
        type: Date,
        default: Date.now()
    },
    postedby: {
        type: ObjectId,
        ref: "User"
    }
})


module.exports = {
    userModel: mongoose.model('User', userSchema),
    eventModel: mongoose.model("Event", eventSchema)
}