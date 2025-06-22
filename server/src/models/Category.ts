import mongoose from "mongoose";

interface ICategory extends Document {
    category: string,
    createdAt: Date,
    updatedAt: Date,
}



const categorySchema = new mongoose.Schema({
    category: {type: String, required: true},
},{
    timestamps: true
})


const Category = mongoose.model<ICategory>("Category", categorySchema)

export default Category
