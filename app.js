const express = require('express')
const bodyparser = require('body-parser')

const app = express();
const port = 5000;

//middleware
app.use(express.json());

let todos = [];

app.get('/todos',(req,res)=>{
    res.json(todos);
})
//NEW TASK CREATING
app.post('/todos',(req,res)=> {
    const newtask = {
        id: todos.length +1,
        task: req.body.task,
        completed : false
    }
    todos.push(newtask),
    res.status(200).json(newtask)
})
//UPDATE A TASK
app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
  
    if (!todo) {
      return res.status(404).json({ message: '404: Task not found' });
    }
  
    todo.completed = req.body.completed;
    res.json(todo);
  })

//DELETING A TASK
app.delete('/todos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);

    if(index === -1){
        return res.status(404).json({message: '404 not found'})
    }
        todos.splice(index,1);
        res.json({message:'Task has been deleted'});
    
})


app.listen(port,()=> 
console.log(`Server Running on port : http://localhost:${port}`))