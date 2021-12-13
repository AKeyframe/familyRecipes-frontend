import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

//Services
import { getOneFamily, getFamilyRecipes } from "../services/familyServices";

export default function FamilyRecipes(props){

    const [FamilyRecipes, setFamilyRecipes] = useState();
    const navigate = useNavigate();
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

    const handleClick = (r) => {
        props.setFocusRecipe(r);
        navigate(`/recipes/${r._id}`);

    }

    const goBack = () => {
        navigate(-1);
    }

    if(FamilyRecipes){
        return(
            <div>
                <h1>Family Recipes Page</h1>
                <div onClick={goBack}className='button'>
                    <p>Back</p>
                </div>
                <h1 onClick={test}>Click me</h1>
                {FamilyRecipes.map((r, i) => {
                    return(
                        <div key={i} className='recipe background'>
                            <a href='#' onClick={() => handleClick(r)}>
                                <h1>{r.name}</h1>
                            </a>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return(
            <h1>Loading...</h1>
        );
    }
}