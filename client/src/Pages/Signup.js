import React, { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {Link} from 'react-router-dom';
import {CRUDContext} from '../App';
import Axios from 'axios';

function Signup(){

  const navigate = useNavigate();
  const auth = useContext(CRUDContext);
const [fullnamesign,setfullnamesign] = useState('');
const [passwordsign,setpasswordsign] = useState('');
const [emailsign,setemailsign] = useState('');
const [errorsign,seterrorsign] = useState('');

const handlesign = (e)=>{
e.preventDefault();
Axios.post('http://localhost:3001/signup',{
  fullname:fullnamesign,
  email:emailsign,
  password:passwordsign,
}).then(res =>{
  if(res.data.type === 'success')
  {   
   
    navigate('/Login');
  }
  else if(res.data.type === 'email'){
    seterrorsign(res.data.errors);
  }
  else if(res.data.type ==='validation'){
    seterrorsign(res.data.errors[0].msg);
  }
  else
  {
    seterrorsign(res.data.errors);
  }

}).catch(error =>{
  console.log(error);
});

}


    return(
<div class="center">
      <h1>Signup</h1>
      <form onSubmit={handlesign}>
        {errorsign && <p>{errorsign}</p>}
      <div className="txt_field">
          <input type="text" required onChange={(e)=>{setfullnamesign(e.target.value)}}/>
          <span></span>
          <label>Full Name</label>
        </div>
        
        <div className="txt_field">
          <input type="text" required onChange={(e)=>{setemailsign(e.target.value)}}/>
          <span></span>
          <label>Email Address</label>
        </div>
      
        <div className="txt_field">
          <input type="password" required  onChange={(e)=>{setpasswordsign(e.target.value)}}/>
          <span></span>
          <label>Password</label>
        </div>
       
        <input type="submit" value="Signup" onClick={handlesign} />
        <div className="signup_link">
          Already Have an account? <Link to="/Login">Login</Link>
        </div>
      </form>
    </div>
    );
}

export default Signup;
