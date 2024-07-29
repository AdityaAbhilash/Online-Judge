import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: ""
    },
    dob: {
        type: String,
        default: ""
    },
    institute: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: "other"
    }
});

const ProfileModel = mongoose.model('Profile', ProfileSchema);

export { ProfileModel };
