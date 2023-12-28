
const validate = (schema) => async(req,res,next) =>{
  try{
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  }    
  catch(err){
    // console.log(error);
    const status = 422;
    const errMessage = err.errors[0].message;
    const message = "Fill the input details properly";
    // res.status(400).json({message: "Validaton failed"});


    const error = {
      status,
      errMessage,
      message,
    };
    console.log(errMessage);
    next(error);//go to errorMiddleware
  }    
};

module.exports = validate;