const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/finalemp',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("connected")).catch((err)=>console.log("error"));
const employeeSchema=new mongoose.Schema(
    {
    name:String,position:String,salary:Number
    }
);
const Employee=mongoose.model('Employee',employeeSchema);
app.get('/employees',async(req,res)=>
{
    const emp=await Employee.find();
    res.json(emp);
});

app.post('/employees',async(req,res)=>
{
    const emp=new Employee(req.body);
    emp.save();
    res.json(emp);
});

app.put('/employees/:id',async(req,res)=>
{
    const emp=await Employee.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(emp);
});

app.delete('/employees/:id',async(req,res)=>
{
    await Employee.findByIdAndDelete(req.params.id);
    res.json(console.log("delelted successfully"));
});

app.listen(3000,console.log("connected"));