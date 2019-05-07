import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } from "graphql";
import dbTool from "../../mongodb/dbTool";
import tool from "../../tool/tool";
import { resolve } from "url";
import db from "mongodb/db";
import { orderDef } from "./order";

const userinfoDef = new GraphQLObjectType({
  name: 'userinfo',
  fields: {
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    user_id: { type: GraphQLInt },
    id: { type: GraphQLID },
    city: { type: GraphQLString },
    registe_time: { type: GraphQLString },
    column_desc: {
      type: new GraphQLObjectType({
        name: tool.getName(),
        fields: {
          gift_mall_desc: { type: GraphQLString },
          game_link: { type: GraphQLString },
          game_is_show: { type: GraphQLInt },
          game_image_hash: { type: GraphQLString },
          game_desc: { type: GraphQLString },
        }
      })
    },
    point: { type: GraphQLInt },
    mobile: { type: GraphQLString },
    is_mobile_valid: { type: GraphQLBoolean },
    is_email_valid: { type: GraphQLBoolean },
    is_active: { type: GraphQLInt },
    gift_amount: { type: GraphQLInt },
    email: { type: GraphQLString },
    delivery_card_expire_days: { type: GraphQLInt },
    current_address_id: { type: GraphQLInt },
    current_invoice_id: { type: GraphQLInt },
    brand_member_new: { type: GraphQLInt },
    balance: { type: GraphQLInt },
    avatar: { type: GraphQLString },
    // 与order数据的聚合 
    order:{
      type: GraphQLList(orderDef),
      async resolve(parent,args){
        var res = await dbTool.find('orders',{user_id:parent.user_id});
        return res;
      }
    }
  }
})

const userinfo = {
  userinfo: {
    type: GraphQLList(userinfoDef),
    async resolve() {
      return await dbTool.find('userinfos', {});
    }
  },
  userinfoOne: {
    type: userinfoDef,
    args: {
      userId: { type: GraphQLInt }
    },
    async resolve(parent, args) {
      let res = await dbTool.find('userinfos', {
        user_id: args.userId
      });
      return res[0];
    }
  }
}

export { userinfo }