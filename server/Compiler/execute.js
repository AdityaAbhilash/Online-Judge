import fs from 'fs'
import path from 'path'
import {dirname} from 'path'
import { fileURLToPath } from 'url';
import {exec} from 'child_process';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = path.join(__dirname,'outputs');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive: true});
}

const TIME_LIMIT = 5000;

const executeCpp = (filePath, inputFilePath) => {
    const jobId = path.basename(filePath, path.extname(filePath));
    const outputFilename = `${jobId}.exe`;
    const outPath = path.join(path.dirname(filePath), outputFilename);
  
    return new Promise((resolve, reject) => {
      const process = exec(`g++ ${filePath} -o ${outPath} && ${outPath} < ${inputFilePath}`);
  
      const timer = setTimeout(() => {
        process.kill();
        reject({ error: "Time Limit Exceeded" });
      }, TIME_LIMIT);
  
      let isTimeout = false;
  
      process.stdout.on('data', (data) => {
        // Accumulate stdout data
        if (!isTimeout) {
          resolve({ stdout: data.toString(), outPath });
        }
      });
  
      process.stderr.on('data', (data) => {
        // Handle stderr data
        if (!isTimeout) {
          clearTimeout(timer);
          reject({ error: data.toString() });
        }
      });
  
      process.on('close', (code) => {
        if (isTimeout) return; // Ignore close event if timeout occurred
        clearTimeout(timer);
        if (code !== 0) {
          reject({ error: `Process exited with code ${code}` });
        }
      });
  
      process.on('error', (error) => {
        if (isTimeout) return; // Ignore error event if timeout occurred
        clearTimeout(timer);
        reject({ error: error.message });
      });
  
      // Set flag to true when timeout is reached
      process.on('exit', (code) => {
        isTimeout = true;
      });
    });
  };
  


  const executeC = (filePath, inputFilePath) => {
    const jobId = path.basename(filePath, path.extname(filePath));
    const outputFilename = `${jobId}.exe`;
    const outPath = path.join(path.dirname(filePath), outputFilename);
  
    return new Promise((resolve, reject) => {
        const process = exec(`g++ ${filePath} -o ${outPath} && ${outPath} < ${inputFilePath}`);
  
        const timer = setTimeout(() => {
            process.kill();
            reject({ error: "Time Limit Exceeded" });
        }, TIME_LIMIT);
  
        let isTimeout = false;
  
        process.stdout.on('data', (data) => {
            if (!isTimeout) {
                resolve({ stdout: data.toString(), outPath });
            }
        });
  
        process.stderr.on('data', (data) => {
            if (!isTimeout) {
                clearTimeout(timer);
                reject({ error: data.toString() });
            }
        });
  
        process.on('close', (code) => {
            if (isTimeout) return; // Ignore close event if timeout occurred
            clearTimeout(timer);
            if (code !== 0) {
                reject({ error: `Process exited with code ${code}` });
            }
        });
  
        process.on('error', (error) => {
            if (isTimeout) return; // Ignore error event if timeout occurred
            clearTimeout(timer);
            reject({ error: error.message });
        });
  
        // Set flag to true when timeout is reached
        process.on('exit', () => {
            isTimeout = true;
        });
    });
};


const executePython = (filePath, inputFilePath) => {
    return new Promise((resolve, reject) => {
        const process = exec(`python3 ${filePath} < ${inputFilePath}`);
  
        const timer = setTimeout(() => {
            process.kill();
            reject({ error: "Time Limit Exceeded" });
        }, TIME_LIMIT);
  
        let isTimeout = false;
  
        process.stdout.on('data', (data) => {
            if (!isTimeout) {
                resolve({ stdout: data.toString() });
            }
        });
  
        process.stderr.on('data', (data) => {
            if (!isTimeout) {
                clearTimeout(timer);
                reject({ error: data.toString() });
            }
        });
  
        process.on('close', (code) => {
            if (isTimeout) return; // Ignore close event if timeout occurred
            clearTimeout(timer);
            if (code !== 0) {
                reject({ error: `Process exited with code ${code}` });
            }
        });
  
        process.on('error', (error) => {
            if (isTimeout) return; // Ignore error event if timeout occurred
            clearTimeout(timer);
            reject({ error: error.message });
        });
  
        // Set flag to true when timeout is reached
        process.on('exit', () => {
            isTimeout = true;
        });
    });
};


const executeJava = (filePath, inputFilePath) => {
    return new Promise((resolve, reject) => {
        const process = exec(`java ${filePath} < ${inputFilePath}`);
  
        const timer = setTimeout(() => {
            process.kill();
            reject({ error: "Time Limit Exceeded" });
        }, TIME_LIMIT);
  
        let isTimeout = false;
  
        process.stdout.on('data', (data) => {
            if (!isTimeout) {
                resolve({ stdout: data.toString() });
            }
        });
  
        process.stderr.on('data', (data) => {
            if (!isTimeout) {
                clearTimeout(timer);
                reject({ error: data.toString() });
            }
        });
  
        process.on('close', (code) => {
            if (isTimeout) return; // Ignore close event if timeout occurred
            clearTimeout(timer);
            if (code !== 0) {
                reject({ error: `Process exited with code ${code}` });
            }
        });
  
        process.on('error', (error) => {
            if (isTimeout) return; // Ignore error event if timeout occurred
            clearTimeout(timer);
            reject({ error: error.message });
        });
  
        // Set flag to true when timeout is reached
        process.on('exit', () => {
            isTimeout = true;
        });
    });
};
   

export { executeCpp, executeC, executePython, executeJava };
