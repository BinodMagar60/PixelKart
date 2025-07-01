import mongoose, { Schema } from "mongoose";


interface IReviewShema extends Document{
    orderId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    reviewerId: mongoose.Types.ObjectId,
    reviewStar: number,
    reviewComment: string,
}




const ReviewSchema = new Schema<IReviewShema>({
    orderId: {type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    reviewerId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    reviewStar: {type: Number, required: true},
    reviewComment: {type: String, required: true}
},{
    timestamps: true
})


export const Review = mongoose.model("Review",ReviewSchema)