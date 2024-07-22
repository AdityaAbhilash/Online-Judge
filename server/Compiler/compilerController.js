import express from 'express'
import { generateFile } from './generateFile.js';
import { executeCpp,executePython,executeC,executeJava } from './execute.js';
import { generateInputFile } from './generateInputFile.js';


const runCompiler = async (req, res) => {
    const { language = 'cpp', code , input} = req.body;   
    if (code === undefined) {
      return res.status(404).json({ success: false, message: 'Empty code' });
    }

    try {
        const filePath = await generateFile(language,code);
        const input_filePath = await generateInputFile(input);
        let output;
        if(language == 'cpp'){
             output = await executeCpp(filePath,input_filePath);
        }
        else if(language == 'py'){
             output = await executePython(filePath,input_filePath);
        }else if(language == 'c'){
             output = await executeC(filePath,input_filePath);
        }else if(language == 'java'){
             output = await executeJava(filePath,input_filePath);
        }
        res.json({filePath,input_filePath,output});   
    } catch (error) {
        res.status(501).json({"success":false,message:error.message})
    }
  };
  
  export { runCompiler };
  