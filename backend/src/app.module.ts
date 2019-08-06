import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaModule } from './idea/idea.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'isilo.db.elephantsql.com',
      port: 5432,
      username: 'dczzpyzf',
      password: 'cCC9QylT9kO6Afmgcg0Ie_xEnEedM4WE',
      database: 'dczzpyzf',
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
    }),
    IdeaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
