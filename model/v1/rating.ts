import { Document, Schema, model } from 'mongoose';

interface IRating extends Document{
	restaurant_id?: number,
	ratings?: [
		{
			avatar?: string,
			highlights?: Array<any>,
			item_ratings?: [
				{
					food_id?: number,
					food_name?: string,
					image_hash?: string,
					is_valid?: number,
				},
			],
			rated_at?: string,
			rating_star?: number,
			rating_text?: string,
			tags?: Array<any>,
			time_spent_desc?: string,
			username?: string,
		},
	],
	scores?: {
		compare_rating?: number,
		deliver_time?: number,
		food_score?: number,
		order_rating_amount?: number,
		overall_score?: number,
		service_score?: number,
	},
	tags?: [{
		count?: number,
		name?: string,
		unsatisfied?: boolean,
	}]
}

const ratingSchema:Schema = new Schema({
	restaurant_id: Number,
	ratings: [
		{
			avatar: {type: String, default: ''},
			highlights: [],
			item_ratings: [
				{
					food_id: Number,
					food_name: String,
					image_hash: {type: String, default: ''},
					is_valid: {type: Number, default: 1},
				},
			],
			rated_at: String,
			rating_star: Number,
			rating_text: String,
			tags: {type: Array, default: []},
			time_spent_desc: String,
			username: {type: String, default: "匿名用户"},
		},
	],
	scores: {
		compare_rating: {type: Number, default: 0},
		deliver_time: {type: Number, default: 0},
		food_score: {type: Number, default: 0},
		order_rating_amount: {type: Number, default: 0},
		overall_score: {type: Number, default: 0},
		service_score: {type: Number, default: 0},
	},
	tags: [{
		count: {type: Number, default: 0},
		name: String,
		unsatisfied: {type: Boolean, default: false},
	}]
})

ratingSchema.index({restaurant_id: 1});

const ratingModel = model<IRating>('rating', ratingSchema)

export default ratingModel;