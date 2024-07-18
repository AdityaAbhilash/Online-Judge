import fs from 'fs'
import path from 'path'
import {dirname} from 'path'
import { fileURLToPath } from 'url';
import {exec} from 'child_process'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = path.join(__dirname,'outputs');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive: true});
}

const executeCpp = (filePath)=>{
    const jobId = path.basename(filePath).split(".")[0];
    const output_filename = `${jobId}.exe`;
    const outPath = path.join(outputPath,output_filename);
    
    return new Promise((resolve,reject)=>{
        exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${output_filename}`,
            (error,stdout,stderr)=>{
            if(error){
                reject({error,stderr});
            }
            if(stderr){
                reject(stderr);
            }
            resolve(stdout);
        });
    });
};

const executeC = (filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const output_filename = `${jobId}.exe`;
    const outPath = path.join(outputPath, output_filename);
    
    return new Promise((resolve, reject) => {
        exec(`gcc ${filePath} -o ${outPath} && cd ${outputPath} && .\\${output_filename}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            });
    });
};

const executePython = (filePath) => {
    return new Promise((resolve, reject) => {
        exec(`python ${filePath}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            });
    });
};

const executeJava = (filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    
    return new Promise((resolve, reject) => {
        exec(`javac ${filePath} && java -cp ${path.dirname(filePath)} ${jobId}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            });
    });
};

export { executeCpp, executeC, executePython, executeJava };
