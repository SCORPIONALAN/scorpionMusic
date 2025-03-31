import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content:{
        type: String,
        required: true
    }
}, {timestamps:true});

export const Message = mongoose.model('Message', messagesSchema);