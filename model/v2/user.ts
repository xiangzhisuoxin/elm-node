import {Document, Schema, model} from "mongoose";
// import UserInfo from "./userinfo";
interface IUser extends Document{
    user_id?: Number,
    username?: String,
    password?: String
}
const userSchema:Schema = new Schema({
    user_id: Number,
    username: String,
    password: String
})

// const User = mongoose.model('User', userSchema);
const User = model<IUser>('User', userSchema);

export default User;