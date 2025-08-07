import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["document", "tweet", "youtube", "link"],
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    link: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    // tags: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "tag",
    //     required: true,
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, {
    timestamps: true,
})

const contentModel = mongoose.models.content || mongoose.model("content", contentSchema);

export default contentModel;