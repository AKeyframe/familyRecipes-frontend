import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getRecipes} from '../services/recipeService';



//Refactor this to be the componet for search results
//Will Return any public, family, or personal recipe matching criteria


export default function RecipeResults(props) {
    const [recipes, setRecipes] = useState(null);

    async function updateRecipe() {
        setRecipes(await getRecipes());
    }

    useEffect(() => updateRecipe(), []);

    const loaded = () => {
        console.log(recipes)
        return recipes.map((recipe) => (
            <div key={recipe._id} className='recipe background'>
              
                <Link to={`/recipes/${recipe._id}`}>
                    <h1>{recipe.name}</h1>
                </Link>
            </div>
        ));
    };

    const loading = () => {
        return <h1>Loading...</h1>;
    };

    return recipes ? loaded() : loading();
}

