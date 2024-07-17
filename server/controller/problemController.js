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

  const getProblems = async (req, res) => {
    try {
      const problems = await ProblemModel.find({postedBy: req.user._id})
      return res.status(200).json({ success: true, problems });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  
  // const getProblemById = async (req, res) => {
  //   try {
  //       const problem = await ProblemModel.findById(req.params.id);
  //       if (!problem) {
  //         return res.status(404).json({ success: false, message: "Problem not found" });
  //       }
  //       res.json({ success: true, problem});
  //     } catch (err) {
  //       res.status(500).json({ success: false, message: "Server error", error: err.message });
  //     }
  // };

  const getProblem = async (req, res) => {
    const {id} = req.params;
    if(!id){
      return res.status(401).json({error:"No Id Specified"})
    }
    try {
      const problems = await ProblemModel.findOne({_id: id})
      return res.status(200).json({ success: true, ...problems._doc });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  const updateProblem = async (req, res) => {
    const {id} = req.params;
    if(!id){
      return res.status(401).json({error:"No Id Specified"})
    }
    try {
      const result = await ProblemModel.findByIdAndUpdate({_id:id},{...req.body},{new: true})
      return res.status(200).json({ success: true, ...result._doc });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };


export {createProblem,getProblems,getProblem,updateProblem}


/* req.params.id: This retrieves the id parameter from the request URL. For example, if your route is /problems/:id, and you make a request to /problems/123, req.params.id would be '123' */