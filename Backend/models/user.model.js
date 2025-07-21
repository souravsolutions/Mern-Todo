import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user"
    },
    refreshToken: {
        type: String
    }
},{
    timestamps: true
})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    } 
    next()
})

userSchema.methods.generateAccessToken = function (){
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username,
        role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username,
        role: this.role
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)
}

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)