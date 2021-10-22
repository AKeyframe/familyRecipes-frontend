import { Route, Switch } from 'react-router-dom';
import {useState} from 'react';


import './App.css';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Index from './pages/Index';

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
      <Switch>
        <Route exact path="/" render={props => 
            <Login handleSignupOrLogin={handleSignupOrLogin} {...props} />
        }/>

        <Route path="/signup" render={props => 
            <Signup handleSignupOrLogin={handleSignupOrLogin} {...props} />
        }/>

        <Route path='/home' component={Index} />

      </Switch>
    </div>
  );
}



export default App;
