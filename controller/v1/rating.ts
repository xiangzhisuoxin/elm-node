import { RouterContext } from 'koa-router';
import ratingModel from '../../model/v1/rating';
class Rating {
    /**
     * 根据商家id返回评论
     *
     * @memberof Rating
     */
    getRatingByShopId = async (ctx:RouterContext) => {
        let {resId} = ctx.query;
        let rating = await ratingModel.findOne({restaurant_id:resId})
        ctx.body = {
            status:1,
            msg:'',
            data:rating
        }
    }
}

export default new Rating();