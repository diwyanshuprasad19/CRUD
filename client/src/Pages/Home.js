import React,{useContext,useEffect} from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { CRUDContext } from '../App';
function Home(){
const vartoken =localStorage.getItem('auth-token');
const navigate = useNavigate();
const auth = useContext(CRUDContext);
useEffect(()=>{
    if(vartoken){
     auth.setuserall(true);
    }
   },[])



const handleto =()=>{
    if(auth.userall){
      navigate('/CRUD');
    }
    else
    {
   navigate('/Login');
    }
}

    return(
        <>
        <div className='center1'>
            <h1>Basic CRUD Application</h1>
            <p>Let Add some data</p>
            <button  onClick={handleto}>Let get started</button>
        </div>
        </>
    );
}

export default Home;