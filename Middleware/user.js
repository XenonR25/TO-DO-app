const jwt = require('jsonwebtoken');

const user = async(req,res,next)=>{
    try{
        const{'auth':usertoken} = req.headers;
        if(!usertoken) return res.status(404).json({err:'No authorization token found'})
        const verify = jwt.verify(usertoken, "secret_key");
        console.log(verify,usertoken,process.env.private_key);

        if(!verify){
            return res.status(200).send('Authorization failed for user');
        }
    else {
        if(verify.role =='admin' || verify.role == 'user'){
            console.log('verified :',verify);
            next();
        }
        else{
            console.log(verify);
            return res.status(200).send('not verified user');
        }
    }
}
    catch(error){
        console.log('Logging from admin.js :',error);
    }
}

module.exports = user;