import {Link} from 'react-router-dom';

import RecipeResults from '../componenets/RecipeResults';

export default function Index(props){

    

    return(
        <div>
            <h1>hello</h1>
            <Link to='/recipe/new'>
                <h1>Add A Recipe</h1>
            </Link>

            <RecipeResults />
            
        </div>
    );
}