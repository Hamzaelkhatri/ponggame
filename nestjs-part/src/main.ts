import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { GraphQLModule } from '@nestjs/graphql';

// import {NestExpressApplication} from '@nestjs/platform-express';
// import {join} from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useStaticAssets(join(__dirname , '..' ,'static'));
  // Access-Control-Allow-Origin 
  // app.enableCors({credentials: true, origin: "http://localhost:3000"});


//   GraphQLModule.forRoot({
//     debug: process.env.NODE_ENV !== 'production',
//     playground: process.env.NODE_ENV !== 'production',
//     typePaths: ['./**/*.graphql'],
//     installSubscriptionHandlers: true,
//     context: ({req}) => {
//         return {req};
//     },
//     cors: {
//         credentials: true,
//         origin: true,
//     },
// }),

  await app.listen(5400);
}
bootstrap();
