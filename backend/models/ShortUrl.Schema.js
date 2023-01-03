const {Schema,model}=require("mongoose")


const URLModel=new Schema({
    fullURL:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
        unique: true,
        
    },
    clicks:{
        type:Number,
        required:true,
        default:0
    }
},
{versionKey:false})

const URL=model("url",URLModel)
module.exports=URL