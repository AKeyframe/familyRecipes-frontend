import {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

//Services
import { deleteRecipe, getOneRecipe } from "../services/recipeService";
import { getProfile, FavoriteARecipe } from '../services/profileServices';

export default function RecipeShow(props){
    console.log(props.focusRecipe);
    const params = useParams();
    const navigate = useNavigate();

   
    async function handleSubmit(){
        deleteRecipe(params.id);
        navigate("/");
        props.setProfile(await getProfile(props.userState.user.profile));
        
    }

    const goBack = () => {
        navigate(-1);
    }

    const handleFavorite = async () => {
        await FavoriteARecipe(props.userState.user.profile, params.id).then(() => {
            props.setUpdate(true);
        });

        //Replace with ux feedback
        console.log('favorited!')
    }

    const handleEdit = () => {
        navigate(`/recipes/${params.id}/edit`);
    }

    const headers = () => {
        if(props.focusRecipe.creator === props.profile._id){
            return(
                <div className='navButtons'>

                    <div onClick={goBack} className='button'>
                        <p>Back</p>
                    </div>

                    <div onClick={handleFavorite} className='button'>
                            <p>Favorite</p>
                    </div>

                    <div onSubmit={handleSubmit} className='button'>
                        <p>Delete</p>
                    </div>

                    <div onClick={handleEdit} className='button'>
                        <p>Edit</p>
                    </div>                    
                </div>
            );
        } else {
            return(
                <div className='navButtons'>

                    <div onClick={goBack} className='button'>
                        <p>Back</p>
                    </div>

                    <div onClick={handleFavorite} className='button'>
                            <p>Favorite</p>
                    </div>       
                </div>
            );
        }
    }

    const loaded = () => {
        return(
            <div className='showPage'>
                
                {headers()}

                <div className='show background'>
                    <h1>{props.focusRecipe.name}</h1>
                    
                    <div className='ingredientsList'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Amount</th>
                                    <th>Ingredient</th>
                                </tr>
                                {props.focusRecipe.ingredients.map((ing, i) =>{
                                    return(
                                        <tr key={i}>
                                            <td>{ing.amount}</td>
                                            <td>{ing.ingred}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>                        
                    </div>
                    <div className='instructions'>
                        <h3>Instructions</h3>
                    </div>

                    <div className='stepsList'>
                            {props.focusRecipe.steps.map((step, i) => {
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
    
    const getTheRequirements = async () => {
        props.setProfile(await getProfile(props.userState.user.profile));
        props.setFocusRecipe(await getOneRecipe(params.id));
        
    }

    const loading = () => {
        //This if is for when the user refreshes the page
        if(!props.profile){
            getTheRequirements();
            console.log(props.profile);
        }
        
        return <h1>Loading...</h1>;
    };


    return props.focusRecipe ? loaded() : loading();
}