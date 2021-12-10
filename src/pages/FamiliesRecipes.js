import { useState, useEffect } from "react";
import { useParams } from "react-router";

//Services
import { getOneFamily, getFamilyRecipes } from "../services/familyServices";

export default function FamilyRecipes(props){

    const [FamilyRecipes, setFamilyRecipes] = useState();

    const params = useParams();

    useEffect(() => {
        const gfr = async () => {
            setFamilyRecipes(await getFamilyRecipes(props.focusFamily._id));
        }

        const updateFocusFamily = async () => {
            props.setFocusFamily(await getOneFamily(params.id));
        }
        if(!props.focusFamily){
            updateFocusFamily();
        } else {
            gfr();
        }
            
    }, [props.focusFamily]);

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