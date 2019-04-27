import orderModel from "../../model/v1/order";

const orderRes={
  Query:{
    order:async ()=> {
      let a = await orderModel.find({id:1});
      console.log(a);
      return a;
    }
  }
}
export {orderRes}