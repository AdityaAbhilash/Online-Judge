import fs from 'fs'
import path from 'path'
import {v4 as uuid} from 'uuid'
import {dirname} from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirInputs = path.join(__dirname,'inputs');

if(!fs.existsSync(dirInputs)){
    fs.mkdirSync(dirInputs,{recursive: true});
}

const generateInputFile = async (input)=>{
    const jobId = uuid();
    const input_filename = `${jobId}.txt`;
    const input_filePath = path.join(dirInputs,input_filename)

    fs.writeFileSync(input_filePath,input);
    return input_filePath;

};

export {generateInputFile}
