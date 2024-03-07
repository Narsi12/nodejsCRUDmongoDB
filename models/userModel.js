const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username:{
        type: String,
        required :[true,"please add the user name"]

    },
    email:{
    type:String,
    required:[true,"Please add the user emialaddress"],
    unique : [true,"email address is alredy taken"]
    },
    password:{
        type: String,
        required : [true,"please add the user password"]
    },
     
},
{
    timestamps: true,
}
)

module.exports = mongoose.model("user",userSchema);