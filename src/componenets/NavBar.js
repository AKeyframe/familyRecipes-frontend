import { Link } from 'react-router-dom';


const NavBar = (props) => {
    console.log(props.user);
    let nav = props.user.user ?
        <div className='nav'>
            <Link to='/home'><h2>The Family Table</h2></Link>
            <form>
                <input type="text" name='search' placeholder='Search Recipes (WIP)' />
            </form>
            <Link to='' onClick={props.handleLogout}><h2>Sign Out</h2></Link>
            {/* ☰ */}
        </div>
        :
        <div className='nav'>
                <Link to="/signup"><h2>Sign Up</h2></Link>
                <Link to="/" ><h2>Login</h2></Link>
                
                
            
        </div>

  return (
    <nav>
        
        {nav}
    </nav>
  );
};

export default NavBar;