import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getRecipes} from '../services/recipeService';

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
              
                <Link to={`/recipe/${recipe._id}`}>
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

