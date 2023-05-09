import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './typeorm.service';

export const connectionSource = new DataSource(config as DataSourceOptions);