import {Schema, model, models} from "mongoose";

const StudentL= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

})


export default models.User || model('Student', StudentL)
