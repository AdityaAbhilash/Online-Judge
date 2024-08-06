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

const TIME_LIMIT = 10000;

// const executeCpp = (filePath,input_filePath)=>{
//     const jobId = path.basename(filePath).split(".")[0];
//     const output_filename = `${jobId}.exe`;
//     const outPath = path.join(outputPath,output_filename);
    
//     return new Promise((resolve,reject)=>{
//         exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${output_filename} < ${input_filePath}`,{ timeout: TIME_LIMIT },
//             (error, stdout, stderr) => {
//                 if (error) {
//                   if (error.killed) {
//                     return reject({ error: "Time Limit Exceeded" });
//                   }
//                   return reject({ error, stderr });
//                 }
//                 if (stderr) {
//                     return reject({ error: stderr });
//                 }
//                 resolve({ stdout, outPath });
//               }
//     );
//     });
// };


// const executeCpp = (filePath, inputFilePath) => {
//     const jobId = path.basename(filePath).split(".")[0];
//     const outputFilename = `${jobId}.exe`;
//     const outPath = path.join(outputPath, outputFilename);

//     return new Promise((resolve, reject) => {
//         const process = exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${outputFilename} < ${inputFilePath}`);

//         const timer = setTimeout(() => {
//             process.kill();
//             reject({ error: "Time Limit Exceeded" });
//         }, TIME_LIMIT);

//         process.on('close', (code) => {
//             clearTimeout(timer);
//             if (code !== 0 && code !== null) {
//                 console.error(`Process exited with code ${code}`);
//                 return reject({ error: `Process exited with code ${code}` });
//             }
//             resolve({ stdout: process.stdout, outPath });
//         });

//         process.on('error', (error) => {
//             clearTimeout(timer);
//             console.error(`Process error: ${error.message}`);
//             reject({ error, stderr: error.message });
//         });

//         process.stdout.on('data', (data) => {
//             resolve({ stdout: data, outPath });
//         });

//         process.stderr.on('data', (data) => {
//             clearTimeout(timer);
//             console.error(`Process stderr: ${data.toString()}`);
//             reject({ error: data.toString() });
//         });
//     });
// };

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
