// FEAT: 从.env文件中读取环境变量
import {config} from 'dotenv';
config();
type Config = {
    BOS_AK: string;
    BOS_SK: string;
    BOS_ENDPOINT: string;
    BUCKET_NAME: string;

    MONGODB_URI: string;
    MONGODB_DATABASE: string;
    MONGODB_USER: string;
    MONGODB_PASSWORD: string;

    TOOLS_COLLECTION: string;
    QAS_COLLECTION: string;
};
export function getEnv<T extends keyof Config>(key: T):Config[T] {
    const value = process.env[key];
    if (value === undefined) {
        throw new Error(`环境变量${key}不存在`);
    }
    return value;
}