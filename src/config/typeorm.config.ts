import { DataSource, DataSourceOptions } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private dataSourceOptions: DataSourceOptions;

  constructor(private readonly configService: ConfigService) {
    this.loadConfig();
  }

  private loadConfig(): void {
    this.dataSourceOptions = {
      type: this.configService.get<MysqlConnectionOptions['type']>(
        'MYSQL_TYPE',
        'mysql',
      ),
      host: this.configService.get<string>('MYSQL_HOST'),
      port: this.configService.get<number>('MYSQL_PORT'),
      username: this.configService.get<string>('MYSQL_USERNAME'),
      password: this.configService.get<string>('MYSQL_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DATABASE'),
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/**/migrations/*.js'],
      synchronize: true,
    } as MysqlConnectionOptions;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.dataSourceOptions;
  }

  createDataSource(): DataSource {
    return new DataSource(this.dataSourceOptions);
  }

  getDataSourceOptions(): DataSourceOptions {
    return this.dataSourceOptions;
  }
}
