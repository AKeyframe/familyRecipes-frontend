import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoThreeBars } from 'react-icons/go';

const NavBar = (props) => {
    const width = window.screen.width;
    
    const [signOrLog, setSignOrLog] = useState('/signup');
    const [menu, setMenu] = useState(false);

    function toggleMenu(){setMenu(!menu);}

    function toggleNav(){
        setSignOrLog(prev => {
            if(signOrLog === '/signup') return '/';
            if(signOrLog === '/') return '/signup';
        });
    }

    function resetNav(){
        setSignOrLog('/signup');
    }

    function handleLogout(){
        toggleMenu();
        props.handleLogout();
    }

    let nav = props.user.user ?
        loggedIn()
        :
        <div className='nav'>
                <Link onClick={resetNav} to='/'><h2>The Family Table</h2></Link>
                <Link onClick={toggleNav} to={`${signOrLog}`}>
                    <h2>{signOrLog === '/' ? 'Login' : 'Sign Up'}</h2></Link>
            
                
                
            
        </div>

    function loggedIn(){
        if(width > 650){
            return(
                <div className='nav'>
                    <Link to='/'><h2>The Family Table</h2></Link>
                    <form>
                        <input  type="text" 
                                name='search' 
                                placeholder='Search Recipes (WIP)' 
                        />
                    </form>
                    <Link to='' onClick={props.handleLogout}>
                        <h2>Sign Out</h2>
                    </Link>
            {/* ☰ */}
        </div>
            );
        } else {
            return(
                <div className='nav'>
                    <Link to='/'><h2>The Family Table</h2></Link>
                    <div className= 'navMenu'>
                        <GoThreeBars style={{
                                color: 'white',
                                fontSize: '45px',
                                transition: 'transform 250ms ease',
                                marginRight: '10px'
                            }}
                            id='bars'
                            onClick={toggleMenu}
                        />
                    </div>

                    <div className={menu ? 'sidebar active' : 'sidebar'}>
                        <div className='x' >
                            <p onClick={toggleMenu}>X</p>
                        </div>

                        <div className={
                            menu ? 'navLinks linksActive' : 'navLinks'}>

                            <div className='link'>
                                <Link to='/profile' onClick={toggleMenu}>
                                    <h2 className='menuItem'>Profile</h2>
                                </Link>
                            </div>

                            <div className='link'>
                                <Link to='/recipes' onClick={toggleMenu}>
                                    <h2 className='menuItem'>Your Recipes</h2>
                                </Link>
                            </div>

                            <div className='link'>
                                <Link to='/families' onClick={toggleMenu}>
                                    <h2 className='menuItem'>Family Tables</h2>
                                </Link>
                            </div>

                            <div className='link'>
                                <Link to='/favorites' onClick={toggleMenu}>
                                    <h2 className='menuItem'>Favorites</h2>
                                </Link>
                            </div>

                            <div className='link'>
                                <Link to='/requests' onClick={toggleMenu}>
                                    <h2 className='menuItem'>Requests</h2>
                                </Link>
                            </div>
                            
                            <div className='link'>
                                <Link to='' onClick={handleLogout}>
                                    <h2 className='menuItem'>Sign Out</h2>
                                </Link>
                            </div>

                        
                        </div>

                    </div>

                </div>
            );
        }
    }

  return (
    <nav>
        {nav}
    </nav>
  );
};

export default NavBar;