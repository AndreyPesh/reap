import { getEnvPath } from 'src/common/helper/env.helper';


export const PATH_TO_ENV = '../../common/envs';

export const envFilePath = getEnvPath(`${__dirname}/${PATH_TO_ENV}`);