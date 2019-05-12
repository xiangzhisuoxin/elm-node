import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLInputObjectType } from "graphql";
import dbTool from "../../mongodb/dbTool";
import Tool from "../../tool/tool";
import * as _ from "lodash";
import * as Dayjs from 'dayjs';

const orderDef = new GraphQLObjectType({
  name: 'order',
  fields: {
    _id:{type:GraphQLID},
    basket: {
      type: new GraphQLObjectType({
        name: Tool.getName(),
        fields: {
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
                category_id: { type: GraphQLID },
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
          },
          packing_fee:{
            type:new GraphQLObjectType({
              name:_.uniqueId('b'),
              fields:{
                price:{type:GraphQLFloat},
                quantity:{type:GraphQLInt},
                name:{type:GraphQLString},
                category_id:{type:GraphQLInt},
              }
            })
          }
        }
      })
    },
    restaurant_id: { type: GraphQLID },
    restaurant_image_url: { type: GraphQLString },
    restaurant_name: { type: GraphQLString },
    formatted_created_at: { type: GraphQLString },
    order_time: { type: GraphQLFloat },
    time_pass: { type: GraphQLFloat },
    total_amount: { type: GraphQLInt },
    total_quantity: { type: GraphQLInt },
    unique_id: { type: GraphQLID },
    id: { type: GraphQLID },
    user_id: { type: GraphQLInt },
    address_id: { type: GraphQLID },
    top_show: { type: GraphQLID },
    status_code: { type: GraphQLInt },
    status_bar: {
      type: new GraphQLObjectType({
        name: Tool.getName(),
        fields: {
          color: { type: GraphQLString },
          sub_title: { type: GraphQLString },
          title: { type: GraphQLString },
        }
      })
    }
  }
});

const order = {
  order: {
    type: GraphQLList(orderDef),
    resolve: async (parent, args) => {
      const res = await dbTool.find('orders', {});
      return res;
    }
  },
  orderOne: {
    type: GraphQLList(orderDef),
    args: {
      userId:{type:GraphQLInt},
      pageSize:{type:GraphQLInt},
    },
    async resolve(parent, {userId,pageSize=0}) {
      const res = await dbTool.find('orders', {
        // '_id': dbTool.getObjectId(args.id)
        'user_id':userId
      },{},{pageSize:pageSize});
      return res.reverse();
    }
  }
}

const orderMutation={
  orderAdd:{
    type:orderDef,
    args:{
      shopId:{type:GraphQLNonNull(GraphQLInt)},
      shopName:{type:GraphQLNonNull(GraphQLString)},
      userId:{type:GraphQLNonNull(GraphQLInt)},
      orderTime:{type:GraphQLNonNull(GraphQLString)},
      totalCost:{type:GraphQLNonNull(GraphQLFloat)},
      addressId:{type:GraphQLNonNull(GraphQLInt)},
      cart:{type:GraphQLList(new GraphQLInputObjectType({
          name:_.uniqueId('b'),
          fields:{
            quantity:{type:GraphQLInt},
            name:{type:GraphQLString},
            price:{type:GraphQLFloat},
          }
        }))
      },
      deliveryFee:{
        type:new GraphQLInputObjectType({
          name:_.uniqueId('b'),
          fields:{
            price:{type:GraphQLFloat},
          }
        })
      }
    },
    async resolve(parent,args){
      let basket:any={};
      basket.group=[args.cart];
      basket.delivery_fee=args.deliveryFee;

      let res = await dbTool.insert('orders',{
        restaurant_id:args.shopId,
        formatted_created_at: Dayjs(args.orderTime).format('YYYY-MM-DD HH:mm'),
        restaurant_name:args.shopName,
        total_amount:args.totalCost,
        user_id:args.userId,
        address_id:args.addressId,
        basket
      })
      
      return res.ops[0];
    },
  }
}

export { order,orderDef,orderMutation };