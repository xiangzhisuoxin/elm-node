import { GraphQLString, __Directive } from 'graphql';
import { GraphQLInt } from 'graphql';
import { GraphQLObjectType } from 'graphql';
import * as _ from 'lodash';
import { resolve } from 'dns';
import dbTool from '../../mongodb/dbTool';
const discountDef =new GraphQLObjectType({
  name:'discount',
  fields:{
    user_id:{type:GraphQLInt},
    amount:{type:GraphQLInt},
    name:{type:GraphQLString},
    sum_condition:{type:GraphQLInt},
    description_map:{
      type:new GraphQLObjectType({
        name:_.uniqueId('_'),
        fields:{
          online_paid_only:{type:GraphQLString},
          sum_condition:{type:GraphQLString},
          validity_delta:{type:GraphQLString}
        }
      })
    }
  }
});

const discount = {
  discountOne:{
    type:discountDef,
    args:{userId:{type:GraphQLInt}},
    async resolve(parent,args){
      const res = await dbTool.find('hongbaos',{user_id:186655961});
      return res[0];
    }
  }
};

export {discount,discountDef}