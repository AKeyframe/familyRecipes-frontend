import { Route, Switch } from 'react-router-dom';
import './App.css';

import Signup from './pages/Signup';
import Login from './pages/Login';

import NavBar from './componenets/NavBar';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" render={props => 
            <Login {...props} />
        }/>

        <Route exact path="/signup" render={props => 
            <Signup {...props} />
        }/>
      </Switch>
    </div>
  );
}

export default App;
