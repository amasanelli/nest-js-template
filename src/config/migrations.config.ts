import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from './typeorm.config';

config();

const configService = new ConfigService();
const typeOrmConfigService = new TypeOrmConfigService(configService);
const dataSource: DataSource = typeOrmConfigService.createDataSource();

export default dataSource;
