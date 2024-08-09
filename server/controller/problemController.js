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

  const getProblem = async (req, res) => {
    const {id} = req.params;
    if(!id){
      return res.status(401).json({error:"No Id Specified"})
    }
    try {

      const problems = await ProblemModel.findOne({ _id: id })
      .populate({
        path: "postedBy",
        select: "username" // This fetches only the username from the UserModel
      });
      const username = problems.postedBy ? problems.postedBy.username : "Admin";  
      return res.status(200).json({
        success: true,
        ...problems._doc,
        postedBy: {
          username, // Send either the fetched username or "Admin"
          _id: problems.postedBy ? problems.postedBy._id : null,
        },
      });  
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  const getAllProblems = async (req, res) => {
    try {
      const problems = await ProblemModel.find({},'-testCases');
      return res.status(200).json({ success: true, problems });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  
  const getUserProblems = async (req, res) => { 
    if (!req.user._id) {
      return res.status(400).json({ error: "No user ID specified" });
    }
  
    try {
      const userProblems = await ProblemModel.find({ postedBy: req.user._id });
      return res.status(200).json({ success: true, userProblems });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };



  const updateProblem = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "No Id Specified" });
    }
    try {
        const problem = await ProblemModel.findById(id);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        // Check if the problem is public
        if (problem.public) {
            return res.status(403).json({ error: "Public problems cannot be updated" });
        }
        const result = await ProblemModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.status(200).json({ success: true, ...result._doc });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

  const deleteProblem = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "No Id Specified" });
    }
    try {
        const problem = await ProblemModel.findById(id);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        // Check if the problem is public
        if (problem.public) {
            return res.status(403).json({ error: "Public problems cannot be deleted" });
        }

        await ProblemModel.findByIdAndDelete(id);
        const problems = await ProblemModel.find({ postedBy: req.user._id });
        return res.status(200).json({ success: true, problems });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export {createProblem,getAllProblems,getUserProblems,getProblem,updateProblem , deleteProblem}


/* req.params.id: This retrieves the id parameter from the request URL. For example, if your route is /problems/:id, and you make a request to /problems/123, req.params.id would be '123' */