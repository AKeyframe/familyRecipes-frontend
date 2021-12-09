//import { useState } from "react";

import '../App.scss';

export default function UserRecipes(props){
    if(props.profile){
        if(props.profile.recipes){
            return(
                <div>
                    {props.profile.recipes.map((r, i) =>{
                        
                    return(
                            <div key={i}>
                                <h1>{r.name}</h1>
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