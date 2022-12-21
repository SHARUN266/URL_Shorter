const {Schema,model}=require("mongoose")

const shortId=require('shortid')
const URLModel=new Schema({
    fullURL:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
        unique: true,
        // default:shortId.generate()
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