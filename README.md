## 使用技巧
1. 正常开发步骤为：写.prisma -> `yarn generate-prisma` 生成 prisma 和 zod 类型 -> 从数据库到服务到handler开发接口 -> `yarn dev` 启动服务 -> 打开 http://localhost:8111/apidocs 查看接口并测试


## 注意事项

1. mongodb需要支持副本集，以便使用 prisma。[单实例副本 mongodb Docker 示例](https://github.com/wizardAEI/mongo-replica)
2. prisma 不能直接创建表格，需要先在对应的数据库中创建表格：
    ```
        use database;
        db.createCollection("Users");
    ```