import { Routes, Route} from 'react-router-dom';
import {useState} from 'react';


import './App.scss';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Index from './pages/Index';
import RecipeNew from './pages/RecipeNew';
import Show from './pages/Show';

import NavBar from './componenets/NavBar';

import {getUser, logout} from './services/userService';




function App() {
  const [userState, setUserState] = useState({user: getUser()});

  function handleSignupOrLogin(){
    setUserState({user: getUser()});
  }
  
  function handleLogout(){
    logout(); //userService
    setUserState({user: null});
  }

  return (
    <div className="App">
      <NavBar handleLogout={handleLogout} user={userState}/>
      <Routes>
        <Route path="/" element={
            <Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        
        <Route path="/signup" element={
            <Signup handleSignupOrLogin={handleSignupOrLogin}/>}
        />

        <Route path='/home' element={<Index />} />
        <Route path='/recipe/new' element={ 
            <RecipeNew user={userState}/>}
        />

        <Route path='/recipe/:id' element={ 
            <Show />} 
        />
      </Routes>
    </div>
  );

}



export default App;
