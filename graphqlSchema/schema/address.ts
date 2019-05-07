import { GraphQLList, GraphQLString } from 'graphql';
import { GraphQLString, GraphQLInt } from 'graphql';
import { GraphQLID } from 'graphql';
import { GraphQLObjectType } from 'graphql';
import dbTool from '../../mongodb/dbTool';
import * as Dayjs from 'dayjs';
import { resolve } from 'url';
const addressDef=new GraphQLObjectType({
  name:'address',
  fields:{
    _id:{type:GraphQLID},
    id:{type:GraphQLInt},
    address:{type:GraphQLString},
    phone:{type:GraphQLString},
    name:{type:GraphQLString},
    st_geohash:{type:GraphQLString},
    address_detail:{type:GraphQLString},
    user_id:{type:GraphQLInt},
    sex:{type:GraphQLInt},
  }
}) ;

const address={
  addressOne:{
    type:GraphQLList(addressDef),
    args:{userId:{type:GraphQLInt}},
    async resolve(parent,args){
      const res = await dbTool.find('addresses',{user_id:args.userId});
      return res;
    }
  }
}

const addressMutation={
  addressAdd:{
    type:addressDef,
    args:{
      userId:{type:GraphQLInt},
      address:{type:GraphQLString},
      phone:{type:GraphQLString},
      name:{type:GraphQLString},
      addressDetail:{type:GraphQLString},
      sex:{type:GraphQLInt},
    },
    async resolve(parent,{userId,address,phone,name,addressDetail,sex}){
      let res = await dbTool.insert('addresses',{
        user_id:userId,
        address,
        phone,
        name,
        sex,
        address_detail:addressDetail,
        created_at:Dayjs().format('YYYY-MM-DD HH:mm')
      });
      return {};
    }
  },
  addressUpdate:{
    type:addressDef,
    args:{
      addressId:{type:GraphQLString},
      address:{type:GraphQLString},
      phone:{type:GraphQLString},
      name:{type:GraphQLString},
      addressDetail:{type:GraphQLString},
      sex:{type:GraphQLInt},
    },
    async resolve(parent,{addressId,userId,address,phone,name,addressDetail,sex}){
      let res = await dbTool.update('addresses',{
        _id:dbTool.getObjectId(addressId),
      },{
        address,
        phone,
        name,
        sex,
        address_detail:addressDetail,
      });
      return res[0];
    }
  },
  addressRemove:{
    type:addressDef,
    args:{addressId:{type:GraphQLString}},
    async resolve(parent,{addressId}){
      let res = dbTool.remove('addresses',{_id:dbTool.getObjectId(addressId)});
      return res[0];
    }
  }
}

export{address,addressDef,addressMutation}