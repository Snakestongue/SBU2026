import { Schema } from "mongoose";
import validator from "validator"

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        minLength:1,
        maxLength:20,
        trim:true,
        lowercase:true,
        unique:true,
        required:True
    },
    password:{
        type:String,
        require:true,
        unique:false,
        minLength:6,
        maxLength:20,
        required:True
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        required:True,
        validate: {validator: validator.isEmail, message: props =>`${props.value} is not a valid email!`}
    },
    content:[{
        content:{
            type:String,
            unique:false,
            required:True
        },
        createdAt:{
            date:{type: Date, default: Date.now}
        }
    }]
},{
    timestamps:true
}
);
export const User = mongoose.model("User", userSchema)