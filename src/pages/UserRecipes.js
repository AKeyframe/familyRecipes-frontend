//import { useState } from "react";

export default function UserRecipes(props){
    console.log(props);
    if(props.profile){
        console.log(props.profile);
        if(props.profile.recipes){
            console.log(props.profile.recipes);
            return(
                <div>
                    {props.profile.recipes.map((r, i) =>{
                        console.log(i);
                        console.log(r);
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