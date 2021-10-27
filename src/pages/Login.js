import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/userService';

export default function Login(props) {
    const [formState, setFormState] = useState({
        username: "",
        pw: ""
    });

    function handleChange(e) {
        setFormState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            console.log('am i even trying?')
            await login(formState);
            console.log('done waiting');
            props.handleSignupOrLogin();
            props.history.push('/home');

        } catch (err) {
            // Use a modal or toast in your apps instead of alert
            alert('Invalid Credentials!');
        }
    }

    return (
        <div className="loginPage">
            <div className='background'>
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                            type="text"
                            placeholder="Username"
                            value={formState.username}
                            name="username"
                            onChange={handleChange}
                        />
                    </div>
                
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={formState.pw}
                            name="pw"
                            onChange={handleChange}
                        />
                    </div>
        
                    <div>
                        <div>
                            <button type="submit">Log In</button>&nbsp; &nbsp;
                        
                        </div>
                        <div>
                            <p>Don't have an Account? </p>
                            <Link to='/signup'>Sign Up</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
