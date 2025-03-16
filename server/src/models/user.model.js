import  mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phoneNumber:{
        type: String, 
        required:true,

    },
    password:{
        type: String, 
        required:true,
    },
    role:{type:String,required:true,default:"user"},
    refreshToken:{type:String},
    username :{
        required:true,
        type: String,
        unique: true,
        lowercase:true,
        trim:true,
        index:true,
    },
    avatarUrl:{
        type:String,
    },

},{timestamps:true})

// password encryption 
 userSchema.pre("save",async function(newxt){
    if(!this.isModified("password")) return newxt();
    this.password= await bcrypt.hash(this.password,10);
    next();
 })


 userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
 }

 // generate token 

 userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this.id,
        username:this.username,
        role:this.role,
        name:this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.enveACCESS_TOKEN_EXPIRY
    },
);

 }


 // generate refresh token 

 userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
    }
);
}



export const User =  mongoose.model("User",userSchema);