const jwt = require('jsonwebtoken');

const admin = async(req,res,next)=>{
    try{
        const{'auth':usertoken} = req.headers;
        if(!usertoken) return res.status(404).json({err:'No authorization token found'})
        const verify = jwt.verify(usertoken, process.env.private_key);
        if(!verify){
            return res.status(200).send('Authorization failed for admin');
        }
    else if(verify.role == 'user') 
    return res.status(200).send('User access denied!');
    else if(verify.role == 'admin'){
        console.log('verified :',verify);
        next();
    }
    else return res.status(200).send('Not authorized as admin')
    }
    catch(error){
        console.log('Logging from admin.js :',error);
    }
}

module.exports = admin;