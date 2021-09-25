const express = require('express');
const { eventModel, userModel } = require('../database/models/models');
const eventRouter = express.Router();
const userRouter = express.Router();


// Getting all the posts
eventRouter
    .route("/")
    .get(async (req, res) => {
        const posts = await eventModel.find({ postedby: req.user }).populate("postedby", "_id name pic").sort({ _id: -1 })
        res.status(200).send(posts)
    })

    .post(async (req, res) => {
        const { body, title, image } = req.body
        try {
            if (!body || !title) return res.status(404).json({ error: "Please add all the fields" })
            const event = new eventModel({ body, title, photo: image, postedby: req.user })
            await event.save()
            res.status(200).json({ message: "Posted successfully", event })
        }
        catch (error) {
            console.log(error)
            res.status(404).json({ error })
        }
    })

    .patch(async (req, res) => {
        const { id } = req.body
        try {
            if (!id) res.status(404).json({ message: "Something went wrong" })
            await eventModel.findByIdAndRemove(id)
            res.status(200).json({ message: "Deleted successfully" })
        } catch (error) {
            res.status(404).json({ error })
        }
    })


eventRouter.route("/one")
    .put(async (req, res) => {
        const { id } = req.body
        const result = await eventModel.findById(id)
        if (!result) return res.status(404).json({ message: "Not found" })
        if (result.postedby.toString() === req.user._id.toString()) {
            await eventModel.deleteOne({ _id: id })
            return res.status(200).json({ message: "Deleted Successfully" })
        } else {
            return res.status(406).json({ message: "You are not allowed to delete" })
        }
    })

// Getting the post created by the user
eventRouter.route("/myevent")
    .get(async (req, res) => {
        try {
            const post = await eventModel.find({ postedby: req.user._id }).populate("postedby", "_id name pic")
            res.json({ post })
        } catch (error) {
            res.json({ error })
        }
    })


userRouter.route("/profile")
    // Getting Profile information
    .get(async (req, res) => {
        const profile = await userModel.findOne({ _id: req.user._id }).select("-password")
        res.status(200).json({ profile })
    })

    // Changing Profile name and Picture
    .patch(async (req, res) => {
        const { name, image } = req.body;
        try {
            const result = await userModel.updateOne({ _id: req.user._id }, { $set: { name: name, pic: image } })
            res.status(200).json({ message: "Updated successfully", result })
        } catch (error) {
            console.log(error)
            res.status(404).json({ error })
        }

    })

userRouter.route("/:id").get(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id).select("-password")
        if (!user) return res.status(404).json({ error: "User not found" })
        const posts = await eventModel.find({ postedby: id }).populate("postedby", "_id name")
        return res.status(200).json({ user, posts })
    }
    catch (error) {
        console.log(error)
        res.status(404).json({ error })
    }
})

module.exports = { eventRouter, userRouter };