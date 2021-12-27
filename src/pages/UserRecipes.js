//import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

import '../App.scss';

export default function UserRecipes(props){

    const width = window.innerWidth;
    const navigate = useNavigate();

    const handleClick = (r) => {
        props.setFocusRecipe(r);
        navigate(`/recipes/${r._id}`);
    }

    const goBack = () => {
        navigate(-1);
    }

    function nav(){
        if(width < 650){
            return(
                <div className='navButtons'>
                    <div onClick={goBack}className='button'>
                        <p>Back</p>
                    </div>

                    <Link to='/recipes/new'>
                        <div className='button'>
                            <p>New Recipe</p>
                        </div>
                    </Link>
                </div>
            );
        }
    }

    if(props.profile){
        if(props.profile.recipes){
            return(
                <div>
                    {nav()}

                    <div className='userRecipes background'>
                        <h1>Your Recipes</h1>

                        {props.profile.recipes.map((r, i) =>{
                            
                        return(
                                <div className={'recipe'} key={i}>
                                    <h1 onClick={() => handleClick(r)}>
                                        {r.name}
                                    </h1>
                                    <p>This is a temporary fake description for the recipe. Whatever it is, it's probably delicious.</p>
                                </div>
                        );  
                        })}
                    </div>
                </div>
            );
        } else {
            return <h1>Loading</h1>
        } 
    }
    else {
        return <h1>Loading</h1>
    }   
}