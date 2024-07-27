import express from "express";
import fs from "fs";
import { exec } from "child_process";
import { ProblemModel } from "../models/problem.js";
import { generateFile } from "./generateFile.js";
import { executeCpp, executePython, executeC, executeJava } from "./execute.js";
import { generateInputFile } from "./generateInputFile.js";


const extractErrorMessage = (stderr) => {
  // Split the error output into lines
  const lines = stderr.split('\n');
  let errorMessage = '';

  for (let i = 0; i < lines.length; i++) {
    // Check if the line contains an error message
    if (lines[i].includes('error:')) {
      // Extract the part after "error:"
      const parts = lines[i].split('error:');
      if (parts.length > 1) {
        errorMessage = parts[1].trim(); // Get the message part after "error:"
      }
      break; // Stop after finding the first error
    }
  }

  return errorMessage;
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
      ({ stdout: output, outPath: outputFilePath } = await executeCpp(
        filePath,
        inputFilePath
      ));
    } else if (language === "py") {
      ({ stdout: output, outPath: outputFilePath } = await executePython(
        filePath,
        inputFilePath
      ));
    } else if (language === "c") {
      ({ stdout: output, outPath: outputFilePath } = await executeC(
        filePath,
        inputFilePath
      ));
    } else if (language === "java") {
      ({ stdout: output, outPath: outputFilePath } = await executeJava(
        filePath,
        inputFilePath
      ));
    } else {
      throw new Error("Unsupported language");
    }

    res.json({ filePath, inputFilePath, output });
  } catch (error) {
    console.log(error);
    const errorMessage = error.stderr || error.message;
    const relevantMessage = extractErrorMessage(errorMessage);
    console.log(relevantMessage);
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

  try {
    const problem = await ProblemModel.findById(id);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    let verdicts = [];

    for (let [index, testCase] of problem.testCases.entries()) {
      const inputFilePath = await generateInputFile(testCase.input);
      const filePath = await generateFile(language, code);

      let output;
      let outputFilePath;
      let verdict = "Accepted";

      try {
        if (language === "cpp")
          ({ stdout: output, outPath: outputFilePath } = await executeCpp(
            filePath,
            inputFilePath
          ));
        else if (language === "c")
          ({ stdout: output, outPath: outputFilePath } = await executeC(
            filePath,
            inputFilePath
          ));
        else if (language === "py")
          ({ stdout: output, outPath: outputFilePath } = await executePython(
            filePath,
            inputFilePath
          ));
        else if (language === "java")
          ({ stdout: output, outPath: outputFilePath } = await executeJava(
            filePath,
            inputFilePath
          ));

        if (output.trim() !== testCase.output.trim()) {
          verdict = "Wrong Answer";
        }
      } catch (err) {
        verdict = "Compilation Error";
        console.log(err);
      }

      verdicts.push({ testCase: index + 1, status: verdict });

      // Clean up files after processing each test case
      try {
        await fs.promises.unlink(filePath);
        await fs.promises.unlink(inputFilePath);
        if (outputFilePath) await fs.promises.unlink(outputFilePath);
      } catch (err) {
        console.error("Error deleting files:", err);
      }
    }

    res.json({ verdicts });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { runCompiler, submitCode };
