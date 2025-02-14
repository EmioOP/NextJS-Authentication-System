import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Assuming usernames should be unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Assuming emails should be unique
        trim: true,
        lowercase: true, // Store email in lowercase
    },
    password: {
        type: String,
        required: [true,"password is required"],
    },
    isVerified: {
        type: Boolean,
        default: false, // Default to false until verified
    },
    isAdmin: {
        type: Boolean,
        default: false, // Default to false, standard user role
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpry: {
        type: Date,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    },

}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User