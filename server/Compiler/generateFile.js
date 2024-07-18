import fs from 'fs'
import path from 'path'
import {v4 as uuid} from 'uuid'
import {dirname} from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirCodes = path.join(__dirname,'codes');

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive: true});
}

const generateFile = async (language,code)=>{
    const jobId = uuid();
    const filename = `${jobId}.${language}`;
    const filePath = path.join(dirCodes,filename)

    fs.writeFileSync(filePath,code);
    return filePath;

};

export {generateFile}
