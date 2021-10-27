import {useState, useEffect} from 'react';
import { getOneRecipe } from "../services/recipeService";

export default function Show(props){

    const [recipe, setRecipe] = useState(null);

    async function updateRecipe() {
        setRecipe(await getOneRecipe(props.match.params.id));
        
    }

    useEffect(() => updateRecipe(), []);
    console.log(recipe);
    const loaded = () => {
        console.log(recipe)
        showRecipe();
        return(
            <div className='showPage'>
                <div className='show'>
                    <h1>{recipe.name}</h1>
                    
                </div>
            </div>
        );
    };

    const loading = () => {
        return <h1>Loading...</h1>;
    };

    function showRecipe(){

    }

    return recipe ? loaded() : loading();
}