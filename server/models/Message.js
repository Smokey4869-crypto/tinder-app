import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        timestamp: {
            type: String, 
            required: true,
        },
        from_userId: {
            type: String, 
            required: true
        },
        to_userId: {
            type: String, 
            required: true
        },
        message: {
            type: String
        }
    }
)

export const MessageModel = mongoose.model("Message", MessageSchema)