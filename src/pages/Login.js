import { useState } from 'react';
import { Link } from 'react-router-dom';


function Login(props) {
    const [formState, setFormState] = useState({
        username: "",
        pw: ""
    });

    function handleChange(e) {
        // TODO: write the handleChange logic
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // TODO: write handleSubmit logic

        } catch (err) {
            // Use a modal or toast in your apps instead of alert
            alert('Invalid Credentials!');
        }
    }

    return (
        <div className="loginPage">
            <header>Log In</header>
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
                    <div className="text-center">
                        <button>Log In</button>&nbsp; &nbsp;
                        <Link to='/'>Cancel</Link>
                    </div>
                    <div>
                        <Link to='/signup'>Sign Up</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
