import mongoose, { Schema } from "mongoose";

const user = new Schema({
    name: String,
    email: String,
    password: String,
    number: Number
})

export default mongoose.model("Users", user)


// iska export method alaga hota hai..
// mongoose.model("Users", user)