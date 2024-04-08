import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import Authentication from './Components/Authentication/Authentication';
import { useDispatch,useSelector } from 'react-redux';
import { authReducer } from './Store/Auth/Reducer';
import { store } from './Store/Store';
import { getUserProfile } from './Store/Auth/Action';
function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store => store);
  const navigate = useNavigate();
 
  useEffect(() => {
    
    if(jwt){
      navigate("/home");
      dispatch(getUserProfile(jwt));
      console.log(auth.jwt);
     
     
    }
  
    
  }, [auth.jwt])
  

  return (
    <div className="">

    <Routes>
      <Route path='/*' element={auth.user?<HomePage/> : <Authentication/>} >
      
      </Route>
    </Routes>
      
    </div>
  );
}

export default App;
