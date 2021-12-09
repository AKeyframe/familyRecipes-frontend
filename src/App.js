import { Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';


import './App.scss';

//Pages
import Signup from './pages/Signup';
import Index from './pages/Index';
import UserRecipes from './pages/UserRecipes';
import RecipeNew from './pages/RecipeNew';
import Show from './pages/Show';

//Components
import NavBar from './componenets/NavBar';

//Services
import { getUser, logout } from './services/userService';
import { getProfile } from './services/profileServices';


function App() {

  const [userState, setUserState] = useState({user: getUser()});
  const [profile, setProfile] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      if(userState.user){
        console.log('------------------');
        console.log(update);
        
        
        if(!profile){
          console.log('updating profile');
          setProfile(await getProfile(userState.user.profile));
        } else if (update === true){
          console.log('updating profile');
          setUpdate(false);
          setProfile(await getProfile(userState.user.profile));
        }
      }
    }
    checkProfile();
  }, [update]);

  


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
            <Index 
                  userState={userState}
                  handleSignupOrLogin={handleSignupOrLogin}
                  profile={profile}
            />}
        />
        
        <Route path="/signup" element={
            <Signup handleSignupOrLogin={handleSignupOrLogin}/>}
        />

        {/* <Route path='/home' element={<Home profile={profile}/>} /> */}
        <Route path='/recipes' element={
            <UserRecipes  profile={profile}
                          setProfile={setProfile}
            />} 
        />
        
        <Route path='/recipes/new' element={ 
            <RecipeNew  user={userState} 
                        profile={profile}
                        setProfile={setProfile}
                        update={update}
                        setUpdate={setUpdate}
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
