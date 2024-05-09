const express = require('express')
const bodyparser = require('body-parser')
const db = require("./db")
const admin = require('./Middleware/admin');
const user = require('./Middleware/user');

const app = express();
const port = 5000;

//middleware
app.use(express.json());



//Getting all tasks by admin
app.get('/tasks/',admin,(req,res)=>{
    db.query("SELECT * from Tasks;",(err,respond,field)=>{
        if(err) return console.log(err);
        else
            res.json(respond);  
      })
})

//Getting tasks by id/user
app.get('/tasks/:id',user,(req,res)=>{
    db.query("SELECT * from Tasks where person_ID = ?",[req.params.id],(err,respond,fields)=>{
        if(err) console.log(err);
        else res.json(respond);
    })
})

//Inserting Tasks
app.post('/tasks/create',(req,res)=> {
    db.query("INSERT INTO tasks values(?,?,?,?)",[req.body.Description,req.body.TaskID,req.body.status],(err,respond,fields)=>{
        if(err) console.log(err);
        else res.json(respond);
    })
})

//update or edit tasks
app.patch('/tasks/update/:id', (req, res) => {
    const taskID = req.params.id;
    const {Description,status} = req.body;
    db.query("UPDATE tasks SET Description = ?,status = ? WHERE taskID = ?",[Description,status,taskID],(err,repond,f)=>{
        if(err) console.log(err);
        else if(respond.affectedRows === 1)
        res.status(200).json({message:"Task updated successfully"});
        else res.status(404).json({message:"Task not found"})
    })
  })
  

//DELETING A TASK
app.delete('/tasks/delete/:id',(req,res)=>{
   
     db.query("DELETE FROM tasks WHERE TASKID = ?",[req.params.id],(err,respond,f)=>{
        if(err) console.log(err);
        else if(respond.affectedRows)
        {
            respond.json(`The task with ${req.params.id} ID has been deleted`);
            console.log(respond)
        }
    });
    
});

module.exports = app;


  //app.listen(port,()=> 
//console.log(`Server Running on port : http://localhost:${port}`))