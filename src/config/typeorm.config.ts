import { DataSource, DataSourceOptions } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private dataSourceOptions: DataSourceOptions

  constructor(private configService: ConfigService) {
    this.loadConfig();
  }

  private loadConfig(): void {
    this.dataSourceOptions =  {
      type: this.configService.get<MysqlConnectionOptions['type']>(
        'MYSQL_TYPE',
        'mysql',
      ),
      host: this.configService.get<string>('MYSQL_HOST', 'localhost'),
      port: this.configService.get<number>('MYSQL_PORT', 3306),
      username: this.configService.get<string>('MYSQL_USERNAME', 'user'),
      password: this.configService.get<string>('MYSQL_PASSWORD', 'user'),
      database: this.configService.get<string>('MYSQL_DATABASE', 'dev-db'),
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/**/migrations/*.js'],
      synchronize: true
    } as MysqlConnectionOptions;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.dataSourceOptions
  }

  createDataSource(): DataSource {
    return new DataSource(this.dataSourceOptions);
  }

  getDataSourceOptions(): DataSourceOptions {
    return this.dataSourceOptions;
  }
}