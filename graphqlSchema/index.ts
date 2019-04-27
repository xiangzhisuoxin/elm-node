import {ApolloServer} from 'apollo-server-koa';
import { order } from './defs/orderDef';
import Koa from 'koa';
import {GraphQLObjectType, GraphQLSchema} from 'graphql';

//将所有的schema挂载在根schema 名称跟属性明一致最好
const fields={};
Object.assign(fields,order);
const rootSchema=new GraphQLObjectType({
  name:'root',
  fields
})

//生成graphQL服务 将根schema挂载上去
const serve = new ApolloServer({
  // typeDefs:[orderDef],
  // resolvers:[orderRes]
  
  // 用这个覆盖上边的两个属性
  schema:new GraphQLSchema({
    query:rootSchema
  })
});

//将graphQL服务挂在koa上
const initGraphQL=(app:Koa) => {
  serve.applyMiddleware({app})
}

export {initGraphQL};