import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../services/userService';


function SignupForm (props) {

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: ''
  });


  function handleChange(e) {
    props.updateMessage('');
    setFormState(prevState => ({
      // Using ES2015 Computed Property Names
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }


  async function handleSubmit (event) {
    event.preventDefault();
    try {
        await signup(formState);
        props.handleSignupOrLogin();

      // Successfully signed up - show GamePage
      props.history.push('/index');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      props.updateMessage(err.message);
    }
  }

  function isFormInvalid() {
    return !(formState.username && formState.email && formState.password === formState.passwordConf);
  }

  return (
    <div>
      <header>Sign Up</header>
        <form onSubmit={handleSubmit} >
            <div>
              <input type="text"  placeholder="Username" value={formState.username} name="username" onChange={handleChange} />
            </div>
          
            <div>
              <input type="email" className="form-control" placeholder="Email" value={formState.email} name="email" onChange={handleChange} />
            </div>
          
            <div>
              <input type="password" className="form-control" placeholder="Password" value={formState.password} name="password" onChange={handleChange} />
            </div>
        
            <div>
              <input type="password" className="form-control" placeholder="Confirm Password" value={formState.passwordConf} name="passwordConf" onChange={handleChange} />
            </div>
          
            <div>
              <button className="btn btn-default" disabled={isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
        </form>
      </div>
    );
}

export default SignupForm;
