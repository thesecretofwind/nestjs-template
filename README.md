### 数据库迁移：
1. 设置ormconfig.js， 里面包含了数据库连接，entity位置等
```js
module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'nest_base',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations'
  }
}

```
2. 输出文档
```
npx typeorm migration:create -n ./migrations/CoffeeRelactor
```

3. 打包：
```
npm run build
```



4. 数据迁移

如果是对比，好像前面还有一步：
```
npx typeorm migration:generate -n ./mifrations/SchemaSync
```
```
npx typeorm migration:run 
# 这里少了datasouce，不清楚怎么配置
```

5. 数据回滚
```
npx typeorm migration:revert
```