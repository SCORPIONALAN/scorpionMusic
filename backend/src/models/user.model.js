import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        typeof: String,
        required: true
    },
    imageURL: {
        typeof: String,
        required: true,
    },
    clerkId:{
        type: String,
        required: true,
        unique: true,
    },
}, {timestamps:true} //createdAt updatedAt
)

export const User = mongoose.Model('User', userSchema);