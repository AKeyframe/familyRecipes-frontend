
import { useNavigate } from "react-router";

//Components
import IngredientInput from "../componenets/IngredientInput";

//Services
import { updateRecipe } from "../services/recipeService";

export default function RecipeEdit(props){

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return(
        <div>
            <h1>Edit Page</h1>
            <div onClick={goBack} className='button'>
                <p>Back</p>
            </div>
        </div>
    );
}