import express from 'express';
import fs from 'fs';
import { exec } from 'child_process';
import { ProblemModel } from '../models/problem.js';
import { generateFile } from './generateFile.js';
import { executeCpp, executePython, executeC, executeJava } from './execute.js';
import { generateInputFile } from './generateInputFile.js';
// import { executeCpp_, executePython_, executeC_, executeJava_ } from './submitExecute.js';

const runCompiler = async (req, res) => {
  const { language = 'cpp', code, input } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Empty code' });
  }

  try {
    const filePath = await generateFile(language, code);
    const inputFilePath = await generateInputFile(input);
    let output;
    if (language === 'cpp') {
      output = await executeCpp(filePath, inputFilePath);
    } else if (language === 'py') {
      output = await executePython(filePath, inputFilePath);
    } else if (language === 'c') {
      output = await executeC(filePath, inputFilePath);
    } else if (language === 'java') {
      output = await executeJava(filePath, inputFilePath);
    }
    res.json({ filePath, inputFilePath, output });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





const submitCode = async (req, res) => {
  const { language, code } = req.body;
  const { id } = req.params;

  try {
    const problem = await ProblemModel.findById(id);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const fileName = `code.${language}`;
    const inputFile = 'input.txt';
    const outputFile = 'output.txt';

    let verdicts = [];  // Collect verdicts

    for (let [index, testCase] of problem.testCases.entries()) {
    //   await fs.promises.writeFile(fileName, code);
    //   await fs.promises.writeFile(inputFile, testCase.input);
      await fs.promises.writeFile(outputFile, testCase.output);
      const inputFilePath = await generateInputFile(testCase.input);
      const filePath = await generateFile(language, code);

      let output;
      let verdict = 'Accepted';

      try {
        if (language === 'cpp') output = await executeCpp(filePath, inputFilePath);
        else if (language === 'c') output = await executeC(filePath, inputFilePath);
        else if (language === 'py') output = await executePython(filePath, inputFilePath);
        else if (language === 'java') output = await executeJava(filePath, inputFilePath);

        const resultOutput = await fs.promises.readFile(outputFile, 'utf-8');
        if (resultOutput.trim() !== testCase.output.trim()) {
          verdict = 'Wrong Answer';
        }
      } catch (err) {
        verdict = 'Compilation Error';
      }

      verdicts.push({ testCase: index + 1, status: verdict });
    }

    res.json({ verdicts });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  

export { runCompiler, submitCode };
