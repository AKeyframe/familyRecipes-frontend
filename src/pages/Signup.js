import { useState } from 'react';
import SignupForm from '../componenets/SignupForm';


function Signup(props){

  const [messageState, setMessageState] = useState({
    msg: ''
  });

  function updateMessage(msg) {
    setMessageState({message: msg});
  }

    return (
      <div className='SignupPage'>
        <SignupForm {...props} updateMessage={updateMessage} />
        <p>{messageState.msg}</p>
      </div>
    );
}

export default Signup;