import mongoose from "mongoose";

const TestCaseSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true,
    },
    output: {
        type: String,
        required: true,
    }
});

const ProblemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    statement: {
        type: String,
        required: true,
    },
    sampleInput: {
        type: String,
        required: true,
    },
    sampleOutput: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    testCases: [TestCaseSchema],  // Array of test case subdocuments
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    public: {  // New field to indicate if a problem is public
        type: Boolean,
        default: false,
    }
});

const ProblemModel = mongoose.model("Problem", ProblemSchema);  // Save in the database as problem
export { ProblemModel };
