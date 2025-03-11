import asyncHandler from "../utils/asyncHandler";

const testing = asyncHandler(async(req,resizeBy,next)=>{
    console.log("hello world"); 
})




export {
    testing,
}