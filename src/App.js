import { Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

import './App.scss';

//Pages
import Signup from './pages/Signup';
import Index from './pages/Index';
import Profile from './pages/Profile';
import UserRecipes from './pages/UserRecipes';
import RecipeNew from './pages/RecipeNew';
import RecipeShow from './pages/RecipeShow';
import RecipeEdit from './pages/RecipeEdit';
import Favorites from './pages/Favorites';

import Requests from './pages/Requests';
import FamilyNew from './pages/FamilyNew';
import Families from './pages/Families';
import FamiliesShow from './pages/FamiliesShow';
import FamilyRecipes from './pages/FamiliesRecipes';

//Components
import NavBar from './componenets/NavBar';

//Services
import { getUser, logout } from './services/userService';
import { getProfile } from './services/profileServices';
import { getOneFamily } from './services/familyServices';
import { getOneRecipe } from './services/recipeService';


function App() {

  const [userState, setUserState] = useState({user: getUser()});
  const [profile, setProfile] = useState();
  const [update, setUpdate] = useState(false);

  const [focusFamily, setFocusFamily] = useState(null);
  const [focusRecipe, setFocusRecipe] = useState(null);

  const navigate = useNavigate();
  const width = window.innerWidth;

  
  useEffect(() => {
    const checkProfile = async () => {
      if(userState.user){        
        if(!profile){
          setProfile(await getProfile(userState.user.profile));

        } else if (update === true){
          setUpdate(false);
          setProfile(await getProfile(userState.user.profile));
        }
      }
    }
    checkProfile();
  }, [userState.user, update]);


  function handleSignupOrLogin(){
    setUserState({user: getUser()});
  }
  
  function handleLogout(){
    logout(); //userService
    setUserState({user: null});
    setProfile(null);
    setUpdate(false);
    setFocusRecipe(null);
    setFocusFamily(null);
    
  }

  async function handleFamFocus(fam){
    setFocusFamily(await getOneFamily(fam._id));
    navigate(`/families/${fam._id}`);
    
  }

  async function handlerecFocus(fav){
    setFocusRecipe(await getOneRecipe(fav._id));
    navigate(`/recipes/${fav._id}`);
  }

  function leftSideMenus(){
    if(userState.user){     
      if(width > 650){
        if(profile){
          return(
            <div className='leftSidebar'>
              <Link to='/families'>
                <h2>Tables</h2>
              </Link>
              {profile.families.map((fam, i) => {
                return(
                  <div>
                    <a onClick={() => handleFamFocus(fam)} href='#'>   
                      <h3>{fam.name}</h3>
                    </a>
                  </div>
                );
              })}
            </div>
          );
        }
      }
    }
  }

  function rightSideMenus(){
    if(userState.user){     
      if(width > 650){
        if(profile){
          return(
            <div className='rightSidebar'>
              <Link to='/favorites'>
                <h2>Favorites</h2>
              </Link>
              {profile.favorites.map((fav, i) => {
                  return(
                    <div>
                      <a onClick={() => handlerecFocus(fav)} href='#'>   
                        <h3>{fav.name}</h3>
                      </a>
                    </div>
                  );
                })}
            </div>
          );
        }
      }
    }
  }



  return (
    <div className="App">
      <NavBar handleLogout={handleLogout} user={userState}/>
      <div className='desktop'> 
        {leftSideMenus()}
        <Routes>
          <Route path="/" element={
              <Index 
                    userState={userState}
                    handleSignupOrLogin={handleSignupOrLogin}
                    profile={profile}
                    focusRecipe={focusRecipe}
                    setFocusRecipe={setFocusRecipe}
                    focusFamily={focusFamily}
                    setFocusFamily={setFocusFamily}
              />}
          />
          
          <Route path="/signup" element={
              <Signup handleSignupOrLogin={handleSignupOrLogin}/>}
          />
          
          <Route path='/profile' element={
              <Profile  profile={profile}
                        setProfile={setProfile}
                        userState={userState}
                        handleLogout={handleLogout}
              />}
          />

          <Route path='/recipes' element={
              <UserRecipes  profile={profile}
                            setProfile={setProfile}
                            focusRecipe={focusRecipe}
                            setFocusRecipe={setFocusRecipe}
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

          <Route path='/recipes/:id/edit' element={
              <RecipeEdit profile={profile}
                          setProfile={setProfile}
                          focusRecipe={focusRecipe}
                          setFocusRecipe={setFocusRecipe}
                          setUpdate={setUpdate} 
              />}
          />

          <Route path='/recipes/:id' element={ 
              <RecipeShow focusRecipe={focusRecipe}
                          setFocusRecipe={setFocusRecipe}
                          userState={userState}
                          profile={profile}
                          setProfile={setProfile}
                          setUpdate={setUpdate}/>} 
          />

          <Route path='/favorites' element={
              <Favorites  profile={profile}
                          setProfile={setProfile}
                          focusRecipe={setFocusRecipe}
                          setFocusRecipe={setFocusRecipe}
                          userState={userState}/>}
          />

          <Route path='/requests' element={
              <Requests profile={profile}
                        setProfile={setProfile}
                        userState={userState}
                        focusFamily={focusFamily}
                        setFocusFamily={setFocusFamily}/>}
          />

          <Route path='/families' element={
              <Families profile={profile}
                        setProfile={setProfile}
                        focusFamily={focusFamily}
                        setFocusFamily={setFocusFamily}
                        userState={userState}/>}
          />

          <Route path='/families/new' element={
              <FamilyNew  profile={profile}/>}
          />

          <Route path='/families/:id' element={
              <FamiliesShow focusFamily={focusFamily}
                            setFocusFamily={setFocusFamily}/>}
          />

          <Route path='/families/:id/recipes' element={
              <FamilyRecipes  focusFamily={focusFamily}
                              setFocusFamily={setFocusFamily}
                              focusRecipe={focusRecipe}
                              setFocusRecipe={setFocusRecipe}/>}
          />

        </Routes>
        {rightSideMenus()}
      </div>
    </div>
  );

}

export default App;
