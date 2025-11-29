import mongoose from "mongoose";


const todoSchema = new mongoose.Schema(

   {
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"people"
    },
    title:{
        type:String,
        required:true
    }
   }, {timestamps:true}

)


export default mongoose.model("todoNewList" , todoSchema);