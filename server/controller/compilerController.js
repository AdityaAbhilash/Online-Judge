import express from 'express'
import { generateFile } from '../Compiler/generateFile.js';
import { executeCpp,executePython,executeC,executeJava } from '../Compiler/execute.js';

const runCompiler = async (req, res) => {
    const { language = 'cpp', code } = req.body;
    if (code === undefined) {
      return res.status(404).json({ success: false, message: 'Empty code' });
    }

    try {
        const filePath = await generateFile(language,code);
        // console.log(language,code)
        let output;
        if(language == 'cpp'){
             output = await executeCpp(filePath);
        }
        else if(language == 'py'){
             output = await executePython(filePath);
        }else if(language == 'c'){
             output = await executeC(filePath);
        }else if(language == 'java'){
             output = await executeJava(filePath);
        }
        res.json({filePath,output});
    } catch (error) {
        res.status(501).json({"success":false,message:error.message})
    }
  };
  
  export { runCompiler };
  