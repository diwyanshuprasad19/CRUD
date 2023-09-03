const express= require ('express');
const app = express();
const {body,validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UserModel = require('./model/user');
const cors = require('cors');
app.use(express.json());
app.use(cors());
var jwt = require('jsonwebtoken');
var fetchuser = require('./middleware/fetchuser');



mongoose.connect("mongodb+srv://diwyanshuprasad:qwerty12345@cluster0.i7t88bc.mongodb.net/CRUD?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
});

//fir signup

app.post("/signup", [
    body('fullname', 'Enter a  name of min length 3').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ type:'validation' ,errors: errors.array() });
    }
const fullname = req.body.fullname;
const email = req.body.email;
const password = req.body.password;
let user = await UserModel.findOne({ email: email });
    if (user) {
      return res.send({type:'email',errors:'Email already exist'});
    }
    else{
const hashpassword = await bcrypt.hash(password,10);
let user = new UserModel({fullname:fullname,email:email,password:hashpassword,items:[]});

try{
let usercreate = await user.save();
res.send({type:'success'});
}
catch(err){
res.send({type:'user not saved',errors:err});
}
    }
});


//for login
app.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ type:'validation',errors: errors.array() });
    }
  
    const { email, password } = req.body;
      let user = await UserModel.findOne({ email:email });
      if (!user) {
        return res.send({ type:'email',errors: "Please try to login with correct email" });
      }
  
      const passwordCompare = await bcrypt.compare(req.body.password, user.password);
      if (!passwordCompare) {
        return res.send({ type:'password', errors: "Please try to login with correct password" });
      }
      const data = {
        user: {
          id: user._id
        }
      }
      const authtoken = jwt.sign(data, 'secretkey');
      return res.send({type:'success',token:authtoken});
    });


    //for item crreate
    app.post("/itemcreate",fetchuser ,async(req,res)=>{
  
const userid= req.user.id;
const name =req.body.name;
const country = req.body.country;
const salary = req.body.salary;
const email = req.body.email;
const obj ={name:name,country:country,salary:salary,email:email};
let user = await UserModel.findOne({_id: userid });
let usernew = await UserModel.updateOne({_id: userid},{$push:{items:obj}});

res.send({type:'success',item:usernew});
  });


//read
  app.post("/read",fetchuser ,async(req,res)=>{
  
    const userid= req.user.id;
    try{
      let user = await UserModel.findOne({_id: userid });
      res.send({type:'success',items:user.items});
    }
    catch(err){
     res.send({type:'failed',errors:err})
    }
  })






  app.post("/edit/initial",fetchuser ,async(req,res)=>{
  
    const userid= req.user.id;
    const itemid = req.body.itemid;
    try{
      let user = await UserModel.findOne({_id:userid,"items._id":itemid});
      res.send({type:'success',user:user});
    }
    catch(err){
      res.send({type:'failed',errors:err})
    }
  })





  app.post("/edit",fetchuser ,async(req,res)=>{
  
    const userid= req.user.id;
    const itemid = req.body.itemid;
    const name =req.body.name;
const country = req.body.country;
const salary = req.body.salary;
const email = req.body.email;
    try{
      let user = await UserModel.updateOne({_id: userid , "items._id":itemid },{$set:{"items.$.name":name,"items.$.country":country,"items.$.salary":salary,"items.$.email":email,}});
      res.send({type:'success',items:user});
    }
    catch(err){
      res.send({type:'failed',errors:err})
    }
  })


  app.post("/delete",fetchuser ,async(req,res)=>{
  
    const userid= req.user.id;
    const itemid = req.body.itemid;
    try{
      let user = await UserModel.updateOne({_id: userid },{$pull:{items:{_id:itemid}}});
      res.send({type:'success',items:user});
    }
    catch(err){
      res.send({type:'failed',errors:err})
    }
  })



app.listen(3001,()=>{

    console.log('server running');
})