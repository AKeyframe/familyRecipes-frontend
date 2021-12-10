//import { useState } from "react";
import { useNavigate } from 'react-router';

import '../App.scss';

export default function UserRecipes(props){

    const navigate = useNavigate();

    const handleClick = (r) => {
        props.setFocusRecipe(r);
        navigate(`/recipes/${r._id}`);
    }


    if(props.profile){
        if(props.profile.recipes){
            return(
                <div>
                    {props.profile.recipes.map((r, i) =>{
                        
                    return(
                            <div key={i}>
                                <h1 onClick={() => handleClick(r)}>{r.name}</h1>
                            </div>
                    );  
                    })}
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