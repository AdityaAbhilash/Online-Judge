import fs from 'fs'
import path from 'path'
import {dirname} from 'path'
import { fileURLToPath } from 'url';
import {exec} from 'child_process';
import { spawn } from 'child_process';


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


// const executePython = (filePath, inputFilePath) => {
//     return new Promise((resolve, reject) => {
//         const process = exec(`python3 ${filePath} < ${inputFilePath}`);
  
//         const timer = setTimeout(() => {
//             process.kill();
//             reject({ error: "Time Limit Exceeded" });
//         }, TIME_LIMIT);
  
//         let isTimeout = false;
  
//         process.stdout.on('data', (data) => {
//             if (!isTimeout) {
//                 resolve({ stdout: data.toString() });
//             }
//         });
  
//         process.stderr.on('data', (data) => {
//             if (!isTimeout) {
//                 clearTimeout(timer);
//                 reject({ error: data.toString() });
//             }
//         });
  
//         process.on('close', (code) => {
//             if (isTimeout) return; // Ignore close event if timeout occurred
//             clearTimeout(timer);
//             if (code !== 0) {
//                 reject({ error: `Process exited with code ${code}` });
//             }
//         });
  
//         process.on('error', (error) => {
//             if (isTimeout) return; // Ignore error event if timeout occurred
//             clearTimeout(timer);
//             reject({ error: error.message });
//         });
  
//         // Set flag to true when timeout is reached
//         process.on('exit', () => {
//             isTimeout = true;
//         });
//     });
// };

const executePython = (filePath, inputFilePath) => {
    return new Promise((resolve, reject) => {
        console.log(`Starting Python process for ${filePath}`);

        const process = spawn('python3', [filePath]);

        const timer = setTimeout(() => {
            console.log('Timeout reached, killing process');
            process.kill();
            reject({ error: "Time Limit Exceeded" });
        }, TIME_LIMIT);

        let isTimeout = false;
        let output = '';

        process.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            output += data.toString();
        });

        process.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
            if (!isTimeout) {
                clearTimeout(timer);
                reject({ error: data.toString() });
            }
        });

        process.on('close', (code) => {
            console.log(`Process closed with code ${code}`);
            clearTimeout(timer);
            if (isTimeout) return;
            if (code !== 0) {
                reject({ error: `Process exited with code ${code}` });
            } else {
                resolve({ stdout: output });
            }
        });

        process.on('error', (error) => {
            console.log(`Process error: ${error.message}`);
            clearTimeout(timer);
            if (!isTimeout) {
                reject({ error: error.message });
            }
        });

        // Read the input file and send the data to the process's stdin
        if (inputFilePath) {
            console.log(`Reading input file ${inputFilePath}`);
            const input = fs.readFileSync(inputFilePath, 'utf-8');
            process.stdin.write(input);
            process.stdin.end();
        } else {
            console.log('No input file provided');
            process.stdin.end();
        }
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
