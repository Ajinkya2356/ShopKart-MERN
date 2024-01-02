const ErrorHandler=require("../utils/errorHandler")
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";
    // Wrong mongodb id error
    if(err.name==="CastError"){
        const message=`Resource not found ${err.path}`;
        err=new ErrorHandler(message,400);
    }
    if(err.code ===11000){
        const message =`Duplicate ${Object.keys(err.keyValue)} Email entered`;
        err=new ErrorHandler(message,400);
    }
    if(err.name==="JsonWebTokenError"){
        const message=`jsonWebToken is invalid, try again`;
        err=new ErrorHandler(message,403);
    }
    if(err.name==="TokenExpiredError"){
        const message=`jsonWebToken is Expired, try again`;
        err=new ErrorHandler(message,403);
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
}
