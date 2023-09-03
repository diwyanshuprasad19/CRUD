import React,{useState,useContext} from 'react';
import './Login.css';
import {Link,useNavigate} from 'react-router-dom';
import Axios from 'axios';
import {CRUDContext} from '../App';

function Login(){

const navigate =useNavigate();
const auth = useContext(CRUDContext);
const [emaillogin,setemaillogin] = useState('');
const [passwordlogin,setpasswordlogin] = useState('');
const [errorlogin,seterrorlogin] = useState('');


const handlelogin = (e)=>{
  e.preventDefault();
Axios.post('http://localhost:3001/login',{
  email:emaillogin,
  password:passwordlogin,
}).then(res =>{
  if(res.data.type === 'success')
  {

localStorage.setItem("auth-token", res.data.token);
auth.setuserall(true);
    navigate('/CRUD');
  }
   else if(res.data.type === 'validation')
   {
    seterrorlogin(res.data.errors[0].msg);
   }
   else if(res.data.type === 'email'){
    seterrorlogin(res.data.errors);
   }
   else if(res.data.type === 'password'){
    seterrorlogin(res.data.errors);
   }
}).catch(error =>{
  console.log(error);
});


  
  }



    return(
<div class="center">
      <h1>Login</h1>
      <form onSubmit={handlelogin}>
        {errorlogin && <p>{errorlogin}</p>}
        <div className="txt_field">
          <input type="text" required onChange={(e)=>{setemaillogin(e.target.value)}}/>
          <span></span>
          <label>Email Address</label>
        </div>
        <div className ="txt_field">
          <input type="password" required onChange={(e)=>{setpasswordlogin(e.target.value)}}/>
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Login"/>
        <div className="signup_link">
          Not a member? <Link to="/Signup" >Signup</Link>
        </div>
      </form>
    </div>
    );
}

export default Login;












