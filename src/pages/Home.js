import {Link} from 'react-router-dom';

//import RecipeResults from '../componenets/RecipeResults';
import UserRecipes from './UserRecipes';

export default function Home(props){
    console.log(props.profile);

    return(
        <div className='indexPage'>
            <div className='index'>
                <div className='center'>
                    <Link to='/recipes/new'>
                        <div className='button'>
                            <p>Add A Recipe</p>
                        </div>
                    </Link>
                </div>
                
                <h1 className='center' style={{marginTop: '20px'}}>
                    Temp Dev Page
                </h1>

                <div>
                    <Link to='/recipes'>
                        <div className='button'>
                            <p>User Recipes</p>
                        </div>
                    </Link>
                </div>

               <UserRecipes profile={props.profile}
                            setProfile={props.profile}
                            focusRecipe={props.focusRecipe}
                            setFocusRecipe={props.setFocusRecipe}
                />
                <div>
                    <Link to='/families/new'>
                        <div className='button'>
                            <p style={{fontSize: "13px"}}>New Family Table</p>
                        </div>
                    </Link>
                </div>
                
                <div>
                    <Link to='/families'>
                        <div className= 'button'>
                            <p style={{fontSize: "13px"}}>Your Family's Tables</p>
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to='/favorites'>
                        <div className='button'>
                            <p>Favorites</p>
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to='/requests'>
                        <div className='button'>
                            <p>Requests</p>
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to='/profile'>
                        <div className='button'>
                            <p>Profile</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}