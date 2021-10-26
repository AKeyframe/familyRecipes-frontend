import { Link } from 'react-router-dom';


const NavBar = (props) => {
    console.log(props.user);
    let nav = props.user.user ?
        <div>
            {console.log('login true')}
            <Link to='' onClick={props.handleLogout}>Log Out</Link>
            <span>Welcome, {props.user.user.username}</span>
        </div>
        :
        <div className='cont'>
            {console.log('login false')}
            <Link to="/" ><h2>LOG IN</h2></Link>
            
            <Link to="/signup"><h2>SIGN UP</h2></Link>
        </div>

  return (
    <nav>
        {nav}
    </nav>
  );
};

export default NavBar;