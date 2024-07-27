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

const executeCpp = (filePath,input_filePath)=>{
    const jobId = path.basename(filePath).split(".")[0];
    const output_filename = `${jobId}.exe`;
    const outPath = path.join(outputPath,output_filename);
    
    return new Promise((resolve,reject)=>{
        exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${output_filename} < ${input_filePath}`,
            (error,stdout,stderr)=>{
            if(error){
                return reject({error,stderr});
            }
            if(stderr){
                return reject(stderr);
            }
            resolve({stdout,outPath});
        });
    });
};

const executeC = (filePath,input_filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const output_filename = `${jobId}.exe`;
    const outPath = path.join(outputPath, output_filename);
    
    return new Promise((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${output_filename} < ${input_filePath}`,
            (error, stdout, stderr) => {
                if (error) {
                    return reject({ error, stderr });
                }
                if (stderr) {
                    return reject(stderr);
                }
                resolve({stdout,outPath});
            });
    });
};

const executePython = (filePath, input_filePath) => {
    return new Promise((resolve, reject) => {
        exec(`python3 ${filePath} < ${input_filePath}`,
            (error, stdout, stderr) => {
                if (error) {
                    return reject({ error, stderr });
                }
                if (stderr) {
                    return reject(stderr);
                }
                resolve({ stdout }); 
            });
    });
};

const executeJava = (filePath, input_filePath) => {
    return new Promise((resolve, reject) => {
        exec(`java ${filePath} < ${input_filePath}`,
            (error, stdout, stderr) => {
                if (error) {
                    return reject({ error, stderr });
                }
                if (stderr) {
                    return reject(stderr);
                }
                resolve({ stdout }); 
            });
    });
};   

export { executeCpp, executeC, executePython, executeJava };
