import React,{useState,useEffect,useContext} from 'react';
import './Edit.css';
import {Link,useParams,useNavigate} from 'react-router-dom';
import Axios from 'axios';
import {CRUDContext} from '../App';


function Edit(){
  const navigate = useNavigate();
  
const params = useParams();
const {id} = params;
const vartoken =localStorage.getItem('auth-token');
const [name1,setname1] = useState('');
const [age1,setage1] = useState(0);
const [skill1,setskill1] = useState('');
const [designation1,setdesignation1] = useState('');
const [address1,setaddress1] = useState('');
const auth = useContext(CRUDContext);

useEffect(()=>{
  if(vartoken){
   auth.setuserall(true);
  }
 },[])
//to print the data on the input field
/*
function checkfunction(obj){
return obj._id === id;
}

useEffect(()=>{
  Axios.post('http://localhost:3001/edit/initial',{
    headers:vartoken,
    itemid:id,
  }).then((res) => {
    console.log(res.data.items.filter(checkfunction));
  let listitem = res.data.items.filter(checkfunction)
 
  });
},[])
*/

const edithandle =(e)=>{
  e.preventDefault();
Axios.post('http://localhost:3001/edit',{
name:name1,
age:age1,
skill:skill1,
designation:designation1,
address:address1,
headers:vartoken,
itemid:id,
}).then((res)=>{
navigate('/CRUD');

}).catch();
}



    return(
        <>

        </>
    );
}

export default Edit;