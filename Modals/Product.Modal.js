import mongoose, {Schema} from "mongoose"

const products = new Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }
})

export default mongoose.model('Product', products)
