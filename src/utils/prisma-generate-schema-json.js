import {readFileSync, writeFileSync} from 'fs';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const file = readFileSync(join(__dirname, '../database/json-schema.json'));

const prismaSchema = JSON.parse(file.toString());

prismaSchema.required = [];

Object.keys(prismaSchema.properties).forEach(property => {
    prismaSchema.required.push(property);
});

function dfs(obj) {
    if (!obj) {
        return;
    }
    // eslint-disable-next-line guard-for-in
    for (const key in obj) {
        const item = obj[key];
        if (item.type === 'object') {
            Object.keys(item.properties).forEach(key => {
                const value = item.properties[key];
                if (!value.anyOf && key !== 'id') {
                    item.required.push(key);
                }
            });
            item.required = [...new Set(item.required)];
            dfs(item.properties);
        }
    }
}

dfs(prismaSchema.definitions);


writeFileSync(join(__dirname, '../database/json-schema.json'), JSON.stringify(prismaSchema, null, 2));