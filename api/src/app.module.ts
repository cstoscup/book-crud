import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { ConfigModule } from '@nestjs/config';
import { BunyanLoggerService } from './logger.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'book-crud',
      entities: [Book],
      synchronize: true,
      logging: false,
    }),
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [AppController],
  providers: [AppService, BunyanLoggerService],
})
export class AppModule {}
