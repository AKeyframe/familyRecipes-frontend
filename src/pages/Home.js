import {Link} from 'react-router-dom';

import RecipeResults from '../componenets/RecipeResults';

export default function Home(props){


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

                <Link to='/recipes'>
                    <div className='button'>
                        <p>User Recipes</p>
                    </div>
                </Link>

               
            
            </div>
        </div>
    );
}