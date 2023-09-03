import React,{useState,useEffect,useContext} from 'react';
import './CRUD.css';
import './open.css';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import {CRUDContext} from '../App';
import Edit from './Edit';



function CRUD(){
const vartoken =localStorage.getItem('auth-token');
const [listread,setlistread] = useState([]);
const [listadd,setlistadd] = useState([]);
const [listedit,setlistedit] = useState([]);
const [search,setsearch] = useState('');
const [name,setname] = useState('');
const [country,setcountry] = useState('');
const [salary,setsalary] = useState('');
const [email,setemail] = useState('');
const [errorval,seterrorval] = useState('');
const navigate = useNavigate();
const auth = useContext(CRUDContext);


const [nameedit,setnameedit] = useState('');
const [countryedit,setcountryedit] = useState('');
const [salaryedit,setsalaryedit] = useState('');
const [emailedit,setemailedit] = useState('');
const [idedit,setidedit] = useState('');



useEffect(()=>{
 if(vartoken){
  auth.setuserall(true);
 }
},[])

const [click,setclick] = useState(false);
const [edit,setedit] = useState(false);


const handleopen = ()=>{
  setclick(true)
}
const handleedit = (id)=>{
    setedit(true);
  setidedit(id);
}

const deletelist = (id)=>{
  Axios.post('http://localhost:3001/delete',{
  headers:vartoken,
  itemid:id,
  }).then((res)=>{
  
  }).catch();
}



const createsubmit = (e)=>{
  e.preventDefault();
  Axios.post('http://localhost:3001/itemcreate',{
  name:name,
  country:country,
  salary:salary,
  email:email,
  headers:vartoken,
  }).then((res)=>{
  
  if(res.data.type === 'success')
  {
    console.log(res.data.type);
  }
 setclick(false);
  }).catch();
  }


  useEffect(()=>{
    Axios.post('http://localhost:3001/read',{
      headers:vartoken,
    }).then(res=>{
      console.log(res.data.items);
        setlistread(res.data.items);
    }).catch(err =>{
      console.log(err);
    });
  },)

  const edithandle =(e)=>{
    e.preventDefault();
  Axios.post('http://localhost:3001/edit',{
  name:nameedit,
  country:countryedit,
  salary:salaryedit,
  email:emailedit,
  headers:vartoken,
  itemid:idedit,
  }).then((res)=>{
    setedit(false);
  
  }).catch();
  }

    return(
        <>

        {edit && <div className='containerpop'><div className={`custom-model-main ${edit ? 'model-open' : ''}`}>
    <div className="custom-model-inner">        
    <div className="close-btn" onClick={(e)=>{setedit(false)}}>×</div>
        <div className="custom-model-wrap">
            <div className="pop-up-content-wrap">
              

            <div class="form-container">
    <h2 class="form-heading">Edit Employee</h2>
    <form onSubmit={edithandle}>
      <label for="firstName">Full Name:</label>
      <input type="text" id="firstName" name="firstName" class="form-input"  onChange={(e)=>{setnameedit(e.target.value)}} required/>
      
      <label for="lastName">Country:</label>
      <input type="text" id="lastName" name="lastName" class="form-input" onChange={(e)=>{setcountryedit(e.target.value)}} required/>
      
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" class="form-input" onChange={(e)=>{setemailedit(e.target.value)}} required/>
      
      <label for="phoneNumber">Salary:</label>
      <input type="tel" id="phoneNumber" name="phoneNumber" class="form-input" onChange={(e)=>{setsalaryedit(e.target.value)}}  required/>
      
      <button type="submit" class="submit-button12">Submit</button>
    </form>
  </div>

            </div>
        </div>  
    </div>  
    <div className="bg-overlay"></div>
</div>
</div>}









        <div className='col123'>



        {click && <div className='containerpop'><div className={`custom-model-main ${click ? 'model-open' : ''}`}>
    <div className="custom-model-inner">        
    <div className="close-btn" onClick={(e)=>{setclick(false)}}>×</div>
        <div className="custom-model-wrap">
            <div className="pop-up-content-wrap">
            

            <div class="form-container">
              
    <h2 class="form-heading">Add Employee</h2>
    {errorval && {errorval}}
    <form onSubmit={createsubmit}>
      <label for="firstName">Full Name:</label>
      <input type="text" id="firstName" name="firstName" class="form-input" onChange={(e)=>{setname(e.target.value)}}  required/>
      
      <label for="lastName">Country:</label>
      <input type="text" id="lastName" name="lastName" class="form-input" onChange={(e)=>{setcountry(e.target.value)}} required/>
      
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" class="form-input" onChange={(e)=>{setemail(e.target.value)}} required/>
      
      <label for="phoneNumber">Salary:</label>
      <input type="tel" id="phoneNumber" name="phoneNumber" class="form-input" onChange={(e)=>{setsalary(e.target.value)}} required/>
      
      <button type="submit" class="submit-button12" >Submit</button>
    </form>
  </div>







            </div>
        </div>  
    </div>  
    <div className="bg-overlay"></div>
</div>
</div>}






    



      
<div>

<div className="button-and-search">
    <button className="add-user-button" onClick={handleopen}>+ Add More User</button>
    <input type="text" class="search-bar" placeholder="Search..." onChange={(e)=>{setsearch(e.target.value)}}/>
  </div>


<table id="customers123">
  <tr>
    <th>Name</th>
    <th>Country</th>
    <th>Salary</th>
    <th>Email</th>
    <th >Action</th>
  </tr>



  {listread.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())).map((val,key)=>{
return(
  <tr  key={key}>
  <td>{val.name}</td>
  <td>{val.country}</td>
  <td>{val.salary}</td>
  <td>{val.email}</td>
  <td>
  <button  className='button primary-button'  onClick={()=>{handleedit(val._id)}}>Edit</button>
  <button className='button secondary-button' onClick={()=>{deletelist(val._id)}} >Delete</button>
  </td>
</tr>
)

})}


</table>
      </div>
        </div>
        </>

    );
}

export default CRUD;