import express from "express";
import fs from "fs";
import { exec } from "child_process";
import { ProblemModel } from "../models/problem.js";
import { generateFile } from "./generateFile.js";
import { executeCpp, executePython, executeC, executeJava } from "./execute.js";
import { generateInputFile } from "./generateInputFile.js";
import { SubmissionModel } from "../models/submission.js";
import { UserModel } from "../models/user.js";

const extractErrorMessage = (stderr) => {
  const lines = stderr.split("\n");
  let errorMessage = "";

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes("error")) {
      const parts = lines[i].split(/error:/i);
      if (parts.length > 1) {
        errorMessage = parts[1].trim();
      } else {
        errorMessage = lines[i].trim();
      }
      break;
    }
  }

  return errorMessage || "Unknown error occurred.";
};

const runCompiler = async (req, res) => {
  const { language = "cpp", code, input } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: "Empty code" });
  }

  let filePath;
  let inputFilePath;
  let output;
  let outputFilePath;

  try {
    filePath = await generateFile(language, code);
    inputFilePath = await generateInputFile(input);

    if (language === "cpp") {
      ({ stdout: output, outPath: outputFilePath } = await executeCpp(filePath, inputFilePath));
    } else if (language === "py") {
      ({ stdout: output, outPath: outputFilePath } = await executePython(filePath, inputFilePath));
    } else if (language === "c") {
      ({ stdout: output, outPath: outputFilePath } = await executeC(filePath, inputFilePath));
    } else if (language === "java") {
      ({ stdout: output, outPath: outputFilePath } = await executeJava(filePath, inputFilePath));
    } else {
      throw new Error("Unsupported language");
    }

    res.json({ filePath, inputFilePath, output });
  } catch (error) {
    console.log(error);
    console.error("Compilation error:", error);
    const errorMessage = error.error || error.message;
    const relevantMessage = errorMessage.includes('Time Limit Exceeded') ? 'Time Limit Exceeded' : errorMessage;
    res.status(500).json({ success: false, message: relevantMessage });
  } finally {
    try {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      if (inputFilePath && fs.existsSync(inputFilePath)) {
        fs.unlinkSync(inputFilePath);
      }
      if (outputFilePath && fs.existsSync(outputFilePath)) {
        fs.unlinkSync(outputFilePath);
      }
    } catch (cleanupError) {
      console.error("Error cleaning up files:", cleanupError.message);
    }
  }
};

const submitCode = async (req, res) => {
  const { language, code } = req.body;
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const problem = await ProblemModel.findById(id);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    let verdicts = [];
    let encounteredTimeLimitExceeded = false;

    for (let [index, testCase] of problem.testCases.entries()) {
      const inputFilePath = await generateInputFile(testCase.input);
      const filePath = await generateFile(language, code);

      let output;
      let outputFilePath;
      let verdict;

      if (encounteredTimeLimitExceeded) {
        // If Time Limit Exceeded was encountered previously, mark all subsequent test cases as Time Limit Exceeded
        verdict = "Time Limit Exceeded";
      } else {
        try {
          if (language === "cpp")
            ({ stdout: output, outPath: outputFilePath } = await executeCpp(filePath, inputFilePath));
          else if (language === "c")
            ({ stdout: output, outPath: outputFilePath } = await executeC(filePath, inputFilePath));
          else if (language === "py")
            ({ stdout: output, outPath: outputFilePath } = await executePython(filePath, inputFilePath));
          else if (language === "java")
            ({ stdout: output, outPath: outputFilePath } = await executeJava(filePath, inputFilePath));

          if (output.trim() !== testCase.output.trim()) {
            verdict = "Wrong Answer";
          } else {
            verdict = "Passed";
          }
        } catch (err) {
          if (err.error === "Time Limit Exceeded") {
            verdict = "Time Limit Exceeded";
            encounteredTimeLimitExceeded = true; // Set flag to true
          } else {
            verdict = "Compilation Error";
          }
          console.log(err);
        }
      }

      verdicts.push({ testCase: index + 1, status: verdict });

      try {
        await fs.promises.unlink(filePath);
        await fs.promises.unlink(inputFilePath);
        if (outputFilePath) await fs.promises.unlink(outputFilePath);
      } catch (err) {
        console.error("Error deleting files:", err);
      }
    }

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const finalVerdict = verdicts.some((v) => v.status === "Time Limit Exceeded")
      ? "Time Limit Exceeded"
      : verdicts.some((v) => v.status === "Wrong Answer")
      ? "Wrong Answer"
      : verdicts.some((v) => v.status === "Compilation Error")
      ? "Compilation Error"
      : "Accepted";

    const newSubmission = new SubmissionModel({
      username: user.username,
      problemName: problem.name,
      code,
      language,
      verdict: finalVerdict,
      createdAt: new Date(),
    });

    await newSubmission.save();

    res.json({ verdicts });
  } catch (error) {
    console.error("Error in submitCode:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const getSubmissions = async (req, res) => {
  try {
    const submissions = await SubmissionModel.find()
      .select("username problemName code language verdict createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { runCompiler, submitCode, getSubmissions };
