import mongoose from "mongoose";


const userSchema = new mongoose.Schema(

   {
    userName:{
        type:String,
        required:true
    },
      email:{
        type:String,
        required:true
    },
      password:{
        type:String,
        required:true
    },
      token:{
        type:String,
        default:null
    },
      isLoggedIn:{
        type:Boolean,
        default:"false"
    },
      isVerfied:{
        type:Boolean,
        default:"false"
    }
   }

)


export default mongoose.model("people" , userSchema);