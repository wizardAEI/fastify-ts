import {readFileSync, writeFileSync} from 'fs';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const file = readFileSync(join(__dirname, '../database/json-schema.json'));

const prismaSchema = JSON.parse(file.toString());

const target = JSON.parse(file.toString());
target.required = [];

Object.keys(prismaSchema.properties).forEach(property => {
    target.required.push(property);
});

writeFileSync(join(__dirname, '../database/json-schema.json'), JSON.stringify(target, null, 2));