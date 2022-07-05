import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        user_id: {
            type: String, 
            required: true,
            unique: true,
        },
        hashed_password: {
            type: String,
            required: true
        },
        first_name: {
            type: String, 
        },
        dob_day: {
            type: Number,
        },
        dob_month: {
            type: Number,
        },
        dob_year:  {
            type: Number, 
        },
        show_gender: {
            type: Boolean,
        },
        gender_identity: {
            type: String, 
        },
        gender_interest: {
            type: String, 
        },
        email: {
            type: String, 
        },
        url: [
            {
                type: String
            }
        ]
    }, 
    { timestamps: true}
);

export const UserModel = mongoose.model("User", UserSchema);