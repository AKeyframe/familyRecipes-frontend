import { useState, useEffect } from "react";

import { getFamilyRecipes } from "../services/familyServices";

export default function FamilyRecipes(props){

    const [FamilyRecipes, setFamilyRecipes] = useState();

    useEffect(() => {
        const gfr = async () => {
            setFamilyRecipes(await getFamilyRecipes(props.focusFamily._id));
        }
        gfr();
    }, []);

    const test = () => {
        console.log(FamilyRecipes);
    }

    return(
        <div>
            <h1>Family Recipes Page</h1>
            <h1 onClick={test}>Click me</h1>
        </div>
    );
}