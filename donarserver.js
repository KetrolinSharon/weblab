const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/donarbd',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("connection made with local host")).catch(err=>console.log("error"));
const donarSchema=new mongoose.Schema(
    {
        name:String,
        fund:Number,
        address:String
    }
);
const Donor=mongoose.model('Donor',donarSchema);

app.get('/Donars',async(req,res)=>
{
    const don=await Donor.find();
    res.json(don);
});

app.post('/Donars',async(req,res)=>
{
    const dono=new Donor(req.body);
    await dono.save();
    res.json(dono);

});

app.put('/Donars/:id',async(req,res)=>
{
    const don=await Donor.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(don);
});

app.delete('/Donars/:id',async(req,res)=>
{
    await Donor.findByIdAndDelete(req.params.id);
    res.json(console.log("deleted"));
});

app.listen(3000,()=>console.log("listening to port"));