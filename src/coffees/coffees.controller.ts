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
import { CoffeesService } from './coffees.service';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll() {
    return this.coffeeService.findAll();
  }

  // 获取动态参数params，比如/coffees/1即使获取id为1
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.coffeeService.findOne(+id);
  }

  // 传递过来一个json对象，@body装饰器里没有对应属性则是全部获取，里面有属性名则是获取对应的属性如@Body('name') name: any
  @Post()
  @HttpCode(HttpStatus.GONE) // 这个请求即使处理成功也是会返回该状态码
  creat(@Body() body: CreateCoffeeDto) {
    return this.coffeeService.create(body);
  }

  @Patch('/:id')
  pacth(@Param('id') id: string, @Body() body: UpdateCoffeeDto) {
    return this.coffeeService.update(+id, body);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.coffeeService.remove(+id);
  }

  @Get()
  findAllCoffees(@Query() query): string {
    const { limit, offset } = query;
    return `findAllCoffees: limit: ${limit}: offfset:${offset}`;
  }
}
