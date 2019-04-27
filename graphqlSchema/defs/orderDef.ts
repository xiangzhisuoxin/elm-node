import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList } from "graphql";
import dbTool from "../../mongodb/dbTool";
import Tool from "../../tool/tool";

const orderDef = new GraphQLObjectType({
  name: 'order',
  fields: {
    basket:{
      type:new GraphQLObjectType({
        name:Tool.getName(),
        fields:{
          abandoned_extra: {
            type: GraphQLList(new GraphQLObjectType({
              name: Tool.getName(),
              fields: {
                category_id: { type: GraphQLInt },
                name: { type: GraphQLString },
                price: { type: GraphQLFloat },
                quantity: { type: GraphQLFloat },
              }
            }))
          },
          deliver_fee: {
            type: new GraphQLObjectType({
              name: Tool.getName(),
              fields: {
                category_id: { type: GraphQLInt },
                name: { type: GraphQLString },
                price: { type: GraphQLFloat },
                quantity: { type: GraphQLFloat },
              }
            })
          },
          group: {
            type: GraphQLList(
              GraphQLList(
                new GraphQLObjectType({
                  name: Tool.getName(),
                  fields: {
                    name: { type: GraphQLString },
                    price: { type: GraphQLFloat },
                    quantity: { type: GraphQLFloat },
                    specs: { type: GraphQLList(GraphQLString) }
                  }
                })
              )
            ),
            packing_fee: {
              type: new GraphQLObjectType({
                name: Tool.getName(),
                fields: {
                  category_id: { type: GraphQLInt },
                  name: { type: GraphQLString },
                  price: { type: GraphQLFloat },
                  quantity: { type: GraphQLFloat },
                }
              })
            },
            pindan_map: { type: GraphQLList }
          }
        }
      })
    }
  }
})

const order = {
  order:{
    type:GraphQLList(orderDef),
    resolve:async (parent,args)=>{
      const res = await dbTool.find('orders',{});
      return res;
    }
  }
}

export {order};