import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // 将接口映射的dto没有定义的属性去除
      whitelist: true,
      // 将dto或者动态状态转换为对应类型, dto可以试一下,参数instanceOf不是对应类型, 动态id默认是string,可以转为number;
      transform: true,
      // 如果存在非dto定义的属性,则抛出错误
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
