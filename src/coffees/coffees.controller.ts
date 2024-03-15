import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  // 请求coffees/flovar接口
  @Get('flovar')
  findAll(@Res() response): string {
    // 获取到express的response对象，可以设置状态码以及响应数据
    return response.status(200).send('hello coffee');
  }

  // 获取动态参数params，比如/coffees/1即使获取id为1
  @Get('/:id')
  findOne(@Param('id') id: string): string {
    return `hello coffee ${id}`;
  }

  // 传递过来一个json对象，@body装饰器里没有对应属性则是全部获取，里面有属性名则是获取对应的属性如@Body('name') name: any
  @Post()
  @HttpCode(HttpStatus.GONE) // 这个请求即使处理成功也是会返回该状态码
  creat(@Body() body: any): string {
    console.log(body);
    return body;
  }

  @Patch('/:id')
  pacth(@Param('id') id: string, @Body() body) {
    return `pacth ${id} content is ${body}`;
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return `delete coffee ${id}`;
  }

  @Get()
  findAllCoffees(@Query() query): string {
    const { limit, offset } = query;
    return `findAllCoffees: limit: ${limit}: offfset:${offset}`;
  }
}
