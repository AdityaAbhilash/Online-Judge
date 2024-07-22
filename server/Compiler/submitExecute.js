import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import {dirname} from 'path'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = path.join(__dirname,'outputs');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive: true});
}

const executeCpp_ = (filePath, inputFilePath, outputFilePath) => {
  const outputFilename = 'code.exe';
  const outPath = path.join(outputFilePath, outputFilename);

  return new Promise((resolve, reject) => {
    exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${outputFilename} < ${inputFilePath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        } else if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      });
  });
};

const executeC_ = (filePath, inputFilePath, outputFilePath) => {
  const outputFilename = 'code.exe';
  const outPath = path.join(outputFilePath, outputFilename);

  return new Promise((resolve, reject) => {
    exec(`gcc ${filePath} -o ${outPath} && ${outPath} < ${inputFilePath} > ${outputFilePath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        } else if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      });
  });
};

const executePython_ = (filePath, inputFilePath, outputFilePath) => {
  return new Promise((resolve, reject) => {
    exec(`python ${filePath} < ${inputFilePath} > ${outputFilePath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        } else if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      });
  });
};

const executeJava_ = (filePath, inputFilePath, outputFilePath) => {
  return new Promise((resolve, reject) => {
    exec(`javac ${filePath} && java ${path.basename(filePath, '.java')} < ${inputFilePath} > ${outputFilePath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        } else if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      });
  });
};

export { executeCpp_, executeC_, executePython_, executeJava_ };
