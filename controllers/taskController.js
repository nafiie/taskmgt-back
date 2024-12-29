const Task = require('../model/Task')
const sendMail = require('../config/mailService')


exports.getAllTasks = async(req, res, next) => {
    try {
        const task = await Task.find();
        res.status(200).json(task)
    } catch (error) {
        console.log(error.message);                
    }
}
exports.createTasks = async(req,res, next) => {
    try {
        const {title ,description, status, duedate} = req.body;
        const newTask= await Task.create({title, description, status, duedate});

        
         //send welcome mail
         const subject = 'welcome to task management';
         const text = `hi ${title}, welcome to our platform.We're glad to have you on board`;
         const html = `
         <h1>Welcome, ${title}</h1>
         <h1>Email: ${description}</h1>
         
         <p>We're excited to have you join us.If you have any question, feel free to reach out to our support team</p>
         `;
         await sendMail(title, subject, text, html)
        res.status(201).json({message: 'task created successfully.Check your mailbox for a welcome message', task: newTask, description: new Task})

                 
    } catch (error) {
        console.log(error.message);             
    }
}

exports.getTaskByid = async(req,res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(404).json({message: 'task not found'});
        } 
        res.status(200).json(task);       
    } catch (error) {
        console.log(error.message);
        
        
    }
}
exports.updateTaskByid = async(req,res, next) =>{
    try {
        const {title ,description, status, duedate} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {title ,description, status, duedate},
            {new:true}
        );
        if (!updatedTask) {
            return res.status(404).json({message:'task not found'})
        }
        return res.status(200).json({message: 'task updated successfully', task: updatedTask})
    } catch (error) {
        console.log(error.message);              
    }
}

exports.deleteTaskByid = async(req,res, next) =>{
    try {
        const deleteTask = await Task.findByIdAndDelete(
          req.params.id,
        );
    if (!deleteTask) {
            return res.status(404).json({message:'task not found'})
        }
        return res.status(200).json({message: 'task deleted successfully', task: deleteTask})
    } catch (error) {
        console.log(error.message);              
    }
}

