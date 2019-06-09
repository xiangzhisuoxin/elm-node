# 前言

    该项目是[仿饿了么pc端项目](https://github.com/xiangzhisuoxin/elm-pc)对应的后台项目，提供了用户登录注册，商家信息，下单，用户信息等多个接口，实现了完整的流程。

## 技术栈

koa2 + koa-router + typescript + mongodb + graphQL

该项目使用了轻便的koa框架作为骨架，使用typescript代替javascript进行开发，数据库使用mongodb，原始数据来自[bailicangdu](https://github.com/bailicangdu/node-elm)提供的数据库，根据具体的业务需求提供了REST+graphQL两种风格的接口。

## 项目运行

```
npm install (或者yarn install)
npm run dev
```

本地node端口
```
http://localhost:8081/
```

本地graphQL接口地址
```
http://localhost:8081/graphql
```

## 总结

这一块占了开发的大半时间，一是看到了ts在服务端开发的好处，再学习ts，然后对项目进行重构，这一块耗费了很长时间，包括学习、代码改变、debug，二是折腾数据库这一块，也是重新学习，三是graphQL这一块，国内资源少，都是一些简单的demo。

ts在服务端是比js好用很多的，解决了很多js的痛点，有java、c#的经验会很好学习。graphQL作为新兴的API查询语言，可以说提供了全新的接口解决方案，是一种新的理念，有比REST风格的接口好用的地方。虽然入手有点难，但还是难逃真香定律的。