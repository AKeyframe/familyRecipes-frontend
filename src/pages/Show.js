import {useState, useEffect} from 'react';
import { getOneRecipe } from "../services/recipeService";

export default function Show(props){

    const [recipe, setRecipe] = useState(null);
    const [temp, setTemp] = useState([]);
    async function updateRecipe() {
        setRecipe(await getOneRecipe(props.match.params.id));
        
    }

    useEffect(() => updateRecipe(), []);
    console.log(recipe);

    const tempShowIng = () => {
        let newArray = [];
        recipe.ingredients.forEach((rec, i) => {
            newArray.push(<p>Amount: {rec.amount} ingredient: {rec.ingred}</p>)
               
          
        })
        setTemp(prev => [...prev, newArray])
    }

    const loaded = () => {
        return(
            <div className='showPage'>
                <div className='show'>
                    <h1>{recipe.name}</h1>
                    <p>temp show</p>
                    <h3>Amount: {recipe.ingredients[0].amount} Ingredient: {recipe.ingredients[0].ingred}</h3>
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