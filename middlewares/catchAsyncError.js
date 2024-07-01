export const catchAsyncError = (SomeFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(SomeFunction(req,res,next)).catch(next);
    }
}