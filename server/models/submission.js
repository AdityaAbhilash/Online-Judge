import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true
    },
    problemName: { 
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    verdict: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const SubmissionModel = mongoose.model('Submission', submissionSchema);

export { SubmissionModel };
