import './App.css';
import {Link,Routes,Route,useNavigate} from 'react-router-dom';
import { createContext, useState } from 'react';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Edit from './Pages/Edit';
import CRUD from './Pages/CRUD';

export const CRUDContext = createContext();

function App() {
const [userall,setuserall] = useState(false);


const navigate = useNavigate();
const logouttoken = ()=>{
  localStorage.removeItem("auth-token"); 
  setuserall(false);
  navigate('/');
}

  return (
    <>
    <CRUDContext.Provider value ={{userall,setuserall}}>
     <nav>
      <ul>
        <li className='left'>
          <Link to ="/"><p style={{color:'white'}}>Home</p></Link>
        </li>
        {!userall &&          <li>
          <Link to ="/Signup"><p style={{color:'white'}}>Signup</p></Link>
        </li> }
        {!userall &&        
        <li>
          <Link to ="/Login"><p style={{color:'white'}}>Login</p></Link>
        </li>}
        {userall &&  
        <li>
          <Link to ="/"><p style={{color:'white'}}  onClick={logouttoken}>Logout</p></Link>
        </li>
}

      </ul>
     </nav>
    <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/Login" element={<Login/>} />
     <Route path="/Signup" element={<Signup/>} />
     <Route path="/CRUD" element={<CRUD/>} />

     <Route path="/Edit/:id" element={<Edit/>} />
    </Routes>
    </CRUDContext.Provider>
</>
  );
}

export default App;
