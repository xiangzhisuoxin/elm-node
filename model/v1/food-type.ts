import { Document, Schema, model, Model } from 'mongoose';
import entry from '../../initData/entry';

interface IFood extends Document{
    id?: number,
    is_in_serving?: boolean,
    description?: string,
    title?: string,
    link?: string,
    image_url?: string,
    icon_url?: string,
    title_color?: string
}
const foodSchema:Schema = new Schema({
    id: Number,
    is_in_serving: Boolean,
    description: String,
    title: String,
    link: String,
    image_url: String,
    icon_url: String,
    title_color: String
})

const FoodType = model<IFood>('Foodtypes',foodSchema);

FoodType.findOne((err:any,data:IFood) => {
    if (!data) {
        entry.forEach((item) => {
            FoodType.create(item)
        })
    }
})

export default FoodType;