import { LoggingInterceptor } from './shared/logging.interceptor';
import { HttpErrorFilter } from './shared/http-error.filter';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaModule } from './idea/idea.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      // {
      //   type: 'postgres',
      //   host: 'isilo.db.elephantsql.com',
      //   port: 5432,
      //   username: 'dczzpyzf',
      //   password: 'cCC9QylT9kO6Afmgcg0Ie_xEnEedM4WE',
      //   database: 'dczzpyzf',
      //   synchronize: true,
      //   entities: [__dirname + '/**/*.entity.{ts,js}'],
      // },
      {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'YueZheng',
        synchronize: true,
        // dropSchema: false,
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        // ssl: true,
      },
    ),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
    }),
    IdeaModule,
    UserModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
