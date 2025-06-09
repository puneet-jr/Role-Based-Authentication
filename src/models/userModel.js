import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'manager'],
    },
}, {
    timestamps: true,
});

export default mongoose.model('User', userSchema);