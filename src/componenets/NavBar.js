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
        <div>
            {console.log('login false')}
            <Link to="/" >LOG IN</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/signup">SIGN UP</Link>
        </div>

  return (
    <div>
        {nav}
    </div>
  );
};

export default NavBar;