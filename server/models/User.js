import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        user_id: {
            type: String, 
            required: true,
            unique: true,
        },
        email: {
            type: String, 
        },
        password: {
            type: String,
            required: true
        },
        about: {
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
        first_name: {
            type: String,
        },
        gender_identity: {
            type: String, 
        },
        gender_interest: {
            type: String, 
        },
        matches: [
          {
            type: String,
          }  
        ],
        show_gender: {
            type: Boolean,
        },
        url: [
            {
                type: String
            }
        ],
    }, 
    { timestamps: true}
);

export const UserModel = mongoose.model("User", UserSchema);