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
                <div className='navButtons'>
                    <div onClick={goBack}className='button'>
                        <p>Back</p>
                    </div>
                    <div className='button'>
                            <p style={{ fontSize: "19px"}}>In Development</p>
                    </div>
                </div>

                <div className='famRecipes background'>
                    <div>
                        <h1>{props.focusFamily.name} Recipes</h1>
                    </div>
                    {FamilyRecipes.map((r, i) => {
                        return(
                            <div key={i} className='recipe'>
                                <a href='#' onClick={() => handleClick(r)}>
                                    <h1>{r.name}</h1>
                                    <p>This is a temporary fake description for the recipe. Whatever it is, it's probably delicious.</p>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    } else {
        return(
            <h1>Loading...</h1>
        );
    }
}