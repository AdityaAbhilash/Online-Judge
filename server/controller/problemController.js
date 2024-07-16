import express from 'express'
import { ProblemModel } from '../models/problem.js'

const createProblem = async (req,res) => {
    const { name, statement, sampleInput, sampleOutput, difficulty, testCases } = req.body;
        
    try {
        const newProblem = new ProblemModel({
            name,
            statement,
            sampleInput,
            sampleOutput,
            difficulty,
            testCases,
            postedBy : req.user._id,
        });

        const result = await newProblem.save();
        return res.status(201).json({success : true,...result._doc});

} catch(err){
    console.error("Error creating problem:", err); // Log the detailed error
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
}
}

export {createProblem}