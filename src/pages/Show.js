import {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getOneRecipe, deleteRecipe } from "../services/recipeService";

export default function Show(props){

    const [recipe, setRecipe] = useState(null);
    const [temp, setTemp] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    async function updateRecipe() {
        setRecipe(await getOneRecipe(params.id));
        
    }

    useEffect(() => updateRecipe(), []);
    console.log(props);
    async function handleSubmit(){
        deleteRecipe(await params.id);
        navigate('/home');
    }


    const loaded = () => {
        return(
            <div className='showPage'>
                <form onSubmit={handleSubmit}>
                    <button>Delete Recipe</button>
                </form>
                <div className='show background'>
                    <h1>{recipe.name}</h1>
                    
                    <div className='ingredientsList'>
                        <div className='amounts'>
                            <div className='amHead'>
                                <h4>Amount</h4>
                            </div>
                            {recipe.ingredients.map((ing, i) => {
                                console.log(ing)
                                return(
                                        <div className='amount' key={i}>
                                            <p>{ing.amount}</p>
                                        </div>
                                );
                            })}
                        </div>

                        <div className='ingredients'>
                            <div className='ingHead'>
                                <h4>Ingredient</h4>
                            </div>
                            {recipe.ingredients.map((ing, i) => {
                                console.log(ing)
                                return(
                                        <div className='ingred' key={i}>
                                            <p>{ing.ingred}</p>
                                        </div>
                                );
                            })}
                        </div>
                        
                    </div>
                    <div className='instructions'>
                        <h3>Instructions</h3>
                    </div>

                    <div className='stepsList'>
                            {recipe.steps.map((step, i) => {
                                return(
                                    <div className='step' key={i}>
                                        <p><strong>{i+1}: </strong>{step}</p>
                                    </div>
                                );
                            })}
                        </div>        
                
                </div>
            </div>
        );
    };

    const loading = () => {
        return <h1>Loading...</h1>;
    };


    return recipe ? loaded() : loading();
}