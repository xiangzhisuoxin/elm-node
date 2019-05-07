import {ApolloServer} from 'apollo-server-koa';
import Koa from 'koa';
import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import { order, orderMutation } from './schema/order';
import { userinfo } from './schema/userinfo';
import { discount } from './schema/discount';
import { address, addressMutation } from './schema/address';

//将所有的schema挂载在根schema 名称跟属性明一致最好
const queryFields={};
Object.assign(queryFields,order,userinfo,discount,address);
const querySchema=new GraphQLObjectType({
  name:'query',
  fields:queryFields
});

const mutationFields={};
Object.assign(mutationFields,orderMutation,addressMutation);
// console.log(mutationFields);

const mutationSchema=new GraphQLObjectType({
  name:'mutation',
  fields:mutationFields
});

//生成graphQL服务 将根schema挂载上去
const serve = new ApolloServer({
  // typeDefs:[orderDef],
  // resolvers:[orderRes]
  
  // 用这个覆盖上边的两个属性
  schema:new GraphQLSchema({
    query:querySchema,
    mutation:mutationSchema
  })
});

//将graphQL服务挂在koa上
const initGraphQL=(app:Koa) => {
  serve.applyMiddleware({app})
}

export {initGraphQL};