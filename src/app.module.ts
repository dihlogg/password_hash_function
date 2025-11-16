import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { HashingModule } from './common/hashing/hashing.module';
import { BenchmarkModule } from './modules/benchmark/benchmark.module';
import { ExportModule } from './modules/export/export.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), // Load .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    HashingModule,
    BenchmarkModule,
    ExportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
