const express = require("express");
router = express.Router();


const encrypt = require("bcrypt"),
jwt = require("jsonwebtoken"),
dotenv = reuire("dotenv");
dotenv.config();

const db = require('./db');


//Getting all users
router.get('/users',admin,(req,res)=>{
    db.query('SELECT * FROM person',(err,respond,next)=>{
        if(err) console.log(err)
        else res.send(respond);
    });
});

//Signing up of all users 
router.post('/register/', (req,res)=>{
    const { Username, email, Password} = req.body;
    
    db.query("SELECT * FROM person where email=?",[email],async (err,respond,f)=>{
        if(err) console.log(err);
        if(respond.length > 0){
            return res.status(404).json({error: 'User alreay exists\n'});
        }
        const hash = await encrypt.hashSync(Password, 10);
        const {role} = req.headers;
        db.query('INSERT INTO person(Username,email,Password,ID) VALUES (?,?,?,?)',[Username,email,hash,role])
        res.json({message: 'User registered successfully'});
    })
    })
//Login of the users
router.post('/login/',(req,res,next)=>{
    const {email,Password} = req.body;
    db.query('SELECT email,Password,role FROM person WHERE email=?',[email],async(err,respond)=>{
        if(err) console.log(err);
        else if(respond.length> 0){
            console.log(repond);
            const [{Password:hash,role}] = respond;

            const verify = await encrypt.compare(Password,hash);
            if(verify){
                const jwtData = {
                    email: email,
                    role: role
                };
                const token = jwt.sign(jwtData, process.env.private_key);
                res.setHeader('auth',token);
                res.json({message:"login successful",token});
                next();}
                else{
                    res.json({error:'Invalid Password'})
                }
            }
            else
            res.status(404).json({message: 'Invalid User'});
        })
    })

    module.exports = router;
