import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const Protocol = createParamDecorator(
  // data就是调用@Protocal(data)装饰器里面传递的值
  (data: unknown, ctx: ExecutionContext) => {
    console.log(data);

    const request = ctx.switchToHttp().getRequest<Request>();
    return request.protocol;
  },
);
