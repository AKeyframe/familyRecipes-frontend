import {Link} from 'react-router-dom';

import RecipeResults from '../componenets/RecipeResults';

export default function Index(props){


    return(
        <div className='indexPage'>
            <div className='index'>
                <div className='center'>
                    <Link to='/recipe/new'>
                        <div className='button'>
                            <p>Add A Recipe</p>
                        </div>
                    </Link>
                </div>
                

                
                    <RecipeResults />
            
            </div>
        </div>
    );
}