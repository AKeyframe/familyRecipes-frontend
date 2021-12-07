import { Routes, Route} from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';


import './App.scss';

//Pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import UserRecipes from './pages/UserRecipes';
import RecipeNew from './pages/RecipeNew';
import Show from './pages/Show';

//Components
import NavBar from './componenets/NavBar';

//Services
import { getUser, logout } from './services/userService';
import { getProfile } from './services/profileServices';


function App() {
  const navigate = useNavigate();

  const [userState, setUserState] = useState({user: getUser()});
  const [profile, setProfile] = useState();

  useEffect(async () => {
    if(userState.user){
      console.log(userState);
      if(!profile){
        setProfile(await getProfile(userState.user.profile));
      }
    }
  }, []);

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

        <Route path='/home' element={<Home />} />
        <Route path='/recipes' element={
            <UserRecipes  profile={profile}
                          setProfile={setProfile}
            />} 
        />
        
        <Route path='/recipes/new' element={ 
            <RecipeNew  user={userState} 
                        profile={profile}
                        setProfile={setProfile}
            />}
        />

        <Route path='/recipes/:id' element={ 
            <Show />} 
        />
      </Routes>
    </div>
  );

}

export default App;
